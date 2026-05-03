// =====================================================
// Web Audio（効果音・BGM）
// =====================================================

let audioCtx = null;
let muted = false;
try { muted = localStorage.getItem('sr_muted_v1') === '1'; } catch(e) {}

function ensureAudio() {
    if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        try { audioCtx = new AC(); } catch(e) { audioCtx = null; return; }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// =====================================================
// BGM
// =====================================================
const bgm = document.getElementById('bgm');
bgm.volume = 0.4;
bgm.muted = muted;

function bgmPlay() {
    bgm.currentTime = 0;
    bgm.play().catch(() => {});
}
function bgmStop() {
    bgm.pause();
    bgm.currentTime = 0;
}

// =====================================================
// 効果音
// =====================================================

function playFlap() {
    if (muted || !audioCtx) return;
    const t0 = audioCtx.currentTime;
    const dur = 0.08 + Math.random() * 0.04;
    const baseFreq = 320 + (Math.random() - 0.5) * 100;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(60, baseFreq * 0.55), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(0.18, t0 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
}

function playSmash() {
    if (muted || !audioCtx) return;
    const t0 = audioCtx.currentTime;

    // 低音ドン
    const lowOsc = audioCtx.createOscillator();
    const lowGain = audioCtx.createGain();
    lowOsc.type = 'sine';
    lowOsc.frequency.setValueAtTime(95, t0);
    lowOsc.frequency.exponentialRampToValueAtTime(40, t0 + 0.05);
    lowGain.gain.setValueAtTime(0.28, t0);
    lowGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.07);
    lowOsc.connect(lowGain).connect(audioCtx.destination);
    lowOsc.start(t0); lowOsc.stop(t0 + 0.09);

    // 高音チリン
    const hiOsc = audioCtx.createOscillator();
    const hiGain = audioCtx.createGain();
    hiOsc.type = 'sawtooth';
    hiOsc.frequency.setValueAtTime(1050 + Math.random() * 250, t0);
    hiOsc.frequency.exponentialRampToValueAtTime(680, t0 + 0.2);
    hiGain.gain.setValueAtTime(0.0001, t0);
    hiGain.gain.linearRampToValueAtTime(0.09, t0 + 0.005);
    hiGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
    hiOsc.connect(hiGain).connect(audioCtx.destination);
    hiOsc.start(t0); hiOsc.stop(t0 + 0.22);
}
