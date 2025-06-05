let context = null;
let osc = null;

const get = id => document.getElementById(id);
const updateValue = id => {
    get('val-' + id).textContent = get(id).value;
};

['frequency', 'duration', 'irDuration', 'decay', 'dry', 'wet'].forEach(id => {
        get(id).addEventListener('input', () => updateValue(id));
        });

get('play').addEventListener('click', () => {
        context = new (window.AudioContext || window.webkitAudioContext)();

        const OSC_FREQUENCY = parseFloat(get('frequency').value);
        const DURATION_SECONDS = parseFloat(get('duration').value);
        const IR_DURATION = parseFloat(get('irDuration').value);
        const IR_DECAY = parseFloat(get('decay').value);
        const DRY_GAIN = parseFloat(get('dry').value);
        const WET_GAIN = parseFloat(get('wet').value);

        osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = OSC_FREQUENCY;

        const dry = context.createGain();
        dry.gain.value = DRY_GAIN;

        const wet = context.createGain();
        wet.gain.value = WET_GAIN;

        const convolver = context.createConvolver();
        convolver.buffer = createImpulseResponse(context, IR_DURATION, IR_DECAY);

        osc.connect(dry);
        osc.connect(convolver);

        dry.connect(context.destination);
        convolver.connect(wet);
        wet.connect(context.destination);

        osc.start();
        osc.stop(context.currentTime + DURATION_SECONDS);

        osc.onended = () => {
            osc = null;
            setTimeout(() => {
                    if (context) {
                    context.close();
                    context = null;
                    }
                    }, 5000); // allow tail to fade naturally for 5s
        };


        function createImpulseResponse(context, duration, decay) {
            const rate = context.sampleRate;
            const length = rate * duration;
            const impulse = context.createBuffer(2, length, rate);

            for (let ch = 0; ch < 2; ch++) {
                const channel = impulse.getChannelData(ch);
                for (let i = 0; i < length; i++) {
                    channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
                }
            }

            return impulse;
        }
});

get('stop').addEventListener('click', () => {
        if (osc) {
        try {
        osc.stop();
        } catch (e) {} // ignore if already stopped
        osc = null;
        }
        if (context) {
        context.close();
        context = null;
        }
        });

