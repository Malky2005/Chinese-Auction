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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ICategoryService categoryService, IMapper mapper, ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _mapper = mapper;
            this._logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> Get()
        {
            try
            {
                var categories = await _categoryService.Get();
                return Ok(categories);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "An unexpected error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            try
            {
                _logger.LogInformation($"get by id: id: {id}");
                var category = await _categoryService.Get(id);
                return Ok(category);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "An unexpected error");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Post([FromBody] CategoryDto categoryDto)
        {
            try
            {
                _logger.LogInformation($"category name: {categoryDto.Name}");
                var category = _mapper.Map<Category>(categoryDto);
                var duplicate = await _categoryService.NameExist(category.Name);
                if (duplicate)
                {
                    return Conflict($"Category with name {category.Name} already exists.");
                }

                await _categoryService.Add(category);
                return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogWarning(ex, ex.Message);
                return BadRequest(ex.Message); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500, "An unexpected error");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryDto categoryDto)
        {
            try
            {
                _logger.LogInformation($"put: category name: {categoryDto.Name}");
                var category = _mapper.Map<Category>(categoryDto);
                var existingCategory = await _categoryService.Get(id);
                if (existingCategory == null)
                {
                    return NotFound($"Category with ID {id} not found.");
                }

                var duplicate = await _categoryService.NameExist(category.Name);
                if (duplicate)
                {
                    return Conflict($"Category with name {category.Name} already exists.");
                }

                await _categoryService.Update(id, category);
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
                return StatusCode(500, "An unexpected error");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _logger.LogInformation($"delete id: {id}");
                await _categoryService.Delete(id);
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
                return StatusCode(500, "An unexpected error");
            }
        }
    }
}