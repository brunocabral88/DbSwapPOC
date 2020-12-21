using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbSwapPOC.API.DTOs;
using DbSwapPOC.API.Models;
using DbSwapPOC.API.Services;
using DbSwapPOC.API.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DbSwapPOC.API.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly ILogger<AuthController> logger;
    private readonly AuthService authService;

    public AuthController(ILogger<AuthController> logger, AuthService authService)
    {
      this.authService = authService;
      this.logger = logger;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(new { errors = "Invalid data entered. Please check email and password values provided" });
      }

      var user = new User { Email = model.Email.ToLower(), UserName = model.Email.ToLower() };

      var result = await authService.CreateUserAsync(user, model.Password);

      if (result.Errors.Any())
      {
        return BadRequest(new { errors = result.Errors.ToArray() });
      }

      var token = TokenService.CreateToken(user);

      return Ok(new { token });

    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginPostDTO model)
    {

      if (!ModelState.IsValid)
      {
        return BadRequest(new ApiError("Username or password not provided"));
      }

      var user = await authService.AuthenticateAsync(model.Email, model.Password);

      if (user == null)
      {
        return BadRequest(new ApiError("Username or password incorrect"));
      }

      var token = TokenService.CreateToken(user);

      return Ok(new { token });

    }
  }
}