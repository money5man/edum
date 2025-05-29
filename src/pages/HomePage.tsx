import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Brain, Award, Users, ArrowRight, Star, Clock, ChevronRight, Sparkles, Heart, Globe, MessageSquare, Zap, Target, BookOpenCheck, Rocket } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import gamesData from '../data/gamesData';
import testimonialsData from '../data/testimonialsData';

const HomePage = () => {
  const [activeCharacter, setActiveCharacter] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const characters = [
    { 
      name: "Math Wizard", 
      emoji: "🧙‍♂️", 
      color: "bg-primary-100",
      message: "Let's learn numbers!",
      animation: {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }
    },
    { 
      name: "Science Pro", 
      emoji: "🔬", 
      color: "bg-secondary-100",
      message: "Time to explore!",
      animation: {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }
    },
    { 
      name: "Reading Star", 
      emoji: "📚", 
      color: "bg-accent-100",
      message: "Let's read together!",
      animation: {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }
    },
    { 
      name: "Art Master", 
      emoji: "🎨", 
      color: "bg-success-100",
      message: "Create masterpieces!",
      animation: {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }
    }
  ];

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary-500" />,
      title: "Interactive Learning",
      description: "Fun games that teach!"
    },
    {
      icon: <Brain className="h-8 w-8 text-secondary-500" />,
      title: "Brain Training",
      description: "Level up your mind!"
    },
    {
      icon: <Award className="h-8 w-8 text-accent-500" />,
      title: "Win Rewards",
      description: "Earn cool badges!"
    },
    {
      icon: <Users className="h-8 w-8 text-success-500" />,
      title: "Make Friends",
      description: "Learn together!"
    }
  ];

  const stats = [
    { value: "1M+", label: "Happy Kids", icon: <Users className="h-6 w-6" /> },
    { value: "100+", label: "Fun Games", icon: <Star className="h-6 w-6" /> },
    { value: "50+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { value: "24/7", label: "Learning Fun", icon: <Clock className="h-6 w-6" /> }
  ];

  // Parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const featuresY = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center py-20"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-nunito font-bold text-5xl md:text-6xl leading-tight mb-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
                  >
                    Discover Fun Learning! 🚀
                  </motion.span>
                </h1>
                <motion.p
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Join the most exciting learning adventure with games, puzzles, and fun activities! 🎮 ✨
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link to="/games">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="primary" 
                        size="lg"
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all duration-300"
                        icon={<Sparkles className="h-5 w-5" />}
                      >
                        Start Playing! 🎮
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/activities">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2"
                      >
                        Fun Activities 🎨
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <div className="md:w-1/2">
              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {characters.map((character, index) => (
                  <motion.div
                    key={index}
                    className={`${character.color} p-6 rounded-2xl cursor-pointer relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setActiveCharacter(index)}
                    onHoverEnd={() => setActiveCharacter(null)}
                  >
                    <div className="text-5xl mb-3">
                      {character.emoji}
                    </div>
                    <h3 className="font-nunito font-bold text-lg">{character.name}</h3>
                    {activeCharacter === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-4 py-2 rounded-full shadow-lg text-sm whitespace-nowrap"
                      >
                        {character.message}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <motion.div 
                  className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-primary-500"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-white"
        style={{ y: featuresY }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-nunito font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Games Preview */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-bold text-4xl text-gray-800 mb-4">
              Popular Games 🎮
            </h2>
            <p className="text-xl text-gray-600">Start your adventure with these exciting games!</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {gamesData.filter(game => !game.isLocked).slice(0, 3).map((game) => (
              <motion.div
                key={game.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <Link to={`/games/${game.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.imageUrl} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4"
                    >
                      <span className="text-white font-medium">Play Now!</span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800">
                        {game.category}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-secondary-100 text-secondary-800">
                        Ages {game.ageRange}
                      </span>
                    </div>
                    <h3 className="font-nunito font-bold text-xl mb-2">{game.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                    <Button 
                      variant="primary"
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    >
                      Start Playing! 🎮
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/games">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<ChevronRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Explore All Games 🎲
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-bold text-4xl text-gray-800 mb-4">
              Learning Paths 🌟
            </h2>
            <p className="text-xl text-gray-600">Choose your adventure and start learning!</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Early Explorer",
                age: "Ages 4-6",
                description: "Start the learning adventure with fun basics",
                color: "from-primary-500 to-secondary-500"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Curious Creator",
                age: "Ages 7-9",
                description: "Build skills through interactive challenges",
                color: "from-secondary-500 to-accent-500"
              },
              {
                icon: <BookOpenCheck className="h-8 w-8" />,
                title: "Master Mind",
                age: "Ages 10-12",
                description: "Advanced learning for growing minds",
                color: "from-accent-500 to-primary-500"
              }
            ].map((path, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${path.color} p-8 text-white text-center`}>
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {path.icon}
                  </div>
                  <h3 className="font-nunito font-bold text-2xl mb-2">{path.title}</h3>
                  <p className="text-white/90 text-sm">{path.age}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <Button 
                    variant="outline"
                    className="w-full"
                  >
                    Explore Path 🚀
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-bold text-4xl text-gray-800 mb-4">
              Happy Learners 💝
            </h2>
            <p className="text-xl text-gray-600">See what parents and kids say about us!</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonialsData.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<MessageSquare className="h-5 w-5" />}
                >
                  Read More Stories ❤️
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-bold text-4xl text-gray-800 mb-4">
              Why Choose Us? 🌈
            </h2>
            <p className="text-xl text-gray-600">Learning has never been this fun!</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="h-8 w-8 text-primary-500" />,
                title: "Interactive Learning",
                description: "Engage with fun, interactive content that makes learning exciting"
              },
              {
                icon: <Target className="h-8 w-8 text-secondary-500" />,
                title: "Personalized Path",
                description: "Learn at your own pace with customized learning paths"
              },
              {
                icon: <Award className="h-8 w-8 text-accent-500" />,
                title: "Earn Rewards",
                description: "Get badges and rewards as you progress in your journey"
              },
              {
                icon: <Users className="h-8 w-8 text-primary-500" />,
                title: "Safe Environment",
                description: "A secure, ad-free space for children to learn and grow"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-secondary-500" />,
                title: "Expert Content",
                description: "Curriculum aligned with educational standards"
              },
              {
                icon: <Heart className="h-8 w-8 text-accent-500" />,
                title: "Parent Approved",
                description: "Trusted by parents and educators worldwide"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-nunito font-bold text-xl mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="font-nunito font-bold text-4xl mb-6">
              Ready for an Adventure? 🚀
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of kids on their exciting learning journey! ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-primary-600"
                    icon={<Sparkles className="h-5 w-5" />}
                  >
                    Start Free! ✨
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/games">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                    icon={<Heart className="h-5 w-5" />}
                  >
                    Play Now! 🎮
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;