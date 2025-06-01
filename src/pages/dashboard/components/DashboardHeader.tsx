
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

const DashboardHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-foodie-primary hover:text-foodie-primary-dark">
            ← Retour au site
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell size={20} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <User size={20} className="text-gray-600" />
            <span className="text-sm font-medium">{user?.email}</span>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut size={16} className="mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
