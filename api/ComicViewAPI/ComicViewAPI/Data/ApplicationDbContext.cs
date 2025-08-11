using Microsoft.EntityFrameworkCore;
using ComicViewAPI.Models;

namespace ComicViewAPI.Data
{
  public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
  {
    public DbSet<User> Users => Set<User>();
    public DbSet<Comic> Comics => Set<Comic>();
  }
}
