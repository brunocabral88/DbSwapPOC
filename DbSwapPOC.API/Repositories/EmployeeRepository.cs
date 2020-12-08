using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbSwapPOC.API.Contexts;
using DbSwapPOC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.Repositories
{
  public class EmployeeRepository : IEmployeeRepository
  {
    private readonly AppContext dbContext;

    public EmployeeRepository(AppContext dbContext)
      {
      this.dbContext = dbContext;
    }

    public Task<List<Employee>> GetEmployeesAsync()
    {
      return dbContext.Employees.ToListAsync();
    }
  }
}