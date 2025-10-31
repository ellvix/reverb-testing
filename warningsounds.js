function playDissonantBeep(baseFreq = 440, duration = 0.4) {
    const context = new (window.AudioContext || window.webkitAudioContext)();

    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gain = context.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    osc1.frequency.value = baseFreq;
    osc2.frequency.value = baseFreq * Math.pow(2, 1 / 12); // half step up

    const now = context.currentTime;
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(context.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);

    osc2.onended = () => context.close();
}

function playDoubleBeep(baseFreq = 180, duration = 0.2, spacing = 0.1, downstep = false, wave = 'sine') {
    const context = new (window.AudioContext || window.webkitAudioContext)();

    function playOneBeep(freq, startTime) {
        const osc = context.createOscillator();
        const gain = context.createGain();

        osc.type = wave;
        osc.frequency.value = freq;
        let vol = 1;
        if ( wave != 'sine' ) vol = .5;

        gain.gain.setValueAtTime(vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(context.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    const now = context.currentTime;
    playOneBeep(baseFreq, now);
    if ( downstep ) {
        playOneBeep(baseFreq / Math.pow(2, 1 / 12), now + spacing); // half step down
    } else {
        playOneBeep(baseFreq, now + spacing);
    }

    setTimeout(() => context.close(), (spacing + duration + 0.1) * 1000);
}

// Final tone for button 1
document.getElementById('warn1').addEventListener('click', () => playDissonantBeep(330, 0.4));

// New bass double beep for button 2, no downstep
document.getElementById('warn2').addEventListener('click', () => playDoubleBeep(180, .2, .1, false, 'sine'));
// Bass double beep with 1/2 step down for button 3
document.getElementById('warn3').addEventListener('click', () => playDoubleBeep(180, 0.2, .1, true, 'sine'));

// square versions of the above
// New bass double beep for button 2, no downstep
document.getElementById('warn4').addEventListener('click', () => playDoubleBeep(180, .2, .1, false, 'square'));
// Bass double beep with 1/2 step down for button 3
document.getElementById('warn5').addEventListener('click', () => playDoubleBeep(180, 0.2, .1, true, 'square'));

