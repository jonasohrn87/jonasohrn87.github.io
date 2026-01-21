using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MuffinsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MuffinsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Muffin>>> GetAll()
        {
            return await _context.Muffins.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Muffin>> Create(Muffin muffin)
        {
            _context.Muffins.Add(muffin);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = muffin.Id }, muffin);
        }
    }
}
