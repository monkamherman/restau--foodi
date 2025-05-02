
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Utensils, 
  Tag, 
  Ticket, 
  ShoppingBag, 
  Star, 
  Users,
  ChevronDown, 
  Menu, 
  X, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Dishes", href: "/admin/dishes", icon: <Utensils size={18} /> },
    { name: "Promotions", href: "/admin/promotions", icon: <Tag size={18} /> },
    { name: "Coupons", href: "/admin/coupons", icon: <Ticket size={18} /> },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingBag size={18} /> },
    { name: "Reviews", href: "/admin/reviews", icon: <Star size={18} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={18} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ||
      (path !== "/admin" && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden fixed top-4 right-4 z-40"
          >
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center border-b">
              <div className="bg-foodie-primary text-white font-bold px-2 py-1 rounded text-xl">
                ADMIN
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="ml-auto">
                <X size={18} />
              </Button>
            </div>
            <div className="flex-1 py-4">
              <ul className="space-y-1 px-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                        isActive(item.href)
                          ? "bg-foodie-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full flex items-center gap-2 justify-start" 
                onClick={signOut}
              >
                <LogOut size={18} />
                Sign out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link to="/admin" className="flex items-center">
              <div className="bg-foodie-primary text-white font-bold px-2 py-1 rounded text-xl">
                ADMIN
              </div>
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive(item.href)
                      ? "bg-foodie-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className="mr-3">{item.icon}</div>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button 
              variant="ghost" 
              className="w-full flex items-center gap-2 justify-start" 
              onClick={signOut}
            >
              <LogOut size={18} />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="min-h-screen max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
