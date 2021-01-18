using System;
using DbSwapPOC.API.Factories;
using DbSwapPOC.API.Models;
using DbSwapPOC.API.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DbSwapPOC.API.Contexts
{
    public class AppContext : DbContext
    {
        private readonly IConfiguration configuration;
        private readonly IModelCreatorFactory modelCreatorFactory;

        public AppContext(IConfiguration configuration, IModelCreatorFactory modelCreatorFactory)
        {
      this.modelCreatorFactory = modelCreatorFactory;
            this.configuration = configuration;
            
            /* Apply migrations on the fly for demo purposes, not valid for production */
            Database.Migrate();
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            switch (AppSettings.CurrentDatabaseType) {
                case SupportedDatabases.SQL_SERVER:
                    optionsBuilder.UseSqlServer(configuration.GetConnectionString("SqlConnection"));
                    break;
                case SupportedDatabases.POSTGRES:
                    optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostgresConnection"));
                    break;
                default:
                    break;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var modelCreator = modelCreatorFactory.GetInstance(AppSettings.CurrentDatabaseType);
            modelCreator.Configure(modelBuilder);

                
            base.OnModelCreating(modelBuilder);
        }
    }
}