
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const EmptyCart: React.FC = () => {
  return (
    <Card className="text-center py-16">
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Votre panier est vide</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Il semble que vous n'ayez encore ajouté aucun article à votre panier. 
            Découvrez notre délicieux menu !
          </p>
        </div>
        
        <Button asChild>
          <Link to="/menu">
            Parcourir le menu
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyCart;
