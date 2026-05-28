import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Award, HeartHandshake, Lightbulb, Calendar, MapPin, Building2, Sparkles } from 'lucide-react';

const Agencies = () => {
  const { t, language, dir } = useLanguage();

  // مصفوفة القيم الأربعة بعد التطوير الجمالي للأيقونات والنصوص
  const values = [
    {
      id: 1,
      title: language === 'ar' ? 'الجودة' : 'Quality',
      desc: language === 'ar' ? 'نضمن أن جميع المنتجات تلبي المعايير الدولية وتخضع لأعلى مستويات الفحص.' : 'We ensure all products meet international standards and undergo rigorous testing.',
      icon: <Award className="w-10 h-10 text-gold" strokeWidth={1.5} />
    },
    {
      id: 2,
      title: language === 'ar' ? 'النزاهة' : 'Integrity',
      desc: language === 'ar' ? 'نتعامل بصدق وشفافية مطلقة في كل شراكة ومع كل عميل لبناء ثقة مستدامة.' : 'We operate with absolute honesty and transparency to build long-term trust.',
      icon: <ShieldCheck className="w-10 h-10 text-gold" strokeWidth={1.5} />
    },
    {
      id: 3,
      title: language === 'ar' ? 'الخدمة' : 'Service',
      desc: language === 'ar' ? 'نعطي الأولوية القصوى لرضا العملاء وتقديم دعم فني وتقني متكامل على مدار الساعة.' : 'We prioritize customer satisfaction and provide comprehensive support around the clock.',
      icon: <HeartHandshake className="w-10 h-10 text-gold" strokeWidth={1.5} />
    },
    {
      id: 4,
      title: language === 'ar' ? 'الابتكار' : 'Innovation',
      desc: language === 'ar' ? 'نحسن باستمرار عملياتنا ونعتمد على أحدث التقنيات لتقديم حلول سريعة وذكية.' : 'We continuously improve our processes and adopt the latest technologies for smart solutions.',
      icon: <Lightbulb className="w-10 h-10 text-gold" strokeWidth={1.5} />
    }
  ];

  // تأثيرات الحركية المتسلسلة لظهور العناصر بسلاسة الفاخرة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={dir}>
      <Navbar />

      {/* 1. SECTION HERO: عن شركة الماسة */}
      <section className="pt-44 pb-16 relative overflow-hidden">
        {/* خلفية جمالية ناعمة جداً لمنع الفراغ البصري */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* بادج علوي صغير أنيق */}
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wide">
              <Building2 size={16} />
              <span>{language === 'ar' ? 'ملف الشركة التعريفى' : 'Company Profile'}</span>
            </div>

            {/* اسم الشركة وعنوانها الرئيسي المنسق */}
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">
              {language === 'ar' ? (
                <>شركة <span className="text-gold relative">الماسة<span className="absolute -bottom-2 left-0 w-full h-1 bg-gold/20 rounded-full"></span></span></>
              ) : (
                <>Al-Masa <span className="text-gold">Company</span></>
              )}
            </h1>
            
            <p className="text-2xl md:text-3xl font-medium text-muted-foreground/90 max-w-xl mx-auto mb-6 font-display">
              {language === 'ar' ? 'منتجات موثوقة، خدمة احترافية' : 'Trusted Products, Professional Service'}
            </p>

            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. SECTION VALUES: قيمنا الأساسية */}
      <section className="py-16 bg-secondary/20 border-y border-border/40 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              {language === 'ar' ? 'قيمنا الراسخة' : 'Our Core Values'}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
              {language === 'ar' ? 'المبادئ الأساسية التي تقود مسيرتنا نحو التميز يومياً' : 'The core pillars driving our journey toward excellence every day'}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map(val => (
              <motion.div key={val.id} variants={itemVariants}>
                <Card className="h-full border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden bg-card rounded-3xl relative">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    {/* خط ذهبي جانبي يظهر تفاعلياً عند الـ Hover */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* حاوية الأيقونة مع تأثير التحجيم التفاعلي */}
                    <div className="mb-6 p-4 bg-secondary/60 rounded-2xl group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500 shadow-inner">
                      {val.icon}
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-gold transition-colors">
                      {val.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {val.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION COMPANY INFO: معلومات الشركة اللوجستية وتاريخ التأسيس */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              {language === 'ar' ? 'معلومات الشركة' : 'Company Information'}
            </h2>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* كارد تاريخ التأسيس (الجانب الأيسر/الأيمن حسب الاتجاه) */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="h-full bg-gradient-to-br from-card to-secondary/30 border border-border/60 rounded-3xl p-10 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-gold/10 pointer-events-none">
                  <Sparkles size={120} strokeWidth={1} />
                </div>
                
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 shadow-sm">
                  <Calendar size={28} />
                </div>
                
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {language === 'ar' ? 'تأسست عام' : 'Established In'}
                </p>
                
                <h3 className="text-6xl font-display font-black text-gold tracking-tight group-hover:scale-105 transition-transform duration-500">
                  2015
                </h3>
                
                <p className="text-xs text-muted-foreground/70 mt-4 max-w-[200px]">
                  {language === 'ar' ? 'أكثر من عقد من التميز والعطاء المستمر في السوق' : 'Over a decade of trusted market leadership and excellence'}
                </p>
              </div>
            </motion.div>

            {/* كارد الموقع الجغرافي والمقر الرئيسي */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="h-full bg-card border border-border/50 rounded-3xl p-10 flex flex-col justify-between shadow-md relative overflow-hidden group">
                {/* زخرفة هندسية في الخلفية تعطي إيحاءاً بالخرائط */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-secondary rounded-full opacity-40 blur-xl pointer-events-none" />
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shrink-0 shadow-sm mt-1">
                    <MapPin size={28} />
                  </div>
                  
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full inline-block mb-3">
                      {language === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
                    </span>
                    <h4 className="text-2xl font-display font-bold text-foreground mb-4">
                      {language === 'ar' ? 'موقعنا الجغرافي' : 'Our Location'}
                    </h4>
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                      {language === 'ar' 
                        ? 'مجمع المهندسين رقم 78، مدينة القناطر الخيرية، القليوبية، مصر.' 
                        : 'Engineers Complex No. 78, El Kanater El Khayreya City, Qalyubia, Egypt.'}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground/80">
                  <span>📍 {language === 'ar' ? 'جمهورية مصر العربية' : 'Arab Republic of Egypt'}</span>
                  <span className="hover:text-gold transition-colors font-semibold cursor-default">
                    {language === 'ar' ? 'تشرفنا بزيارتكم ↗' : 'Welcome to visit us ↗'}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agencies;