import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Sparkles, Heart, Globe, ChevronRight, BarChart } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const missionPoints = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary-600" />,
      title: "Accessible Education",
      description: "Making quality educational content accessible to children everywhere, regardless of background."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary-600" />,
      title: "Inspiring Curiosity",
      description: "Fostering a natural love of learning through engaging, interactive experiences."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      title: "Holistic Development",
      description: "Supporting not just academic growth, but social, emotional, and creative development."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: "Global Community",
      description: "Building a worldwide community of young learners, parents, and educators."
    }
  ];
  
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former elementary school principal with a Ph.D. in Educational Psychology. Passionate about transforming how children learn through technology.",
      image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Learning Officer",
      bio: "With 15 years of experience in curriculum development, Michael ensures our content meets the highest educational standards.",
      image: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Emma Chen",
      role: "Lead Game Designer",
      bio: "Award-winning game designer with expertise in creating engaging educational experiences that children love.",
      image: "https://images.pexels.com/photos/5905910/pexels-photo-5905910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Dr. David Okafor",
      role: "Child Development Specialist",
      bio: "Child psychologist specializing in cognitive development, ensuring our platform supports healthy learning patterns.",
      image: "https://images.pexels.com/photos/5225308/pexels-photo-5225308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  
  const stats = [
    { value: "2M+", label: "Happy Learners", icon: <Users className="h-6 w-6" /> },
    { value: "150+", label: "Countries Reached", icon: <Globe className="h-6 w-6" /> },
    { value: "8+", label: "Educational Games", icon: <Award className="h-6 w-6" /> },
    { value: "92%", label: "Parent Satisfaction", icon: <BarChart className="h-6 w-6" /> }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-nunito font-bold text-4xl md:text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transforming education through engaging, interactive learning experiences that inspire children to discover, create, and grow.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              At KidsGeniusLab, we believe every child deserves access to quality education that inspires a lifelong love of learning.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {missionPoints.map((point, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="bg-primary-50 p-3 rounded-full inline-block mb-4">
                  {point.icon}
                </div>
                <h3 className="font-nunito font-bold text-xl text-gray-800 mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-secondary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-nunito font-bold text-3xl md:text-4xl text-gray-800 mb-6">
                  The KidsGeniusLab Journey
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    KidsGeniusLab started in 2023 with a simple idea: learning should be a joyful adventure, not a chore. Our founder, Dr. Sarah Johnson, saw firsthand as an elementary school principal how children thrive when education feels like play.
                  </p>
                  <p>
                    What began as a small collection of math games has grown into a comprehensive educational platform serving millions of children worldwide. Our team of educators, child development specialists, and game designers work together to create experiences that make learning irresistible.
                  </p>
                  <p>
                    Every game, activity, and resource we create is designed with purpose—to build essential skills while nurturing curiosity, creativity, and confidence. We're proud to be trusted by parents and teachers around the globe as partners in their children's educational journey.
                  </p>
                </div>
                
                <div className="mt-8">
                  <Link to="/contact">
                    <Button 
                      variant="primary"
                      icon={<ChevronRight className="h-4 w-4" />}
                      iconPosition="right"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.pexels.com/photos/8363027/pexels-photo-8363027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Children learning together"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate educators, technologists, and creatives behind KidsGeniusLab.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-nunito font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-primary-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              We're backed by a talented extended team of curriculum specialists, designers, developers, and support staff.
            </p>
            <Link to="/contact">
              <Button variant="outline">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1"
              >
                <img 
                  src="https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Children learning together"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2"
              >
                <h2 className="font-nunito font-bold text-3xl md:text-4xl text-gray-800 mb-6">
                  Our Core Values
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Sparkles className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800 mb-1">Child-Centered Innovation</h3>
                      <p className="text-gray-600">
                        We design every experience with children's needs, interests, and developmental stages as our guiding principle.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Award className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800 mb-1">Educational Excellence</h3>
                      <p className="text-gray-600">
                        We maintain rigorous standards in our curriculum development, combining research-based approaches with creative engagement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800 mb-1">Inclusive Community</h3>
                      <p className="text-gray-600">
                        We're committed to creating a platform where all children feel represented, respected, and empowered to learn.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Heart className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800 mb-1">Authentic Partnership</h3>
                      <p className="text-gray-600">
                        We believe in working hand-in-hand with parents and educators, providing tools that complement their invaluable guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-nunito font-bold text-3xl md:text-4xl mb-6">Join the KidsGeniusLab Community</h2>
          <p className="max-w-2xl mx-auto text-primary-100 mb-8 text-lg">
            Be part of our mission to revolutionize children's education through engaging, interactive learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button 
                variant="secondary" 
                size="lg"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;