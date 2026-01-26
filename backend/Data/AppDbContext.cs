using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Muffin> Muffins { get; set; }
        public DbSet<Kondisbit> Kondisbitar { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Gavel> Gavels { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<GavelProduct> GavelProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure many-to-many relationship
            modelBuilder.Entity<GavelProduct>()
                .HasKey(gp => new { gp.GavelId, gp.ProductId });

            modelBuilder.Entity<GavelProduct>()
                .HasOne(gp => gp.Gavel)
                .WithMany(g => g.GavelProducts)
                .HasForeignKey(gp => gp.GavelId);

            modelBuilder.Entity<GavelProduct>()
                .HasOne(gp => gp.Product)
                .WithMany(p => p.GavelProducts)
                .HasForeignKey(gp => gp.ProductId);

            // Configure Product to Category relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey(p => p.CategoryId);

            // Configure decimal precision for Product
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.ProfitMarginAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.ProfitMarginPercentage)
                .HasPrecision(18, 2);

            // Seed data for Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Bakery" },
                new Category { Id = 2, Name = "Fruits" },
                new Category { Id = 3, Name = "Vegetables" },
                new Category { Id = 4, Name = "Dairy" },
                new Category { Id = 5, Name = "Snacks" }
            );
        }
    }
}
