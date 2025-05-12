using Microsoft.EntityFrameworkCore;
using server.DAL.intefaces;
using server.Models;

namespace server.DAL
{
    public class CategoryDal : ICategoryDal
    {
        private readonly AppDbContext _context;

        public CategoryDal(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Category>> Get()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> Get(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<bool> NameExist(string name)
        {
            return await _context.Categories.AnyAsync(c => c.Name == name);
        }

        public async Task Update(int id, Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory != null)
            {
                existingCategory.Name = category.Name;
                _context.Categories.Update(existingCategory);
                await _context.SaveChangesAsync();
            }
        }
    }
}
