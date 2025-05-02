
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "../components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

type Dish = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_featured: boolean;
  is_available: boolean;
};

const DishForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  const [dish, setDish] = useState<Dish>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image_url: "",
    is_featured: false,
    is_available: true,
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  // Categories could come from database, but for now we'll use a static list
  const categories = [
    "Starters", "Main Course", "Pasta", "Pizza", 
    "Burgers", "Salads", "Desserts", "Beverages"
  ];

  useEffect(() => {
    if (isEditing) {
      fetchDish();
    }
  }, [id]);

  const fetchDish = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) throw new Error("Dish not found");
      
      setDish(data);
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching dish",
        description: error.message,
      });
      navigate('/admin/dishes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDish({ ...dish, price: isNaN(value) ? 0 : value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setDish({ ...dish, [name]: checked });
  };

  const handleCategoryChange = (value: string) => {
    setDish({ ...dish, category: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) {
      return dish.image_url || null;
    }
    
    try {
      // Create a unique filename
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `dishes/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('dishes')
        .upload(filePath, imageFile);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('dishes')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error uploading image",
        description: error.message,
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dish.name || !dish.category || dish.price <= 0) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload image if there's a new one
      let imageUrl = dish.image_url;
      if (imageFile) {
        imageUrl = await uploadImage() || '';
      }
      
      const dishData = {
        ...dish,
        image_url: imageUrl,
      };
      
      if (isEditing) {
        const { error } = await supabase
          .from('dishes')
          .update(dishData)
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Dish updated",
          description: "Successfully updated the dish",
        });
      } else {
        const { error } = await supabase
          .from('dishes')
          .insert(dishData);
          
        if (error) throw error;
        
        toast({
          title: "Dish created",
          description: "Successfully created a new dish",
        });
      }
      
      navigate('/admin/dishes');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Error ${isEditing ? 'updating' : 'creating'} dish`,
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 text-center">Loading dish data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/dishes')}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dishes
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Dish" : "Add New Dish"}
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name*</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={dish.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price*</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input 
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={dish.price}
                      onChange={handlePriceChange}
                      className="pl-7"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Select 
                    value={dish.category} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={dish.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="is_featured"
                      checked={dish.is_featured}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('is_featured', checked as boolean)
                      }
                    />
                    <Label htmlFor="is_featured">Featured dish</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="is_available"
                      checked={dish.is_available}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('is_available', checked as boolean)
                      }
                    />
                    <Label htmlFor="is_available">Available</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Image</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-64 rounded"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview("");
                          setDish({ ...dish, image_url: "" });
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 text-gray-500">
                        <p>Upload a dish image</p>
                        <p className="text-sm">(PNG, JPG, WEBP up to 5MB)</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Select Image
                      </Button>
                    </div>
                  )}
                  <Input 
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/dishes')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? (isEditing ? "Updating..." : "Creating...") 
                  : (isEditing ? "Update Dish" : "Create Dish")
                }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DishForm;
