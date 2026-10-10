import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App.jsx';
import { historyQuestions as data } from './data/history_questions.js';

window.scrollTo = () => {};
const lessons = data.units.flatMap((u) => u.lessons);
const complete = (l) => l.questions.filter((q) => !q.missingFromSource);
const $ = (s) => document.querySelector(s);

function openHome() {
  render(<App />);
  fireEvent.click($('[data-enter]'));
}

function playThrough(questions) {
  let expected = 0;
  questions.forEach((q, i) => {
    expect($('[data-question]').textContent).toBe(q.question);
    const opts = [...document.querySelectorAll('.option__text')].map((n) => n.textContent);
    expect(opts).toEqual(q.options);
    expect($('[data-next]').disabled).toBe(true);
    const right = i % 2 === 0;
    const pick = right ? q.correctAnswer : (q.correctAnswer + 1) % 4;
    fireEvent.click($(`[data-option="${pick}"]`));
    expect($(`[data-option="${q.correctAnswer}"]`).classList.contains('option--correct')).toBe(true);
    expect(document.querySelectorAll('.option--wrong').length).toBe(right ? 0 : 1);
    const other = [0, 1, 2, 3].find((k) => k !== pick && k !== q.correctAnswer);
    fireEvent.click($(`[data-option="${other}"]`)); // لا يجوز تغيير الإجابة
    expect(document.querySelectorAll('.option--wrong').length).toBe(right ? 0 : 1);
    if (right) expected++;
    fireEvent.click($('[data-next]'));
  });
  return expected;
}

describe('بنك أسئلة التاريخ', () => {
  it('الرئيسية: خمسة دروس و228 سؤالًا مع استبعاد الناقص', () => {
    openHome();
    expect(document.querySelectorAll('[data-lesson]').length).toBe(5);
    expect($('.hero__meta').textContent).toContain('228');
    expect($('[data-lesson="1"]').textContent).toContain('25 سؤالًا متاحًا');
    cleanup();
  });

  it.each(lessons.map((l) => [l.id, l]))('الدرس %i يعمل من البداية إلى النتيجة', (id, l) => {
    openHome();
    fireEvent.click($(`[data-lesson="${id}"]`));
    const qs = complete(l);
    expect($('[data-counter]').textContent).toBe(`السؤال 1 من ${qs.length}`);
    const expected = playThrough(qs);
    expect($('[data-score]').textContent).toBe(`${expected} / ${qs.length}`);
    cleanup();
  });

  it('الاختبار الشامل 228 سؤالًا، والإعادة والعودة تعملان', () => {
    openHome();
    fireEvent.click($('[data-all]'));
    const qs = lessons.flatMap(complete);
    expect(qs.length).toBe(228);
    const expected = playThrough(qs);
    expect($('[data-score]').textContent).toBe(`${expected} / 228`);
    expect(document.querySelectorAll('.review__item').length).toBe(228 - expected);
    fireEvent.click($('[data-retry]'));
    expect($('[data-counter]').textContent).toBe('السؤال 1 من 228');
    fireEvent.click($('[data-exit]'));
    expect(document.querySelectorAll('[data-lesson]').length).toBe(5);
    cleanup();
  });
});
