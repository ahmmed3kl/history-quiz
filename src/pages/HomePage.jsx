import LessonCard from '../components/LessonCard.jsx';
import { bankTitle, units, allQuestions, lessonCount } from '../lib/quiz.js';

export default function HomePage({ onStart }) {
  return (
    <main className="page page--home">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">{bankTitle}</span>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero__title">{bankTitle}</h1>
        <p className="hero__meta">
          {allQuestions.length} سؤالًا متاحًا • {lessonCount} دروس
        </p>
        <div className="hero__credit">
          <p>إعداد المعلمة وضحه الهاجري</p>
          <p>مدرسة معيذر الثانوية للبنات</p>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--lg hero__cta"
          data-all="1"
          onClick={() => onStart({ title: 'الاختبار الشامل', questions: allQuestions })}
        >
          ابدأ الاختبار الشامل
        </button>
      </section>

      {units.map((unit) => (
        <section className="unit" key={unit.id}>
          <div className="unit__head">
            <p className="unit__label">{unit.label}</p>
            <h2 className="unit__title">{unit.title}</h2>
          </div>
          <div className="unit__list">
            {unit.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onStart={() => onStart({ title: lesson.title, questions: lesson.questions })}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
