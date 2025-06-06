
import React from 'react';
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/hooks/useCartPersistence';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img 
          src={item.image_url || '/placeholder.svg'} 
          alt={item.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-primary font-medium">{item.price.toFixed(2)}€</p>
        {item.category && (
          <p className="text-sm text-muted-foreground">{item.category}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(-1)}
            className="h-8 w-8 p-0"
          >
            <Minus size={16} />
          </Button>
          <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(1)}
            className="h-8 w-8 p-0"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <div className="text-right">
          <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
        </div>
        
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
