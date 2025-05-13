using server.Models.DTO;
using server.Models;
using AutoMapper;


namespace server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DonorDto, Donor>();
            CreateMap<Donor, DonorDtoResult>().ForMember(dest => dest.Gifts, opt => opt.MapFrom(src => src.Gifts.Select(g => new GiftDtoTheen
                {
                    Id = g.Id,
                    GiftName = g.GiftName,
                    Price = g.Price,
                    details = g.details
                }).ToList()));

            CreateMap<CategoryDto, Category>();

            CreateMap<GiftDto, Gift>();
            CreateMap<Gift, GiftDtoResult>();
        }
    }
}
