
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Users, ShoppingBag, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StatsData {
  totalDishes: number;
  totalUsers: number;
  totalOrders: number;
  activeCoupons: number;
}

const DashboardStats = () => {
  const [stats, setStats] = useState<StatsData>({
    totalDishes: 0,
    totalUsers: 0,
    totalOrders: 0,
    activeCoupons: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [dishesResponse, usersResponse, ordersResponse, couponsResponse] = await Promise.all([
          supabase.from('dishes').select('id', { count: 'exact', head: true }),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true }),
          supabase.from('coupons').select('id').eq('is_active', true),
        ]);
        
        setStats({
          totalDishes: dishesResponse.count || 0,
          totalUsers: usersResponse.count || 0,
          totalOrders: ordersResponse.count || 0,
          activeCoupons: couponsResponse.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: 'Total Plats',
      value: stats.totalDishes,
      icon: Utensils,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      title: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
    },
    {
      title: 'Coupons Actifs',
      value: stats.activeCoupons,
      icon: Tag,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                )}
              </div>
              <div className={`p-3 rounded-full ${card.color}`}>
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
