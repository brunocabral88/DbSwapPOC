using DbSwapPOC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.ModelConfigurers
{
  public class MysqlModelConfigurer : IModelConfigurer
  {
    public void Configure(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>().ToTable("department");
        modelBuilder.Entity<Employee>().ToTable("employee");
    }
  }
}