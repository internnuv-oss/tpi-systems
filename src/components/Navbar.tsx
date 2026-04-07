import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  // { id: "home", label: "Home" },
  { id: "platform", label: "Platform" },
  { id: "solutions", label: "Solutions" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "Company" },
  // { id: "investors", label: "Investors" },
];

const Navbar = ({ activeSection, onNavigate }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-md bg-surface/80 border-b border-border">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <button onClick={() => handleNav("home")} className="flex items-center gap-2 cursor-pointer">
          {/* <span className="text-2xl font-extrabold text-teal">π</span> */}
          <span className="text-lg font-bold text-obsidian tracking-tight">TheProcessInsights</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`nav-link pb-1 ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button onClick={() => handleNav("careers")} className="hidden md:inline-flex btn-teal text-xs px-5 py-2.5">
          Join Team
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden text-obsidian" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 pb-4 pt-2 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`block w-full text-left text-sm font-medium py-2 ${activeSection === item.id ? "text-teal" : "text-slate-text"}`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Old button design commented out:
          <button onClick={() => handleNav("careers")} className="btn-teal text-xs px-5 py-2.5 w-fit">
            Join Team
          </button>
          */}
          
          {/* New list-item design for Join Team */}
          <button 
            onClick={() => handleNav("careers")} 
            className={`block w-full text-left text-sm font-medium py-2 ${activeSection === "careers" ? "text-teal" : "text-slate-text"}`}
          >
            Join Team
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;