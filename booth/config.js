/* Circleight booth — إعدادات التشغيل
   لتفعيل الخريطة الحية بين أجهزة مختلفة، املأ url و key من Supabase.
   Settings → API → Project URL + anon public key  (راجع SETUP.md) */
window.CIRCLEIGHT_CONFIG = {
  supabase: {
    url: "https://tlorqdkabzuapmnwlebi.supabase.co",            // https://xxxxxxxx.supabase.co
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsb3JxZGthYnp1YXBtbndsZWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExODAxMjMsImV4cCI6MjEwNjc1NjEyM30.K_7D0QoPvBxR8_B-iqPYopmnh0hUQyDAQI6NMtAtDZA",            // anon public key
    pollMs: 2500        // سرعة تحديث الخريطة بالمليِثانية
  },
  localFallback: true   // بدون Supabase: تخزين على هذا الجهاز فقط (للتجربة)
};
