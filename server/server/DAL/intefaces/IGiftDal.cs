using server.Models;

namespace server.DAL.intefaces
{
    public interface IGiftDal
    {
        Task<List<Gift>> Get();
        Task<Gift> Get(int id);
        Task Add(Gift gift);
        Task Update(Gift gift);
        Task<bool> Delete(int id);
        Task<List<Gift>> Search(string giftName = "", string donorName = "", int buyerCount = 0);
        Task<Donor> GetDonor(int giftId);
        public Task<bool> TitleExists(string title);
        public Task<List<Gift>> SortByPrice();
        public Task<List<Gift>> SortByName();
    }
}
