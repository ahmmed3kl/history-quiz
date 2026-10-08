export default function CoverPage({ onStart }) {
  return (
    <main className="cover">
      <div className="cover__sky" aria-hidden="true">
        <span className="cover__cloud cover__cloud--a" />
        <span className="cover__cloud cover__cloud--b" />
        <span className="cover__cloud cover__cloud--c" />
      </div>
      <div className="cover__inner">
        <h1 className="cover__title">الأسئلة الموضوعية</h1>
        <p className="cover__grade">الصف الثاني عشر</p>
        <p className="cover__term">الفصل الأول 2026م / 2027م</p>
        <p className="cover__subject">مادة التاريخ</p>
        <div className="cover__meta">
          <p>إعداد المعلمة وضحه الهاجري</p>
          <p>مدرسة معيذر الثانوية للبنات</p>
        </div>
        <button type="button" className="cover__btn" data-enter="1" onClick={onStart}>
          ابدأ
        </button>
      </div>
    </main>
  );
}
