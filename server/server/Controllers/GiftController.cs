﻿using AutoMapper;
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
    public class GiftsController : ControllerBase
    {
        private readonly IGiftService _giftService;
        private readonly IMapper _mapper;
        private readonly ILogger<GiftsController> _logger;

        public GiftsController(IGiftService giftService, IMapper mapper, ILogger<GiftsController> logger)
        {
            _giftService = giftService;
            _mapper = mapper;
            _logger = logger;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var gifts = await _giftService.Get();
                return Ok(gifts);
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

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                _logger.LogInformation($"get by id: {id}");
                var gift = await _giftService.Get(id);
                return Ok(gift);
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

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Add([FromBody] GiftDto giftDto)
        {
            try
            {
                _logger.LogInformation($"add gift: {giftDto.GiftName}, {giftDto.Price}, category id: {giftDto.CategoryId}");
                if (giftDto == null || giftDto.CategoryId == 0 || giftDto.DonorId == 0 || giftDto.GiftName == null)
                {
                    return BadRequest("Gift data cannot be null.");
                }
                if (giftDto.Price < 10 || giftDto.Price > 100)
                {
                    return BadRequest("Price must be between 10 and 100.");
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
            catch(InvalidDataException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(ex.Message); 
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Conflict(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "server error");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] GiftDto giftDto)
        {
            try
            {
                _logger.LogInformation($"update gift {id}: {giftDto.GiftName}, {giftDto.Price}, category id: {giftDto.CategoryId}");
                if (giftDto == null || giftDto.CategoryId == 0 || giftDto.DonorId == 0 || giftDto.GiftName == null )
                {
                    return BadRequest("Gift data cannot be null.");
                }
                if(giftDto.Price < 10 || giftDto.Price>100)
                {
                    return BadRequest("Price must be between 10 and 100.");
                }

                var existingGift = await _giftService.Get(id);
                if (existingGift == null)
                {
                    return NotFound($"Gift with ID {id} not found.");
                }

                var existingGiftWithSameName = await _giftService.TitleExists(giftDto.GiftName);
                if (existingGiftWithSameName && existingGift.GiftName != giftDto.GiftName)
                {
                    return Conflict("Gift with this name already exists.");
                }

                await _giftService.Update(id, giftDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return Conflict(ex.Message); 
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
                _logger.LogInformation($"delete gift: {id}");
                var result = await _giftService.Delete(id);
                if (!result)
                {
                    return NotFound($"Gift with ID {id} not found.");
                }
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
        public async Task<IActionResult> Search(string giftName = null, string donorName = null, int? buyerCount = null)
        {
            try
            {
                _logger.LogInformation($"search: giftName: {giftName}, donorName: {donorName}, buyerCount: {buyerCount}");
                var gifts = await _giftService.Search(giftName, donorName, buyerCount);
                return Ok(gifts);
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

        [HttpGet("donor/{giftId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDonor(int giftId)
        {
            try
            {
                _logger.LogInformation($"get donor for gift: {giftId}");
                var donor = await _giftService.GetDonor(giftId);
                return Ok(donor);
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

        [HttpGet("sort/price")]
        public async Task<IActionResult> SortByPrice()
        {
            try
            {
                var gifts = await _giftService.SortByPrice();
                return Ok(gifts);
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

        [HttpGet("sort/category")]
        public async Task<IActionResult> SortByCategory()
        {
            try
            {
                var gifts = await _giftService.SortByCategory();
                return Ok(gifts);
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

        [HttpPut("raffle/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Raffle(int id)
        {
            try
            {
                _logger.LogInformation($"raffle gift: {id}");
                await _giftService.raffle(id);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (InvalidOperationException ex)
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
    }
}
