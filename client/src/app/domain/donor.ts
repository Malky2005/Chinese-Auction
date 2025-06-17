import { Product } from "./product";

export interface Donor {
    id?: string;
    name?: string;
    email?: string
    showMe?: boolean;
    gifts?: Product[];
}