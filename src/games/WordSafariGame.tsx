import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Star, Clock, Award, Sparkles } from 'lucide-react';

interface Word {
  word: string;
  definition: string;
  hint?: string;
  category: string;
}

const WordSafari = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterPositions, setLetterPositions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [remainingWords, setRemainingWords] = useState<Word[]>([]);

  const words: Word[] = [
    {
      word: 'MONKEY',
      definition: 'A playful animal that swings from trees',
      category: 'Animals',
      hint: 'Loves bananas'
    },
    {
      word: 'JUNGLE',
      definition: 'A dense forest with many plants and animals',
      category: 'Nature',
      hint: 'Where wild animals live'
    },
    {
      word: 'TIGER',
      definition: 'A large wild cat with orange fur and black stripes',
      category: 'Animals',
      hint: 'Has stripes'
    },
    {
      word: 'RIVER',
      definition: 'A large natural flow of water that crosses land',
      category: 'Nature',
      hint: 'Water flows through it'
    },
    {
      word: 'PARROT',
      definition: 'A colorful bird that can mimic human speech',
      category: 'Animals',
      hint: 'Can repeat what you say'
    },
    {
      word: 'SNAKE',
      definition: 'A long reptile without legs that slithers',
      category: 'Animals',
      hint: 'Moves without legs'
    },
    {
      word: 'FRUIT',
      definition: 'Sweet food that grows on trees or plants',
      category: 'Food',
      hint: 'Grows on trees'
    },
    {
      word: 'LEAF',
      definition: 'A flat green part of a plant that grows from a stem',
      category: 'Nature',
      hint: 'Falls from trees'
    },
    {
      word: 'VINE',
      definition: 'A plant with a long stem that climbs or hangs',
      category: 'Nature',
      hint: 'Climbs up walls'
    },
    {
      word: 'RAIN',
      definition: 'Water drops that fall from clouds in the sky',
      category: 'Weather',
      hint: 'Falls from clouds'
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setStreak(0);
    setRemainingWords([...words]);
    nextWord();
  };

  const nextWord = () => {
    if (remainingWords.length === 0) {
      setGameOver(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[randomIndex];
    
    setCurrentWord(word);
    setSelectedLetters([]);
    setLetterPositions([]);
    setHintUsed(false);
    setFeedback(null);

    // Create shuffled array of letters
    const letters = word.word.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);

    // Remove selected word from remaining words
    setRemainingWords(remainingWords.filter((_, index) => index !== randomIndex));
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (letterPositions.includes(index)) {
      // Letter already selected, remove it
      const posIndex = letterPositions.indexOf(index);
      const newPositions = [...letterPositions];
      newPositions.splice(posIndex, 1);
      setLetterPositions(newPositions);

      const newSelected = [...selectedLetters];
      newSelected.splice(posIndex, 1);
      setSelectedLetters(newSelected);
    } else {
      // Add letter to selected
      setSelectedLetters([...selectedLetters, letter]);
      setLetterPositions([...letterPositions, index]);
    }
  };

  const checkAnswer = () => {
    if (!currentWord) return;

    const word = selectedLetters.join('');
    const isCorrect = word === currentWord.word;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      const pointsEarned = hintUsed ? 5 : 10;
      setScore(score + pointsEarned);
      setStreak(streak + 1);

      if (streak + 1 >= 3) {
        setLevel(Math.min(level + 1, 3));
        setStreak(0);
      }

      setTimeout(() => {
        nextWord();
      }, 1500);
    } else {
      setStreak(0);
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  const useHint = () => {
    if (!currentWord || hintUsed) return;

    // Fill in the first letter that isn't already correctly placed
    const correctWordArray = currentWord.word.split('');
    let hintIndex = -1;

    for (let i = 0; i < correctWordArray.length; i++) {
      if (i >= selectedLetters.length || selectedLetters[i] !== correctWordArray[i]) {
        hintIndex = i;
        break;
      }
    }

    if (hintIndex !== -1) {
      const correctLetter = correctWordArray[hintIndex];

      // Find the index in shuffledLetters that has this letter and isn't already selected
      let shuffledIndex = -1;
      for (let i = 0; i < shuffledLetters.length; i++) {
        if (shuffledLetters[i] === correctLetter && !letterPositions.includes(i)) {
          shuffledIndex = i;
          break;
        }
      }

      if (shuffledIndex !== -1) {
        // Create a new selectedLetters array with the correct letter at the hintIndex
        const newSelected = [...selectedLetters];
        if (hintIndex < newSelected.length) {
          newSelected[hintIndex] = correctLetter;
        } else {
          newSelected.push(correctLetter);
        }

        // Update the letterPositions to include the new letter position
        const newPositions = [...letterPositions];
        if (hintIndex < newPositions.length) {
          newPositions[hintIndex] = shuffledIndex;
        } else {
          newPositions.push(shuffledIndex);
        }

        setSelectedLetters(newSelected);
        setLetterPositions(newPositions);
        setHintUsed(true);
      }
    }
  };

  const clearSelected = () => {
    setSelectedLetters([]);
    setLetterPositions([]);
  };

  return (
    <div className="bg-green-50 p-6 rounded-xl max-w-2xl mx-auto">
      {!gameStarted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-green-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Word Safari
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore the jungle and discover new words and their meanings!
          </motion.p>
          
          <motion.img
            src="https://images.pexels.com/photos/8451490/pexels-photo-8451490.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Word Safari"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start Adventure
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-green-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Safari Complete!
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Award size={80} className="text-yellow-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              Your Score: <span className="font-bold text-green-600">{score}</span>
            </p>
          </motion.div>
          
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Play Again
          </motion.button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Level:</span>
              <div className="flex space-x-1">
                {[1, 2, 3].map((lvl) => (
                  <div 
                    key={lvl}
                    className={`w-8 h-2 rounded-full ${lvl <= level ? 'bg-green-600' : 'bg-gray-300'}`}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Sparkles size={20} className="text-yellow-500 mr-1" />
                <span className="font-bold">{score}</span>
              </div>
              
              <div className="flex items-center">
                <Star size={20} className="text-yellow-500 mr-1" />
                <span className="font-bold">Streak: {streak}/3</span>
              </div>
            </div>
          </div>

          {currentWord && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <div className="mb-6">
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  {currentWord.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800">What word is this?</h3>
                <p className="text-gray-700">{currentWord.definition}</p>
              </div>

              <div className="flex justify-center mb-6">
                {currentWord.word.split('').map((_, index) => (
                  <motion.div 
                    key={index}
                    className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold mx-1 ${
                      index < selectedLetters.length 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                    }`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {index < selectedLetters.length ? selectedLetters[index] : ''}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {shuffledLetters.map((letter, index) => (
                  <motion.button
                    key={index}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                      letterPositions.includes(index)
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    onClick={() => handleLetterClick(letter, index)}
                    disabled={letterPositions.includes(index)}
                    whileHover={!letterPositions.includes(index) ? { scale: 1.05 } : {}}
                    whileTap={!letterPositions.includes(index) ? { scale: 0.95 } : {}}
                  >
                    {letter}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <motion.button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={clearSelected}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>

                <motion.button
                  className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg ${
                    hintUsed ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={useHint}
                  disabled={hintUsed}
                  whileHover={!hintUsed ? { scale: 1.05 } : {}}
                  whileTap={!hintUsed ? { scale: 0.95 } : {}}
                >
                  Hint
                </motion.button>

                <motion.button
                  className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg ${
                    selectedLetters.length !== currentWord.word.length ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={checkAnswer}
                  disabled={selectedLetters.length !== currentWord.word.length}
                  whileHover={selectedLetters.length === currentWord.word.length ? { scale: 1.05 } : {}}
                  whileTap={selectedLetters.length === currentWord.word.length ? { scale: 0.95 } : {}}
                >
                  Check
                </motion.button>
              </div>

              {currentWord.hint && hintUsed && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    <span className="font-bold">Hint:</span> {currentWord.hint}
                  </p>
                </div>
              )}
            </div>
          )}

          <AnimatePresence>
            {feedback && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`text-4xl font-bold ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}
                  initial={{ scale: 0.5, y: 20 }}
                  animate={{ scale: 1.5, y: 0 }}
                  exit={{ scale: 0.5, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  {feedback === 'correct' ? 'Correct!' : 'Try Again!'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default WordSafari;