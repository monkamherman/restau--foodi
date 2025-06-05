
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingBag, Calendar, Star, Tag } from "lucide-react";

type DashboardStats = {
  totalDishes: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalReservations: number;
  activeCoupons: number;
  averageRating: number;
  pendingOrders: number;
};

const Stats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalDishes: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalReservations: 0,
    activeCoupons: 0,
    averageRating: 0,
    pendingOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      const [
        dishesResponse,
        usersResponse,
        ordersResponse,
        reservationsResponse,
        couponsResponse,
        reviewsResponse,
        pendingOrdersResponse
      ] = await Promise.all([
        supabase.from('dishes').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('final_amount'),
        supabase.from('reservations').select('id', { count: 'exact', head: true }),
        supabase.from('coupons').select('id').eq('is_active', true),
        supabase.from('reviews').select('rating'),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      const totalRevenue = ordersResponse.data?.reduce((sum, order) => sum + Number(order.final_amount), 0) || 0;
      const averageRating = reviewsResponse.data?.length 
        ? reviewsResponse.data.reduce((sum, review) => sum + review.rating, 0) / reviewsResponse.data.length 
        : 0;

      setStats({
        totalDishes: dishesResponse.count || 0,
        totalUsers: usersResponse.count || 0,
        totalOrders: ordersResponse.data?.length || 0,
        totalRevenue,
        totalReservations: reservationsResponse.count || 0,
        activeCoupons: couponsResponse.data?.length || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        pendingOrders: pendingOrdersResponse.count || 0,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des statistiques",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Plats",
      value: stats.totalDishes,
      icon: <BarChart3 size={24} />,
      color: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "bg-green-50",
      iconColor: "text-green-500"
    },
    {
      title: "Commandes Totales",
      value: stats.totalOrders,
      icon: <ShoppingBag size={24} />,
      color: "bg-yellow-50",
      iconColor: "text-yellow-500"
    },
    {
      title: "Revenus",
      value: `${stats.totalRevenue.toFixed(2)} €`,
      icon: <DollarSign size={24} />,
      color: "bg-purple-50",
      iconColor: "text-purple-500"
    },
    {
      title: "Réservations",
      value: stats.totalReservations,
      icon: <Calendar size={24} />,
      color: "bg-pink-50",
      iconColor: "text-pink-500"
    },
    {
      title: "Coupons Actifs",
      value: stats.activeCoupons,
      icon: <Tag size={24} />,
      color: "bg-indigo-50",
      iconColor: "text-indigo-500"
    },
    {
      title: "Note Moyenne",
      value: stats.averageRating.toString(),
      icon: <Star size={24} />,
      color: "bg-orange-50",
      iconColor: "text-orange-500"
    },
    {
      title: "Commandes en Attente",
      value: stats.pendingOrders,
      icon: <TrendingUp size={24} />,
      color: "bg-red-50",
      iconColor: "text-red-500"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Statistiques</h1>
        <p className="text-gray-600">Vue d'ensemble des performances du restaurant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  )}
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stats;
