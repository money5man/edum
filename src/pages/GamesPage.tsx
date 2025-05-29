import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import Card from '../components/ui/Card';
import gamesData from '../data/gamesData';

const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 md:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.h1 
            className="font-nunito font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Educational Games
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our collection of fun, interactive games designed to make learning engaging for children of all ages.
          </motion.p>
        </div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search games..." 
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/games/${game.id}`}>
                  <Card hover>
                    <Card.Image 
                      src={game.imageUrl} 
                      alt={game.title}
                      className="h-48"
                    />
                    <Card.Content>
                      <div className="flex gap-2 mb-3">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                          {game.category}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Ages {game.ageRange}
                        </span>
                      </div>
                      <Card.Title>{game.title}</Card.Title>
                      <Card.Description>{game.description}</Card.Description>
                      
                      <div className="flex items-center mt-4 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>Difficulty: </span>
                        <span className="ml-1 capitalize">{game.difficulty}</span>
                      </div>
                    </Card.Content>
                    <Card.Footer>
                      <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        Play Now
                      </button>
                    </Card.Footer>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;