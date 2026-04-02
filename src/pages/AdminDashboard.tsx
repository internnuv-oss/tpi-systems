import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ManageResources from "@/components/admin/ManageResources";
import ManageCareers from "@/components/admin/ManageCareers";
import { FileText, Briefcase, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<"resources" | "careers">("resources");
  const { signOut, user } = useAuth();

  const navItems = [
    { id: "resources" as const, label: "Manage Resources", icon: FileText },
    { id: "careers" as const, label: "Manage Careers", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex bg-canvas">
      {/* Sidebar */}
      <aside
        className="w-64 border-r flex flex-col shrink-0"
        style={{
          background: "hsl(222 47% 11%)",
          borderColor: "hsl(222 47% 18%)",
        }}
      >
        {/* Logo */}
        <div className="p-5 border-b" style={{ borderColor: "hsl(222 47% 18%)" }}>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold" style={{ color: "hsl(174 85% 32%)" }}>π</span>
            <span className="text-sm font-bold text-white">TPI Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
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

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {activeView === "resources" && <ManageResources />}
          {activeView === "careers" && <ManageCareers />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
