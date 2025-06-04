
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import DishesTable from "./components/DishesTable";
import DishesDialogs from "./components/DishesDialogs";
import { useDishesManagement } from "./hooks/useDishesManagement";

const DishesManagement = () => {
  const {
    dishes,
    isLoading,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedDish,
    handleAddDish,
    handleEditDish,
    handleDeleteDish,
    handleEditClick,
    handleDeleteClick,
  } = useDishesManagement();

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
          <DishesTable 
            dishes={dishes}
            isLoading={isLoading}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </CardContent>
      </Card>

      <DishesDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedDish={selectedDish}
        onAddDish={handleAddDish}
        onEditDish={handleEditDish}
        onDeleteDish={handleDeleteDish}
      />
    </div>
  );
};

export default DishesManagement;
