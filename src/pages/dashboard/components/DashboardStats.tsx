
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Users, ShoppingBag, Tag, Calendar, TrendingUp, Clock, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StatsData {
  totalDishes: number;
  totalUsers: number;
  totalOrders: number;
  activeCoupons: number;
  pendingReservations: number;
  todayReservations: number;
  averageOrderValue: number;
  totalRevenue: number;
}

const DashboardStats = () => {
  const [stats, setStats] = useState<StatsData>({
    totalDishes: 0,
    totalUsers: 0,
    totalOrders: 0,
    activeCoupons: 0,
    pendingReservations: 0,
    todayReservations: 0,
    averageOrderValue: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        const [
          dishesResponse,
          usersResponse,
          ordersResponse,
          couponsResponse,
          pendingReservationsResponse,
          todayReservationsResponse,
          revenueResponse
        ] = await Promise.all([
          supabase.from('dishes').select('id', { count: 'exact', head: true }),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true }),
          supabase.from('coupons').select('id').eq('is_active', true),
          supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('date', today),
          supabase.from('orders').select('final_amount').eq('status', 'completed')
        ]);

        const revenue = revenueResponse.data?.reduce((sum, order) => sum + (order.final_amount || 0), 0) || 0;
        const avgOrderValue = revenueResponse.data?.length ? revenue / revenueResponse.data.length : 0;
        
        setStats({
          totalDishes: dishesResponse.count || 0,
          totalUsers: usersResponse.count || 0,
          totalOrders: ordersResponse.count || 0,
          activeCoupons: couponsResponse.data?.length || 0,
          pendingReservations: pendingReservationsResponse.count || 0,
          todayReservations: todayReservationsResponse.count || 0,
          averageOrderValue: avgOrderValue,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    
    // Mise à jour en temps réel
    const channel = supabase
      .channel('dashboard-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dishes' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coupons' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const statsCards = [
    {
      title: 'Total Plats',
      value: stats.totalDishes,
      icon: Utensils,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      change: '+2.1%',
      changeType: 'positive' as const
    },
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      change: '+5.4%',
      changeType: 'positive' as const
    },
    {
      title: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      change: '+12.3%',
      changeType: 'positive' as const
    },
    {
      title: 'Revenus Total',
      value: `${stats.totalRevenue.toFixed(2)}€`,
      icon: TrendingUp,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      title: 'Réservations en Attente',
      value: stats.pendingReservations,
      icon: Clock,
      color: 'bg-orange-50',
      iconColor: 'text-orange-500',
      change: '-1.2%',
      changeType: 'negative' as const
    },
    {
      title: "Réservations Aujourd'hui",
      value: stats.todayReservations,
      icon: Calendar,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
      change: '+3.1%',
      changeType: 'positive' as const
    },
    {
      title: 'Panier Moyen',
      value: `${stats.averageOrderValue.toFixed(2)}€`,
      icon: Star,
      color: 'bg-pink-50',
      iconColor: 'text-pink-500',
      change: '+4.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Coupons Actifs',
      value: stats.activeCoupons,
      icon: Tag,
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500',
      change: '0%',
      changeType: 'neutral' as const
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card) => (
        <Card key={card.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                {isLoading ? (
                  <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                )}
                <div className={`flex items-center mt-2 text-sm ${
                  card.changeType === 'positive' ? 'text-green-600' : 
                  card.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${
                    card.changeType === 'negative' ? 'rotate-180' : ''
                  }`} />
                  {card.change}
                </div>
              </div>
              <div className={`p-3 rounded-full ${card.color} ml-4`}>
                <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
