
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyPoints {
  id: string;
  points: number;
  total_earned: number;
  total_spent: number;
}

interface LoyaltyTransaction {
  id: string;
  points: number;
  transaction_type: string;
  description: string | null;
  created_at: string;
}

interface LoyaltyReward {
  id: string;
  name: string;
  description: string | null;
  points_required: number;
  reward_type: string;
  reward_value: number | null;
  is_active: boolean;
}

interface UserReward {
  id: string;
  reward_id: string;
  is_used: boolean;
  claimed_at: string;
  used_at: string | null;
  expires_at: string | null;
  reward: LoyaltyReward;
}

export const useLoyalty = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [availableRewards, setAvailableRewards] = useState<LoyaltyReward[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLoyaltyData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Récupérer les points de fidélité
      const { data: pointsData, error: pointsError } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (pointsError && pointsError.code !== 'PGRST116') {
        throw pointsError;
      }

      setLoyaltyPoints(pointsData);

      // Récupérer les transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (transactionsError) throw transactionsError;
      setTransactions(transactionsData || []);

      // Récupérer les récompenses disponibles
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('loyalty_rewards')
        .select('*')
        .eq('is_active', true)
        .order('points_required', { ascending: true });

      if (rewardsError) throw rewardsError;
      setAvailableRewards(rewardsData || []);

      // Récupérer les récompenses de l'utilisateur
      const { data: userRewardsData, error: userRewardsError } = await supabase
        .from('user_rewards')
        .select(`
          *,
          reward:loyalty_rewards(*)
        `)
        .eq('user_id', user.id)
        .order('claimed_at', { ascending: false });

      if (userRewardsError) throw userRewardsError;
      setUserRewards(userRewardsData || []);

    } catch (error: any) {
      console.error('Error fetching loyalty data:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données de fidélité"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const claimReward = async (rewardId: string) => {
    if (!user || !loyaltyPoints) return;

    const reward = availableRewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (loyaltyPoints.points < reward.points_required) {
      toast({
        variant: "destructive",
        title: "Points insuffisants",
        description: `Vous avez besoin de ${reward.points_required} points pour réclamer cette récompense`
      });
      return;
    }

    try {
      // Réclamer la récompense
      const { error: claimError } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          reward_id: rewardId,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 jours
        });

      if (claimError) throw claimError;

      // Déduire les points
      const newPoints = loyaltyPoints.points - reward.points_required;
      const { error: updateError } = await supabase
        .from('loyalty_points')
        .update({ 
          points: newPoints,
          total_spent: loyaltyPoints.total_spent + reward.points_required 
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Enregistrer la transaction
      const { error: transactionError } = await supabase
        .from('loyalty_transactions')
        .insert({
          user_id: user.id,
          points: -reward.points_required,
          transaction_type: 'spent',
          description: `Récompense réclamée: ${reward.name}`
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Récompense réclamée!",
        description: `Vous avez réclamé: ${reward.name}`
      });

      // Rafraîchir les données
      await fetchLoyaltyData();

    } catch (error: any) {
      console.error('Error claiming reward:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de réclamer la récompense"
      });
    }
  };

  const useReward = async (userRewardId: string) => {
    try {
      const { error } = await supabase
        .from('user_rewards')
        .update({
          is_used: true,
          used_at: new Date().toISOString()
        })
        .eq('id', userRewardId);

      if (error) throw error;

      toast({
        title: "Récompense utilisée",
        description: "La récompense a été marquée comme utilisée"
      });

      await fetchLoyaltyData();

    } catch (error: any) {
      console.error('Error using reward:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'utiliser la récompense"
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
    }
  }, [user]);

  return {
    loyaltyPoints,
    transactions,
    availableRewards,
    userRewards,
    isLoading,
    claimReward,
    useReward,
    refreshData: fetchLoyaltyData
  };
};
