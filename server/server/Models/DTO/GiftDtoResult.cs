namespace server.Models.DTO
{
    public class GiftDtoResult
    {
        public int Id { get; set; }
        public string GiftName { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public int DonorId { get; set; }
        public string? details { get; set; }
        public int? UserWinnerId { get; set; }
    }
}
