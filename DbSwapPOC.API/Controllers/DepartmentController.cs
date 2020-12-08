using System;
using System.Threading.Tasks;
using DbSwapPOC.API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DbSwapPOC.API.Controllers
{
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly ILogger<DepartmentController> logger;
        private readonly IDepartmentRepository departmentRepository;

        public DepartmentController(ILogger<DepartmentController> logger, IDepartmentRepository departmentRepository)
        {
        this.logger = logger;
        this.departmentRepository = departmentRepository;
        }
    
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetDepartmentsAsync()
        {
            try
            {
                var departments = await departmentRepository.GetDepartmentsAsync();
                return Ok(departments);
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500);
            }
        }

    }
}