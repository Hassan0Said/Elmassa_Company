import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Heart, Trash2, ShoppingCart, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// استيراد مكونات البوب أب من شاد سين
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ================= IMAGES =================
import electrical1 from '../images/جهاز_كهربائي_متميز.jpg';
import electrical2 from '../images/وحدة_طاقة_صناعية_كبيرة.png';
import electrical3 from '../images/لوحة_تحكم_ذكية.jpg';

import heater1 from '../images/سخان_مائي_كهربائي.webp';
import heater2 from '../images/سخان_محمول.webp';
import heater3 from '../images/سخان_صناعي.webp';

import iron1 from '../images/مكواة_بخار_برو.jpg';
import iron2 from '../images/مكوارة_رقمية.webp';
import iron3 from '../images/مكواة_قوية_ومتينة.webp';

import car1 from '../images/طقم_محرك.jpg';
import car2 from '../images/بطاريات_السيارة.jpg';
import car3 from '../images/ناقل_حركة_سيارة.jpg';
import car4 from '../images/مجموعة_فلاتر_سيارات.jpg';

import kitchen1 from '../images/طقم_أواني_طهي.webp';
import kitchen2 from '../images/أدوات_مطبخ_برو.jpg';
import kitchen3 from '../images/خلاط_كهربائي.webp';
import kitchen4 from '../images/كاتل_كهربائي.webp';

import washer1 from '../images/غسالة_ذكية.webp';
import washer2 from '../images/غسالة_صغيرة.jpg';
import washer3 from '../images/غسالة_أطباق.jpg';

const Favorites = () => {
  const { t, language, dir } = useLanguage();
  const { favorites, addFavorite, removeFavorite, clearFavorites, isFavorite } = useFavorites();
  const [, setLocation] = useLocation();

  // مصفوفة المنتجات الموحدة والمطابقة تماماً لصفحة المنتجات والصفحة الرئيسية
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

  const favoriteProducts = allProducts.filter(p => 
    favorites.map(id => String(id)).includes(String(p.id))
  );

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                {t('favorites.title')}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `لديك ${favorites.length} منتجات في قائمتك` 
                  : `You have ${favorites.length} items in your list`}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <div className="flex flex-wrap gap-4">
                
                {/* بوب أب التأكيد لمسح الكل */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl h-12 px-5"
                    >
                      <Trash2 size={18} className="me-2" />
                      {t('favorites.clear')}
                    </Button>
                  </AlertDialogTrigger>
                  
                  <AlertDialogContent className="rounded-3xl max-w-[400px]" dir={dir}>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold">
                        {language === 'ar' ? 'هل أنت متأكد تماماً؟' : 'Are you absolutely sure?'}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-base pt-2">
                        {language === 'ar' 
                          ? 'سيؤدي هذا الإجراء إلى إزالة جميع المنتجات التي قمت بحفظها في قائمة المفضلات الحالية.' 
                          : 'This action will remove all the items you have saved in your current favorites list.'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-3">
                      <AlertDialogCancel className="rounded-xl border-border h-11 font-medium">
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 font-medium"
                        onClick={clearFavorites}
                      >
                        {language === 'ar' ? 'نعم، امسح الكل' : 'Yes, clear all'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button 
                  className="bg-gold text-navy font-bold hover:bg-gold/90 rounded-xl h-12 px-6"
                  onClick={() => setLocation('/quotation')}
                >
                  <ShoppingCart size={18} className="me-2" />
                  {t('favorites.requestQuote')}
                </Button>
              </div>
            )}
          </motion.div>

          <AnimatePresence mode="popLayout">
            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {favoriteProducts.map((product) => {
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
                      {/* الكارد الرئيسي */}
                      <Card className="group h-[560px] overflow-hidden rounded-3xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col bg-card">
                        
                        {/* صورة المنتج بزر المفضلة */}
                        <div className="relative h-[340px] bg-white overflow-hidden flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={language === 'ar' ? product.ar : product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />

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

                        {/* تفاصيل الكارد */}
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

                        {/* الوصف */}
                        <CardContent className="flex-grow">
                          <p className="text-base text-muted-foreground leading-7 line-clamp-3">
                            {language === 'ar' ? product.desc.ar : product.desc.en}
                          </p>
                        </CardContent>

                        {/* أزرار: تعرف على المزيد & طلب عرض سعر */}
                        <CardFooter className="grid grid-cols-2 gap-4 pt-5 border-t border-border/50">
                          <Button
                            variant="outline"
                            className="font-bold rounded-2xl border-gold text-gold hover:bg-gold/10 h-12"
                            asChild
                          >
                            <Link href={`/product/${product.id}`}>
                              {language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}
                            </Link>
                          </Button>

                          <Button
                            className="bg-navy text-white hover:bg-navy/90 font-bold rounded-2xl h-12"
                            asChild
                          >
                            <Link
                              href={`/quotation?product=${
                                encodeURIComponent(
                                  language === 'ar' ? product.ar : product.name
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
            ) : (
              /* ================= تعديل المظهر الجمالي فقط هنا لتجنب أي إيرور ================= */
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-16 px-6 bg-gradient-to-b from-secondary/40 via-secondary/20 to-background rounded-3xl border border-border/60 shadow-md relative overflow-hidden"
              >
                {/* تأثير الدائرة الخلفية الناعمة */}
                <div className="absolute -top-10 -left-10 w-28 h-28 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* أيقونة القلب بتأثير نبض أنيق */}
                <div className="w-24 h-24 bg-background border border-border/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <Heart size={44} className="text-gold/80" strokeWidth={1.5} />
                  </motion.div>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  {language === 'ar' ? 'قائمة المفضلات فارغة حالياً' : 'Your Favorites List is Empty!'}
                </h2>
                
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                  {language === 'ar' 
                    ? 'تصفح منتجاتنا المميزة وقم بإضافة خياراتك المفضلة هنا للوصول إليها بسهولة أو لطلب عرض أسعار مجمع لاحقاً.' 
                    : 'Explore our product lineup and save your favorite choices here to easily request a customized quote later.'}
                </p>

                <Button 
                  className="bg-gold text-navy font-bold hover:bg-gold/90 px-8 py-6 rounded-xl text-base shadow-sm group transition-all"
                  onClick={() => setLocation('/products')}
                >
                  {language === 'ar' ? 'ابدأ بتصفح المنتجات' : 'Browse Products'} 
                  <ArrowRight size={18} className="ms-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;