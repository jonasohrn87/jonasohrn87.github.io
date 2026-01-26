using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Brand { get; set; }
        public required string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal ProfitMarginAmount { get; set; }
        public decimal ProfitMarginPercentage { get; set; }
        public string? Image { get; set; }
        public required string BuyType { get; set; } // "SingleBuy" or "MultiBuy"

        // Navigation for many-to-many with Gavel
        public ICollection<GavelProduct> GavelProducts { get; set; } = new List<GavelProduct>();
    }
}