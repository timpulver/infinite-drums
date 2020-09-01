// The keys of the sample map must match the names in midi-map.js
// let audioSamplesLoaded = false;

const noise1 = '../samples/Fx_01.wav';
const noise2 = '../samples/Fx_02.wav';
const noise3 = '../samples/Fx_03.wav';
const noise4 = '../samples/Fx_04.wav';
const noise5 = '../samples/Fx_05.wav';
const noise6 = '../samples/Fx_06.wav';

const eq = new Tone.EQ3(1.3, 1.2, 0.8);
const reverb = new Tone.Reverb(0.2);
const gain = new Tone.Gain(2.2);

export const sampleMap = {
  'Kick Drum': '../samples/Kick_01.wav',
  'Snare Drum': '../samples/Snare_01.wav',
  'Hi-Hat Closed': '../samples/HiHat_01.wav',
  'Hi-Hat Open': noise1,
  'High Tom': noise5, 
  'High-Mid Tom': noise2,
  'Low Tom': noise6,
  'Crash Cymbal': noise3,
  'Ride Cymbal': noise4,
}; 

export const players = new Tone.Players (sampleMap).chain(reverb, eq, gain, Tone.Destination);

// export const getAudioSamplesLoaded = players.loaded;
