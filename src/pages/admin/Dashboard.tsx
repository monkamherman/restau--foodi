
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Users, Tag, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DashboardStats = {
  totalDishes: number;
  totalUsers: number;
  totalOrders: number;
  activeCoupons: number;
};

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDishes: 0,
    totalUsers: 0,
    totalOrders: 0,
    activeCoupons: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error fetching dashboard data",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, toast]);

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Dishes" 
            value={stats.totalDishes} 
            icon={<Utensils size={24} />} 
            isLoading={isLoading} 
            color="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatsCard 
            title="Users" 
            value={stats.totalUsers} 
            icon={<Users size={24} />} 
            isLoading={isLoading} 
            color="bg-green-50"
            iconColor="text-green-500"
          />
          <StatsCard 
            title="Orders" 
            value={stats.totalOrders} 
            icon={<ShoppingBag size={24} />} 
            isLoading={isLoading} 
            color="bg-yellow-50"
            iconColor="text-yellow-500"
          />
          <StatsCard 
            title="Active Coupons" 
            value={stats.activeCoupons} 
            icon={<Tag size={24} />} 
            isLoading={isLoading} 
            color="bg-purple-50" 
            iconColor="text-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="p-8 text-center">Loading recent orders...</div>
              ) : (
                <div>
                  <p className="py-4 text-center text-muted-foreground">Coming soon</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Dishes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="p-8 text-center">Loading popular dishes...</div>
              ) : (
                <div>
                  <p className="py-4 text-center text-muted-foreground">Coming soon</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  isLoading, 
  color,
  iconColor 
}: { 
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading: boolean;
  color: string;
  iconColor: string;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : (
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
