using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.DAL.intefaces;
using server.Models;
using server.Models.DTO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace server.DAL
{
    public class GiftDal:IGiftDal
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GiftDal(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<GiftDtoResult>> Get()
        {
            var gifts = await _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .Include(g => g.Tickets)
                .Include(g => g.Winner)
                .ToListAsync();
            return _mapper.Map<List<GiftDtoResult>>(gifts);
        }
        public async Task<GiftDtoResult> Get(int id)
        {
            var gift = await _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .Include(g => g.Tickets)
                .Include(g => g.Winner)
                .FirstOrDefaultAsync(g => g.Id == id);
            return _mapper.Map<GiftDtoResult>(gift);
        }
        public async Task Add(Gift gift)
        {
            await _context.Gifts.AddAsync(gift);
            await _context.SaveChangesAsync();
        }
        public async Task Update(int id, GiftDto gift)
        {
            var existingGift = await _context.Gifts.FindAsync(id);
            if (existingGift == null) return;
            existingGift.GiftName = gift.GiftName;
            existingGift.Details = gift.Details;
            existingGift.Price = gift.Price;
            existingGift.CategoryId = gift.CategoryId;
            existingGift.DonorId = gift.DonorId;
            existingGift.WinnerId = gift.WinnerId;
            existingGift.ImageUrl = gift.ImageUrl;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> Delete(int id)
        {
            var gift = await _context.Gifts.FindAsync(id);
            if (gift == null) return false;
            _context.Gifts.Remove(gift);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<GiftDtoResult>> Search(string giftName = null, string donorName = null, int? buyerCount = null)
        {
            var query = _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .Include(g => g.Tickets)
                .Include(g => g.Winner)
                .AsQueryable();

            if (!string.IsNullOrEmpty(giftName))
            {
                query = query.Where(g => g.GiftName.Contains(giftName));
            }

            if (!string.IsNullOrEmpty(donorName))
            {
                query = query.Where(g => g.Donor.Name.Contains(donorName));
            }

            if (buyerCount.HasValue)
            {
                query = query.Where(g => g.Tickets.Count == buyerCount);
            }
            var gifts = await query.ToListAsync();
            var giftsDtos = _mapper.Map<List<GiftDtoResult>>(gifts);
            return giftsDtos;
        }
        public async Task<DonorDtoResult> GetDonor(int giftId)
        {
            var gift = await _context.Gifts
                .Include(g => g.Donor)
                .FirstOrDefaultAsync(g => g.Id == giftId);
            if (gift == null) return null;
            var donorDto = _mapper.Map<DonorDtoResult>(gift.Donor);
            return donorDto;
        }
        public async Task<bool> TitleExists(string title)
        {
            return await _context.Gifts.AnyAsync(g => g.GiftName == title);
        }
        public async Task<List<GiftDtoResult>> SortByPrice()
        {
            var gifts = await _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .Include(g => g.Tickets)
                .Include(g => g.Winner)
                .OrderBy(g => g.Price)
                .ToListAsync();
            return _mapper.Map<List<GiftDtoResult>>(gifts);
        }
        public async Task<List<GiftDtoResult>> SortByCategory()
        {
            var gifts = await _context.Gifts
                .Include(g => g.Category)
                .Include(g => g.Donor)
                .Include(g => g.Tickets)
                .Include(g => g.Winner)
                .OrderBy(g => g.Category.Name)
                .ToListAsync();
            return _mapper.Map<List<GiftDtoResult>>(gifts);
        }
    }
}
