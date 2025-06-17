import { Product } from "./product";
import { User } from "./user";

enum TicketStatus {
    Pending,
    Paid,
    Win
}

export interface Ticket {
    id: number;
    user: User;
    gift: Product;
    orderDate: Date;
    status: TicketStatus;
}