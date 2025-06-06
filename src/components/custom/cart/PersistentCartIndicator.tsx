
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCartPersistence } from '@/hooks/useCartPersistence';
import { Link } from 'react-router-dom';

const PersistentCartIndicator: React.FC = () => {
  const { getCartSummary } = useCartPersistence();
  const { itemCount, isEmpty } = getCartSummary();

  if (isEmpty) return null;

  return (
    <Button variant="ghost" size="sm" className="relative" asChild>
      <Link to="/cart">
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

export default PersistentCartIndicator;
