using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using ComicViewAPI.Data;
using ComicViewAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ComicViewAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController(ApplicationDbContext db, IConfiguration config) : ControllerBase
  {
    public record RegisterDto(string Username, string Password);
    public record LoginDto(string Username, string Password);

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
      if (await db.Users.AnyAsync(u => u.Username == dto.Username))
        return BadRequest("Username already exists.");

      db.Users.Add(new User
      {
        Username = dto.Username,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
      });
      await db.SaveChangesAsync();
      return Ok(new { message = "Registered" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
      var user = await db.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
      if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        return Unauthorized("Invalid credentials.");

      var token = GenerateJwt(user, config);
      return Ok(new { token });
    }

    private static string GenerateJwt(User user, IConfiguration config)
    {
      var claims = new[]
      {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
          issuer: config["Jwt:Issuer"],
          audience: config["Jwt:Audience"],
          claims: claims,
          expires: DateTime.UtcNow.AddMinutes(
              double.TryParse(config["Jwt:ExpireMinutes"], out var m) ? m : 60),
          signingCredentials: creds);

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
