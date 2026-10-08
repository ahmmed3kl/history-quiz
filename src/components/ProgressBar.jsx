export default function ProgressBar({ value }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="تقدم الاختبار">
      <div className="progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
