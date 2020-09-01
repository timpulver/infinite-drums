import midiMap from './midi-map.js';
import { players, sampleMap } from './players.js';
import './audio-context.js';

/**
 * Nomenclature:
 *   - Sample: Magenta sample object
 *   - Audio Sample: e.g. kick drum sound
 */

console.log('Start...');

// called on cables error
function showError(errId, errMsg) {
  alert('An error occured: ' + errId + ', ' + errMsg);
}

function patchInitialized() {
  // You can now access the patch object (CABLES.patch), register variable watchers and so on
  console.log('Patch initialized');
}

function patchFinishedLoading() {
  // The patch is ready now, all assets have been loaded
  console.log('Patch finished loading');
}

document.addEventListener('CABLES.jsLoaded', function(event) {
  CABLES.patch = new CABLES.Patch({
      patch: CABLES.exportedPatch,
      prefixAssetPath: '',
      glCanvasId: 'cables-canvas',
      glCanvasResizeToWindow: true,
      onError: showError,
      onPatchLoaded: patchInitialized,
      onFinishedLoading: patchFinishedLoading,
  });
});

let samples = [];
let currentSampleIndex = -1;
let currentSample = null;
let currentPart = null;
// let nextPart = null;

/**
 * items = [{
 *   time: stepToTransportTime(note.quantizedStartStep),
 *   instrument: midiMap.get(note.pitch),
 *   step: note.quantizedStartStep,
 *   velocity: 1,
 * }, ...]
 */
function createOneHotNoteArr(items) {
  const sampleNames = Object.keys(sampleMap);
  const numRowsInCables = 6;
  const totalSteps = 32; // 2m
  const arr = [];
  for(let i=0; i<sampleNames.length; i++) {
    for (let j=0; j<totalSteps; j++) {
      arr[i * totalSteps + j] = items.some((item) => item.step === j && item.instrument === sampleNames[i]) ? 1 : 0;
    }
  }
  return arr;
}

function activateMagentaSample(index) {
  if (index < 0 || index >= samples.length) {
    console.error('Index out of range: ', index);
    return;
  }
  currentSample = samples[index];
  currentSampleIndex = index;
  if (currentPart) { currentPart.stop(); }
  const { part, items } = createPartFromSample(currentSample);
  currentPart = part;
  currentPart.start('+0');
  // Tone.Draw.schedule(function(){
  //   //do drawing or DOM manipulation here
  //   CABLES.patch.setVariable('step', value.step);
  // }, time)
  const arr = createOneHotNoteArr(items);
  CABLES.patch.setVariable('noteOnArr', arr);
}

window.next = () => {
  activateMagentaSample(currentSampleIndex + 1);
};

// Each bundle exports a global object with the name of the bundle.
// const player = new core.Player();
//...
const mvae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_lokl_small');
mvae.initialize().then(() => {
  mvae.sample(100).then((magentaSamples) => {
    samples = magentaSamples;
    activateMagentaSample(0);
  });
});

const part = new Tone.Part(((time, value) => {
  Tone.Draw.schedule(function(){
    //do drawing or DOM manipulation here
    CABLES.patch.setVariable('step', value.step);
	}, time)
}), [
  { time: '0:0:0', step: 0 },
  { time: '0:0:1', step: 1 },
  { time: '0:0:2', step: 2 },
  { time: '0:0:3', step: 3 },
  { time: '0:1:0', step: 4 },
  { time: '0:1:1', step: 5 },
  { time: '0:1:2', step: 6 },
  { time: '0:1:3', step: 7 },
  { time: '0:2:0', step: 8 },
  { time: '0:2:1', step: 9 },
  { time: '0:2:2', step: 10 },
  { time: '0:2:3', step: 11 },
  { time: '0:3:0', step: 12 },
  { time: '0:3:1', step: 13 },
  { time: '0:3:2', step: 14 },
  { time: '0:3:3', step: 15 },
  { time: '1:0:0', step: 16 },
  { time: '1:0:1', step: 17 },
  { time: '1:0:2', step: 18 },
  { time: '1:0:3', step: 19 },
  { time: '1:1:0', step: 20 },
  { time: '1:1:1', step: 21 },
  { time: '1:1:2', step: 22 },
  { time: '1:1:3', step: 23 },
  { time: '1:2:0', step: 24 },
  { time: '1:2:1', step: 25 },
  { time: '1:2:2', step: 26 },
  { time: '1:2:3', step: 27 },
  { time: '1:3:0', step: 28 },
  { time: '1:3:1', step: 29 },
  { time: '1:3:2', step: 30 },
  { time: '1:3:3', step: 31 },
]);

Tone.Transport.loopStart = 0;
Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;
Tone.Transport.start(0);
part.start(0)

/**
 * Converts a step to a transport time unit.
 * @param {number} step - [0..31]
 * @returns {string} - e.g. '2:3:0'
 * @see https://github.com/Tonejs/Tone.js/wiki/Time
 */
function stepToTransportTime(step){
  const bars = Math.floor(step / 16);
  let rest = step % 16;
  const quarters = Math.floor(rest / 4);
  const sixteenth = rest % 4;
  return `${bars}:${quarters}:${sixteenth}`;
}

/**
 * 
 * @param {Object} sample
 * @param {Array} sample.notes 
 * @returns {Object} Tone.Part (not started, yet)
 * Example note object:
 *   {
 *     isDrum: true
 *     pitch: 36
 *     quantizedEndStep: 1
 *     quantizedStartStep: 0
 *   }
 */

function createPartFromSample(sample) {
  if (!sample) { console.error('Sample is null.'); return; }
  const { notes } = sample;
  const partItems = notes.map((note) => {
    return {
      time: stepToTransportTime(note.quantizedStartStep),
      instrument: midiMap.get(note.pitch),
      step: note.quantizedStartStep,
      velocity: 1,
    };
  });
  const part = new Tone.Part(((time, value) => {
    // the value is an object which contains both the note and the velocity
    if (players.has(value.instrument)) {
      players.player(value.instrument).start(time);
    } else {
      console.error(`No player with name ${value.instrument}.`);
    }
  }), partItems);
  part.humanize = false;
  return {
    part,
    items: partItems,
  };
}

export default {};