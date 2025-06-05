
import * as yup from "yup";

// Schéma de validation Yup
export const dishSchema = yup.object({
  name: yup.string().required("Le nom du plat est requis"),
  description: yup.string().required("La description est requise"),
  price: yup.number().positive("Le prix doit être positif").required("Le prix est requis"),
  category: yup.string().required("La catégorie est requise"),
  image_url: yup.string().url("URL invalide").required("L'URL de l'image est requise"),
  is_available: yup.boolean().required(),
});

// Dériver le type directement du schéma Yup pour éviter les conflits
export type DishFormData = yup.InferType<typeof dishSchema>;

export interface DishFormProps {
  initialData?: DishFormData & { id: string };
  onSubmit: (dish: DishFormData) => Promise<void>;
  onCancel?: () => void;
}
