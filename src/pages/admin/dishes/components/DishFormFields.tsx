
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUploader from "./ImageUploader";
import { UseFormReturn } from "react-hook-form";
import { DishFormData } from "../types/dishFormTypes";

interface DishFormFieldsProps {
  form: UseFormReturn<DishFormData>;
}

const DishFormFields = ({ form }: DishFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du Plat</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom du plat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Entrées">Entrées</SelectItem>
                  <SelectItem value="Plats Principaux">Plats Principaux</SelectItem>
                  <SelectItem value="Desserts">Desserts</SelectItem>
                  <SelectItem value="Boissons">Boissons</SelectItem>
                  <SelectItem value="Spécialités">Spécialités</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Entrez la description du plat"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prix (FCFA)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Entrez le prix en francs CFA" 
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'Image</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Input placeholder="Entrez l'URL de l'image" {...field} />
                </div>
              </FormControl>
              <FormMessage />
              <ImageUploader 
                imageUrl={field.value} 
                onImageUploaded={(url) => form.setValue("image_url", url)} 
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Disponible</FormLabel>
                <FormDescription>
                  Déterminez si le plat est disponible à la commande.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default DishFormFields;
