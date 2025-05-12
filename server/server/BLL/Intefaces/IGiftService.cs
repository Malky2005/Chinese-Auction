using server.Models;

namespace server.BLL.Intefaces
{
    public interface IGiftService
    {
        Task<List<Gift>> GetAllGiftsAsync();
        Task<Gift> GetGiftByIdAsync(int id);
        Task AddGiftAsync(Gift gift);
        Task UpdateGiftAsync(Gift gift);
        Task<bool> DeleteGiftAsync(int id);
        Task<Donor> GetGiftDonorAsync(int giftId);
        Task<List<Gift>> SearchGiftsAsync(string giftName, string donorName, int buyerCount);
    }
}
