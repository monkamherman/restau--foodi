
import EmptyState from "./EmptyState";
import { Star } from "lucide-react";

const ReviewsTab = () => {
  return (
    <EmptyState
      icon={Star}
      title="Your Reviews"
      description="You haven't left any reviews yet."
      linkText="Browse Menu"
      linkUrl="/menu"
    />
  );
};

export default ReviewsTab;
