
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Reservation, ReservationFormData } from "../types/reservationTypes";

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
    
    // Configuration des mises à jour en temps réel
    const channel = supabase
      .channel('reservations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservations'
        },
        () => {
          console.log('Mise à jour en temps réel des réservations détectée');
          fetchReservations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des réservations",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createReservation = async (reservationData: ReservationFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('reservations')
        .insert([{
          ...reservationData,
          user_id: user?.id || null,
        }])
        .select();

      if (error) throw error;

      toast({
        title: "Réservation créée",
        description: "Votre réservation a été enregistrée avec succès.",
      });

      return data[0];
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la création de la réservation",
        description: error.message,
      });
      throw error;
    }
  };

  const updateReservationStatus = async (reservationId: string, status: Reservation['status']) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', reservationId);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la réservation a été modifié.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la mise à jour",
        description: error.message,
      });
    }
  };

  return {
    reservations,
    isLoading,
    createReservation,
    updateReservationStatus,
    fetchReservations,
  };
};
