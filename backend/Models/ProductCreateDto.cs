namespace backend.Models
{
    public class ProductCreateDto
    {
        public required string Brand { get; set; }
        public required string Name { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public decimal ProfitMarginAmount { get; set; }
        public decimal ProfitMarginPercentage { get; set; }
        public string? Image { get; set; }
        public required string BuyType { get; set; } // "SingleBuy" or "MultiBuy"
    }
}