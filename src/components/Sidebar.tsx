import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { 
  BarChart3, 
  Home, 
  PlusSquare, 
  Calendar, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  LogOut,
  Search,
  Heart,
  User as UserIcon
} from "lucide-react";
import { auth } from "@/src/lib/firebase";

interface SidebarProps {
  role: "student" | "owner";
}

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();

  const ownerLinks = [
    { title: "Dashboard", icon: BarChart3, path: "/owner" },
    { title: "My Properties", icon: Home, path: "/owner/properties" },
    { title: "Add Listing", icon: PlusSquare, path: "/owner/add" },
    { title: "Bookings", icon: Calendar, path: "/owner/bookings" },
    { title: "Students", icon: Users, path: "/owner/students" },
    { title: "Payments", icon: CreditCard, path: "/owner/payments" },
    { title: "Messages", icon: MessageSquare, path: "/owner/messages" },
  ];

  const studentLinks = [
    { title: "Explore", icon: Search, path: "/student" },
    { title: "Saved Rooms", icon: Heart, path: "/student/wishlist" },
    { title: "My Bookings", icon: Calendar, path: "/student/bookings" },
    { title: "Messages", icon: MessageSquare, path: "/student/messages" },
    { title: "Payments", icon: CreditCard, path: "/student/payments" },
    { title: "Profile", icon: UserIcon, path: "/student/profile" },
  ];

  const links = role === "owner" ? ownerLinks : studentLinks;

  return (
    <aside className="w-64 h-screen bg-black border-r border-border fixed left-0 top-0 z-20 flex flex-col">
      <div className="p-8 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center font-display font-black text-black text-sm">
            R
          </div>
          <span className="font-display font-black text-lg tracking-tighter uppercase text-white">RentMate</span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-6 px-2">Navigation</div>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all group",
                isActive 
                  ? "bg-white text-black" 
                  : "text-muted hover:text-white"
              )}
            >
              <link.icon className={cn("w-4 h-4", isActive ? "text-black" : "text-muted group-hover:text-white")} />
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          onClick={() => auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all text-left"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
