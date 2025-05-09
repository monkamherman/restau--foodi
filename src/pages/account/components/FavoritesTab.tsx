
import EmptyState from "./EmptyState";
import { Heart } from "lucide-react";

const FavoritesTab = () => {
  return (
    <EmptyState
      icon={Heart}
      title="Favorite Dishes"
      description="You don't have any favorite dishes yet."
      linkText="Browse Menu"
      linkUrl="/menu"
    />
  );
};

export default FavoritesTab;
