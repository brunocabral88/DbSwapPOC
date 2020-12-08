using System.Collections.Generic;
using System.Threading.Tasks;
using DbSwapPOC.API.Models;

namespace DbSwapPOC.API.Repositories
{
    public interface IDepartmentRepository
    {
         Task<List<Department>> GetDepartmentsAsync();
    }
}