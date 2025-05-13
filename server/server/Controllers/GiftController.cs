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
        public async Task<IActionResult> Get()
        {
            var gifts = await _giftService.Get();
            return Ok(gifts);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var gift = await _giftService.Get(id);
            if (gift == null)
            {
                return NotFound();
            }
            return Ok(gift);
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] GiftDto giftDto)
        {
            if (giftDto == null)
            {
                return BadRequest();
            }
            var existingGift = await _giftService.TitleExists(giftDto.GiftName);
            if (existingGift)
            {
                return Conflict("Gift with this name already exists.");
            }
            var gift = _mapper.Map<Gift>(giftDto);
            await _giftService.Add(gift);
            return CreatedAtAction(nameof(Get), new { id = gift.Id }, gift);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GiftDto giftDto)
        {
            if (giftDto == null)
            {
                return BadRequest();
            }
            var existingGift = await _giftService.Get(id);
            if (existingGift == null)
            {
                return NotFound();
            }
            var existingGiftWithSameName = await _giftService.TitleExists(giftDto.GiftName);
            if (existingGiftWithSameName && existingGift.GiftName != giftDto.GiftName)
            {
                return Conflict("Gift with this name already exists.");
            }
            await _giftService.Update(id, giftDto);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _giftService.Delete(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search(string giftName = null, string donorName = null, int? buyerCount = null)
        {
            var gifts = await _giftService.Search(giftName, donorName, buyerCount);
            return Ok(gifts);
        }
        [HttpGet("donor/{giftId}")]
        public async Task<IActionResult> GetDonor(int giftId)
        {
            var donor = await _giftService.GetDonor(giftId);
            if (donor == null)
            {
                return NotFound();
            }
            return Ok(donor);
        }
        [HttpGet("sort/price")]
        public async Task<IActionResult> SortByPrice()
        {
            var gifts = await _giftService.SortByPrice();
            return Ok(gifts);
        }
        [HttpGet("sort/category")]
        public async Task<IActionResult> SortByCategory()
        {
            var gifts = await _giftService.SortByCategory();
            return Ok(gifts);
        }


    }
}
