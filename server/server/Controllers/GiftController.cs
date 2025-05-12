using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Models.DTO;
using server.Models;
using server.BLL.Intefaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        private readonly IGiftService _giftService;
        private readonly IMapper _mapper;

        public GiftsController(IGiftService giftService, IMapper mapper)
        {
            _giftService = giftService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGifts()
        {
            var gifts = await _giftService.GetAllGiftsAsync();

            var giftDtos = _mapper.Map<IEnumerable<GiftDto>>(gifts);

            return Ok(giftDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGiftById(int id)
        {
            var gift = await _giftService.GetGiftByIdAsync(id);
            if (gift == null)
                return NotFound();

            var giftDto = _mapper.Map<GiftDto>(gift);

            return Ok(giftDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddGift([FromBody] GiftDto giftDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var gift = _mapper.Map<Gift>(giftDto);

            await _giftService.AddGiftAsync(gift);

            return CreatedAtAction(nameof(GetGiftById), new { id = gift.Id }, gift);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGift(int id, [FromBody] GiftDto giftDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingGift = await _giftService.GetGiftByIdAsync(id);
            if (existingGift == null)
                return NotFound();

            _mapper.Map(giftDto, existingGift);

            await _giftService.UpdateGiftAsync(existingGift);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGift(int id)
        {
            var success = await _giftService.DeleteGiftAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpGet("{id}/donor")]
        public async Task<IActionResult> GetGiftDonor(int id)
        {
            var donor = await _giftService.GetGiftDonorAsync(id);
            if (donor == null)
                return NotFound();

            return Ok(donor);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchGifts([FromQuery] string giftName, [FromQuery] string donorName, [FromQuery] int buyerCount)
        {
            var gifts = await _giftService.SearchGiftsAsync(giftName, donorName, buyerCount);
            return Ok(gifts);
        }

    }
}
