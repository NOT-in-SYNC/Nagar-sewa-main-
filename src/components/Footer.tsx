import { MapPin, Mail, Phone, Github, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-civic rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">NagarSewa</h3>
                <p className="text-xs text-muted-foreground">Empowering Communities</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making cities better through citizen engagement and transparent governance.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['How it Works', 'Community Guidelines', 'Success Stories', 'FAQ', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Citizens */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">For Citizens</h4>
            <ul className="space-y-2 text-sm">
              {['Report an Issue', 'Track Your Reports', 'Earn Rewards', 'My Reports', 'Mobile App'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-civic-blue" />
                <span className="text-muted-foreground">support@nagarsewa.in</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-civic-green" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-civic-orange" />
                <span className="text-muted-foreground">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 NagarSewa. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
