using System.Text;
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using DbSwapPOC.API.Settings;
using DbSwapPOC.API.Contexts;
using DbSwapPOC.API.Models;
using DbSwapPOC.API.Services;

namespace DbSwapPOC.API
{
    public class Startup
    {
        private string JWT_SIGNING_KEY; 
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            JWT_SIGNING_KEY = Configuration.GetSection("Authentication")?.GetValue<string>("JWT_SIGNING_KEY");
            if (JWT_SIGNING_KEY == null) throw new Exception("JWT_SIGNING_KEY has not been set");
            AppSettings.JWT_SIGNING_KEY = JWT_SIGNING_KEY;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DbSwapPOC.API", Version = "v1" });
            });

            
            /* Authentication */
            services.AddDbContext<IdentityContext>();
            services.AddIdentity<User, IdentityRole>()
                    .AddEntityFrameworkStores<IdentityContext>()
                    .AddDefaultTokenProviders(); 

            services.Configure<IdentityOptions>(options => {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });

            services.AddAuthentication(x => {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x => {
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(UTF8Encoding.UTF8.GetBytes(JWT_SIGNING_KEY)),
                    ValidateIssuer = true,
                    ValidateAudience = true
                };
            });


            services.AddTransient<AuthService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DbSwapPOC.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
