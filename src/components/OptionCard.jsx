import { Check, Cross } from './Icons.jsx';

const LETTERS = ['أ', 'ب', 'ج', 'د'];

// state: idle | correct | wrong
export default function OptionCard({ index, text, state, locked, onSelect }) {
  return (
    <button
      type="button"
      className={`option option--${state}`}
      disabled={locked && state === 'idle'}
      onClick={() => onSelect(index)}
      data-option={index}
    >
      <span className="option__badge" aria-hidden="true">
        {state === 'correct' ? <Check /> : state === 'wrong' ? <Cross /> : LETTERS[index]}
      </span>
      <span className="option__text">{text}</span>
    </button>
  );
}
