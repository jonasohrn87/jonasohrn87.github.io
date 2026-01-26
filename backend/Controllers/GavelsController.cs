using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GavelsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GavelsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gavel>>> GetAll()
        {
            return await _context.Gavels
                .Include(g => g.GavelProducts)
                .ThenInclude(gp => gp.Product)
                .ThenInclude(p => p.Category)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gavel>> GetById(int id)
        {
            var gavel = await _context.Gavels
                .Include(g => g.GavelProducts)
                .ThenInclude(gp => gp.Product)
                .ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(g => g.Id == id);
            if (gavel == null) return NotFound();
            return gavel;
        }

        [HttpPost]
        public async Task<ActionResult<Gavel>> Create(GavelCreateDto dto)
        {
            var gavel = new Gavel { Title = dto.Title, Image = dto.Image };
            _context.Gavels.Add(gavel);
            await _context.SaveChangesAsync(); // Save to get Id

            // Add products
            foreach (var productId in dto.ProductIds)
            {
                var product = await _context.Products.FindAsync(productId);
                if (product != null)
                {
                    _context.GavelProducts.Add(new GavelProduct { GavelId = gavel.Id, ProductId = productId });
                }
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = gavel.Id }, gavel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, GavelUpdateDto dto)
        {
            var gavel = await _context.Gavels
                .Include(g => g.GavelProducts)
                .FirstOrDefaultAsync(g => g.Id == id);
            if (gavel == null) return NotFound();

            gavel.Title = dto.Title;
            gavel.Image = dto.Image;

            // Update products: remove old, add new
            _context.GavelProducts.RemoveRange(gavel.GavelProducts);
            foreach (var productId in dto.ProductIds)
            {
                var product = await _context.Products.FindAsync(productId);
                if (product != null)
                {
                    _context.GavelProducts.Add(new GavelProduct { GavelId = id, ProductId = productId });
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var gavel = await _context.Gavels.FindAsync(id);
            if (gavel == null) return NotFound();
            _context.Gavels.Remove(gavel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class GavelCreateDto
    {
        public required string Title { get; set; }
        public string? Image { get; set; }
        public required List<int> ProductIds { get; set; }
    }

    public class GavelUpdateDto
    {
        public required string Title { get; set; }
        public string? Image { get; set; }
        public required List<int> ProductIds { get; set; }
    }
}