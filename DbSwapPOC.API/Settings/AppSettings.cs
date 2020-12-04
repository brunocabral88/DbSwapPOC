namespace DbSwapPOC.API.Settings
{
    public static class AppSettings
    {
        public static SupportedDatabases CurrentDatabase = SupportedDatabases.SQL_SERVER;
        public static string JWT_SIGNING_KEY;
    }

    public enum SupportedDatabases {
        SQL_SERVER,
        POSTGRES
    }
}