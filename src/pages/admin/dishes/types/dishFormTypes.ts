
export interface DishFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  ingredients: string[];
  delivery_options: string[];
}

export interface DishFormProps {
  dish?: DishFormData & { id: string };
  onSave?: (dish: DishFormData) => void;
  onCancel?: () => void;
}
