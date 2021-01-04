using System.Data.Common;
using System;
using DbSwapPOC.API.DTOs;
using DbSwapPOC.API.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace DbSwapPOC.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : ControllerBase
    {
    private readonly IConfiguration configuration;

        public StatusController(IConfiguration configuration) {
            this.configuration = configuration;
        }        

        [HttpGet]
        [Route("database")]
        public IActionResult GetCurrentDatabase() {
            var dbType = Enum.GetName(AppSettings.CurrentDatabaseType);
            
            return Ok(new { 
                dbType, 
                dbServer = Settings.AppSettings.CurrentDatabaseServer, 
                dbName = Settings.AppSettings.CurrentDatabaseName });
        }

        [HttpPost]
        [Route("database")]
        public IActionResult SetCurrentDatabase([FromBody]SetCurrentDatabaseDTO model) {

            switch (model.DatabaseType) {
                case nameof(Settings.SupportedDatabases.SQL_SERVER):
                    var sqlBuilder = new SqlConnectionStringBuilder(configuration.GetConnectionString("SqlConnection"));
                    Settings.AppSettings.CurrentDatabaseType = Settings.SupportedDatabases.SQL_SERVER;
                    Settings.AppSettings.CurrentDatabaseServer = sqlBuilder.DataSource;
                    Settings.AppSettings.CurrentDatabaseName = sqlBuilder.InitialCatalog;
                    break;

                case nameof(Settings.SupportedDatabases.POSTGRES):
                    var pgBuilder = new NpgsqlConnectionStringBuilder(configuration.GetConnectionString("PostgresConnection"));
                    Settings.AppSettings.CurrentDatabaseType = Settings.SupportedDatabases.POSTGRES;
                    Settings.AppSettings.CurrentDatabaseServer = pgBuilder.Host;
                    Settings.AppSettings.CurrentDatabaseName = pgBuilder.Database;
                    break;
                default:
                    return StatusCode(400);
            }

            var dbType = Enum.GetName(Settings.AppSettings.CurrentDatabaseType);

            return Ok(new { 
                dbType, 
                dbServer = Settings.AppSettings.CurrentDatabaseServer, 
                dbName = Settings.AppSettings.CurrentDatabaseName });
        }

    }
}