
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Heart, Star, Settings } from "lucide-react";

// Import refactored components
import ProfileTab from "./components/ProfileTab";
import OrdersTab from "./components/OrdersTab";
import FavoritesTab from "./components/FavoritesTab";
import ReviewsTab from "./components/ReviewsTab";
import SettingsTab from "./components/SettingsTab";

const UserAccount = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    avatar_url: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        avatar_url: data.avatar_url || ""
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching profile",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-foodie-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag size={16} />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart size={16} />
            <span>Favorites</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star size={16} />
            <span>Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab profile={profile} />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritesTab />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccount;
