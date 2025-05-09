
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/auth";
import EmptyState from "./EmptyState";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ReviewsTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user]);
  
  const fetchUserReviews = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load your reviews"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={Star}
        title="Your Reviews"
        description="You haven't left any reviews yet."
        linkText="Browse Menu"
        linkUrl="/menu"
      />
    );
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
      
      <div className="text-muted-foreground">
        Coming soon: View and manage all your reviews here.
      </div>
    </Card>
  );
};

export default ReviewsTab;
