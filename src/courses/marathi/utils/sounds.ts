let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(
  frequency: number,
  startTime: number,
  duration: number,
  gain: number,
  ac: AudioContext,
  type: OscillatorType = 'sine',
) {
  const osc = ac.createOscillator();
  const env = ac.createGain();
  osc.connect(env);
  env.connect(ac.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  env.gain.setValueAtTime(0, startTime);
  env.gain.linearRampToValueAtTime(gain, startTime + 0.01);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playCorrect() {
  const ac = getCtx();
  const t = ac.currentTime;
  // Happy ascending arpeggio
  tone(523, t,        0.12, 0.25, ac);
  tone(659, t + 0.10, 0.12, 0.25, ac);
  tone(784, t + 0.20, 0.18, 0.30, ac);
}

export function playWrong() {
  const ac = getCtx();
  const t = ac.currentTime;
  // Low descending buzz
  tone(220, t,        0.12, 0.25, ac, 'sawtooth');
  tone(180, t + 0.11, 0.18, 0.20, ac, 'sawtooth');
}

export function playCombo() {
  const ac = getCtx();
  const t = ac.currentTime;
  // Triumphant 4-note fanfare
  tone(523, t,        0.10, 0.22, ac);
  tone(659, t + 0.09, 0.10, 0.22, ac);
  tone(784, t + 0.18, 0.10, 0.22, ac);
  tone(1046, t + 0.27, 0.22, 0.30, ac);
}

export function playTimeout() {
  const ac = getCtx();
  const t = ac.currentTime;
  tone(300, t, 0.30, 0.22, ac, 'triangle');
}
