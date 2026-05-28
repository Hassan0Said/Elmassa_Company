import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import logo from "../images/logo.png";

const Footer = () => {
  const { t, dir } = useLanguage();

  const linkStyle =
    "text-gray-400 hover:text-yellow-400 transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300";

  return (
    <footer
      className="bg-gradient-to-b from-[#0B1C39] to-[#070f1d] text-white pt-10 pb-6"
      dir={dir}
    >
      <div className="container mx-auto px-4">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* BRAND */}
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 border border-yellow-400/20 p-2"
                >
                  <img src={logo} alt="ELMASSA" className="w-full h-full object-contain" />
                </motion.div>

                <h2 className="text-yellow-400 font-bold text-2xl group-hover:tracking-wide transition-all">
                  {t('hero.title')}
                </h2>
              </a>
            </Link>

            <p className="text-gray-400 text-sm leading-6">
              {t('about.mission_text')}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-5 border-s-4 border-yellow-400 ps-3">
              {t('footer.quickLinks')}
            </h3>

            <ul className="space-y-3">
              <li><Link href="/"><a className={linkStyle}>{t('nav.home')}</a></Link></li>
              <li><Link href="/products"><a className={linkStyle}>{t('nav.products')}</a></Link></li>
              <li><Link href="/agencies"><a className={linkStyle}>{t('nav.agencies')}</a></Link></li>
              <li><Link href="/contact"><a className={linkStyle}>{t('nav.contact')}</a></Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-5 border-s-4 border-yellow-400 ps-3">
              {t('footer.company')}
            </h3>

            <ul className="space-y-3">
              <li><Link href="/favorites"><a className={linkStyle}>{t('nav.favorites')}</a></Link></li>
              <li><Link href="/quotation"><a className={linkStyle}>{t('nav.quotation')}</a></Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-5 border-s-4 border-yellow-400 ps-3">
              {t('contact.info')}
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm">

              <li className="flex gap-3 items-start">
                <MapPin size={25} className="text-yellow-400" />
                <span>{t('about.address')}</span>
              </li>

              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-yellow-400" />
                <a href="tel:+201009013000" className="hover:text-yellow-400 transition">
                  +20 100 901 3000
                </a>
              </li>

              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-yellow-400" />
                <a
                  href="mailto:Companyelmassa262@gmail.com"
                  className="hover:text-yellow-400 transition"
                >
                  Companyelmassa262@gmail.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-2">

          <p className="hover:text-yellow-400 transition">
            {t('footer.copyright')}
          </p>

          <div className="flex gap-6">
            <span className="hover:text-yellow-400 cursor-pointer transition">
              {t('footer.privacy')}
            </span>
            <span className="hover:text-yellow-400 cursor-pointer transition">
              {t('footer.terms')}
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;