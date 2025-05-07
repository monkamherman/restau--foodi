
import { useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { 
  BarChart3, 
  ChefHat, 
  MessageSquare,
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Redirect non-admin users
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  const navigationItems = [
    {
      name: "Tableau de bord",
      href: "/admin",
      icon: BarChart3,
      exact: true,
    },
    {
      name: "Plats",
      href: "/admin/dishes",
      icon: ChefHat,
    },
    {
      name: "Avis clients",
      href: "/admin/reviews",
      icon: MessageSquare,
    },
    {
      name: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      disabled: true,
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
      disabled: true,
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/admin" className="text-xl font-bold text-foodie-primary">
            Admin Panel
          </Link>
          <button 
            className="lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                isActive(item.href, item.exact) 
                  ? "bg-foodie-primary text-white" 
                  : "text-gray-700 hover:bg-gray-100",
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
            >
              <item.icon size={18} className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => signOut()}
          >
            <LogOut size={18} className="mr-3" />
            Déconnexion
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button 
            className="lg:hidden" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Bonjour, Admin
            </span>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
