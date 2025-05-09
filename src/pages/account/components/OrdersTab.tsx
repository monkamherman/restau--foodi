
import EmptyState from "./EmptyState";
import { ShoppingBag } from "lucide-react";

const OrdersTab = () => {
  return (
    <EmptyState
      icon={ShoppingBag}
      title="Order History"
      description="You haven't placed any orders yet."
      linkText="Browse Menu"
      linkUrl="/menu"
    />
  );
};

export default OrdersTab;
