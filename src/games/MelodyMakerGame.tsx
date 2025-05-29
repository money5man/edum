import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Square, Save, Trash, Plus } from 'lucide-react';
import * as Tone from 'tone';

const MelodyMakerGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [melody, setMelody] = useState<boolean[][]>([]);
  const intervalRef = useRef<number | null>(null);
  
  // Define the musical scale (C major)
  const notes = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
  const numBeats = 8;
  
  // Initialize empty melody grid
  useEffect(() => {
    if (gameStarted && melody.length === 0) {
      const initialMelody = Array(notes.length).fill(null).map(() => Array(numBeats).fill(false));
      setMelody(initialMelody);
    }
  }, [gameStarted, melody.length]);
  
  const startGame = () => {
    setGameStarted(true);
  };
  
  const playNote = async (note: string) => {
    try {
      const synth = new Tone.Synth().toDestination();
      await Tone.start();
      synth.triggerAttackRelease(note, '8n');
      setTimeout(() => synth.dispose(), 1000);
    } catch (e) {
      console.error('Web Audio API not supported');
    }
  };
  
  const toggleNoteInMelody = (noteIndex: number, beatIndex: number) => {
    const newMelody = [...melody];
    newMelody[noteIndex][beatIndex] = !newMelody[noteIndex][beatIndex];
    setMelody(newMelody);
    
    // Play the note when activated
    if (newMelody[noteIndex][beatIndex]) {
      playNote(notes[noteIndex]);
    }
  };
  
  const playMelody = async () => {
    if (isPlaying) {
      stopMelody();
      return;
    }
    
    await Tone.start();
    setIsPlaying(true);
    setCurrentBeat(-1);
    
    const beatDuration = 60000 / tempo / 4; // quarter note duration in ms
    
    intervalRef.current = window.setInterval(() => {
      setCurrentBeat(prevBeat => {
        const nextBeat = (prevBeat + 1) % numBeats;
        
        // Play all active notes for this beat
        melody.forEach((row, noteIndex) => {
          if (row[nextBeat]) {
            playNote(notes[noteIndex]);
          }
        });
        
        return nextBeat;
      });
    }, beatDuration);
  };
  
  const stopMelody = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(-1);
  };
  
  const clearMelody = () => {
    const newMelody = Array(notes.length).fill(null).map(() => Array(numBeats).fill(false));
    setMelody(newMelody);
    stopMelody();
  };
  
  const saveMelody = () => {
    // In a real app, this would save to a database
    alert('Melody saved! In a real app, this would save your composition.');
  };
  
  const addPresetMelody = () => {
    // Simple melody preset (Twinkle Twinkle Little Star pattern)
    const newMelody = Array(notes.length).fill(null).map(() => Array(numBeats).fill(false));
    // C C G G A A G
    newMelody[7][0] = true; // C4
    newMelody[7][1] = true; // C4
    newMelody[3][2] = true; // G4
    newMelody[3][3] = true; // G4
    newMelody[2][4] = true; // A4
    newMelody[2][5] = true; // A4
    newMelody[3][6] = true; // G4
    setMelody(newMelody);
  };
  
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-purple-50 p-6 rounded-xl max-w-2xl mx-auto">
      {!gameStarted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-purple-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Melody Maker
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Create music and learn about different instruments and musical notes!
          </motion.p>
          
          <motion.img
            src="https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Melody Maker"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <motion.button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start Composing
          </motion.button>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-xl font-bold text-purple-700 mb-3 md:mb-0 flex items-center">
              <Music size={24} className="mr-2" />
              Melody Composer
            </h3>
            
            <div className="flex space-x-2">
              <motion.button
                className={`p-2 rounded-lg flex items-center ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                onClick={playMelody}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Square size={18} className="mr-1" /> : <Play size={18} className="mr-1" />}
                {isPlaying ? 'Stop' : 'Play'}
              </motion.button>
              
              <motion.button
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 p-2 rounded-lg flex items-center"
                onClick={clearMelody}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash size={18} className="mr-1" />
                Clear
              </motion.button>
              
              <motion.button
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg flex items-center"
                onClick={saveMelody}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save size={18} className="mr-1" />
                Save
              </motion.button>
              
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex items-center"
                onClick={addPresetMelody}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} className="mr-1" />
                Preset
              </motion.button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempo: {tempo} BPM</label>
            <input
              type="range"
              min="60"
              max="200"
              value={tempo}
              onChange={(e) => setTempo(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <div className="grid grid-cols-9 gap-1">
              {/* Note labels */}
              <div className="col-span-1">
                <div className="h-8"></div> {/* Empty corner */}
                {notes.map((note, index) => (
                  <div 
                    key={`note-${index}`}
                    className="h-12 flex items-center justify-center font-medium bg-purple-100 text-purple-800 rounded-lg"
                  >
                    {note}
                  </div>
                ))}
              </div>
              
              {/* Beat grid */}
              <div className="col-span-8 grid grid-cols-8 gap-1">
                {/* Beat numbers */}
                {Array(numBeats).fill(null).map((_, beatIndex) => (
                  <div 
                    key={`beat-${beatIndex}`}
                    className="h-8 flex items-center justify-center font-medium"
                  >
                    {beatIndex + 1}
                  </div>
                ))}
                
                {/* Note grid */}
                {melody.map((row, noteIndex) => (
                  <React.Fragment key={`row-${noteIndex}`}>
                    {row.map((isActive, beatIndex) => (
                      <motion.button
                        key={`cell-${noteIndex}-${beatIndex}`}
                        className={`h-12 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-purple-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        } ${currentBeat === beatIndex ? 'ring-2 ring-purple-300' : ''}`}
                        onClick={() => toggleNoteInMelody(noteIndex, beatIndex)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-600">
            <p className="font-medium mb-1">Music Learning Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The grid represents notes (vertical) and time (horizontal)</li>
              <li>Click cells to add or remove notes</li>
              <li>C, D, E, F, G, A, B, C is the C major scale</li>
              <li>Try creating a melody that repeats a pattern</li>
              <li>Adjust the tempo slider to make your song faster or slower</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MelodyMakerGame;