using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.BLL.Intefaces;
using server.Models;
using server.Models.DTO;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService, IMapper mapper, ILogger<UserController> logger)
        {
            _userService = userService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                _logger.LogInformation($"login username: {loginDto.Username}");
                var token = await _userService.Login(loginDto.Username, loginDto.Password);
                return Ok(token);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "An unexpected error");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                _logger.LogInformation($"register: {registerDto.Fullname}, {registerDto.Username}, {registerDto.Email}");
                var user = _mapper.Map<User>(registerDto);

                await _userService.Register(user);
                return Ok("User registered successfully.");
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "An unexpected error");
            }
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> UsernameExist(string username)
        {
            try
            {
                _logger.LogInformation($"username exist?: {username}");
                return Ok(await _userService.UsernameExist(username));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "An unexpected error");
            }

        }
    }
}
