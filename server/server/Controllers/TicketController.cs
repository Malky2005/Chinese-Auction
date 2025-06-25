using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.BLL.Intefaces;
using server.DAL.intefaces;
using server.Models;
using server.Models.DTO;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        private readonly IMapper _mapper;
        private readonly IUserDal _userDal;
        private readonly ILogger<TicketController> _logger;

        public TicketController(ITicketService ticketService, IMapper mapper, IUserDal userDal, ILogger<TicketController> logger)
        {
            this._ticketService = ticketService;
            this._mapper = mapper;
            this._userDal = userDal;
            this._logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tickets = await _ticketService.Get();
                return Ok(tickets);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error occurred." });
            }
        }

        [HttpGet("paid")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetByUserPaid()
        {
            try
            {
                //log in dal
                var tickets = await _ticketService.GetByUserPaid();
                return Ok(tickets);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error" });
            }
        }

        [HttpGet("pending")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetByUserPending()
        {
            try
            {
                //log in dal
                var tickets = await _ticketService.GetByUserPending();
                return Ok(tickets);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error" });
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                _logger.LogInformation($"get by id: {id}");
                var ticket = await _ticketService.Get(id);
                return Ok(ticket);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error" });
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody] TicketDto ticketDto)
        {
            try
            {
                var ticket = _mapper.Map<Ticket>(ticketDto);
                var user = await _userDal.GetUserFromToken();
                _logger.LogInformation($"order ticket by user: {user.Id} ticket info: gift id {ticketDto.GiftId}");
                ticket.UserId = user.Id;
                await _ticketService.Add(ticket);
                return CreatedAtAction(nameof(Get), new { id = ticket.Id }, ticket);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidDataException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error" });
            }
        }

        [HttpPut("pay/{id}")]
        [Authorize]
        public async Task<IActionResult> Pay(int id)
        {
            try
            {
                _logger.LogInformation($"pay ticket {id}");
                await _ticketService.pay(id);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error" });
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                _logger.LogInformation($"delete ticket: {id}");
                await _ticketService.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error occurred." });
            }
        }
        [HttpGet("byGift/{giftId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByGiftId(int giftId)
        {
            try
            {
                _logger.LogInformation($"get tickets by gift id: {giftId}");
                var tickets = await _ticketService.GetByGiftId(giftId);
                return Ok(tickets);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Unauthorized(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, new { message = "An unexpected error occurred." });
            }
        }

    }
}
