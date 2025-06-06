
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, ShoppingBag, Settings, Bell, MessageSquare, Gift } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProfileTab from "./components/ProfileTab";
import FavoritesTab from "./components/FavoritesTab";
import OrdersTab from "./components/OrdersTab";
import ReviewsTab from "./components/ReviewsTab";
import SettingsTab from "./components/SettingsTab";
import NotificationsTab from "./components/NotificationsTab";
import LoyaltyTab from "./components/LoyaltyTab";

type ProfileData = {
  first_name: string;
  last_name: string;
};

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

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
        .select('first_name, last_name')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      
      setProfile({
        first_name: data?.first_name || "",
        last_name: data?.last_name || ""
      });
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement du profil",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Mon Compte</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Gérez vos informations personnelles, commandes et préférences
        </p>
      </div>
      
      <section className="py-16">
        <div className="container-custom">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="loyalty" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Fidélité</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Favoris</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Commandes</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Avis</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Paramètres</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="profile">
                <ProfileTab profile={profile} />
              </TabsContent>
              
              <TabsContent value="loyalty">
                <LoyaltyTab />
              </TabsContent>
              
              <TabsContent value="favorites">
                <FavoritesTab />
              </TabsContent>
              
              <TabsContent value="orders">
                <OrdersTab />
              </TabsContent>
              
              <TabsContent value="reviews">
                <ReviewsTab />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
              
              <TabsContent value="settings">
                <SettingsTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default UserAccount;
