using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DbSwapPOC.API.Extensions
{
    public static class DbSettingsExtensions
    {
        public static IApplicationBuilder UseDatabaseDefaults(this IApplicationBuilder app, IConfiguration configuration) {

            var sqlBuilder = new SqlConnectionStringBuilder(configuration.GetConnectionString("SqlConnection"));
            Settings.AppSettings.CurrentDatabaseServer = sqlBuilder.DataSource;
            Settings.AppSettings.CurrentDatabaseName = sqlBuilder.InitialCatalog;

            return app;
        }
    }
}