using server.Models.DTO;
using server.Models;
using AutoMapper;


namespace server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryDto, Category>();

            CreateMap<GiftDto, Gift>();
            CreateMap<Gift, GiftDtoResult>();
        }
    }
}
