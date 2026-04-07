import LinkedinIcon from "@/components/ui/icons";

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => (
  <footer className="bg-obsidian py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        
        {/* Logo + desc */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-primary-foreground tracking-tight">
              TheProcessInsights
            </span>
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
            Building the causal infrastructure for the future of industrial intelligence and scientific operational control.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="text-xs font-semibold text-primary-foreground uppercase tracking-wider mb-4">
            Navigate
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Home", id: "home" },
              { label: "Platform", id: "platform" },
              { label: "Solutions", id: "solutions" },
              { label: "Resources", id: "resources" },
              { label: "Company", id: "about" },
              { label: "Join Team", id: "careers" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-sm text-primary-foreground/60 hover:text-teal transition-colors duration-200"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-xs font-semibold text-primary-foreground uppercase tracking-wider mb-4">
            Connect
          </h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li>
              <a href="mailto:info@tpisystems.com" className="hover:text-teal transition-colors">
                info@tpisystems.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/tpisystems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-teal transition-colors"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-primary-foreground/40">
          © 2026 TPI Systems. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 cursor-pointer transition-colors">
            Privacy Policy
          </span>
          <span className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 cursor-pointer transition-colors">
            Terms of Service
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;