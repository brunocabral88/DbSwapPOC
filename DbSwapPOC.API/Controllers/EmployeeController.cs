using System;
using System.Threading.Tasks;
using DbSwapPOC.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DbSwapPOC.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository employeeRepository;

        public EmployeeController(ILogger<EmployeeController> logger, IEmployeeRepository employeeRepository)
        {
            Logger = logger;
            this.employeeRepository = employeeRepository;
        }

        public ILogger<EmployeeController> Logger { get; }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetEmployeesAsync() 
        {
            try 
            {
                var employees = await employeeRepository.GetEmployeesAsync();
                return Ok(employees);
            } catch (Exception e) 
            {
                Logger.LogError(e.Message);
                return StatusCode(500);
            }
        }
    }
}