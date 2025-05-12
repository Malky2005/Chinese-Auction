using Microsoft.EntityFrameworkCore;
using server.DAL.intefaces;
using server.Models;

namespace server.DAL
{
    public class GiftDal:IGiftDal
    {
        private readonly AppDbContext _context;

        public GiftDal(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Gift>> Get()
        {
            return await _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .ToListAsync();
        }

        public async Task<Gift> Get(int id)
        {
            return await _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task Add(Gift gift)
        {
            _context.Gifts.Add(gift);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Gift gift)
        {
            _context.Gifts.Update(gift);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Delete(int id)
        {
            var gift = await _context.Gifts.FindAsync(id);
            if (gift != null)
            {
                _context.Gifts.Remove(gift);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<Donor> GetDonor(int giftId)
        {
            var gift = await _context.Gifts
                .Include(g => g.Donor)
                .FirstOrDefaultAsync(g => g.Id == giftId);

            return gift?.Donor;
        }

        public async Task<List<Gift>> Search(string giftName, string donorName, int buyerCount)
        {
            var query = _context.Gifts
                .Include(g => g.Donor)
                .AsQueryable();

            if (!string.IsNullOrEmpty(giftName))
                query = query.Where(g => g.GiftName.Contains(giftName));

            if (!string.IsNullOrEmpty(donorName))
                query = query.Where(g => g.Donor.Name.Contains(donorName));

            //if (buyerCount.HasValue)
            //{
            //    query = query.Where(g => _context.Tickets
            //        .Where(p => p.GiftId == g.Id)
            //        .Count(p=> p.Id == g.Id)
            //}

            return await query.ToListAsync();
        }

        public Task<bool> TitleExists(string title)
        {
            throw new NotImplementedException();
        }

        public Task<List<Gift>> SortByPrice()
        {
            throw new NotImplementedException();
        }

        public Task<List<Gift>> SortByName()
        {
            throw new NotImplementedException();
        }
    }
}
