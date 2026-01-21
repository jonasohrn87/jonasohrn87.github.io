namespace backend.Models
{
    public class Muffin
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string ExpiryDate { get; set; }
    }
}
