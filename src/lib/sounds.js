let ctx;

const getCtx = () => {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
};

const tone = (audio, freq, start, duration, type = 'sine', gain = 0.12) => {
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp);
  amp.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
};

export const playAnswerSound = (correct) => {
  try {
    const audio = getCtx();
    if (!audio) return;
    if (audio.state === 'suspended') audio.resume();
    const t = audio.currentTime;
    if (correct) {
      tone(audio, 523.25, t, 0.12, 'sine', 0.1);
      tone(audio, 659.25, t + 0.11, 0.14, 'sine', 0.11);
      tone(audio, 783.99, t + 0.22, 0.18, 'triangle', 0.08);
    } else {
      tone(audio, 220, t, 0.16, 'square', 0.06);
      tone(audio, 164.81, t + 0.12, 0.22, 'square', 0.05);
    }
  } catch {
    /* تجاهل إن تعذر تشغيل الصوت */
  }
};
