import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Gamepad2, Wrench, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";

const navItems = [
  { label: "Inicio", icon: Home, target: "inicio" },
  { label: "Features", icon: Gamepad2, target: "features" },
  { label: "Tools", icon: Wrench, target: "tools" },
];

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button onClick={handleClick} className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
          <img src={logo} alt="UrChoice logo" width={40} height={40} />
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => scrollToSection(item.target)}
                className="flex items-center gap-2 font-body text-muted-foreground hover:text-primary transition-colors duration-300 text-lg font-medium bg-transparent border-none cursor-pointer"
              >
                <item.icon size={18} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="flex flex-col gap-4 p-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => { scrollToSection(item.target); setMobileMenu(false); }}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-lg font-medium font-body bg-transparent border-none cursor-pointer w-full text-left"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;