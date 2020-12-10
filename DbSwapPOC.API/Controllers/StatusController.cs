using System;
using DbSwapPOC.API.DTOs;
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

        [HttpPost]
        [Route("database")]
        public IActionResult SetCurrentDatabase([FromBody]SetCurrentDatabaseDTO model) {

            switch (model.DatabaseType) {
                case nameof(Settings.SupportedDatabases.SQL_SERVER):
                    Settings.AppSettings.CurrentDatabase = Settings.SupportedDatabases.SQL_SERVER;
                    break;
                case nameof(Settings.SupportedDatabases.POSTGRES):
                    Settings.AppSettings.CurrentDatabase = Settings.SupportedDatabases.POSTGRES;
                    break;
                default:
                    return StatusCode(400);
            }

            var dbName = Enum.GetName(Settings.AppSettings.CurrentDatabase);
            return Ok(dbName);
        }

    }
}