# بنك أسئلة التاريخ

تطبيق اختبارات بالعربية (RTL) مبني بـ Vite وReact.

## التشغيل محليًا

```
npm install
npm run dev
```

## البناء والنشر

```
npm run build
```

مجلد `dist` هو ناتج البناء. على Vercel اختر إطار Vite وسيتعرف على أمر البناء `npm run build` ومجلد الإخراج `dist` تلقائيًا.

## الاختبارات

```
npm test
```

## البيانات

الأسئلة في `src/data/history_questions.js`. يستبعد التطبيق تلقائيًا أي سؤال فيه `missingFromSource: true`، فيكون عدد الأسئلة المتاحة 228 سؤالًا.
