
import DashboardStats from '../components/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardHome = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Gérez votre restaurant depuis un seul endroit</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="py-4 text-center text-gray-500">Fonctionnalité à venir</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Plats populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="py-4 text-center text-gray-500">Fonctionnalité à venir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
