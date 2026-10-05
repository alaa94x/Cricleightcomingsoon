/* Circleight booth — إعدادات التشغيل
   لتفعيل الخريطة الحية بين أجهزة مختلفة، املأ url و key من Supabase.
   Settings → API → Project URL + anon public key  (راجع SETUP.md) */
window.CIRCLEIGHT_CONFIG = {
  supabase: {
    url: "",            // https://xxxxxxxx.supabase.co
    key: "",            // anon public key
    pollMs: 2500        // سرعة تحديث الخريطة بالمليِثانية
  },
  localFallback: true   // بدون Supabase: تخزين على هذا الجهاز فقط (للتجربة)
};
