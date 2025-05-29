import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Shield } from 'lucide-react';

const MathWizards: React.FC = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operator: '+' });
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shield, setShield] = useState(false);
  
  const generateQuestion = () => {
    let num1, num2, answer, operator;
    
    switch(level) {
      case 1:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = '+';
        answer = num1 + num2;
        break;
      case 2:
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = Math.random() > 0.5 ? '+' : '-';
        answer = operator === '+' ? num1 + num2 : num1 - num2;
        if (operator === '-' && num2 > num1) {
          [num1, num2] = [num2, num1];
        }
        break;
      case 3:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = Math.random() > 0.5 ? '+' : '*';
        answer = operator === '+' ? num1 + num2 : num1 * num2;
        break;
      default:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = '+';
        answer = num1 + num2;
    }
    
    setQuestion({ num1, num2, operator });
    
    const wrongAnswers: number[] = [];
    while (wrongAnswers.length < 3) {
      let wrongAnswer;
      if (operator === '+') {
        wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      } else if (operator === '-') {
        wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      } else {
        wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      }
      
      if (wrongAnswer !== answer && wrongAnswer > 0 && !wrongAnswers.includes(wrongAnswer)) {
        wrongAnswers.push(wrongAnswer);
      }
    }
    
    const allOptions = [...wrongAnswers, answer];
    allOptions.sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };
  
  useEffect(() => {
    if (gameStarted && !gameOver) {
      generateQuestion();
    }
  }, [gameStarted, level, gameOver]);
  
  const handleOptionSelect = (option: number) => {
    if (isCorrect !== null) return;
    
    setSelectedAnswer(option);
    const correct = getCorrectAnswer() === option;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + (level * 10));
      
      if (score > 0 && score % 50 === 0) {
        setLevel(Math.min(level + 1, 3));
      }
      
      if (Math.random() > 0.8) {
        setShield(true);
      }
      
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      if (shield) {
        setShield(false);
        setTimeout(() => {
          generateQuestion();
        }, 1500);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        
        if (newLives <= 0) {
          setGameOver(true);
        } else {
          setTimeout(() => {
            generateQuestion();
          }, 1500);
        }
      }
    }
  };
  
  const getCorrectAnswer = () => {
    const { num1, num2, operator } = question;
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      default: return num1 + num2;
    }
  };
  
  const resetGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setShield(false);
    generateQuestion();
  };
  
  const startGame = () => {
    setGameStarted(true);
    resetGame();
  };
  
  const operatorToSymbol = (op: string) => {
    switch (op) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      default: return op;
    }
  };

  return (
    <div className="bg-indigo-50 p-6 rounded-xl max-w-2xl mx-auto min-h-[400px]">
      {!gameStarted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-indigo-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Math Wizards
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Cast powerful spells by solving math problems and defeat the number monsters!
          </motion.p>
          
          <motion.img
            src="https://images.pexels.com/photos/3693101/pexels-photo-3693101.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Math Wizards"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
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
      ) : gameOver ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-indigo-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Game Over!
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-6 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your Score: <span className="font-bold text-indigo-600">{score}</span>
          </motion.p>
          
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
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
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Level:</span>
              <div className="flex space-x-1">
                {[1, 2, 3].map((lvl) => (
                  <div 
                    key={lvl}
                    className={`w-8 h-2 rounded-full ${lvl <= level ? 'bg-indigo-600' : 'bg-gray-300'}`}
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
                {shield && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-2"
                  >
                    <Shield size={20} className="text-blue-500" />
                  </motion.div>
                )}
                {[...Array(lives)].map((_, i) => (
                  <Heart key={i} size={20} className="text-red-500 fill-red-500" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md inline-block"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-700">Cast Your Spell!</h3>
              <div className="flex items-center justify-center text-4xl font-bold space-x-4">
                <span>{question.num1}</span>
                <span className="text-indigo-600">{operatorToSymbol(question.operator)}</span>
                <span>{question.num2}</span>
                <span>=</span>
                <span className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  ?
                </span>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <motion.button
                key={index}
                className={`p-4 rounded-lg text-xl font-bold shadow-md transition-colors ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-white hover:bg-indigo-100 text-indigo-700'
                }`}
                onClick={() => handleOptionSelect(option)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`text-4xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                  initial={{ scale: 0.5, y: 20 }}
                  animate={{ scale: 1.5, y: 0 }}
                  exit={{ scale: 0.5, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  {isCorrect ? 'Correct!' : 'Try Again!'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MathWizards;