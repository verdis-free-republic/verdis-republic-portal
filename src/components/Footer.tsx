import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Government", href: "#government" },
    { label: "Citizenship", href: "#citizenship" },
    { label: "Settlement", href: "#settlement" },
    { label: "Donations", href: "#donations" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-verdis-blue-dark text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold font-montserrat mb-4">
              Free Republic of Verdis
            </h3>
            <p className="font-lora text-white/80 mb-6 max-w-md leading-relaxed">
              A sovereign land of freedom, unity, and opportunity. Building a modern 
              democracy along the beautiful Danube River between Croatia and Serbia.
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-lora text-white/90">
                Danube River Territory, Between Croatia & Serbia
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-lora text-white/90">
                info@verdis-republic.org
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="font-lora text-white/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-6">Connect With Us</h4>
            
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            <div>
              <h5 className="font-semibold font-montserrat mb-3 text-primary">
                Stay Updated
              </h5>
              <p className="font-lora text-white/80 text-sm mb-4">
                Get the latest news about Verdis development and opportunities.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-md text-white placeholder-white/60 focus:outline-none focus:border-primary"
                />
                <button className="px-6 py-2 bg-primary text-white font-semibold rounded-r-md hover:bg-primary/80 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="font-lora text-white/80">
              © {currentYear} Free Republic of Verdis. All Rights Reserved.
            </p>
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right">
            <p className="font-lora text-primary font-medium italic">
              "Verdis: A Land of Freedom, Unity, and Opportunity."
            </p>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            <a href="#" className="font-lora text-white/70 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-lora text-white/70 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-lora text-white/70 hover:text-primary transition-colors">
              Constitution
            </a>
            <a href="#" className="font-lora text-white/70 hover:text-primary transition-colors">
              Legal Framework
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;