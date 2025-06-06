
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOptimizedCart } from '@/hooks/useOptimizedCart';

const CartIndicator: React.FC = () => {
  const { cartSummary } = useOptimizedCart();

  if (cartSummary.isEmpty) return null;

  return (
    <Button variant="ghost" size="sm" className="relative" asChild>
      <Link to="/cart">
        <ShoppingCart className="w-5 h-5" />
        {cartSummary.itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {cartSummary.itemCount > 99 ? '99+' : cartSummary.itemCount}
          </Badge>
        )}
        <span className="sr-only">
          Panier avec {cartSummary.itemCount} article{cartSummary.itemCount > 1 ? 's' : ''}
        </span>
      </Link>
    </Button>
  );
};

export default CartIndicator;
