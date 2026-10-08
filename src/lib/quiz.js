// يقرأ البيانات من src/data/history_questions.js دون تعديل نصوصها،
// ويستبعد تلقائيًا أي سؤال عليه missingFromSource: true.
import { historyQuestions } from '../data/history_questions.js';

const UNIT_ORDINALS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة'];
const LESSON_ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];

const isComplete = (q) =>
  !q.missingFromSource &&
  Array.isArray(q.options) &&
  q.options.length === 4 &&
  Number.isInteger(q.correctAnswer);

export const bankTitle = historyQuestions.title;

export const units = historyQuestions.units.map((unit) => ({
  id: unit.id,
  title: unit.title,
  label: `الوحدة ${UNIT_ORDINALS[unit.id - 1]}`,
  lessons: unit.lessons.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    label: unit.id === 2
      ? `الدرس ${LESSON_ORDINALS[index]} (${LESSON_ORDINALS[lesson.id - 1]})`
      : `الدرس ${LESSON_ORDINALS[lesson.id - 1]}`,
    declaredCount: lesson.questionCount,
    questions: lesson.questions
      .filter(isComplete)
      .map((q) => ({ ...q, key: `${lesson.id}-${q.id}` })),
  })),
}));

export const allQuestions = units.flatMap((u) => u.lessons.flatMap((l) => l.questions));
export const lessonCount = units.reduce((n, u) => n + u.lessons.length, 0);
