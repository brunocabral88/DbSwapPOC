using Microsoft.EntityFrameworkCore;

namespace DbSwapPOC.API.ModelConfigurers
{
    public interface IModelConfigurer
    {
         void Configure(ModelBuilder modelBuilder);
    }
}