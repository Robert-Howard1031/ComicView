using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ComicViewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("secure")]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok("You accessed a secure endpoint!");
        }
    }
}
