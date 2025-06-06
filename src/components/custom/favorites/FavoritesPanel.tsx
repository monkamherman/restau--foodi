
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Heart, Plus, ShoppingCart, Trash, Clock } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useCartPersistence } from '@/hooks/useCartPersistence';

const FavoritesPanel: React.FC = () => {
  const { 
    favorites, 
    quickOrders, 
    removeFromFavorites, 
    createQuickOrder, 
    useQuickOrder, 
    deleteQuickOrder,
    getRecentFavorites,
    getFrequentlyUsedOrders
  } = useFavorites();
  const { addToCart } = useCartPersistence();
  const [newOrderName, setNewOrderName] = useState('');
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

  const recentFavorites = getRecentFavorites();
  const frequentOrders = getFrequentlyUsedOrders();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      category: item.category
    });
  };

  const handleCreateQuickOrder = () => {
    if (!newOrderName.trim() || selectedFavorites.length === 0) return;

    const selectedItems = favorites.filter(item => selectedFavorites.includes(item.id));
    createQuickOrder(newOrderName.trim(), selectedItems);
    
    setNewOrderName('');
    setSelectedFavorites([]);
    setIsCreateOrderOpen(false);
  };

  const handleUseQuickOrder = (orderId: string) => {
    const order = useQuickOrder(orderId);
    if (order) {
      order.items.forEach(item => handleAddToCart(item));
    }
  };

  const toggleFavoriteSelection = (itemId: string) => {
    setSelectedFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Favoris récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Favoris récents
          </CardTitle>
          <CardDescription>
            Vos plats favoris ajoutés récemment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentFavorites.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Aucun favori pour le moment
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentFavorites.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromFavorites(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Commandes rapides */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Commandes rapides
              </CardTitle>
              <CardDescription>
                Vos combinaisons de plats préférées
              </CardDescription>
            </div>
            <Dialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen}>
              <DialogTrigger asChild>
                <Button size="sm" disabled={favorites.length === 0}>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une commande rapide</DialogTitle>
                  <DialogDescription>
                    Sélectionnez vos plats favoris pour créer une commande rapide
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Nom de la commande (ex: Mon menu du soir)"
                    value={newOrderName}
                    onChange={(e) => setNewOrderName(e.target.value)}
                  />
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {favorites.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2 border rounded cursor-pointer transition-colors ${
                          selectedFavorites.includes(item.id)
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleFavoriteSelection(item.id)}
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
                        </div>
                        <div className={`w-4 h-4 rounded border ${
                          selectedFavorites.includes(item.id)
                            ? 'bg-primary border-primary'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleCreateQuickOrder}
                    disabled={!newOrderName.trim() || selectedFavorites.length === 0}
                    className="w-full"
                  >
                    Créer la commande rapide
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {frequentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Aucune commande rapide créée
            </p>
          ) : (
            <div className="space-y-3">
              {frequentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{order.name}</h4>
                    <p className="text-sm text-gray-500">
                      {order.items.length} plat(s) • {order.total.toFixed(2)} €
                    </p>
                    <p className="text-xs text-gray-400">
                      Dernière utilisation : {new Date(order.lastUsed).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUseQuickOrder(order.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteQuickOrder(order.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesPanel;
