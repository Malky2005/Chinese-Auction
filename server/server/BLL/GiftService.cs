using server.BLL.Intefaces;
using server.DAL.intefaces;
using server.Models;
using server.Models.DTO;

namespace server.BLL
{
    public class GiftService : IGiftService
    {
        private readonly IGiftDal _giftDal;

        public GiftService(IGiftDal giftRepository)
        {
            _giftDal = giftRepository;
        }
        public async Task<List<GiftDtoResult>> Get()
        {
            return await _giftDal.Get();
        }
        public async Task<GiftDtoResult> Get(int id)
        {
            return await _giftDal.Get(id);
        }
        public async Task Add(Gift gift)
        {
            await _giftDal.Add(gift);
        }
        public async Task Update(int id, GiftDto gift)
        {
            await _giftDal.Update(id, gift);
        }
        public async Task<bool> Delete(int id)
        {
            return await _giftDal.Delete(id);
        }
        public async Task<List<GiftDtoResult>> Search(string giftName = null, string donorName = null, int? buyerCount = null)
        {
            return await _giftDal.Search(giftName, donorName, buyerCount);
        }
        public async Task<DonorDtoResult> GetDonor(int giftId)
        {
            return await _giftDal.GetDonor(giftId);
        }
        public async Task<bool> TitleExists(string title)
        {
            return await _giftDal.TitleExists(title);
        }
        public async Task<List<GiftDtoResult>> SortByPrice()
        {
            return await _giftDal.SortByPrice();
        }
        public async Task<List<GiftDtoResult>> SortByCategory()
        {
            return await _giftDal.SortByCategory();
        }

    }
}
