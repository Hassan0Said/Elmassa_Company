import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.agencies': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.quotation': 'Request Quotation',
    'nav.favorites': 'Favorites',
    'nav.slogan': 'Quality & Excellence',
    
    'hero.title': 'ElMassa Company',
    'hero.subtitle': 'Reliable Products, Professional Service',
    'hero.description': 'Leading provider of integrated industrial solutions and equipment since 2015',
    'hero.cta': 'Explore Products',
    
    'about.title': 'About ElMassa',
    'about.since': 'Established since 2015',
    'about.description': 'Reliable products, professional service',
    'about.mission': 'Our Mission',
    'about.mission_text': 'To be the leading company in providing integrated industrial solutions and equipment in the fields of washing, treatment, and industry, with commitment to the highest standards of quality, innovation, and customer service.',
    'about.mission_short': 'To be the leading company in integrated industrial solutions and equipment with commitment to quality, innovation, and customer service.',
    'about.vision': 'Our Vision',
    'about.vision_text': 'To expand our reach and establish ElMassa as a trusted name in the industry',
    'about.values': 'Our Values',
    'about.quality': 'Quality',
    'about.quality_desc': 'We ensure all products meet international standards',
    'about.integrity': 'Integrity',
    'about.integrity_desc': 'We deal with honesty and transparency',
    'about.service': 'Service',
    'about.service_desc': 'We prioritize customer satisfaction',
    'about.innovation': 'Innovation',
    'about.innovation_desc': 'We continuously improve our operations',
    'about.location': 'Location',
    'about.address': 'Compound El Mohandsen No. 78, El Qanater Elkhiriya City, Qalyubia, Egypt',
    
    'products.title': 'Our Products',
    'products.search': 'Search products...',
    'products.filter': 'Filter by Category',
    'products.all': 'All Products',
    'products.learnMore': 'Learn More',
    'products.addFavorite': 'Add to Favorites',
    'products.removeFavorite': 'Remove from Favorites',
    
    'details.features': 'Key Features',
    'details.specifications': 'Specifications',
    'details.similar': 'Similar Products',
    'details.requestQuote': 'Request Quotation',
    
    'quotation.title': 'Request Quotation',
    'quotation.subtitle': 'Fill out the form below and we will send you a custom quotation',
    'quotation.fullName': 'Full Name',
    'quotation.email': 'Email Address',
    'quotation.phone': 'Phone Number',
    'quotation.company': 'Company',
    'quotation.category': 'Product Category',
    'quotation.quantity': 'Quantity',
    'quotation.specifications': 'Specifications',
    'quotation.message': 'Additional Message',
    'quotation.submit': 'Submit Request',
    'quotation.required': 'This field is required',
    'quotation.success': 'Quotation request submitted successfully!',
    
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.sendMessage': 'Send us a Message',
    'contact.fullName': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.phone_label': 'Phone',
    'contact.email_label': 'Email',
    'contact.address_label': 'Address',
    'contact.company_label': 'Company',
    
    'agencies.title': 'Our Agencies',
    'agencies.subtitle': 'Global partners and representatives',
    'agencies.brands': 'Brands We Represent',
    
    'favorites.title': 'My Favorites',
    'favorites.empty': 'No favorite products yet',
    'favorites.remove': 'Remove',
    'favorites.requestQuote': 'Request Quotation',
    'favorites.count': 'Favorites',
    'favorites.clear': 'Clear All',
    
    'footer.quickLinks': 'Quick Links',
    'footer.company': 'Company',
    'footer.followUs': 'Follow Us',
    'footer.copyright': '© 2015-2026 ElMassa Company. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',    
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.agencies': 'الشركة',
    'nav.contact': 'اتصل بنا',
    'nav.quotation': 'طلب عرض سعر',
    'nav.favorites': 'المفضلة',
    'nav.slogan': 'الجودة والتميز',
    
    'hero.title': 'شركة الماسة',
    'hero.subtitle': 'منتجات موثوقة، خدمة احترافية',
    'hero.description': 'الشركة الرائدة في توفير الحلول والمعدات الصناعية المتكاملة منذ عام 2015',
    'hero.cta': 'استكشف المنتجات',
    
    'about.title': 'عن شركة الماسة',
    'about.since': 'تأسست عام 2015',
    'about.description': 'منتجات موثوقة، خدمة احترافية',
    'about.mission': 'رسالتنا',
    'about.mission_text': 'أن نكون الشركة الرائدة في توفير الحلول والمعدات الصناعية المتكاملة في مجالات الغسيل والمعالجة والصناعة، مع الالتزام بأعلى معايير الجودة والابتكار وخدمة العملاء.',
    'about.mission_short': 'أن نكون الشركة الرائدة في الحلول والمعدات الصناعية المتكاملة مع الالتزام بالجودة والابتكار وخدمة العملاء.',
    'about.vision': 'رؤيتنا',
    'about.vision_text': 'توسيع نطاق وصولنا وتأسيس الماسة كاسم موثوق في المجال',
    'about.values': 'قيمنا',
    'about.quality': 'الجودة',
    'about.quality_desc': 'نضمن أن جميع المنتجات تلبي المعايير الدولية',
    'about.integrity': 'النزاهة',
    'about.integrity_desc': 'نتعامل بصدق وشفافية',
    'about.service': 'الخدمة',
    'about.service_desc': 'نعطي الأولوية لرضا العملاء',
    'about.innovation': 'الابتكار',
    'about.innovation_desc': 'نحسن باستمرار عملياتنا',
    'about.location': 'الموقع',
    'about.address': 'مجمع المهندسين رقم 78، مدينة القناطر الخيرية، القليوبية، مصر',
    
    'products.title': 'منتجاتنا',
    'products.search': 'ابحث عن المنتجات...',
    'products.filter': 'تصفية حسب الفئة',
    'products.all': 'جميع المنتجات',
    'products.learnMore': 'تعرف على المزيد',
    'products.addFavorite': 'إضافة إلى المفضلة',
    'products.removeFavorite': 'إزالة من المفضلة',
    
    'details.features': 'المميزات الرئيسية',
    'details.specifications': 'المواصفات',
    'details.similar': 'منتجات مشابهة',
    'details.requestQuote': 'طلب عرض سعر',
    
    'quotation.title': 'طلب عرض سعر',
    'quotation.subtitle': 'املأ النموذج أدناه وسنرسل لك عرض سعر مخصص',
    'quotation.fullName': 'الاسم الكامل',
    'quotation.email': 'البريد الإلكتروني',
    'quotation.phone': 'رقم الهاتف',
    'quotation.company': 'الشركة',
    'quotation.category': 'فئة المنتج',
    'quotation.quantity': 'الكمية',
    'quotation.specifications': 'المواصفات',
    'quotation.message': 'رسالة إضافية',
    'quotation.submit': 'إرسال الطلب',
    'quotation.required': 'هذا الحقل مطلوب',
    'quotation.success': 'تم إرسال طلب عرض السعر بنجاح!',
    
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.sendMessage': 'أرسل لنا رسالة',
    'contact.fullName': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.info': 'معلومات التواصل',
    'contact.phone_label': 'الهاتف',
    'contact.email_label': 'البريد الإلكتروني',
    'contact.address_label': 'العنوان',
    'contact.company_label': 'الشركة',
    
    'agencies.title': 'وكالاتنا',
    'agencies.subtitle': 'الشركاء والممثلون العالميون',
    'agencies.brands': 'العلامات التجارية التي نمثلها',
    
    'favorites.title': 'المفضلة',
    'favorites.empty': 'لا توجد منتجات مفضلة حتى الآن',
    'favorites.remove': 'إزالة',
    'favorites.requestQuote': 'طلب عرض سعر',
    'favorites.count': 'المفضلة',
    'favorites.clear': 'مسح الكل',
    
    'footer.quickLinks': 'روابط سريعة',
    'footer.company': 'الشركة',
    'footer.followUs': 'تابعنا',
    'footer.copyright': '© 2015-2026 شركة الماسة. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
