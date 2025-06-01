
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Coupon {
  id: string;
  code: string;
  discount_amount: number | null;
  discount_percentage: number | null;
  is_active: boolean;
  start_date: string;
  end_date: string;
  current_uses: number;
  max_uses: number | null;
}

const CouponsManagement = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCoupons(data || []);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Coupons</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Coupon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">Chargement des coupons...</div>
          ) : coupons.length === 0 ? (
            <div className="py-8 text-center text-gray-500">Aucun coupon trouvé</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Réduction</TableHead>
                  <TableHead>Utilisations</TableHead>
                  <TableHead>Validité</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-mono">{coupon.code}</TableCell>
                    <TableCell>
                      {coupon.discount_percentage 
                        ? `${coupon.discount_percentage}%`
                        : `${coupon.discount_amount}€`
                      }
                    </TableCell>
                    <TableCell>
                      {coupon.current_uses}/{coupon.max_uses || '∞'}
                    </TableCell>
                    <TableCell>
                      {new Date(coupon.start_date).toLocaleDateString('fr-FR')} - {' '}
                      {new Date(coupon.end_date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Badge className={coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {coupon.is_active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponsManagement;
