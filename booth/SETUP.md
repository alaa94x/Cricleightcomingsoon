# بوث Circleight · Web Summit — دليل التشغيل

الصفحة تعمل بثلاثة أوضاع من نفس الملف:

| الشاشة | الرابط |
|---|---|
| الألعاب (شاشة اللمس الرئيسية) | `/booth/` |
| الخريطة الحية (الشاشة الثانية) | `/booth/wall/` |
| تابلت إدخال المسارات | `/booth/kiosk/` |

زر **⬚** في أعلى أي شاشة يفتح قائمة الشاشات، وفيها رمز QR لكل شاشة لفتحها على جهاز آخر بالمسح.

---

## 1. تفعيل الخريطة الحية (Supabase)

بدون هذه الخطوة تعمل الصفحة، لكن المسارات تُحفظ على الجهاز نفسه فقط ولن تنتقل من التابلت إلى الشاشة الكبيرة.

### أ. أنشئ المشروع
1. ادخل على <https://supabase.com> وأنشئ حسابًا مجانيًا.
2. **New project** → اختر اسمًا وكلمة مرور لقاعدة البيانات، واختر أقرب منطقة (مثل Frankfurt أو Singapore).
3. انتظر دقيقة حتى يجهز المشروع.

### ب. أنشئ الجداول
افتح **SQL Editor** → **New query**، والصق هذا ثم **Run**:

```sql
create table public.routes (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  data jsonb not null
);
create table public.leads (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  data jsonb not null
);

alter table public.routes enable row level security;
alter table public.leads  enable row level security;

-- المسارات: الجميع يقرأ ويضيف (هذا هو جوهر الخريطة الحية)
create policy "routes_read"   on public.routes for select to anon using (true);
create policy "routes_insert" on public.routes for insert to anon with check (true);
create policy "routes_delete" on public.routes for delete to anon using (true);

-- العملاء المحتملون: إضافة فقط، ولا يمكن قراءتهم من المتصفح
create policy "leads_insert"  on public.leads  for insert to anon with check (true);
```

### ج. انسخ المفاتيح
**Settings → API**، وانسخ:
- **Project URL** (مثل `https://abcdefgh.supabase.co`)
- **anon public** key

### د. ضعها في الملف
افتح `booth/config.js` وعدّل السطرين:

```js
url: "https://abcdefgh.supabase.co",
key: "eyJhbGciOi...",
```

ثم ارفع التعديل. افتح `/booth/` واضغط زر الشاشات ⬚: إذا ظهر سطر أخضر «قاعدة بيانات مشتركة متصلة» فكل شيء جاهز.

---

## 2. ملاحظات مهمة

- **مفتاح anon يظهر في الصفحة** — هذا طبيعي في Supabase، والحماية تأتي من سياسات RLS أعلاه.
- **سياسة `routes_delete`** تتيح لأي شخص يملك الرابط حذف مسار. هي موجودة ليتمكن الفريق من حذف أي إدخال غير مناسب من شاشة التابلت أثناء المعرض. يمكن حذف هذه السياسة بعد المعرض.
- **بيانات العملاء المحتملين لا تُقرأ من المتصفح** حمايةً لها. صدّرها من Supabase: **Table Editor → leads → Export → CSV**.
- **المشروع المجاني يتوقف مؤقتًا** بعد أسبوع بلا استخدام. افتح الصفحة قبل المعرض بيوم للتأكد أنه فعّال.
- **قبل المعرض:** افتح كل شاشة وجرّبها، واضغط زر ملء الشاشة ⛶ على شاشة العرض والتابلت.
- **الإنترنت مطلوب** للخريطة الحية والتابلت. الألعاب وحدها تعمل بدون إنترنت بعد تحميل الصفحة.

---

## 3. إعدادات الفريق أثناء المعرض

اضغط مطوّلًا على اللوغو (ثانية واحدة) على أي شاشة، أو `Shift + S` على شاشة الألعاب:

- **وضع الزحمة:** يقصر التجربة على أسرع لعبة.
- **اللعبة المميزة:** أي لعبة تظهر بعلامة «ابدأ من هنا».
- **رابط QR:** يظهر في نهاية الألعاب لحجز عرض توضيحي.
- **تصفير لوحات النتائج** و**لاعب جديد**.
- على التابلت: حذف أي مسار غير مناسب، وعدد العملاء المحتملين.

لوحات النتائج تُحفظ على كل جهاز وتُصفَّر يوميًا تلقائيًا.
