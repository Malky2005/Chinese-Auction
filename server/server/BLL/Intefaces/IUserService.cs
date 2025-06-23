using server.Models;
using server.Models.DTO;

namespace server.BLL.Intefaces
{
    public interface IUserService
    {
        Task<TokenResultDto> Login(string username, string password);
        Task Register(User user);
        Task<bool> UsernameExist(string username);
    }
}
