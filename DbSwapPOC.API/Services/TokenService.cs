using System.Text;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DbSwapPOC.API.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using DbSwapPOC.API.Models;

namespace DbSwapPOC.API.Services
{
    public static class TokenService
    {
        private const int EXPIRE_HOURS = 1; 
        public static string CreateToken(User user) {
            var key = Encoding.UTF8.GetBytes(AppSettings.JWT_SIGNING_KEY);
            var tokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor 
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, "User")
                }),
                Expires = DateTime.UtcNow.AddHours(EXPIRE_HOURS),
                SigningCredentials = 
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(descriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}