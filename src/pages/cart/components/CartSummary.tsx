
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = React.memo(({
  itemCount,
  subtotal,
  deliveryFee,
  total,
  onCheckout,
  isLoading = false
}) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Résumé de la commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Articles ({itemCount})</span>
            <span className="font-medium">{subtotal.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frais de livraison</span>
            <span className="font-medium">{deliveryFee.toFixed(2)}€</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onCheckout}
          className="w-full" 
          disabled={itemCount === 0 || isLoading}
        >
          {isLoading ? 'Traitement...' : 'Procéder au paiement'}
        </Button>
      </CardContent>
    </Card>
  );
});

CartSummary.displayName = 'CartSummary';

export default CartSummary;
