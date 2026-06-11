let voicesReady = false;

// Voices load asynchronously — prime them on first import
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const prime = () => {
    window.speechSynthesis.getVoices();
    voicesReady = true;
  };
  if (window.speechSynthesis.getVoices().length > 0) {
    voicesReady = true;
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', prime, { once: true });
  }
}

function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(v => v.lang === 'mr-IN') ||
    voices.find(v => v.lang.startsWith('mr')) ||
    voices.find(v => v.lang === 'hi-IN') || // Hindi as fallback — same script
    null
  );
}

function doSpeak(text: string, resolve: () => void, reject: (e: Error) => void) {
  // Chrome bug: synthesis gets silently stuck if paused
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  window.speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'mr-IN';
  utt.rate = 0.82;
  utt.pitch = 1;
  const voice = getBestVoice();
  if (voice) utt.voice = voice;
  utt.onend = () => resolve();
  utt.onerror = (e) => reject(new Error(e.error ?? 'speech error'));
  window.speechSynthesis.speak(utt);
}

export function speakMarathi(text: string): Promise<void> {
  if (!('speechSynthesis' in window)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (voicesReady) {
      doSpeak(text, resolve, reject);
    } else {
      // Wait up to 1 s for voices, then speak anyway
      const timeout = setTimeout(() => {
        voicesReady = true;
        doSpeak(text, resolve, reject);
      }, 1000);
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        clearTimeout(timeout);
        voicesReady = true;
        doSpeak(text, resolve, reject);
      }, { once: true });
    }
  });
}

