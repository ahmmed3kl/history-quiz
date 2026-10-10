import { useState } from 'react';
import OptionCard from '../components/OptionCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { ArrowRight, Check, Cross } from '../components/Icons.jsx';
import { playAnswerSound } from '../lib/sounds.js';

export default function QuizPage({ session, onExit, onFinish }) {
  const { title, questions } = session;
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState([]);

  const q = questions[index];
  const selected = Number.isInteger(picks[index]) ? picks[index] : null;
  const answered = selected !== null;
  const isRight = answered && selected === q.correctAnswer;
  const isLast = index === questions.length - 1;
  const canPrev = index > 0;

  const choose = (i) => {
    if (answered) return;
    setPicks((prev) => {
      const nextPicks = [...prev];
      nextPicks[index] = i;
      return nextPicks;
    });
    playAnswerSound(i === q.correctAnswer);
  };

  const go = (to) => {
    setIndex(to);
    window.scrollTo({ top: 0 });
  };

  const next = () => {
    if (!answered) return;
    if (isLast) {
      onFinish(questions.map((question, i) => ({ question, selected: picks[i] })));
    } else {
      go(index + 1);
    }
  };

  const prev = () => {
    if (!canPrev) return;
    go(index - 1);
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
        <div className="dock__row">
          <button type="button" className="btn btn--primary btn--lg" disabled={!answered} onClick={next} data-next="1">
            {isLast ? 'إنهاء الاختبار' : 'السؤال التالي'}
          </button>
          <button type="button" className="btn btn--ghost btn--lg" disabled={!canPrev} onClick={prev} data-prev="1">
            السؤال السابق
          </button>
        </div>
      </div>
    </main>
  );
}
