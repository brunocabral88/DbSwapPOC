using DbSwapPOC.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DbSwapPOC.API.Contexts
{
	public class MysqlIdentityContext : IdentityDbContext<User>
	{
		private readonly IConfiguration configuration;

		public MysqlIdentityContext(IConfiguration configuration)
		{
			this.configuration = configuration;
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			var mysqlConnString = configuration.GetConnectionString("MysqlConnection");
			optionsBuilder.UseMySql(mysqlConnString, ServerVersion.AutoDetect(mysqlConnString));
			base.OnConfiguring(optionsBuilder);
		}

	}

}

