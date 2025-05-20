namespace server.Models.DTO
{
    public class TicketDtoTheen
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsPaid { get; set; } = false;
        public TicketStatus Status { get; set; }
    }
}
