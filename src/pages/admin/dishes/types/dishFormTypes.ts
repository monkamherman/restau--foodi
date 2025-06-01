
import * as yup from "yup";

export interface DishFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  ingredients: string[];
}

export const dishSchema = yup.object<DishFormData>().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  category: yup.string().required("Category is required"),
  image_url: yup.string().url("Must be a valid URL").required("Image URL is required"),
  is_available: yup.boolean().required(),
  ingredients: yup.array().of(yup.string().required()).required(),
});

export interface DishFormProps {
  initialData?: Partial<DishFormData>;
  onSubmit: (data: DishFormData) => Promise<void>;
}
