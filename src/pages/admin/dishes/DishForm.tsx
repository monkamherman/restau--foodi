import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "@/integrations/supabase/client";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';

interface Dish {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  ingredients: string[];
}

const dishSchema = yup.object({
  name: yup.string().required("Dish name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  category: yup.string().required("Category is required"),
  image_url: yup.string().required("Image URL is required"),
  is_available: yup.boolean().default(true),
  ingredients: yup.array().of(yup.string()).default([]),
}).required();

const DishForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { dishId } = useParams<{ dishId: string }>();
  const { toast } = useToast();

  const form = useForm<Dish>({
    resolver: yupResolver(dishSchema),
    defaultValues: {
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
    if (dishId) {
      setIsLoading(true);
      supabase
        .from("dishes")
        .select("*")
        .eq("id", dishId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            toast({
              variant: "destructive",
              title: "Error fetching dish",
              description: error.message,
            });
            navigate("/admin/dishes");
          }
          if (data) {
            form.reset(data);
            setImagePreview(data.image_url);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [dishId, form, navigate, toast]);

  const onSubmit = async (values: Dish) => {
    setIsLoading(true);
    try {
      if (dishId) {
        // Update existing dish
        const { error } = await supabase
          .from("dishes")
          .update(values)
          .eq("id", dishId);

        if (error) throw error;

        toast({
          title: "Dish updated",
          description: "Dish has been updated successfully.",
        });
      } else {
        // Create new dish
        const { error } = await supabase.from("dishes").insert([values]);

        if (error) throw error;

        toast({
          title: "Dish created",
          description: "Dish has been created successfully.",
        });
      }
      navigate("/admin/dishes");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving dish",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image to upload.",
      });
      return;
    }

    setUploading(true);
    try {
      const imageName = `${uuidv4()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("dishes")
        .upload(imageName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const imageUrl = `${supabase.storageUrl}/dishes/${data.path}`;
      form.setValue("image_url", imageUrl);
      setImagePreview(imageUrl);

      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error uploading image",
        description: error.message,
      });
    } finally {
      setUploading(false);
      setIsImageDialogOpen(false);
      setFile(null);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg']
    },
  });

  return (
    <div>
      <div className="mb-8">
        <Button variant="outline" onClick={() => navigate("/admin/dishes")}>
          Back to Dishes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{dishId ? "Edit Dish" : "Create New Dish"}</CardTitle>
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dish Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter dish name" {...field} />
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
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pizza">Pizza</SelectItem>
                            <SelectItem value="burger">Burger</SelectItem>
                            <SelectItem value="sushi">Sushi</SelectItem>
                            <SelectItem value="pasta">Pasta</SelectItem>
                            <SelectItem value="salad">Salad</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
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
                          placeholder="Enter dish description"
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
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter price" {...field} />
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
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-4">
                            <Input placeholder="Enter image URL" {...field} />
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">Upload Image</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Image Upload</DialogTitle>
                                  <DialogDescription>
                                    Upload a new image from your computer.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
                                    <div 
                                      {...getRootProps()}
                                      className="flex flex-col items-center justify-center w-full h-40 cursor-pointer"
                                    >
                                      <input {...getInputProps()} />
                                      {imagePreview ? (
                                        <img 
                                          src={imagePreview} 
                                          alt="Preview" 
                                          className="max-w-full max-h-full object-contain" 
                                        />
                                      ) : (
                                        <p className="text-sm text-muted-foreground">
                                          Drag 'n' drop an image here, or click to select files
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                                    {uploading ? "Uploading..." : "Upload"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </FormControl>
                        <FormMessage />
                        {imagePreview && (
                          <div className="mt-2">
                            <img
                              src={imagePreview}
                              alt="Image Preview"
                              className="w-32 h-32 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_available"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Available</FormLabel>
                          <FormDescription>
                            Determine if the dish is available for order.
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

                <Button type="submit" disabled={isLoading}>
                  {dishId ? "Update Dish" : "Create Dish"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DishForm;
