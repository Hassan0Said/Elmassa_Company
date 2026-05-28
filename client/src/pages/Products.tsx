import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Filter, ArrowRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import electrical1 from  '../images/جهاز_كهربائي_متميز.jpg';
import electrical2 from '../images/وحدة_طاقة_صناعية_كبيرة.png';
import electrical3 from  '../images/لوحة_تحكم_ذكية.jpg';

import heater1 from '../images/سخان_مائي_كهربائي.webp';
import heater2 from  '../images/سخان_محمول.webp';
import heater3 from '../images/سخان_صناعي.webp';

import iron1 from  '../images/مكواة_بخار_برو.jpg';
import iron2 from  '../images/مكوارة_رقمية.webp';
import iron3 from  '../images/مكواة_قوية_ومتينة.webp';

import car1 from '../images/طقم_محرك.jpg';
import car2 from '../images/بطاريات_السيارة.jpg';
import car3 from '../images/ناقل_حركة_سيارة.jpg';
import car4 from  '../images/مجموعة_فلاتر_سيارات.jpg';

import kitchen1 from '../images/طقم_أواني_طهي.webp';
import kitchen2 from '../images/أدوات_مطبخ_برو.jpg';
import kitchen3 from '../images/خلاط_كهربائي.webp';
import kitchen4 from '../images/كاتل_كهربائي.webp';

import washer1 from '../images/غسالة_ذكية.webp';
import washer2 from '../images/غسالة_صغيرة.jpg';
import washer3 from '../images/غسالة_أطباق.jpg';

const Products = () => {
  const { t, language, dir } = useLanguage();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Parse category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, [location]);

  const categories = [
    { value: 'all', label: t('products.all') },
    { value: 'electrical', label: language === 'ar' ? 'الأجهزة الكهربائية' : 'Electrical Appliances' },
    { value: 'heaters', label: language === 'ar' ? 'السخانات الكهربائية' : 'Electric Heaters' },
    { value: 'irons', label: language === 'ar' ? 'المكاوي' : 'Irons' },
    { value: 'carparts', label: language === 'ar' ? 'قطع غيار السيارات' : 'Car Spare Parts' },
    { value: 'kitchen', label: language === 'ar' ? 'أدوات المطبخ' : 'Kitchen Tools' },
    { value: 'washers', label: language === 'ar' ? 'الغسالات' : 'Washing Machines' },
  ];

