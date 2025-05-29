import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import gamesData from '../data/gamesData';
import MathWizards from '../games/MathWizardsGame';
import ArtStudio from '../games/ArtStudioGame';
import MelodyMaker from '../games/MelodyMakerGame';
import MemoryMatch from '../games/MemoryMatchGame';
import ScienceLab from '../games/ScienceLabGame';
import WordSafari from '../games/WordSafariGame';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  
  const game = gamesData.find(g => g.id === gameId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!gameId || !game) {
      navigate('/games');
    }
  }, [gameId, game, navigate]);
  
  if (!game) {
    return null;
  }

  const renderGame = () => {
    switch (game.id) {
      case 'math-wizards':
        return <MathWizards />;
      case 'art-studio':
        return <ArtStudio />;
      case 'melody-maker':
        return <MelodyMaker />;
      case 'memory-match':
        return <MemoryMatch />;
      case 'science-lab':
        return <ScienceLab />;
      case 'word-safari':
        return <WordSafari />;
      default:
        return (
          <div className="bg-primary-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-primary-600 mb-2">Game Coming Soon</h3>
            <p className="text-gray-600 mb-4">We're still working on this game. Check back soon!</p>
            <Button variant="primary" onClick={() => setGameStarted(false)}>Go Back</Button>
          </div>
        );
    }
  };

  return (
    <div className="py-12 md:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {!gameStarted ? (
          <>
            <button 
              onClick={() => navigate('/games')}
              className="mb-8 inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Games
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title}
                    className="w-full object-cover aspect-video rounded-xl shadow-md"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-full py-1 px-3 shadow flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">Ages {game.ageRange}</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800">
                    {game.category}
                  </span>
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 capitalize">
                    {game.difficulty} level
                  </span>
                </div>
                
                <h1 className="font-nunito font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                  {game.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  {game.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-2">Skills Developed:</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-block px-3 py-1 text-sm rounded-full bg-secondary-100 text-secondary-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => setGameStarted(true)}
                  className="w-full md:w-auto"
                >
                  Start Game
                </Button>
              </motion.div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
              <h2 className="font-nunito font-bold text-xl text-gray-800 mb-4">How to Play</h2>
              <p className="text-gray-600 mb-4">{game.instructions}</p>
            </div>
          </>
        ) : (
          <div>
            <button 
              onClick={() => setGameStarted(false)}
              className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Exit Game
            </button>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="font-nunito font-bold text-2xl text-gray-800 mb-6 text-center">
                {game.title}
              </h1>
              {renderGame()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;