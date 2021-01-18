using DbSwapPOC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.ModelConfigurers
{
  public class PostgresModelConfigurer : IModelConfigurer
  {
    public void Configure(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public");
        modelBuilder.Entity<Department>().ToTable("department");
        modelBuilder.Entity<Employee>().ToTable("employee");
    }
  }
}