const allProducts = [
  // ELECTRICAL
  {
    id: 1,
    name: 'Premium Electrical Appliance',
    ar: 'جهاز كهربائي متميز',
    category: 'electrical',
    image: electrical1,
    rating: 4.8,
    desc: { en: 'High efficiency electrical device', ar: 'جهاز كهربائي عالي الكفاءة' }
  },
  {
    id: 2,
    name: 'Industrial Power Unit',
    ar: 'وحدة طاقة صناعية',
    category: 'electrical',
    image: electrical2,
    rating: 4.7,
    desc: { en: 'Heavy-duty industrial power system', ar: 'نظام طاقة صناعي قوي' }
  },
  {
    id: 3,
    name: 'Smart Control Panel',
    ar: 'لوحة تحكم ذكية',
    category: 'electrical',
    image: electrical3,
    rating: 4.6,
    desc: { en: 'Advanced smart control system', ar: 'نظام تحكم ذكي متطور' }
  },

  // HEATERS
  {
    id: 4,
    name: 'Electric Water Heater',
    ar: 'سخان ماء كهربائي',
    category: 'heaters',
    image: heater1,
    rating: 4.6,
    desc: { en: 'Fast heating water system', ar: 'نظام تسخين سريع للمياه' }
  },

  {
    id: 5,
    name: 'Portable Heater',
    ar: 'سخان محمول',
    category: 'heaters',
    image: heater2,
    rating: 4.4,
    desc: { en: 'Compact portable heating device', ar: 'سخان صغير وسهل الحمل' }
  },

  {
    id: 6,
    name: 'Industrial Heater',
    ar: 'سخان صناعي',
    category: 'heaters',
    image: heater3,
    rating: 4.7,
    desc: { en: 'High power industrial heater', ar: 'سخان صناعي عالي القدرة' }
  },

  // IRONS
  {
    id: 7,
    name: 'Steam Iron Pro',
    ar: 'مكواة بخار برو',
    category: 'irons',
    image: iron1,
    rating: 4.7,
    desc: { en: 'Professional steam ironing system', ar: 'مكواة بخار احترافية' }
  },

  {
    id: 8,
    name: 'Digital Iron',
    ar: 'مكواة رقمية',
    category: 'irons',
    image: iron2,
    rating: 4.6,
    desc: { en: 'Smart temperature control iron', ar: 'مكواة بتحكم ذكي في الحرارة' }
  },

  {
    id: 9,
    name: 'Heavy Duty Iron',
    ar: 'مكواة قوية',
    category: 'irons',
    image: iron3,
    rating: 4.5,
    desc: { en: 'Strong durable ironing tool', ar: 'مكواة قوية ومتينة' }
  },

  // CAR PARTS
  {
    id: 10,
    name: 'Engine Kit',
    ar: 'طقم محرك',
    category: 'carparts',
    image: car1,
    rating: 4.7,
    desc: { en: 'Complete engine replacement kit', ar: 'طقم محرك كامل' }
  },
  {
    id: 11,
    name: 'Car Battery',
    ar: 'بطارية سيارة',
    category: 'carparts',
    image: car2,
    rating: 4.6,
    desc: { en: 'High performance car battery', ar: 'بطارية سيارة عالية الأداء' }
  },
  {
    id: 12,
    name: 'Transmission System',
    ar: 'ناقل الحركة',
    category: 'carparts',
    image: car3,
    rating: 4.5,
    desc: { en: 'Automatic transmission system', ar: 'نظام ناقل حركة أوتوماتيك' }
  },
  {
    id: 13,
    name: 'Car Filters Set',
    ar: 'مجموعة فلاتر سيارات',
    category: 'carparts',
    image: car4,
    rating: 4.5,
    desc: { en: 'Air and oil filters set', ar: 'مجموعة فلاتر هواء وزيت' }
  },

  // KITCHEN
  {
    id: 14,
    name: 'Cookware Set',
    ar: 'طقم أواني طهي',
    category: 'kitchen',
    image: kitchen1,
    rating: 4.9,
    desc: { en: 'Premium stainless cookware set', ar: 'طقم أواني ستانلس ممتاز' }
  },
  {
    id: 15,
    name: 'Kitchen Tools Pro',
    ar: 'أدوات مطبخ برو',
    category: 'kitchen',
    image: kitchen2,
    rating: 4.8,
    desc: { en: 'Professional kitchen tools set', ar: 'أدوات مطبخ احترافية' }
  },
  {
    id: 16,
    name: 'Blender Set',
    ar: 'خلاط كهربائي',
    category: 'kitchen',
    image: kitchen3,
    rating: 4.7,
    desc: { en: 'High speed blender machine', ar: 'خلاط عالي السرعة' }
  },
  {
    id: 17,
    name: 'Electric Kettle',
    ar: 'كاتل كهربائي',
    category: 'kitchen',
    image: kitchen4,
    rating: 4.6,
    desc: { en: 'Fast boiling electric kettle', ar: 'غلاية مياه كهربائية سريعة' }
  },

  // WASHERS
  {
    id: 18,
    name: 'Smart Washer',
    ar: 'غسالة ذكية',
    category: 'washers',
    image: washer1,
    rating: 4.9,
    desc: { en: 'AI powered washing machine', ar: 'غسالة ذكية بالذكاء الاصطناعي' }
  },
  {
    id: 19,
    name: 'Mini Washer',
    ar: 'غسالة صغيرة',
    category: 'washers',
    image: washer2,
    rating: 4.4,
    desc: { en: 'Compact washing machine', ar: 'غسالة صغيرة الحجم' }
  },
  {
    id: 20,
    name: 'Dishwasher',
    ar: 'غسالة أطباق',
    category: 'washers',
    image: washer3,
    rating: 4.7,
    desc: { en: 'Automatic dishwashing machine for kitchen use', ar: 'غسالة أطباق أوتوماتيك للمطبخ' }
  }
];
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const name = language === 'ar' ? product.ar : product.name;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">{t('products.title')}</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' ? 'اكتشف مجموعتنا المتميزة من المنتجات والحلول الصناعية' : 'Discover our premium collection of industrial products and solutions'}
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-card p-6 rounded-2xl shadow-lg border border-border/50">
            <div className="relative w-full md:w-1/2">
              <Search size={20} className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-muted-foreground`} />
              <Input
                type="text"
                placeholder={t('products.search')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={`${language === 'ar' ? 'pr-12' : 'pl-12'} h-12 bg-background border-border/50 focus:border-gold rounded-xl`}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`rounded-full px-6 whitespace-nowrap ${
                    selectedCategory === cat.value ? 'bg-gold text-navy hover:bg-gold/90' : 'hover:border-gold hover:text-gold'
                  }`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground">{language === 'ar' ? 'لم يتم العثور على منتجات تطابق بحثك' : 'No products found matching your search'}</p>
              </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredProducts.map((product) => {
                  const isFav = isFavorite(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
<Card className="group h-[560px] overflow-hidden rounded-3xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col bg-card">

  {/* Product Image */}
  <div className="relative h-[340px] bg-white overflow-hidden flex items-center justify-center">
    
    <img
      src={product.image}
      alt={language === 'ar' ? product.ar : product.name}
      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
    />

    {/* Favorite Button */}
    <button
      type="button"
      onClick={() =>
        isFav
          ? removeFavorite(product.id)
          : addFavorite(product.id)
      }
      className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg z-10 ${
        isFav
          ? 'bg-red-500 text-white'
          : 'bg-white/90 text-gray-400 hover:text-red-500'
      }`}
    >
      <Heart
        size={18}
        fill={isFav ? 'currentColor' : 'none'}
      />
    </button>
  </div>

  {/* Header */}
  <CardHeader className="pb-2 pt-5">
    
    <div className="flex justify-between items-center mb-3">
      
      <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full">
        {product.category}
      </span>

      <div className="flex items-center gap-1 text-gold">
        <Star size={15} fill="currentColor" />
        <span className="text-sm font-bold">
          {product.rating}
        </span>
      </div>
    </div>

    <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-gold transition-colors line-clamp-1">
      {language === 'ar' ? product.ar : product.name}
    </h3>
  </CardHeader>

  {/* Description */}
  <CardContent className="flex-grow">
    <p className="text-base text-muted-foreground leading-7 line-clamp-3">
      {language === 'ar'
        ? product.desc.ar
        : product.desc.en}
    </p>
  </CardContent>

  {/* Footer */}
  <CardFooter className="grid grid-cols-2 gap-4 pt-5 border-t border-border/50">
    
    <Button
      variant="outline"
      className="font-bold rounded-2xl border-gold text-gold hover:bg-gold/10 h-12"
      asChild
    >
      <Link href={`/product/${product.id}`}>
        {t('products.learnMore')}
      </Link>
    </Button>

    <Button
      className="bg-navy text-white hover:bg-navy/90 font-bold rounded-2xl h-12"
      asChild
    >
        <Link
          href={`/quotation?product=${
            encodeURIComponent(
              language === 'ar'
                ? product.ar
                : product.name
            )
          }`}
        >       
         <ShoppingCart size={17} className="me-2" />
        {language === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
      </Link>
    </Button>
  </CardFooter>
</Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          <motion.p 
            layout
            className="text-center text-muted-foreground mt-16 font-medium"
          >
            {language === 'ar' ? `تم العثور على ${filteredProducts.length} منتج` : `Found ${filteredProducts.length} products`}
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
