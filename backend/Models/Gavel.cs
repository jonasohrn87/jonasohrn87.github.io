namespace backend.Models
{
    public class Gavel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Image { get; set; }

        // Navigation for many-to-many with Product
        public ICollection<GavelProduct> GavelProducts { get; set; } = new List<GavelProduct>();
    }
}