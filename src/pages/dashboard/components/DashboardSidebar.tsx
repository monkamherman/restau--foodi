
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Utensils, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Calendar,
  Tag, 
  Settings,
  BarChart3
} from 'lucide-react';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      title: 'Accueil', 
      href: '/dashboard', 
      icon: Home,
      exact: true
    },
    { 
      title: 'Statistiques', 
      href: '/dashboard/stats', 
      icon: BarChart3 
    },
    { 
      title: 'Plats', 
      href: '/dashboard/dishes', 
      icon: Utensils 
    },
    { 
      title: 'Commandes', 
      href: '/dashboard/orders', 
      icon: ShoppingBag 
    },
    { 
      title: 'Réservations', 
      href: '/dashboard/reservations', 
      icon: Calendar 
    },
    { 
      title: 'Utilisateurs', 
      href: '/dashboard/users', 
      icon: Users 
    },
    { 
      title: 'Avis', 
      href: '/dashboard/reviews', 
      icon: MessageSquare 
    },
    { 
      title: 'Coupons', 
      href: '/dashboard/coupons', 
      icon: Tag 
    },
    { 
      title: 'Paramètres', 
      href: '/dashboard/settings', 
      icon: Settings 
    },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive(item.href, item.exact)
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
