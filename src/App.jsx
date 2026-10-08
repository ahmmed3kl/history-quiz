import { useState } from 'react';
import CoverPage from './pages/CoverPage.jsx';
import HomePage from './pages/HomePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

export default function App() {
  const [view, setView] = useState({ name: 'cover', run: 0 });

  const start = (session) =>
    setView((v) => ({ name: 'quiz', session, run: v.run + 1 }));

  if (view.name === 'cover') {
    return <CoverPage onStart={() => setView((v) => ({ ...v, name: 'home' }))} />;
  }
  if (view.name === 'quiz') {
    return (
      <QuizPage
        key={view.run}
        session={view.session}
        onExit={() => setView((v) => ({ ...v, name: 'home' }))}
        onFinish={(answers) => setView((v) => ({ ...v, name: 'result', answers }))}
      />
    );
  }
  if (view.name === 'result') {
    return (
      <ResultPage
        session={view.session}
        answers={view.answers}
        onRetry={() => start(view.session)}
        onHome={() => setView((v) => ({ ...v, name: 'home' }))}
      />
    );
  }
  return <HomePage onStart={start} />;
}
