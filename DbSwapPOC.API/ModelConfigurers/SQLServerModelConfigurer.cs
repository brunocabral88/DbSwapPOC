using DbSwapPOC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.ModelConfigurers
{
  public class SQLServerModelConfigurer : IModelConfigurer
  {
    public void Configure(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>().ToTable("Department");
        modelBuilder.Entity<Employee>().ToTable("Employee");
    }
  }
}