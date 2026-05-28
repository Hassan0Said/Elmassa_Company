import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FileText, Send, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  quantity: string;
  specifications: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  specifications?: string;
  message?: string;
}

const Quotation: React.FC = () => {
  const { t, language, dir } = useLanguage();

  const getInitialProduct = (): string => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('product') || '';
    }
    return '';
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    category: getInitialProduct(),
    quantity: '',
    specifications: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>('');

  const products = [
    { value: 'Premium Electrical Appliance', label: language === 'ar' ? 'جهاز كهربائي متميز' : 'Premium Electrical Appliance' },
    { value: 'Industrial Power Unit', label: language === 'ar' ? 'وحدة طاقة صناعية' : 'Industrial Power Unit' },
    { value: 'Smart Control Panel', label: language === 'ar' ? 'لوحة تحكم ذكية' : 'Smart Control Panel' },
    { value: 'Electric Water Heater', label: language === 'ar' ? 'سخان ماء كهربائي' : 'Electric Water Heater' },
    { value: 'Portable Heater', label: language === 'ar' ? 'سخان محمول' : 'Portable Heater' },
    { value: 'Industrial Heater', label: language === 'ar' ? 'سخان صناعي' : 'Industrial Heater' },
    { value: 'Steam Iron Pro', label: language === 'ar' ? 'مكواة بخار برو' : 'Steam Iron Pro' },
    { value: 'Digital Iron', label: language === 'ar' ? 'مكواة رقمية' : 'Digital Iron' },
    { value: 'Heavy Duty Iron', label: language === 'ar' ? 'مكواة قوية' : 'Heavy Duty Iron' },
    { value: 'Engine Kit', label: language === 'ar' ? 'طقم محرك' : 'Engine Kit' },
    { value: 'Car Battery', label: language === 'ar' ? 'بطارية سيارة' : 'Car Battery' },
    { value: 'Transmission System', label: language === 'ar' ? 'ناقل الحركة' : 'Transmission System' },
    { value: 'Car Filters Set', label: language === 'ar' ? 'مجموعة فلاتر سيارات' : 'Car Filters Set' },
    { value: 'Cookware Set', label: language === 'ar' ? 'طقم أواني طهي' : 'Cookware Set' },
    { value: 'Kitchen Tools Pro', label: language === 'ar' ? 'أدوات مطبخ برو' : 'Kitchen Tools Pro' },
    { value: 'Blender Set', label: language === 'ar' ? 'خلاط كهربائي' : 'Blender Set' },
    { value: 'Electric Kettle', label: language === 'ar' ? 'كاتل كهربائي' : 'Electric Kettle' },
    { value: 'Smart Washer', label: language === 'ar' ? 'غسالة ذكية' : 'Smart Washer' },
    { value: 'Mini Washer', label: language === 'ar' ? 'غسالة صغيرة' : 'Mini Washer' },
    { value: 'Dishwasher', label: language === 'ar' ? 'غسالة أطباق' : 'Dishwasher' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const cleanValue = value.replace(/[^\d]/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const validateForm = (): boolean => {
    const currentErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      currentErrors.fullName = language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      currentErrors.fullName = language === 'ar' ? 'يجب أن يكون الاسم 3 أحرف على الأقل' : 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      currentErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      currentErrors.email = language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      currentErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (formData.phone.trim().length !== 11) {
      currentErrors.phone = language === 'ar' ? 'يجب أن يتكون رقم الهاتف من 11 رقماً' : 'Phone number must be exactly 11 digits';
    }

    if (!formData.quantity.trim()) {
      currentErrors.quantity = language === 'ar' ? 'يرجى تحديد الكمية المطلوبة' : 'Please specify the quantity';
    } else if (Number(formData.quantity) <= 0) {
      currentErrors.quantity = language === 'ar' ? 'يجب أن تكون الكمية 1 أو أكثر' : 'Quantity must be 1 or more';
    }

    if (!formData.specifications.trim()) {
      currentErrors.specifications = language === 'ar' ? 'يرجى كتابة المواصفات المطلوبة' : 'Please provide the required specifications';
    } else if (formData.specifications.trim().length < 10) {
      currentErrors.specifications = language === 'ar' ? 'يرجى توضيح المواصفات بشكل أكثر تفصيلاً (10 أحرف على الأقل)' : 'Please describe specifications in more detail (min 10 chars)';
    }

    if (!formData.message.trim()) {
      currentErrors.message = language === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.trim().length < 15) {
      currentErrors.message = language === 'ar' ? 'يجب أن تحتوي الرسالة على 15 حرفاً على الأقل' : 'Message must be at least 15 characters';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Quotation form submitted:', formData);
      setSubmittedName(formData.fullName.trim());
      setShowSuccessPopup(true);
    }
  };

  const handleCloseAndReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      quantity: '',
      specifications: '',
      message: '',
    });
    setErrors({});
    setShowSuccessPopup(false);
  };

  const handleCloseAndKeepData = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden" dir={dir}>
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">
                {t('quotation.title')}
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('quotation.subtitle')}
              </p>
            </motion.div>

            {/* MAIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                <div className="bg-navy p-8 md:p-12 text-white flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-navy shrink-0">
                    <FileText size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold">
                      {language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {language === 'ar'
                        ? 'يرجى تزويدنا بالمعلومات اللازمة لنقدم لك أفضل عرض سعر'
                        : 'Please provide us with the necessary info to give you the best quote'}
                    </p>
                  </div>
                </div>

                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    
                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70">
                          {t('quotation.fullName')} *
                        </label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`h-12 bg-background rounded-xl transition-all ${
                            errors.fullName ? 'border-destructive focus-visible:ring-destructive' : 'border-border/50 focus:border-gold'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-destructive text-xs flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle size={12} /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70">
                          {t('quotation.email')} *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`h-12 bg-background rounded-xl transition-all ${
                            errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-border/50 focus:border-gold'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-destructive text-xs flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* PHONE + COMPANY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70">
                          {t('quotation.phone')} *
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="01xxxxxxxxx"
                          className={`h-12 bg-background rounded-xl transition-all ${
                            errors.phone ? 'border-destructive focus-visible:ring-destructive' : 'border-border/50 focus:border-gold'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-destructive text-xs flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle size={12} /> {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70">
                          {t('quotation.company')} <span className="text-xs text-muted-foreground font-normal">({language === 'ar' ? 'اختياري' : 'Optional'})</span>
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="h-12 bg-background border-border/50 focus:border-gold rounded-xl"
                        />
                      </div>
                    </div>

                    {/* PRODUCT + QUANTITY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70">
                          {language === 'ar' ? 'المنتج' : 'Product'}
                        </label>
                        <Select onValueChange={handleSelectChange} value={formData.category}>
                          <SelectTrigger className="h-12 bg-background border-border/50 focus:ring-gold rounded-xl">
                            <SelectValue
                              placeholder={language === 'ar' ? 'اختر المنتج' : 'Select Product'}
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border max-h-[300px]">
                            {products.map((product) => (
                              <SelectItem key={product.value} value={product.label}>
                                {product.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70">
                          {t('quotation.quantity')} *
                        </label>
                        <Input
                          type="number"
                          name="quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          className={`h-12 bg-background rounded-xl transition-all ${
                            errors.quantity ? 'border-destructive focus-visible:ring-destructive' : 'border-border/50 focus:border-gold'
                          }`}
                        />
                        {errors.quantity && (
                          <p className="text-destructive text-xs flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle size={12} /> {errors.quantity}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* SPECS */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70">
                        {t('quotation.specifications')} *
                      </label>
                      <Textarea
                        name="specifications"
                        value={formData.specifications}
                        onChange={handleChange}
                        rows={3}
                        className={`bg-background rounded-xl resize-none p-3 transition-all ${
                          errors.specifications ? 'border-destructive focus-visible:ring-destructive' : 'border-border/50 focus:border-gold'
                        }`}
                      />
                      {errors.specifications && (
                        <p className="text-destructive text-xs flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle size={12} /> {errors.specifications}
                        </p>
                      )}
                    </div>

                    {/* MESSAGE */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70">
                        {t('quotation.message')} *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`bg-background rounded-xl resize-none p-3 transition-all ${
                          errors.message ? 'border-destructive focus-visible:ring-destructive' : 'border-border/50 focus:border-gold'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-destructive text-xs flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button
                      type="submit"
                      className="w-full h-16 bg-gold text-navy hover:bg-gold/90 font-bold text-xl rounded-xl shadow-xl transition-all group flex items-center justify-center"
                    >
                      {t('quotation.submit')}
                      <Send
                        size={20}
                        className={`ms-2 group-hover:${
                          language === 'ar' ? '-translate-x-1' : 'translate-x-1'
                        } transition-transform`}
                      />
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL POPUP */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* تم حذف حدث onClick من هنا لتجنب الإغلاق العشوائي عند الضغط خارج الـ Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-card w-full max-w-md rounded-2xl border border-border/80 shadow-2xl p-6 relative text-center z-10 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold/5 rounded-full blur-xl pointer-events-none" />

              <button
                onClick={handleCloseAndKeepData}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary/50"
                title={language === 'ar' ? 'الرجوع للتعديل' : 'Back to edit'}
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="animate-bounce" />
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                {t('quotation.success') || (language === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Quotation Request Sent!')}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 px-2">
                {language === 'ar' ? (
                  <span>شكراً لك يا <span className="text-gold font-bold">{submittedName}</span>. لقد استلمنا تفاصيل عرض السعر وسيتم الرد عليك قريباً جداً.</span>
                ) : (
                  <span>Thank you, <span className="text-gold font-bold">{submittedName}</span>. We have successfully received your specs and will quote you shortly.</span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleCloseAndReset}
                  className="bg-navy hover:bg-navy/90 text-white font-bold h-11 rounded-xl text-xs flex-1 order-1 sm:order-2 shadow-sm"
                >
                  {language === 'ar' ? 'طلب عرض سعر جديد' : 'New Request'}
                </Button>

                <Button
                  onClick={handleCloseAndKeepData}
                  variant="outline"
                  className="border-border/60 hover:bg-secondary/50 font-medium h-11 rounded-xl text-xs flex-1 order-2 sm:order-1 gap-1.5"
                >
                  <RotateCcw size={13} />
                  {language === 'ar' ? 'مراجعة وتعديل البيانات' : 'Review & Edit'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Quotation;