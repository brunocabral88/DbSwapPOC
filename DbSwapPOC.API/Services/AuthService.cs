using System;
using System.Threading.Tasks;
using DbSwapPOC.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DbSwapPOC.API.Services
{
  public class AuthService
  {
    private readonly UserManager<User> userManager;
    public AuthService(UserManager<User> userManager)
    {
      this.userManager = userManager;
    }

    public async Task<IdentityResult> CreateUserAsync(User user, string password) {

        var result = await userManager.CreateAsync(user, password);

        return result;
    }

    public async Task<User> AuthenticateAsync(string email, string password)
    {
      var user = await userManager.FindByEmailAsync(email);

      if (user == null) return null;

      var authResult = await userManager.CheckPasswordAsync(user, password);

      if (authResult) {
          user.PasswordHash = null;
          return user;
      }

      return null;
    }
  }
}