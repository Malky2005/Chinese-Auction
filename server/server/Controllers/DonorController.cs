using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.BLL.Intefaces;
using server.DAL;
using server.Models;
using server.Models.DTO;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService _donorService;
        private readonly IMapper _mapper;
        private readonly ILogger<DonorController> _logger;

        public DonorController(IDonorService donorService, IMapper mapper, ILogger<DonorController> logger)
        {
            _donorService = donorService;
            _mapper = mapper;
            _logger = logger;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var donors = await _donorService.Get();
                return Ok(donors);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                _logger.LogInformation($"get by id: {id}");
                var donor = await _donorService.Get(id);
                return Ok(donor);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogError(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Add([FromBody] DonorDto donorDto)
        {
            try
            {
                _logger.LogInformation($"post: {donorDto.Name}, {donorDto.Email}");
                if (donorDto == null )
                {
                    return BadRequest("Donor data cannot be null.");
                }

                var donor = _mapper.Map<Donor>(donorDto);
                await _donorService.Add(donor);
                return CreatedAtAction(nameof(Get), new { id = donor.Id }, donor);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] DonorDto donorDto)
        {
            try
            {
                _logger.LogInformation($"update: {id}, {donorDto.Name}, {donorDto.Email}");
                if (donorDto == null )
                {
                    return BadRequest("Donor data cannot be null.");
                }

                var existingDonor = await _donorService.Get(id);
                if (existingDonor == null)
                {
                    return NotFound($"Donor with ID {id} not found.");
                }

                await _donorService.Update(id, donorDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                _logger.LogInformation($"delete id: {id}");
                var existingDonor = await _donorService.Get(id);
                if (existingDonor == null)
                {
                    return NotFound($"Donor with ID {id} not found.");
                }

                await _donorService.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }

        [HttpGet("search")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Search(string name = null, string email = null, string giftName = null)
        {
            //_logger.LogInformation($"search: name: {name}, email:{email}, gift name:{giftName}");
            try
            {
                var donors = await _donorService.Search(name, email, giftName);
                return Ok(donors);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }
    }
}
