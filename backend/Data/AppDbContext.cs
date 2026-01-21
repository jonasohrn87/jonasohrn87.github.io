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
    }
}
