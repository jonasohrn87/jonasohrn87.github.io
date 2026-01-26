namespace backend.Models
{
    public class GavelProduct
    {
        public int GavelId { get; set; }
        public Gavel Gavel { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }
}