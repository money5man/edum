import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Zap, Thermometer, FlaskRound as Flask } from 'lucide-react';

const ScienceLab = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null);
  const [level, setLevel] = useState(1);
  const [mixedElements, setMixedElements] = useState<string[]>([]);
  
  const experiments = [
    {
      title: "Color Mixing",
      description: "Mix the right chemicals to create the target color!",
      targetColor: "green",
      elements: ["blue", "yellow", "red", "purple"],
      correctElements: ["blue", "yellow"],
      hint: "Primary colors can mix to create secondary colors."
    },
    {
      title: "States of Matter",
      description: "Heat or cool the water to change its state!",
      targetState: "gas",
      elements: ["heat", "cool", "pressure", "light"],
      correctElements: ["heat"],
      hint: "Water turns to gas when it reaches its boiling point."
    },
    {
      title: "Acid & Base Reaction",
      description: "Create a chemical reaction by mixing the right substances!",
      targetReaction: "fizz",
      elements: ["acid", "base", "water", "oil"],
      correctElements: ["acid", "base"],
      hint: "When acids and bases meet, they neutralize each other with a fizzy reaction."
    }
  ];
  
  const [currentExperiment, setCurrentExperiment] = useState(experiments[0]);
  
  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setCurrentStep(0);
    setScore(0);
    setLevel(1);
    setCurrentExperiment(experiments[0]);
    setMixedElements([]);
    setSelectedElement(null);
    setFeedback(null);
    setFeedbackType(null);
  };
  
  const selectElement = (element: string) => {
    if (mixedElements.includes(element)) return;
    setSelectedElement(element);
  };
  
  const addElement = () => {
    if (selectedElement && !mixedElements.includes(selectedElement)) {
      setMixedElements([...mixedElements, selectedElement]);
      setSelectedElement(null);
    }
  };
  
  const clearElements = () => {
    setMixedElements([]);
    setSelectedElement(null);
  };
  
  const checkExperiment = () => {
    const experiment = experiments[currentStep];
    
    // Check if all correct elements are included
    const allCorrectIncluded = experiment.correctElements.every(element => 
      mixedElements.includes(element)
    );
    
    // Check if no extra elements are included
    const noExtraElements = mixedElements.every(element => 
      experiment.correctElements.includes(element)
    );
    
    const isCorrect = allCorrectIncluded && noExtraElements && 
                      mixedElements.length === experiment.correctElements.length;
    
    if (isCorrect) {
      setFeedback("Great job! Your experiment was successful!");
      setFeedbackType("success");
      setScore(score + 10);
      
      setTimeout(() => {
        if (currentStep < experiments.length - 1) {
          setCurrentStep(currentStep + 1);
          setCurrentExperiment(experiments[currentStep + 1]);
          setMixedElements([]);
          setFeedback(null);
          setFeedbackType(null);
          setLevel(Math.min(level + 1, 3));
        } else {
          setGameCompleted(true);
        }
      }, 2000);
    } else {
      setFeedback("Hmm, that's not quite right. Try again!");
      setFeedbackType("error");
      
      setTimeout(() => {
        setFeedback(null);
        setFeedbackType(null);
      }, 2000);
    }
  };
  
  const getElementIcon = (element: string) => {
    switch(element) {
      case 'blue': return <div className="w-10 h-10 bg-blue-500 rounded-full"></div>;
      case 'yellow': return <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>;
      case 'red': return <div className="w-10 h-10 bg-red-500 rounded-full"></div>;
      case 'purple': return <div className="w-10 h-10 bg-purple-500 rounded-full"></div>;
      case 'heat': return <Thermometer className="h-6 w-6 text-red-500" />;
      case 'cool': return <Flask className="h-6 w-6 text-blue-500" />;
      case 'pressure': return <Zap className="h-6 w-6 text-yellow-500" />;
      case 'light': return <div className="w-6 h-6 bg-yellow-300 rounded-full animate-pulse"></div>;
      case 'acid': return <Beaker className="h-6 w-6 text-green-500" />;
      case 'base': return <Beaker className="h-6 w-6 text-purple-500" />;
      case 'water': return <Flask className="h-6 w-6 text-blue-500" />;
      case 'oil': return <div className="w-6 h-6 bg-yellow-200 rounded-full"></div>;
      default: return null;
    }
  };
  
  const getMixResult = () => {
    const experiment = experiments[currentStep];
    
    // Check if the right elements are mixed
    const isCorrect = experiment.correctElements.length === mixedElements.length &&
      experiment.correctElements.every(el => mixedElements.includes(el));
    
    if (isCorrect) {
      switch(experiment.title) {
        case "Color Mixing": return <div className="w-16 h-16 bg-green-500 rounded-full mx-auto"></div>;
        case "States of Matter": return <div className="h-16 flex items-center justify-center"><Flask className="h-10 w-10 text-blue-300 animate-bounce" /></div>;
        case "Acid & Base Reaction": return (
          <div className="h-16 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
            </div>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [0, -40 * Math.random()],
                  x: [0, (Math.random() - 0.5) * 60],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );
        default: return null;
      }
    } else if (mixedElements.length > 0) {
      return <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>;
    }
    
    return <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full mx-auto flex items-center justify-center text-gray-400">?</div>;
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl max-w-2xl mx-auto">
      {!gameStarted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-blue-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Science Lab
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Mix chemicals, conduct experiments, and learn about scientific reactions!
          </motion.p>
          
          <motion.img
            src="https://images.pexels.com/photos/8535214/pexels-photo-8535214.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Science Lab"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start Experimenting
          </motion.button>
        </div>
      ) : gameCompleted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-blue-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            All Experiments Complete!
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Beaker size={80} className="text-blue-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              Your Score: <span className="font-bold text-blue-600">{score}</span>
            </p>
          </motion.div>
          
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Try Again
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
                    className={`w-8 h-2 rounded-full ${lvl <= level ? 'bg-blue-600' : 'bg-gray-300'}`}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="bg-white px-3 py-1 rounded-full shadow">
              <span className="font-bold text-blue-700">Score: {score}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-bold mb-2 text-blue-700">{currentExperiment.title}</h3>
            <p className="text-gray-700 mb-6">{currentExperiment.description}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center mb-4">
                <Beaker className="h-6 w-6 text-blue-600 mr-2" />
                <h4 className="font-bold text-blue-800">Mixing Beaker</h4>
              </div>
              
              <div className="flex items-center justify-center mb-4">
                {getMixResult()}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {mixedElements.map((element, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-2 rounded-lg flex items-center shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mr-2">{getElementIcon(element)}</div>
                    <span className="capitalize">{element}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4">
                <motion.button
                  className="bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg hover:bg-red-200 transition-colors"
                  onClick={clearElements}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
                
                <motion.button
                  className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-lg ${
                    mixedElements.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  } transition-colors`}
                  onClick={checkExperiment}
                  whileHover={mixedElements.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={mixedElements.length > 0 ? { scale: 0.95 } : {}}
                  disabled={mixedElements.length === 0}
                >
                  Test Mixture
                </motion.button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-gray-700 mb-3">Available Elements:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {currentExperiment.elements.map((element, index) => (
                  <motion.button
                    key={index}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border ${
                      selectedElement === element 
                        ? 'border-blue-500 bg-blue-50' 
                        : mixedElements.includes(element)
                          ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                          : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    } transition-colors`}
                    onClick={() => !mixedElements.includes(element) && selectElement(element)}
                    whileHover={!mixedElements.includes(element) ? { scale: 1.05 } : {}}
                    whileTap={!mixedElements.includes(element) ? { scale: 0.95 } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="mb-2">{getElementIcon(element)}</div>
                    <span className="capitalize text-sm">{element}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 italic">
              <span className="mr-2">💡</span>
              Hint: {currentExperiment.hint}
            </div>
            
            {selectedElement && (
              <motion.button
                className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                onClick={addElement}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add {selectedElement}
              </motion.button>
            )}
          </div>
          
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
                  className={`text-2xl font-bold px-6 py-4 rounded-lg ${
                    feedbackType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {feedback}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ScienceLab;