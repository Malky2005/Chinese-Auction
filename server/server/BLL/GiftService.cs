using server.BLL.Intefaces;
using server.DAL.intefaces;
using server.Models;

namespace server.BLL
{
    public class GiftService : IGiftService
    {
        private readonly IGiftDal _giftDal;

        public GiftService(IGiftDal giftRepository)
        {
            _giftDal = giftRepository;
        }

        public async Task<List<Gift>> GetAllGiftsAsync()
        {
            return await _giftDal.Get();
        }

        public async Task<Gift> GetGiftByIdAsync(int id)
        {
            return await _giftDal.Get(id);
        }

        public async Task AddGiftAsync(Gift gift)
        {
            await _giftDal.Add(gift);
        }

        public async Task UpdateGiftAsync(Gift gift)
        {
            await _giftDal.Update(gift);
        }

        public async Task<bool> DeleteGiftAsync(int id)
        {
            return await _giftDal.Delete(id);
        }

        public async Task<Donor> GetGiftDonorAsync(int giftId)
        {
            return await _giftDal.GetDonor(giftId);
        }

        public async Task<List<Gift>> SearchGiftsAsync(string giftName, string donorName, int buyerCount)
        {
            return await _giftDal.Search(giftName, donorName, buyerCount);
        }

    }
}
