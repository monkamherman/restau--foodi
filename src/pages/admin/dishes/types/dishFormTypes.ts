
import * as yup from "yup";

export interface Dish {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  ingredients?: string[];
}

export type DishFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  ingredients?: string[];
};

export const dishSchema = yup.object({
  name: yup.string().required("Dish name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  category: yup.string().required("Category is required"),
  image_url: yup.string().required("Image URL is required"),
  is_available: yup.boolean().default(true),
  ingredients: yup.array().of(yup.string()).default([])
}).required();

export interface DishFormProps {
  initialData?: Dish;
  onSubmit: (data: DishFormData) => Promise<void>;
}
