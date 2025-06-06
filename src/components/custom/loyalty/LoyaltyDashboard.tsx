
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Trophy, Star, Clock, CheckCircle } from 'lucide-react';
import { useLoyalty } from '@/hooks/useLoyalty';

const LoyaltyDashboard = () => {
  const { 
    loyaltyPoints, 
    transactions, 
    availableRewards, 
    userRewards, 
    isLoading, 
    claimReward, 
    useReward 
  } = useLoyalty();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'discount_percentage':
      case 'discount_amount':
        return <Gift className="w-4 h-4" />;
      case 'free_item':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getRewardTypeText = (type: string, value: number | null) => {
    switch (type) {
      case 'discount_percentage':
        return `${value}% de réduction`;
      case 'discount_amount':
        return `${value}€ de réduction`;
      case 'free_item':
        return 'Article gratuit';
      default:
        return 'Récompense';
    }
  };

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Points Actuels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {loyaltyPoints?.points || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              Total Gagné
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">
              {loyaltyPoints?.total_earned || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-blue-500" />
              Total Dépensé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-blue-600">
              {loyaltyPoints?.total_spent || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Récompenses Disponibles</TabsTrigger>
          <TabsTrigger value="my-rewards">Mes Récompenses</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {getRewardTypeIcon(reward.reward_type)}
                      {reward.name}
                    </span>
                    <Badge variant="secondary">
                      {reward.points_required} pts
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {getRewardTypeText(reward.reward_type, reward.reward_value)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {reward.description}
                  </p>
                  <Button 
                    onClick={() => claimReward(reward.id)}
                    disabled={!loyaltyPoints || loyaltyPoints.points < reward.points_required}
                    className="w-full"
                  >
                    {loyaltyPoints && loyaltyPoints.points >= reward.points_required 
                      ? 'Réclamer' 
                      : `${reward.points_required - (loyaltyPoints?.points || 0)} pts manquants`
                    }
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-rewards" className="space-y-4">
          {userRewards.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Vous n'avez pas encore de récompenses</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userRewards.map((userReward) => (
                <Card key={userReward.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {getRewardTypeIcon(userReward.reward.reward_type)}
                        {userReward.reward.name}
                      </span>
                      <div className="flex gap-2">
                        {userReward.is_used ? (
                          <Badge variant="secondary">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Utilisée
                          </Badge>
                        ) : (
                          <Badge variant="default">Disponible</Badge>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Réclamée le {formatDate(userReward.claimed_at)}
                      {userReward.expires_at && (
                        <span className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          Expire le {formatDate(userReward.expires_at)}
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {getRewardTypeText(userReward.reward.reward_type, userReward.reward.reward_value)}
                    </p>
                    {!userReward.is_used && (
                      <Button 
                        onClick={() => useReward(userReward.id)}
                        variant="outline"
                      >
                        Marquer comme utilisée
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {transactions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Aucune transaction trouvée</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {transaction.description || 'Transaction'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(transaction.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                        </p>
                        <Badge variant={
                          transaction.transaction_type === 'earned' ? 'default' : 'secondary'
                        }>
                          {transaction.transaction_type === 'earned' ? 'Gagné' : 
                           transaction.transaction_type === 'spent' ? 'Dépensé' : 'Expiré'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyDashboard;
