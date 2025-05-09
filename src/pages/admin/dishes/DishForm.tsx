
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
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
      image_url: "",
      is_available: true,
      ingredients: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = async (data: DishFormData) => {
    await onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Dish" : "Create New Dish"}</CardTitle>
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
                {initialData ? "Update Dish" : "Create Dish"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default DishForm;
