using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DbSwapPOC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.Repositories
{
  public class DepartmentRepository : IDepartmentRepository
  {
    private readonly Contexts.AppContext appContext;

    public DepartmentRepository(Contexts.AppContext appContext)
      {
      this.appContext = appContext;
    }

    public Task<List<Department>> GetDepartmentsAsync()
    {
        return appContext.Departments.ToListAsync();
    }
  }
}