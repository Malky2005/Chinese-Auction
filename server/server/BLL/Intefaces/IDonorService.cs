using server.DAL.intefaces;
using server.Models.DTO;
using server.Models;

namespace server.BLL.Intefaces
{
    public interface IDonorService
    {
        public Task<List<DonorDtoResult>> Get();
        public Task<DonorDtoResult> Get(int id);
        public Task Add(Donor donor);
        public Task Update(int id, DonorDto donorDto);
        public Task Delete(int id);
        public Task<List<DonorDtoResult>> Search(string name = null, string email = null, string giftName = null);
    }
}
