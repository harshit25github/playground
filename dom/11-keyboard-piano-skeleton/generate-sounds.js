// Generates simple sine-wave .wav files for the piano skeleton (no external deps).
//
// Run (from repo root):
//   node playground/dom/11-keyboard-piano-skeleton/generate-sounds.js
//
// Output:
//   playground/dom/11-keyboard-piano-skeleton/sounds/*.wav

const fs = require("node:fs");
const path = require("node:path");

const outDir = path.join(__dirname, "sounds");
fs.mkdirSync(outDir, { recursive: true });

// 16-bit PCM WAV writer
function writeWav16Mono(filePath, samples, sampleRate) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;

  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  let offset = 0;
  buffer.write("RIFF", offset);
  offset += 4;
  buffer.writeUInt32LE(36 + dataSize, offset);
  offset += 4;
  buffer.write("WAVE", offset);
  offset += 4;

  buffer.write("fmt ", offset);
  offset += 4;
  buffer.writeUInt32LE(16, offset);
  offset += 4;
  buffer.writeUInt16LE(1, offset); // PCM
  offset += 2;
  buffer.writeUInt16LE(numChannels, offset);
  offset += 2;
  buffer.writeUInt32LE(sampleRate, offset);
  offset += 4;
  buffer.writeUInt32LE(byteRate, offset);
  offset += 4;
  buffer.writeUInt16LE(blockAlign, offset);
  offset += 2;
  buffer.writeUInt16LE(bitsPerSample, offset);
  offset += 2;

  buffer.write("data", offset);
  offset += 4;
  buffer.writeUInt32LE(dataSize, offset);
  offset += 4;

  for (let i = 0; i < samples.length; i += 1) {
    buffer.writeInt16LE(samples[i], offset);
    offset += 2;
  }

  fs.writeFileSync(filePath, buffer);
}

// MIDI to frequency (A4=440Hz)
function midiToFreq(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function makeSineNote({ freqHz, durationSec, sampleRate, gain }) {
  const length = Math.floor(durationSec * sampleRate);
  const out = new Int16Array(length);

  // tiny fade to avoid clicks
  const fadeMs = 12;
  const fadeSamples = Math.max(1, Math.floor((fadeMs / 1000) * sampleRate));

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const wave = Math.sin(2 * Math.PI * freqHz * t);

    let env = 1;
    if (i < fadeSamples) env = i / fadeSamples;
    if (i > length - fadeSamples) env = Math.max(0, (length - i) / fadeSamples);

    const v = wave * env * gain;
    out[i] = Math.max(-1, Math.min(1, v)) * 32767;
  }

  return out;
}

// Notes for one octave around C4 (MIDI 60)
const notes = [
  { name: "C4", midi: 60 },
  { name: "Cs4", midi: 61 }, // C#
  { name: "D4", midi: 62 },
  { name: "Ds4", midi: 63 }, // D#
  { name: "E4", midi: 64 },
  { name: "F4", midi: 65 },
  { name: "Fs4", midi: 66 }, // F#
  { name: "G4", midi: 67 },
  { name: "Gs4", midi: 68 }, // G#
  { name: "A4", midi: 69 },
  { name: "As4", midi: 70 }, // A#
  { name: "B4", midi: 71 },
];

const sampleRate = 44100;
const durationSec = 0.7;
const gain = 0.22;

for (const n of notes) {
  const freqHz = midiToFreq(n.midi);
  const samples = makeSineNote({ freqHz, durationSec, sampleRate, gain });
  const filePath = path.join(outDir, `${n.name}.wav`);
  writeWav16Mono(filePath, samples, sampleRate);
}

console.log(`Generated ${notes.length} wav files in: ${outDir}`);

