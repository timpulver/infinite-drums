/**
 * MIDI map
 * @author Tim
 * 
 * Maps MIDI notes to instruments.
 * "General MIDI" map taken from:
 * https://usermanuals.finalemusic.com/SongWriter2012Win/Content/PercussionMaps.htm
 * 
 * Key: MIDI note number
 * Value: Instrument name
 * 
 * Usage:
 * import midiMap from './midi-map.js';
 * console.log(midiMap.get(35)) // 'Bass Drum'
 */

const generalMidiMap = new Map();
generalMidiMap.set(27, 'Laser');
generalMidiMap.set(28, 'Whip');
generalMidiMap.set(29, 'Scratch Push');
generalMidiMap.set(30, 'Scratch Pull');
generalMidiMap.set(31, 'Stick Click');
generalMidiMap.set(32, 'Metronome Click');
generalMidiMap.set(34, 'Metronome Bell');
generalMidiMap.set(35, 'Bass Drum');
generalMidiMap.set(36, 'Kick Drum');
generalMidiMap.set(37, 'Snare Cross Stick');
generalMidiMap.set(38, 'Snare Drum');
generalMidiMap.set(39, 'Hand Clap');
generalMidiMap.set(40, 'Electric Snare Drum');
generalMidiMap.set(41, 'Floor Tom');
generalMidiMap.set(42, 'Hi-Hat Closed');
generalMidiMap.set(43, 'Floor Tom');
generalMidiMap.set(44, 'Hi-Hat Foot');
generalMidiMap.set(45, 'Low Tom');
generalMidiMap.set(46, 'Hi-Hat Open');
generalMidiMap.set(47, 'Low-Mid Tom');
generalMidiMap.set(48, 'High-Mid Tom');
generalMidiMap.set(49, 'Crash Cymbal');
generalMidiMap.set(50, 'High Tom');
generalMidiMap.set(51, 'Ride Cymbal');
generalMidiMap.set(52, 'China Cymbal');
generalMidiMap.set(53, 'Ride Bell');
generalMidiMap.set(54, 'Tambourine');
generalMidiMap.set(55, 'Splash cymbal');
generalMidiMap.set(56, 'Cowbell');
generalMidiMap.set(57, 'Crash Cymbal');
generalMidiMap.set(58, 'Vibraslap');
generalMidiMap.set(59, 'Ride Cymbal');
generalMidiMap.set(60, 'High Bongo');
generalMidiMap.set(61, 'Low Bongo');
generalMidiMap.set(62, 'Conga Dead Stroke');
generalMidiMap.set(63, 'Conga');
generalMidiMap.set(64, 'Tumba');
generalMidiMap.set(65, 'High Timbale');
generalMidiMap.set(66, 'Low Timbale');
generalMidiMap.set(67, 'High Agogo');
generalMidiMap.set(68, 'Low Agogo');
generalMidiMap.set(69, 'Cabasa');
generalMidiMap.set(70, 'Maracas');
generalMidiMap.set(71, 'Whistle Short');
generalMidiMap.set(72, 'Whistle Long');
generalMidiMap.set(73, 'Guiro Short');
generalMidiMap.set(74, 'Guiro Long');
generalMidiMap.set(75, 'Claves');
generalMidiMap.set(76, 'High Woodblock');
generalMidiMap.set(77, 'Low Woodblock');
generalMidiMap.set(78, 'Cuica High');
generalMidiMap.set(79, 'Cuica Low');
generalMidiMap.set(80, 'Triangle Mute');
generalMidiMap.set(81, 'Triangle Open');
generalMidiMap.set(82, 'Shaker');
generalMidiMap.set(83, 'Sleigh Bell');
generalMidiMap.set(84, 'Bell Tree');
generalMidiMap.set(85, 'Castanets');
generalMidiMap.set(86, 'Surdu Dead Stroke');
generalMidiMap.set(87, 'Surdu');
generalMidiMap.set(91, 'Snare Drum Rod');
generalMidiMap.set(92, 'Ocean Drum');
generalMidiMap.set(93, 'Snare Drum Brush');

export default generalMidiMap;
