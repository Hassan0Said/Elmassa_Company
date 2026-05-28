import { useRoute, useLocation } from 'wouter';
import {
  Heart,
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Award,
  Eye
} from 'lucide-react';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
import washer3 from '../images/غسالة_أطباق.webp';

const ProductDetail = () => {
  const { t, language, dir } = useLanguage();
  const [, params] = useRoute('/product/:id');
  const [, setLocation] = useLocation();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const productId = params?.id ? parseInt(params.id) : 1;

  // قاموس ترجمة المفاتيح الخاصة بالمواصفات
  const specLabels: Record<string, { en: string; ar: string }> = {
    Power: { en: 'Power', ar: 'القدرة' },
    Voltage: { en: 'Voltage', ar: 'الجهد الكهربائي' },
    Warranty: { en: 'Warranty', ar: 'الضمان' },
    Capacity: { en: 'Capacity', ar: 'السعة' }
  };

  // ================= PRODUCTS =================
  const allProducts = [
    {
      id: 1,
      name: 'Premium Electrical Appliance',
      ar: 'جهاز كهربائي متميز',
      category: 'electrical',
      image: electrical1,
      rating: 4.8,
      desc: {
        en: 'High efficiency electrical device',
        ar: 'جهاز كهربائي عالي الكفاءة'
      },
      features: {
        en: [
          'Advanced electrical system',
          'Energy saving technology',
          'High durability',
          'Easy maintenance'
        ],
        ar: [
          'نظام كهربائي متطور',
          'تقنية موفرة للطاقة',
          'متانة عالية',
          'سهولة الصيانة'
        ]
      },
      specs: {
        Power: '2200W',
        Voltage: '220V',
        Warranty: language === 'ar' ? 'سنتين' : '2 Years'
      }
    },

    {
      id: 2,
      name: 'Industrial Power Unit',
      ar: 'وحدة طاقة صناعية',
      category: 'electrical',
      image: electrical2,
      rating: 4.7,
      desc: {
        en: 'Heavy-duty industrial power system',
        ar: 'نظام طاقة صناعي قوي'
      },
      features: {
        en: ['Industrial grade', 'Long life', 'High efficiency'],
        ar: ['جودة صناعية', 'عمر افتراضي طويل', 'كفاءة عالية']
      },
      specs: {
        Power: '3500W',
        Voltage: '380V',
        Warranty: language === 'ar' ? '3 سنوات' : '3 Years'
      }
    },

    {
      id: 3,
      name: 'Smart Control Panel',
      ar: 'لوحة تحكم ذكية',
      category: 'electrical',
      image: electrical3,
      rating: 4.6,
      desc: {
        en: 'Advanced smart control system',
        ar: 'نظام تحكم ذكي متطور'
      },
      features: {
        en: ['Smart sensors', 'Easy control', 'Modern design'],
        ar: ['حساسات ذكية', 'سهولة التحكم', 'تصميم عصري']
      },
      specs: {
        Power: '1800W',
        Voltage: '220V',
        Warranty: language === 'ar' ? 'سنتين' : '2 Years'
      }
    },

    {
      id: 4,
      name: 'Electric Water Heater',
      ar: 'سخان ماء كهربائي',
      category: 'heaters',
      image: heater1,
      rating: 4.6,
      desc: {
        en: 'Fast heating water system',
        ar: 'نظام تسخين سريع للمياه'
      },
      features: {
        en: ['Fast heating', 'Safe usage', 'Energy efficient'],
        ar: ['تسخين سريع', 'أمان عالي', 'موفر للطاقة']
      },
      specs: {
        Capacity: language === 'ar' ? '50 لتر' : '50L',
        Power: '2000W',
        Warranty: language === 'ar' ? '5 سنوات' : '5 Years'
      }
    },

    {
      id: 5,
      name: 'Portable Heater',
      ar: 'سخان محمول',
      category: 'heaters',
      image: heater2,
      rating: 4.4,
      desc: {
        en: 'Compact portable heating device',
        ar: 'سخان صغير وسهل الحمل'
      },
      features: {
        en: ['Portable', 'Lightweight', 'Quick heating'],
        ar: ['سهل الحمل', 'خفيف الوزن', 'تدفئة سريعة']
      },
      specs: {
        Power: '1200W',
        Voltage: '220V',
        Warranty: language === 'ar' ? 'سنة واحدة' : '1 Year'
      }
    },

    {
      id: 6,
      name: 'Industrial Heater',
      ar: 'سخان صناعي',
      category: 'heaters',
      image: heater3,
      rating: 4.7,
      desc: {
        en: 'High power industrial heater',
        ar: 'سخان صناعي عالي القدرة'
      },
      features: {
        en: ['Industrial use', 'Powerful heating', 'Durable'],
        ar: ['للاستخدام الصناعي', 'تدفئة قوية', 'متانة عالية']
      },
      specs: {
        Power: '5000W',
        Voltage: '380V',
        Warranty: language === 'ar' ? '3 سنوات' : '3 Years'
      }
    }
  ];

  const product =
    allProducts.find((p) => p.id === productId) || allProducts[0];

  const isFav = isFavorite(product.id);

  // Similar Products نفس الكاتيجوري فقط
  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">

          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-10 hover:text-gold"
            onClick={() => setLocation('/products')}
          >
            <ArrowLeft size={20} className="me-2 text-current" />
            {language === 'ar' ? 'رجوع' : 'Back'}
          </Button>

          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="overflow-hidden rounded-3xl border-none shadow-2xl bg-white h-[600px] flex items-center justify-center relative">

                <img
                  src={product.image}
                  alt={language === 'ar' ? product.ar : product.name}
                  className="w-full h-full object-contain p-8"
                />

                <button
                  onClick={() =>
                    isFav
                      ? removeFavorite(product.id)
                      : addFavorite(product.id)
                  }
                  className={`absolute top-6 right-6 p-4 rounded-full shadow-xl ${
                    isFav
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-500'
                  }`}
                >
                  <Heart
                    size={22}
                    fill={isFav ? 'currentColor' : 'none'}
                  />
                </button>
              </Card>
            </motion.div>

            {/* INFO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-5">

                <span className="bg-gold/10 text-gold px-4 py-2 rounded-full font-bold uppercase">
                  {product.category}
                </span>

                <div className="flex items-center gap-1 text-gold">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold">
                    {product.rating}
                  </span>
                </div>
              </div>

              <h1 className="text-5xl font-bold mb-8">
                {language === 'ar'
                  ? product.ar
                  : product.name}
              </h1>

              <p className="text-xl text-muted-foreground leading-9 mb-10">
                {language === 'ar'
                  ? product.desc.ar
                  : product.desc.en}
              </p>

              {/* BUTTON */}
              <Button
                size="lg"
                className="bg-gold text-navy hover:bg-gold/90 font-bold h-14 px-10 rounded-2xl mb-10"
                onClick={() =>
                  setLocation(
                    `/quotation?product=${
                      encodeURIComponent(
                        language === 'ar'
                          ? product.ar
                          : product.name
                      )
                    }`
                  )
                }             
              >
                <ShoppingCart size={20} className="me-2" />
                {language === 'ar'
                  ? 'طلب عرض سعر'
                  : 'Request Quote'}
              </Button>

              {/* HIGHLIGHTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="flex items-center gap-3 p-5 rounded-2xl bg-secondary/40">
                  <ShieldCheck className="text-gold" />
                  <span className="font-medium">
                    {language === 'ar'
                      ? 'ضمان معتمد'
                      : 'Certified Warranty'}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-5 rounded-2xl bg-secondary/40">
                  <Clock className="text-gold" />
                  <span className="font-medium">
                    {language === 'ar'
                      ? 'تسليم سريع'
                      : 'Fast Delivery'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FEATURES + SPECS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

            {/* FEATURES */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-gold" />
                {language === 'ar'
                  ? 'المميزات الرئيسية'
                  : 'Main Features'}
              </h2>

              <div className="space-y-4">
                {(language === 'ar'
                  ? product.features.ar
                  : product.features.en
                ).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-5 rounded-2xl bg-card border"
                  >
                    <CheckCircle2 className="text-gold" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                {language === 'ar'
                  ? 'المواصفات'
                  : 'Specifications'}
              </h2>

              <div className="space-y-4">
                {Object.entries(product.specs).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-5 rounded-2xl bg-card border"
                    >
                      <span className="font-bold">
                        {/* ترجمة المفتاح تلقائياً بناءً على اللغة المحددة */}
                        {specLabels[key]
                          ? (language === 'ar' ? specLabels[key].ar : specLabels[key].en)
                          : key}
                      </span>

                      <span className="text-gold font-semibold">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* SIMILAR PRODUCTS */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-14">
              {language === 'ar'
                ? 'منتجات مشابهة'
                : 'Similar Products'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {similarProducts.map((prod) => (
                <Card
                  key={prod.id}
                  className="overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-[280px] bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <CardContent className="p-6 pb-2">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                        {language === 'ar'
                          ? prod.ar
                          : prod.name}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2">
                        {language === 'ar'
                          ? prod.desc.ar
                          : prod.desc.en}
                      </p>
                    </CardContent>
                  </div>

                  {/* أزرار الإجراءات المضافة للكارت */}
                  <div className="p-6 pt-0 mt-4 grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-semibold border-gold text-gold hover:bg-gold hover:text-navy flex items-center justify-center gap-1"
                      onClick={() => setLocation(`/product/${prod.id}`)}
                    >
                      <Eye size={16} />
                      {language === 'ar' ? 'تعرف على المزيد ' : 'View Details'}
                    </Button>

                    <Button
                      size="sm"
                      className="bg-gold text-navy hover:bg-gold/90 font-bold rounded-xl flex items-center justify-center gap-1"
                      onClick={() =>
                        setLocation(
                          `/quotation?product=${
                            encodeURIComponent(
                              language === 'ar' ? prod.ar : prod.name
                            )
                          }`
                        )
                      }
                    >
                      <ShoppingCart size={16} />
                      {language === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
                    </Button>
                  </div>

                </Card>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;