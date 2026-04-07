import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ManageResources from "@/components/admin/ManageResources";
import ManageCareers from "@/components/admin/ManageCareers";
import { FileText, Briefcase, LogOut, Menu, X } from "lucide-react";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<"resources" | "careers">("resources");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { signOut, user } = useAuth();

  const navItems = [
    { id: "resources" as const, label: "Manage Resources", icon: FileText },
    { id: "careers" as const, label: "Manage Careers", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-canvas">
      {/* Mobile Header (Visible only on small screens) */}
      <div 
        className="md:hidden flex items-center justify-between p-4 border-b sticky top-0 z-30"
        style={{
          background: "hsl(222 47% 11%)",
          borderColor: "hsl(222 47% 18%)",
        }}
      >
        <div className="flex items-center gap-2">
          {/* <span className="text-xl font-bold" style={{ color: "hsl(174 85% 32%)" }}>π</span> */}
          <span className="text-sm font-bold text-white">TPI Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 inset-y-0 left-0 z-50 w-64 border-r flex flex-col shrink-0 
          h-screen transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
        style={{
          background: "hsl(222 47% 11%)",
          borderColor: "hsl(222 47% 18%)",
        }}
      >
        {/* Logo (Hidden on mobile as it's already in the mobile header) */}
        <div className="hidden md:block p-5 border-b" style={{ borderColor: "hsl(222 47% 18%)" }}>
          <div className="flex items-center gap-2">
            {/* <span className="text-xl font-bold" style={{ color: "hsl(174 85% 32%)" }}>π</span> */}
            <span className="text-sm font-bold text-white">TPI Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 mt-4 md:mt-0 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setIsMobileOpen(false); // Auto-close menu on mobile after selection
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200"
              style={{
                background: activeView === item.id ? "hsl(174 85% 32% / 0.15)" : "transparent",
                color: activeView === item.id ? "hsl(174 85% 32%)" : "hsl(215 16% 65%)",
              }}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t" style={{ borderColor: "hsl(222 47% 18%)" }}>
          <p className="text-xs mb-2 px-3 truncate" style={{ color: "hsl(215 16% 50%)" }}>
            {user?.email}
          </p>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200"
            style={{ color: "hsl(0 84% 65%)" }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeView === "resources" && <ManageResources />}
          {activeView === "careers" && <ManageCareers />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;