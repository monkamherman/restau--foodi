
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
    
    // Configuration des mises à jour en temps réel
    const channel = supabase
      .channel('dishes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dishes'
        },
        () => {
          console.log('Mise à jour en temps réel des plats détectée');
          fetchDishes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        title: "Erreur lors du chargement des plats",
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
        title: "Plat ajouté",
        description: "Le plat a été ajouté avec succès.",
      });

      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'ajout du plat",
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
        title: "Plat modifié",
        description: "Le plat a été modifié avec succès.",
      });

      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la modification du plat",
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
        title: "Plat supprimé",
        description: "Le plat a été supprimé avec succès.",
      });

      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la suppression du plat",
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
