import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Award, RotateCcw, Brain } from 'lucide-react';

const MemoryMatch: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState<{id: number, value: string, flipped: boolean, matched: boolean}[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [category, setCategory] = useState<'animals' | 'math' | 'science'>('animals');
  
  const cardValues = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐸'],
    math: ['1+1=2', '2+2=4', '3+3=6', '4+4=8', '5+5=10', '6+6=12', '7+7=14', '8+8=16', '9+9=18', '10+10=20', '2×5=10', '3×4=12'],
    science: ['H₂O', 'CO₂', 'O₂', 'Na', 'Fe', 'Au', 'DNA', 'Plant', 'Solar', 'Atom', 'Energy', 'Cell']
  };
  
  const difficultyConfig = {
    easy: 6, // 6 pairs = 12 cards
    medium: 8, // 8 pairs = 16 cards
    hard: 12 // 12 pairs = 24 cards
  };
  
  const facts = {
    animals: {
      '🐶': 'Dogs have a sense of smell that is up to 100,000 times stronger than humans.',
      '🐱': 'Cats spend about 70% of their lives sleeping.',
      '🐭': 'Mice can produce up to 100 babies per year.',
      '🐹': 'Hamsters can run up to 8 miles per night on a wheel.',
      '🐰': 'Rabbits have nearly 360° vision but they can\'t see directly in front of them.',
      '🦊': 'Foxes use the Earth\'s magnetic field to hunt their prey.',
      '🐻': 'Bears can smell food from over a mile away.',
      '🐼': 'Giant pandas eat bamboo for about 12 hours every day.',
      '🐨': 'Koalas sleep for up to 22 hours a day.',
      '🦁': 'A lion\'s roar can be heard from 5 miles away.',
      '🐯': 'No two tigers have the same pattern of stripes.',
      '🐸': 'Some frogs can freeze during winter and then thaw in spring.'
    },
    math: {
      '1+1=2': 'One plus one equals two. This is the simplest addition equation.',
      '2+2=4': 'Two plus two equals four. This is a basic addition fact.',
      '3+3=6': 'Three plus three equals six. It\'s also the same as 2×3.',
      '4+4=8': 'Four plus four equals eight. This is a double.',
      '5+5=10': 'Five plus five equals ten. It\'s half of twenty.',
      '6+6=12': 'Six plus six equals twelve. It\'s also the same as a dozen.',
      '7+7=14': 'Seven plus seven equals fourteen. It\'s one less than fifteen.',
      '8+8=16': 'Eight plus eight equals sixteen. It\'s also the same as 2⁴.',
      '9+9=18': 'Nine plus nine equals eighteen. It\'s one less than nineteen.',
      '10+10=20': 'Ten plus ten equals twenty. It\'s also the same as 2×10.',
      '2×5=10': 'Two times five equals ten. It\'s also the same as 5+5.',
      '3×4=12': 'Three times four equals twelve. It\'s also the same as a dozen.'
    },
    science: {
      'H₂O': 'H₂O is the chemical formula for water. It contains 2 hydrogen atoms and 1 oxygen atom.',
      'CO₂': 'CO₂ is carbon dioxide. Plants use it to make their own food through photosynthesis.',
      'O₂': 'O₂ is oxygen. It\'s what we breathe to stay alive.',
      'Na': 'Na is the symbol for sodium. It\'s a soft metal that reacts with water.',
      'Fe': 'Fe is the symbol for iron. It\'s a metal used to make steel.',
      'Au': 'Au is the symbol for gold. It\'s a precious metal used in jewelry.',
      'DNA': 'DNA contains the genetic instructions for all living things.',
      'Plant': 'Plants make their own food using sunlight, water, and carbon dioxide.',
      'Solar': 'Solar energy comes from the sun and can be converted into electricity.',
      'Atom': 'Atoms are the basic building blocks of all matter.',
      'Energy': 'Energy can neither be created nor destroyed, only transformed from one form to another.',
      'Cell': 'Cells are the basic units of life. All living things are made of cells.'
    }
  };
  
  const startGame = () => {
    const pairsCount = difficultyConfig[difficulty];
    const selectedValues = cardValues[category].slice(0, pairsCount);
    
    const initialCards = [];
    for (let i = 0; i < pairsCount; i++) {
      // Add each value twice (for pairs)
      initialCards.push({
        id: i * 2,
        value: selectedValues[i],
        flipped: false,
        matched: false
      });
      initialCards.push({
        id: i * 2 + 1,
        value: selectedValues[i],
        flipped: false,
        matched: false
      });
    }
    
    // Shuffle the cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setSelectedCards([]);
    setMoves(0);
    setGameCompleted(false);
    setTimer(0);
    setTimerActive(true);
    setGameStarted(true);
  };
  
  // Timer logic
  useEffect(() => {
    let interval: number | null = null;
    
    if (timerActive) {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);
  
  // Check if game is completed
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameCompleted(true);
      setTimerActive(false);
    }
  }, [cards]);
  
  const handleCardClick = (id: number) => {
    // Prevent clicking if there are already 2 selected cards or the card is already flipped/matched
    if (selectedCards.length >= 2) return;
    
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;
    
    // Flip the card
    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    
    // Add to selected cards
    const newSelectedCards = [...selectedCards, id];
    setSelectedCards(newSelectedCards);
    
    // If two cards are selected, check for a match
    if (newSelectedCards.length === 2) {
      setMoves(moves + 1);
      
      const firstCard = cards.find(card => card.id === newSelectedCards[0]);
      const secondCard = cards.find(card => card.id === newSelectedCards[1]);
      
      if (firstCard?.value === secondCard?.value) {
        // It's a match!
        setTimeout(() => {
          const matchedCards = cards.map(card =>
            card.id === firstCard?.id || card.id === secondCard?.id
              ? { ...card, matched: true }
              : card
          );
          setCards(matchedCards);
          setSelectedCards([]);
        }, 500);
      } else {
        // Not a match, flip cards back
        setTimeout(() => {
          const resetCards = cards.map(card =>
            card.id === firstCard?.id || card.id === secondCard?.id
              ? { ...card, flipped: false }
              : card
          );
          setCards(resetCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };
  
  const resetGame = () => {
    setSelectedCards([]);
    setMoves(0);
    setGameCompleted(false);
    setTimer(0);
    setGameStarted(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getCardGridClass = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-3 md:grid-cols-4';
      case 'medium': return 'grid-cols-3 md:grid-cols-4';
      case 'hard': return 'grid-cols-4 md:grid-cols-6';
    }
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-xl max-w-2xl mx-auto">
      {!gameStarted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-yellow-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Memory Match
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Test your memory by matching pairs of cards and learn new facts!
          </motion.p>
          
          <motion.img
            src="https://images.pexels.com/photos/3905729/pexels-photo-3905729.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Memory Match"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-700">Game Settings</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex gap-2">
                <motion.button 
                  className={`px-4 py-2 rounded-lg ${
                    difficulty === 'easy' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setDifficulty('easy')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Easy
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 rounded-lg ${
                    difficulty === 'medium' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setDifficulty('medium')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Medium
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 rounded-lg ${
                    difficulty === 'hard' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setDifficulty('hard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hard
                </motion.button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex gap-2">
                <motion.button 
                  className={`px-4 py-2 rounded-lg ${
                    category === 'animals' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setCategory('animals')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Animals
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 rounded-lg ${
                    category === 'math' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setCategory('math')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Math
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 rounded-lg ${
                    category === 'science' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setCategory('science')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Science
                </motion.button>
              </div>
            </div>
          </div>
          
          <motion.button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start Game
          </motion.button>
        </div>
      ) : gameCompleted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-yellow-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Well Done!
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Award size={80} className="text-yellow-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">
              You completed the game in <span className="font-bold text-yellow-600">{moves}</span> moves!
            </p>
            <p className="text-xl text-gray-600">
              Time: <span className="font-bold text-yellow-600">{formatTime(timer)}</span>
            </p>
          </motion.div>
          
          <motion.button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={resetGame}
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
            <div className="flex space-x-4">
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow">
                <Brain size={18} className="text-yellow-700 mr-1" />
                <span className="font-bold text-yellow-700">Moves: {moves}</span>
              </div>
              
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow">
                <Clock size={18} className="text-yellow-700 mr-1" />
                <span className="font-bold text-yellow-700">{formatTime(timer)}</span>
              </div>
            </div>
            
            <motion.button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={20} />
            </motion.button>
          </div>
          
          <div className={`grid ${getCardGridClass()} gap-3 mb-4`}>
            {cards.map(card => (
              <motion.div
                key={card.id}
                className={`aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${
                  card.matched ? 'opacity-70' : ''
                }`}
                onClick={() => handleCardClick(card.id)}
                whileHover={!card.flipped && !card.matched ? { scale: 1.03 } : {}}
                whileTap={!card.flipped && !card.matched ? { scale: 0.97 } : {}}
              >
                <div className="w-full h-full relative">
                  <AnimatePresence initial={false}>
                    {!card.flipped ? (
                      <motion.div
                        key="back"
                        className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-white text-3xl">?</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="front"
                        className="absolute inset-0 bg-white flex items-center justify-center text-2xl sm:text-3xl font-bold"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        {card.value}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fact display when a match is found */}
          {selectedCards.length === 2 && (() => {
            const card1 = cards.find(card => card.id === selectedCards[0]);
            const card2 = cards.find(card => card.id === selectedCards[1]);
            
            if (card1 && card2 && card1.value === card2.value && facts[category][card1.value as keyof typeof facts[typeof category]]) {
              return (
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start">
                    <div className="bg-yellow-100 rounded-lg p-2 mr-3 text-2xl">{card1.value}</div>
                    <p className="text-gray-700">
                      <span className="font-bold">Did you know?</span> {facts[category][card1.value as keyof typeof facts[typeof category]]}
                    </p>
                  </div>
                </motion.div>
              );
            }
            return null;
          })()}
          
          <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-600">
            <p className="font-medium mb-1">How to Play:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Click on any card to flip it over</li>
              <li>Try to find the matching pair for each card</li>
              <li>When you find a match, the cards will stay face up</li>
              <li>Complete the game by finding all pairs with the fewest moves</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;