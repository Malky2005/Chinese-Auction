export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
    giver?:string
    /**
     *
     */
    
}

export function createProduct(data: Partial<Product> = {}): Product {
    return {
      price:data.price??10, 
      ...data,   
    };
  }