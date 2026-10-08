import { ChevronLeft } from './Icons.jsx';

export default function LessonCard({ lesson, onStart }) {
  const count = lesson.questions.length;
  const partial = count < lesson.declaredCount;
  const fill = lesson.declaredCount ? Math.round((count / lesson.declaredCount) * 100) : 0;
  return (
    <button type="button" className="lesson" onClick={onStart} disabled={count === 0} data-lesson={lesson.id}>
      <span className="lesson__num" aria-hidden="true">{lesson.id}</span>
      <span className="lesson__body">
        <span className="lesson__label">{lesson.label}</span>
        <span className="lesson__title">{lesson.title}</span>
        <span className="lesson__meta">
          <span className="lesson__count">{count} سؤالًا{partial ? ' متاحًا' : ''}</span>
          <span className="meter" aria-hidden="true">
            <span className="meter__fill" style={{ width: `${fill}%` }} />
          </span>
        </span>
      </span>
      <span className="lesson__go"><ChevronLeft /></span>
    </button>
  );
}
