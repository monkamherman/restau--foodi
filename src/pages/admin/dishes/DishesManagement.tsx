import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Plus } from "lucide-react";
import DishForm from "./DishForm";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  is_available: boolean;
  created_at: string;
}

// Définition des types requis pour le formulaire
type DishFormData = Omit<Dish, 'id' | 'created_at'> & {
  id?: string;
};

const DishesManagement = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
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
        .order('created_at', { ascending: false });

      if (error) throw error;
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

  const handleAddDish = async (dishData: DishFormData) => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .insert([dishData])
        .select();

      if (error) throw error;

      toast({
        title: "Dish added",
        description: "The dish has been added successfully.",
      });

      setIsAddDialogOpen(false);
      fetchDishes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding dish",
        description: error.message,
      });
    }
  };

  const handleEditDish = async (dishData: DishFormData) => {
    if (!selectedDish) return;

    try {
      const { error } = await supabase
        .from('dishes')
        .update(dishData)
        .eq('id', selectedDish.id);

      if (error) throw error;

      toast({
        title: "Dish updated",
        description: "The dish has been updated successfully.",
      });

      setIsEditDialogOpen(false);
      fetchDishes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating dish",
        description: error.message,
      });
    }
  };

  const handleDeleteDish = async () => {
    if (!selectedDish) return;

    try {
      const { error } = await supabase
        .from('dishes')
        .delete()
        .eq('id', selectedDish.id);

      if (error) throw error;

      toast({
        title: "Dish deleted",
        description: "The dish has been deleted successfully.",
      });

      setIsDeleteDialogOpen(false);
      fetchDishes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting dish",
        description: error.message,
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dishes Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Dish
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Dishes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">Loading dishes...</div>
          ) : dishes.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No dishes found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                        {dish.image_url ? (
                          <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{dish.name}</TableCell>
                    <TableCell>{dish.category}</TableCell>
                    <TableCell>{formatPrice(dish.price)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          dish.is_available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dish.is_available ? "Available" : "Unavailable"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedDish(dish);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedDish(dish);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Dish Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Dish</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new dish to the menu.
            </DialogDescription>
          </DialogHeader>
          <DishForm onSubmit={handleAddDish} />
        </DialogContent>
      </Dialog>

      {/* Edit Dish Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Dish</DialogTitle>
            <DialogDescription>
              Update the details of the selected dish.
            </DialogDescription>
          </DialogHeader>
          {selectedDish && (
            <DishForm 
              initialData={selectedDish}
              onSubmit={handleEditDish} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the dish
              "{selectedDish?.name}" from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDish} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DishesManagement;
