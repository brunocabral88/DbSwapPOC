using DbSwapPOC.API.ModelConfigurers;
using DbSwapPOC.API.Settings;

namespace DbSwapPOC.API.Factories
{
    public interface IModelCreatorFactory
    {
         IModelConfigurer GetInstance(SupportedDatabases databaseType);
    }
}