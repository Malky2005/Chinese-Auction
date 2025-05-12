using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.BLL;
using server.BLL.Intefaces;
using server.Models;
using server.Models.DTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            this._categoryService = categoryService;
            this._mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<List<Category>>> Get()
        {
            try
            {
                List<Category> categories = await _categoryService.Get();
                return Ok(categories);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            try
            {
                Category category = await _categoryService.Get(id);
                if (category != null)
                    return Ok(category);
                else
                    return NotFound("id doesn't exist");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryDto categoryDto)
        {
            Category category = _mapper.Map<Category>(categoryDto);
            try
            {
                var duplicate = await _categoryService.NameExist(category.Name);
                if(duplicate)
                {
                    return Conflict($"Gift whith name {category.Name} exists");
                }
                await _categoryService.Add(category);
                return Created();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryDto categoryDto)
        {
            Category category = _mapper.Map<Category>(categoryDto);
            try
            {
                Category existCategory = await _categoryService.Get(id);
                if (existCategory == null)
                    return NotFound("id doesn't exist");
                var duplicate = await _categoryService.NameExist(category.Name);
                if (duplicate)
                {
                    return Conflict($"Gift whith name {category.Name} exists");
                }

                await _categoryService.Update(id, category);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _categoryService.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
