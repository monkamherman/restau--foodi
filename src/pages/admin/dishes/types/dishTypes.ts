
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  is_available: boolean;
  created_at: string;
}

export interface DishFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
}
