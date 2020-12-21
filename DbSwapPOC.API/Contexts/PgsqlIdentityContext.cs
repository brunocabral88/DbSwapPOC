using DbSwapPOC.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DbSwapPOC.API.Contexts
{
	public class PgsqlIdentityContext : IdentityDbContext<User>
	{
		private readonly IConfiguration configuration;

		public PgsqlIdentityContext(IConfiguration configuration)
		{
			this.configuration = configuration;
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostgresConnection"));
			base.OnConfiguring(optionsBuilder);
		}

	}

}

