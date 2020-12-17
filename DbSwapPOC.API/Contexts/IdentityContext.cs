using System;
using DbSwapPOC.API.Models;
using DbSwapPOC.API.Settings;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DbSwapPOC.API.Contexts
{
    public class IdentityContext : IdentityDbContext<User>
    {
        private readonly IConfiguration configuration;

        public IdentityContext(IConfiguration configuration)
        {
            this.configuration = configuration;
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            switch (AppSettings.CurrentDatabase) {
                case SupportedDatabases.SQL_SERVER:
                    optionsBuilder.UseSqlServer(configuration.GetConnectionString("SqlConnection"));
                    break;
                case SupportedDatabases.POSTGRES:
                    /* CHANGE TO POSTGRES */
                    optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostgresConnection"));
                    break;
                default:
                    break;
            }
        }

    }
}