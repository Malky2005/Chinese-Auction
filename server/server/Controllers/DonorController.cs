using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.BLL.Intefaces;
using server.Models.DTO;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService _donorService;
        private readonly IMapper _mapper;
        public DonorController(IDonorService donorService, IMapper mapper)
        {
            _donorService = donorService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var donors = await _donorService.Get();
            return Ok(donors);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var donor = await _donorService.Get(id);
            if (donor == null)
            {
                return NotFound();
            }
            return Ok(donor);
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] DonorDto donorDto)
        {
            if (donorDto == null)
            {
                return BadRequest();
            }
            var donor = _mapper.Map<Donor>(donorDto);
            await _donorService.Add(donor);
            return CreatedAtAction(nameof(Get), new { id = donor.Id }, donor);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DonorDto donorDto)
        {
            if (donorDto == null)
            {
                return BadRequest();
            }
            var existingDonor = await _donorService.Get(id);
            if (existingDonor == null)
            {
                return NotFound();
            }
            var donor = _mapper.Map<Donor>(donorDto);
            await _donorService.Update(id, donorDto);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingDonor = await _donorService.Get(id);
            if (existingDonor == null)
            {
                return NotFound();
            }
            await _donorService.Delete(id);
            return NoContent();
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search(string name = null, string email = null, string giftName = null)
        {
            var donors = await _donorService.Search(name, email, giftName);
            return Ok(donors);
        }
    }
}
