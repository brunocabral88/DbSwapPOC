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
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            switch (AppSettings.CurrentDatabaseType) {
                case SupportedDatabases.SQL_SERVER:
                    optionsBuilder.UseSqlServer(configuration.GetConnectionString("SqlConnection"));
                    break;
                case SupportedDatabases.MYSQL:
                    var mysqlConnString = configuration.GetConnectionString("MysqlConnection");
                    optionsBuilder.UseMySql(mysqlConnString, ServerVersion.AutoDetect(mysqlConnString));
                    break;
                default:
                    break;
            }

            base.OnConfiguring(optionsBuilder);
        }

    }
}