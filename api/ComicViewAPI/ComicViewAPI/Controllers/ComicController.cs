using System.Security.Claims;
using ComicViewAPI.Data;
using ComicViewAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComicViewAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class ComicsController(ApplicationDbContext db) : ControllerBase
  {
    private int GetUserId()
    {
      var idStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (string.IsNullOrWhiteSpace(idStr)) throw new UnauthorizedAccessException("Missing user id claim.");
      return int.Parse(idStr);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comic>>> GetMyComics()
    {
      var uid = GetUserId();
      var list = await db.Comics
          .Where(c => c.OwnerUserId == uid)
          .OrderBy(c => c.Title)
          .ToListAsync();
      return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Comic>> GetOne(int id)
    {
      var uid = GetUserId();
      var comic = await db.Comics.FirstOrDefaultAsync(c => c.Id == id && c.OwnerUserId == uid);
      return comic is null ? NotFound() : Ok(comic);
    }

    [HttpPost]
    public async Task<ActionResult<Comic>> Create([FromBody] Comic dto)
    {
      var uid = GetUserId();
      dto.OwnerUserId = uid;
      dto.PurchaseDate = DateTime.SpecifyKind(dto.PurchaseDate, DateTimeKind.Utc);

      db.Comics.Add(dto);
      await db.SaveChangesAsync();
      return CreatedAtAction(nameof(GetOne), new { id = dto.Id }, dto);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Comic dto)
    {
      var uid = GetUserId();
      var comic = await db.Comics.FirstOrDefaultAsync(c => c.Id == id && c.OwnerUserId == uid);
      if (comic is null) return NotFound();

      comic.Title = dto.Title;
      comic.IssueNumber = dto.IssueNumber;
      comic.Publisher = dto.Publisher;
      comic.PurchasePrice = dto.PurchasePrice;
      comic.CurrentPrice = dto.CurrentPrice;
      comic.PurchaseDate = DateTime.SpecifyKind(dto.PurchaseDate, DateTimeKind.Utc);

      await db.SaveChangesAsync();
      return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      var uid = GetUserId();
      var comic = await db.Comics.FirstOrDefaultAsync(c => c.Id == id && c.OwnerUserId == uid);
      if (comic is null) return NotFound();

      db.Remove(comic);
      await db.SaveChangesAsync();
      return NoContent();
    }
  }
}
