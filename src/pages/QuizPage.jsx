import { useState } from 'react';
import OptionCard from '../components/OptionCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { ArrowRight, Check, Cross } from '../components/Icons.jsx';

export default function QuizPage({ session, onExit, onFinish }) {
  const { title, questions } = session;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const q = questions[index];
  const answered = selected !== null;
  const isRight = answered && selected === q.correctAnswer;
  const isLast = index === questions.length - 1;

  const choose = (i) => {
    if (!answered) setSelected(i);
  };

  const next = () => {
    const done = [...answers, { question: q, selected }];
    if (isLast) {
      onFinish(done);
    } else {
      setAnswers(done);
      setIndex(index + 1);
      setSelected(null);
      window.scrollTo({ top: 0 });
    }
  };

  const stateOf = (i) => {
    if (!answered) return 'idle';
    if (i === q.correctAnswer) return 'correct';
    if (i === selected) return 'wrong';
    return 'idle';
  };

  return (
    <main className="page page--quiz">
      <header className="quizbar">
        <button type="button" className="iconbtn" onClick={onExit} data-exit="1" aria-label="العودة للرئيسية">
          <ArrowRight />
        </button>
        <div className="quizbar__info">
          <span className="quizbar__title">{title}</span>
          <span className="quizbar__count" data-counter="1">السؤال {index + 1} من {questions.length}</span>
        </div>
      </header>
      <ProgressBar value={(index + (answered ? 1 : 0)) / questions.length} />

      <article className="qcard" key={q.key}>
        <p className="qcard__kicker">السؤال</p>
        <h2 className="question__text" data-question="1">{q.question}</h2>
      </article>

      <div className="options">
        {q.options.map((text, i) => (
          <OptionCard key={i} index={i} text={text} state={stateOf(i)} locked={answered} onSelect={choose} />
        ))}
      </div>

      {answered && (
        <div className={`feedback ${isRight ? 'feedback--ok' : 'feedback--bad'}`} role="status" data-feedback="1">
          {isRight ? <Check /> : <Cross />}
          <div className="feedback__body">
            <strong>{isRight ? 'إجابة صحيحة' : 'إجابة خاطئة'}</strong>
            {!isRight && <span>الإجابة الصحيحة: {q.options[q.correctAnswer]}</span>}
          </div>
        </div>
      )}

      <div className="dock">
        <button type="button" className="btn btn--primary btn--lg" disabled={!answered} onClick={next} data-next="1">
          {isLast ? 'إنهاء الاختبار' : 'السؤال التالي'}
        </button>
      </div>
    </main>
  );
}
