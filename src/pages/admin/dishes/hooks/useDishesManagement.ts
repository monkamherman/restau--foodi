
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dish, DishFormData } from "../types/dishTypes";

export const useDishesManagement = () => {
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

  const handleEditClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDeleteDialogOpen(true);
  };

  return {
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
  };
};
