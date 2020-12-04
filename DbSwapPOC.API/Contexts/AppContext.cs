using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.Contexts
{
    public class AppContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        
        }

    }
}