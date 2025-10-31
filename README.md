# Audio Testing Ground

This is an audio testing ground built with the Web Audio API. It includes a variety of tone generators for experimenting with pitch, modulation, and effects — useful for accessibility testing, UX prototyping, or general sound design.

---

## Warning Tones

The first section features 5 buttons, each triggering a unique warning tone:

- Short procedural tones generated entirely in JavaScript
- Quick 0.2–0.4 second alerts with subtle falloff to avoid clipping
- Some tones use dissonance (two oscillators), others use stepped frequency changes, other use different wave types

---

This is a browser-based tone generator built using the Web Audio API. It generates a pure sine wave oscillator and simulates reverb using a procedurally created impulse response — no external audio files needed.

## Procedural Reverb Synth

- Adjustable oscillator frequency (pitch)
- Customizable tone duration
- Procedural reverb with user-defined duration and decay
- Dry/Wet mix controls for balancing clean vs reverb trail
- Play and Stop buttons to interact in real-time

### Controls

- **Oscillator Frequency**: Sets the pitch of the tone in Hz
- **Tone Duration**: How long the tone plays before stopping
- **Reverb Duration**: Length of the reverb impulse buffer (affects how big the space sounds)
- **Reverb Decay**: How quickly the reverb fades away
- **Dry Gain**: Volume of the clean, direct sound
- **Wet Gain**: Volume of the reverb (echo) tail

### Usage

Open `index.html` in a modern browser and click **Play** to hear the sound based on your selected settings.  
Click **Stop** to immediately kill all audio output.

> Note: Some browsers (like FF and mobile) require a user interaction (like a click) to allow audio playback.

## Demo

[DEMO](https://ellvix.github.io/reverb-testing) available, feel free to play around!
