
import * as yup from "yup";

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
  initialData?: DishFormData & { id: string };
  onSubmit: (dish: DishFormData) => Promise<void>;
  onCancel?: () => void;
}

// Schéma de validation Yup
export const dishSchema = yup.object().shape({
  name: yup.string().required("Le nom du plat est requis"),
  description: yup.string().required("La description est requise"),
  price: yup.number().positive("Le prix doit être positif").required("Le prix est requis"),
  category: yup.string().required("La catégorie est requise"),
  image_url: yup.string().url("URL invalide").required("L'URL de l'image est requise"),
  is_available: yup.boolean().required(),
  ingredients: yup.array().of(yup.string()).min(1, "Au moins un ingrédient est requis"),
  delivery_options: yup.array().of(yup.string()).min(1, "Au moins une option de livraison est requise")
});
