
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface Review {
  id: string;
  user_id: string;
  dish_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            *,
            profiles:user_id(
              id,
              first_name,
              last_name,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Handle the data properly, ensuring the profile property is correctly typed
        const formattedReviews = data.map(review => {
          // Handle the case where profiles might be an error or doesn't have the expected shape
          const profile = review.profiles && typeof review.profiles === 'object' ? 
            review.profiles as unknown as Profile : undefined;
          
          const formattedReview: Review = {
            ...review,
            profile
          };
          
          return formattedReview;
        });

        setReviews(formattedReviews);
      } catch (error: any) {
        console.error("Error fetching reviews:", error);
        toast({
          variant: "destructive",
          title: "Error fetching reviews",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [toast]);

  const handleSendResponse = async () => {
    // In a real application, this would send an email to the user
    // For now, we'll just simulate success
    toast({
      title: "Response sent",
      description: `Your response to the review has been sent.`,
    });
    
    setIsResponseDialogOpen(false);
    setResponseText("");
  };

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-foodie-rating text-foodie-rating" : "text-gray-300"}
        />
      ));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No reviews yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      {review.profile ? (
                        `${review.profile.first_name || ''} ${review.profile.last_name || ''}`.trim() || 'Anonymous'
                      ) : (
                        'Anonymous'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {renderRatingStars(review.rating)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate">
                        {review.comment || 'No comment'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(review.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsResponseDialogOpen(true);
                        }}
                      >
                        Respond
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
            <DialogDescription>
              Send a response to the customer about their feedback.
              {selectedReview && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center mb-2">
                    {renderRatingStars(selectedReview.rating)}
                  </div>
                  <p className="text-sm">{selectedReview.comment}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Type your response here..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            className="min-h-[150px]"
          />
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsResponseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendResponse}>
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  function renderRatingStars(rating: number) {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-foodie-rating text-foodie-rating" : "text-gray-300"}
        />
      ));
  }

  function handleSendResponse() {
    // In a real application, this would send an email to the user
    // For now, we'll just simulate success
    toast({
      title: "Response sent",
      description: `Your response to the review has been sent.`,
    });
    
    setIsResponseDialogOpen(false);
    setResponseText("");
  }
};

export default ReviewsManagement;
