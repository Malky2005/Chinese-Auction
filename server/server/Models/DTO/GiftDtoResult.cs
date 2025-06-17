namespace server.Models.DTO
{
    public class GiftDtoResult
    {
        public int Id { get; set; }
        public string GiftName { get; set; }
        public int CategoryId { get; set; }
        public string categoryName { get; set; }
        public decimal Price { get; set; }
        public DonorDtoTheen Donor { get; set; }
        public string? Details { get; set; }
        public UserDtoTheen? Winner { get; set; }
        public List<TicketDtoTheen> Tickets { get; set; }
        public string? ImageUrl { get; set; }
    }
}
