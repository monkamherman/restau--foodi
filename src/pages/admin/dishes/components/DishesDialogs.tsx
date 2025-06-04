
import { 
  Dialog,
  DialogContent,
  DialogDescription,
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
import DishForm from "../DishForm";
import { Dish, DishFormData } from "../types/dishTypes";

interface DishesDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedDish: Dish | null;
  onAddDish: (dishData: DishFormData) => Promise<void>;
  onEditDish: (dishData: DishFormData) => Promise<void>;
  onDeleteDish: () => Promise<void>;
}

const DishesDialogs = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedDish,
  onAddDish,
  onEditDish,
  onDeleteDish,
}: DishesDialogsProps) => {
  return (
    <>
      {/* Add Dish Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Dish</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new dish to the menu.
            </DialogDescription>
          </DialogHeader>
          <DishForm onSubmit={onAddDish} />
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
              initialData={{
                id: selectedDish.id,
                name: selectedDish.name,
                description: selectedDish.description || "",
                price: selectedDish.price,
                category: selectedDish.category,
                image_url: selectedDish.image_url || "",
                is_available: selectedDish.is_available
              }}
              onSubmit={onEditDish} 
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
            <AlertDialogAction onClick={onDeleteDish} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DishesDialogs;
