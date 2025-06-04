
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DishFormFields from "./components/DishFormFields";
import { DishFormProps, DishFormData, dishSchema } from "./types/dishFormTypes";

const DishForm = ({ initialData, onSubmit }: DishFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DishFormData>({
    resolver: yupResolver(dishSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "",
      image_url: initialData?.image_url || "",
      is_available: initialData?.is_available ?? true,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || 0,
        category: initialData.category || "",
        image_url: initialData.image_url || "",
        is_available: initialData.is_available ?? true,
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data: DishFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Modifier le Plat" : "Créer un Nouveau Plat"}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <DishFormFields form={form} />
              
              <Button type="submit" disabled={isLoading}>
                {initialData ? "Mettre à Jour le Plat" : "Créer le Plat"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default DishForm;
