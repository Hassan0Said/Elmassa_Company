import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Zap, Award, Shield, Info, Target, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import logo from '../images/logo.png';
import electrical from '../images/الأجهزة_الكهربائية.png';
import heaters from '../images/السخانات_الكهربائية.jpg';
import irons from '../images/المكاوي_الكهربائية.webp';
import carparts from '../images/قطع_غيار_السيارات.jpg';
import kitchen from '../images/أدوات_المطبخ.png';
import washers from '../images/الغسلات.png';

const Home = () => {
  const { t, language, dir } = useLanguage();
  const [, setLocation] = useLocation();
  const [counters, setCounters] = useState({ years: 0, products: 0, clients: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        years: prev.years < 9 ? prev.years + 1 : 9,
        products: prev.products < 500 ? prev.products + 10 : 500,
        clients: prev.clients < 1000 ? prev.clients + 20 : 1000,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: 101,
      name: 'Electrical Appliances',
      ar: 'الأجهزة الكهربائية',
      image: electrical,
      desc: { en: 'Premium electrical devices', ar: 'أجهزة كهربائية عالية الجودة' },
      category: 'electrical'
    },
    {
      id: 102,
      name: 'Electric Heaters',
      ar: 'السخانات الكهربائية',
      image: heaters,
      desc: { en: 'High-quality heaters', ar: 'سخانات عالية الجودة' },
      category: 'heaters'
    },
    {
      id: 103,
      name: 'Professional Irons',
      ar: 'المكاوي الاحترافية',
      image: irons,
      desc: { en: 'Durable professional irons', ar: 'مكاوي احترافية متينة' },
      category: 'irons'
    },
    {
      id: 104,
      name: 'Car Spare Parts',
      ar: 'قطع غيار السيارات',
      image: carparts,
      desc: { en: 'Genuine car spare parts', ar: 'قطع غيار أصلية للسيارات' },
      category: 'carparts'
    },
    {
      id: 105,
      name: 'Kitchen Tools',
      ar: 'أدوات المطبخ',
      image: kitchen,
      desc: { en: 'Essential kitchen tools', ar: 'أدوات مطبخ أساسية' },
      category: 'kitchen'
    },
    {
      id: 106,
      name: 'Washing Machines',
      ar: 'الغسالات',
      image: washers,
      desc: { en: 'Modern washing machines', ar: 'غسالات حديثة' },
      category: 'washers'
    },
  ]; 

  const values = [
    { icon: <Shield className="text-gold w-10 h-10" />, title: t('about.quality'), desc: t('about.quality_desc') },
    { icon: <Star className="text-gold w-10 h-10" />, title: t('about.integrity'), desc: t('about.integrity_desc') },
    { icon: <Award className="text-gold w-10 h-10" />, title: t('about.service'), desc: t('about.service_desc') }, // استبدلت الـ Heart بأيقونة الجودة
    { icon: <Zap className="text-gold w-10 h-10" />, title: t('about.innovation'), desc: t('about.innovation_desc') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir={dir}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pb-32 bg-gradient-to-br from-navy/5 to-gold/5 overflow-hidden">
        <motion.div 
          className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-navy/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-display font-bold mb-6 text-foreground leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-gold font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('hero.description')}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-gold to-yellow-600 text-navy font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                onClick={() => setLocation('/products')}
              >
                {t('hero.cta')} <ArrowRight size={20} className={`ms-2 group-hover:${language === 'ar' ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gold text-gold font-bold hover:bg-gold/10 transition-all duration-300"
                onClick={() => setLocation('/quotation')}
              >
                {t('nav.quotation')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-gold mb-2">{counters.years}+</div>
              <p className="text-lg text-gray-300">{t('about.since')}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-gold mb-2">{counters.products}+</div>
              <p className="text-lg text-gray-300">{language === 'ar' ? 'منتجات متميزة' : 'Premium Products'}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-gold mb-2">{counters.clients}+</div>
              <p className="text-lg text-gray-300">{language === 'ar' ? 'عملاء راضون' : 'Satisfied Clients'}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">{t('about.title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gold font-semibold">{t('about.description')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold to-navy rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-card border-none h-full overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-gold/10 rounded-xl">
                    <Target className="text-gold w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">{t('about.mission')}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">{t('about.mission_text')}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-navy to-gold rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-card border-none h-full overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-gold/10 rounded-xl">
                    <Info className="text-gold w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">{t('about.vision')}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">{t('about.vision_text')}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Company Info & Values */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-1 bg-navy rounded-2xl p-8 text-white flex flex-col justify-center text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-2xl border border-gold/20 p-2">
                  <img
                    src={logo}
                    alt="ELMASSA Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>     
              <h3 className="text-3xl font-display font-bold mb-4">{language === 'ar' ? 'معلومات الشركة' : 'Company Info'}</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>{language === 'ar' ? 'تأسست عام' : 'Founded'}</span>
                  <span className="text-gold font-bold">2015</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>{t('about.location')}</span>
                  <span className="text-gold font-medium">{t('about.address')}</span>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-border/50 hover:border-gold/50 transition-colors duration-300 group">
                    <CardHeader className="pb-2">
                      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                      <h4 className="font-display font-bold text-xl text-foreground">{value.title}</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-secondary/20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">{t('products.title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground">{language === 'ar' ? 'استكشف فئات منتجاتنا المتميزة' : 'Explore our premium product categories'}</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {categories.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Card className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-56 bg-white flex items-center justify-center overflow-hidden">
                    
                    <img
                      src={product.image}
                      alt={language === 'ar' ? product.ar : product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                      <Button 
                        variant="secondary" 
                        className="font-bold"
                        onClick={() => setLocation(`/products?category=${product.category}`)}
                      >
                        {t('products.learnMore')}
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-gold transition-colors">
                      {language === 'ar' ? product.ar : product.name}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'ar' ? product.desc.ar : product.desc.en}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-0 border-t border-border/50 mt-4">
                    <Button 
                      variant="link" 
                      className="p-0 text-gold font-bold flex items-center gap-2 group/btn"
                      onClick={() => setLocation(`/products?category=${product.category}`)}
                    >
                      {t('products.learnMore')} 
                      <ArrowRight size={18} className={`group-hover/btn:${language === 'ar' ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button 
              size="lg"
              className="px-12 py-7 bg-navy text-white hover:bg-navy/90 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              onClick={() => setLocation('/products')}
            >
              {language === 'ar' ? 'مشاهدة جميع المنتجات' : 'View All Products'}
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;