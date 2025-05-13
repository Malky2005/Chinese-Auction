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
            CreateMap<Donor, DonorDtoResult>();
            CreateMap<Donor, DonorDtoTheen>();
            
            CreateMap<User, UserDtoTheen>();
            
            CreateMap<CategoryDto, Category>();

            CreateMap<GiftDto, Gift>();
            CreateMap<Gift, GiftDtoResult>()
                .ForMember(dest => dest.categoryName, opt => opt.MapFrom(src => src.Category.Name));
            CreateMap<Gift, GiftDtoTheen>();

            CreateMap<Ticket, TicketDtoTheen>();
        }
    }
}
