import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Moon, Sun, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import logo from "../images/logo.png";

const Navbar = () => {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/agencies', label: t('nav.agencies') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const linkStyle =
    "relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-yellow-400 transition-all duration-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300";

  return (
    <nav
      dir={dir}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0b1c39]/80 backdrop-blur-xl py-3 shadow-lg border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <a className="flex items-center gap-3 group">

            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 border border-yellow-400/20 p-2 shadow-md"
            >
              <img src={logo} alt="ELMASSA" className="w-full h-full object-contain" />
            </motion.div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-yellow-400 group-hover:tracking-wide transition-all">
                {t('hero.title')}
              </h1>
                <p className="text-xs tracking-widest text-gold font-bold">
                  {t('nav.slogan')}
                </p>
            </div>

          </a>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map(link => {
            const active = location === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <a
                  className={`${linkStyle} ${
                    active ? "text-yellow-400" : ""
                  }`}
                >
                  {link.label}

                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                    />
                  )}
                </a>
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* FAVORITES */}
          <Link href="/favorites">
            <a className="relative p-2 rounded-full hover:bg-yellow-400/10 transition">
              <Heart
                size={20}
                className={`${
                  favorites.length > 0
                    ? "text-red-500 fill-red-500"
                    : "text-gray-300 hover:text-yellow-400"
                } transition`}
              />

              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 rounded-full font-bold">
                  {favorites.length}
                </span>
              )}
            </a>
          </Link>

          {/* THEME */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-full"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* LANGUAGE */}
          <Button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="hidden sm:flex bg-yellow-400 text-black font-bold rounded-full px-5 hover:scale-105 transition"
          >
            {language === "en" ? "العربية" : "English"}
          </Button>

          {/* MOBILE MENU */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-300"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 mx-4 bg-[#0b1c39]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-5 space-y-3">

              {navLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-300 hover:text-yellow-400 border-b border-white/5"
                  >
                    {link.label}
                  </a>
                </Link>
              ))}

              <Button
                onClick={() => {
                  setLanguage(language === "en" ? "ar" : "en");
                  setIsOpen(false);
                }}
                className="w-full bg-yellow-400 text-black font-bold rounded-xl"
              >
                {language === "en" ? "العربية" : "English"}
              </Button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;