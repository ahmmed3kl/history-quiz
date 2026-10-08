const R = 52;
const C = 2 * Math.PI * R;

const verdict = (pct) =>
  pct >= 90 ? 'أداء ممتاز' : pct >= 75 ? 'أداء جيد جدًا' : pct >= 50 ? 'أداء مقبول، راجع الأسئلة الخاطئة' : 'تحتاج إلى مزيد من المراجعة';

export default function ResultPage({ session, answers, onRetry, onHome }) {
  const total = answers.length;
  const wrong = answers.filter((a) => a.selected !== a.question.correctAnswer);
  const correct = total - wrong.length;
  const pct = Math.round((correct / total) * 100);

  return (
    <main className="page page--result">
      <header className="result">
        <p className="result__lesson">{session.title}</p>
        <div className="ring" style={{ '--circ': C, '--offset': C * (1 - correct / total) }}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="ring__track" cx="60" cy="60" r={R} />
            <circle className="ring__value" cx="60" cy="60" r={R} />
          </svg>
          <div className="ring__label">
            <strong data-percent="1">{pct}%</strong>
            <span>النسبة المئوية</span>
          </div>
        </div>
        <p className="result__score">
          الدرجة <bdi dir="ltr" data-score="1">{correct} / {total}</bdi>
        </p>
        <p className="result__verdict">{verdict(pct)}</p>
        <div className="stats">
          <div className="stat stat--ok"><span>الإجابات الصحيحة</span><strong>{correct}</strong></div>
          <div className="stat stat--bad"><span>الإجابات الخاطئة</span><strong>{wrong.length}</strong></div>
          <div className="stat"><span>عدد الأسئلة</span><strong>{total}</strong></div>
        </div>
        <div className="result__actions">
          <button type="button" className="btn btn--primary" onClick={onRetry} data-retry="1">إعادة الاختبار</button>
          <button type="button" className="btn btn--ghost" onClick={onHome} data-home="1">العودة للرئيسية</button>
        </div>
      </header>

      <section className="review">
        <h2 className="review__title">
          {wrong.length ? `الأسئلة التي أخطأت فيها (${wrong.length})` : 'أجبت عن جميع الأسئلة إجابة صحيحة'}
        </h2>
        {wrong.map(({ question, selected }) => (
          <article className="review__item" key={question.key}>
            <h3>{question.question}</h3>
            <p className="review__row review__row--bad"><span>إجابتك</span>{question.options[selected]}</p>
            <p className="review__row review__row--ok"><span>الإجابة الصحيحة</span>{question.options[question.correctAnswer]}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
