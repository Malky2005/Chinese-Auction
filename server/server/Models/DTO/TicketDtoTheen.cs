namespace server.Models.DTO
{
    public class TicketDtoTheen
    {
        public int Id { get; set; }
        public UserDtoTheen User { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsPaid { get; set; } = false;
        public bool IsWin { get; set; } = false;
    }
}
