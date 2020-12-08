using System;
using DbSwapPOC.API.Settings;
using Microsoft.AspNetCore.Mvc;

namespace DbSwapPOC.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : ControllerBase
    {
        

        [HttpGet]
        [Route("database")]
        public IActionResult GetCurrentDatabase() {
            var database = Enum.GetName(AppSettings.CurrentDatabase);
            return Ok(database);
        }

    }
}