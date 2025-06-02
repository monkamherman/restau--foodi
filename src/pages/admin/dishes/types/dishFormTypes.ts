
import * as yup from "yup";

export interface DishFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  ingredients: string[];
  delivery_options?: string[];
}

export interface DishFormProps {
  initialData?: Partial<DishFormData>;
  onSubmit: (data: DishFormData) => Promise<void>;
}

export const dishSchema = yup.object({
  name: yup.string().required("Le nom du plat est requis"),
  description: yup.string().required("La description est requise"),
  price: yup.number().min(0, "Le prix doit être positif").required("Le prix est requis"),
  category: yup.string().required("La catégorie est requise"),
  image_url: yup.string().url("URL invalide").required("L'URL de l'image est requise"),
  is_available: yup.boolean().required(),
  ingredients: yup.array().of(yup.string().required()).required(),
  delivery_options: yup.array().of(yup.string().required()).optional()
});
