
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "../components/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Edit, 
  Trash2, 
  Plus,
  Star,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Dish = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
};

const DishesManagement = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }
      
      setDishes(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching dishes",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('dishes')
        .update({ is_featured: !currentValue })
        .eq('id', id);
      
      if (error) throw error;
      
      setDishes(dishes.map(dish => 
        dish.id === id ? { ...dish, is_featured: !currentValue } : dish
      ));
      
      toast({
        title: `Dish ${!currentValue ? 'featured' : 'unfeatured'}`,
        description: `Successfully ${!currentValue ? 'featured' : 'unfeatured'} the dish`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating dish",
        description: error.message,
      });
    }
  };

  const toggleAvailability = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('dishes')
        .update({ is_available: !currentValue })
        .eq('id', id);
      
      if (error) throw error;
      
      setDishes(dishes.map(dish => 
        dish.id === id ? { ...dish, is_available: !currentValue } : dish
      ));
      
      toast({
        title: `Dish ${!currentValue ? 'available' : 'unavailable'}`,
        description: `Successfully marked the dish as ${!currentValue ? 'available' : 'unavailable'}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating dish",
        description: error.message,
      });
    }
  };

  const deleteDish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('dishes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setDishes(dishes.filter(dish => dish.id !== id));
      
      toast({
        title: "Dish deleted",
        description: "Successfully deleted the dish",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting dish",
        description: error.message,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dishes Management</h1>
          <Button asChild>
            <Link to="/admin/dishes/new">
              <Plus size={16} className="mr-2" />
              Add Dish
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center p-12">Loading dishes...</div>
        ) : dishes.length === 0 ? (
          <div className="text-center p-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-600">No dishes found</h2>
            <p className="text-gray-500 mt-1">Get started by adding your first dish</p>
            <Button asChild className="mt-4">
              <Link to="/admin/dishes/new">
                <Plus size={16} className="mr-2" />
                Add Your First Dish
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableCaption>List of all dishes in the restaurant</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Featured</TableHead>
                  <TableHead className="text-center">Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        {dish.image_url ? (
                          <img 
                            src={dish.image_url} 
                            alt={dish.name}
                            className="h-10 w-10 rounded object-cover" 
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                            No img
                          </div>
                        )}
                        <div>
                          {dish.name}
                          {dish.description && (
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {dish.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{dish.category}</TableCell>
                    <TableCell className="text-right">${dish.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleFeatured(dish.id, dish.is_featured)}
                        className={dish.is_featured ? "text-yellow-500" : "text-gray-400"}
                      >
                        <Star size={18} fill={dish.is_featured ? "currentColor" : "none"} />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleAvailability(dish.id, dish.is_available)}
                        className={dish.is_available ? "text-green-500" : "text-red-500"}
                      >
                        {dish.is_available ? (
                          <CheckCircle size={18} />
                        ) : (
                          <XCircle size={18} />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/admin/dishes/${dish.id}`}>
                            <Edit size={16} />
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                dish "{dish.name}" and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteDish(dish.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DishesManagement;
