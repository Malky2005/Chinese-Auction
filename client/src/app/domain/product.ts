import { Donor } from "./donor";
import { User } from "./user";

export class Product {
    id?: number;
    giftName?: string;
    details?: string;
    price?: number;
    categoryId?: number;
    categoryName?: string;
    imageUrl?: string;
    donor?:Donor;
    winner?: User;
    tickets?: object[];    
}

export function createProduct(data: Partial<Product> = {}): Product {
    return {
      price:data.price??10, 
      ...data,   
    };
  }