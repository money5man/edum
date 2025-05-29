import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, User, Filter, MessageSquare } from 'lucide-react';
import testimonialsData, { TestimonialData } from '../data/testimonialsData';
import Button from '../components/ui/Button';

const TestimonialsPage = () => {
  const [filter, setFilter] = useState('all');
  
  // Filter testimonials based on role
  const filteredTestimonials = filter === 'all' 
    ? testimonialsData 
    : testimonialsData.filter(testimonial => testimonial.role.toLowerCase() === filter);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };
  
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
            Success Stories
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how KidsGeniusLab has helped children excel in their learning journey through the eyes of parents, teachers, and education experts.
          </motion.p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full shadow-sm p-1 border border-gray-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-100 text-primary-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setFilter('parent')}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === 'parent' 
                  ? 'bg-primary-100 text-primary-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Parents
            </button>
            <button
              onClick={() => setFilter('teacher')}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === 'teacher' 
                  ? 'bg-primary-100 text-primary-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Teachers
            </button>
            <button
              onClick={() => setFilter('educational consultant')}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === 'educational consultant' 
                  ? 'bg-primary-100 text-primary-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Experts
            </button>
          </div>
        </div>
        
        {/* Testimonials Count */}
        <div className="flex items-center justify-center mb-8 text-sm text-gray-600">
          <Filter className="h-4 w-4 mr-1" />
          <span>Showing {filteredTestimonials.length} testimonials</span>
          {filter !== 'all' && (
            <button 
              onClick={() => setFilter('all')}
              className="ml-2 text-primary-600 hover:text-primary-700"
            >
              Clear filter
            </button>
          )}
        </div>
        
        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTestimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={itemVariants}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Share Your Story CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl overflow-hidden">
          <div className="px-6 py-10 md:p-10 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Share Your KidsGeniusLab Story</h2>
              <p className="text-primary-100 mb-4">
                We'd love to hear how KidsGeniusLab has made a difference in your child's learning journey. Your story could inspire other parents and educators!
              </p>
              <Button 
                variant="secondary"
                icon={<MessageSquare className="h-4 w-4" />}
                onClick={() => window.location.href = '/contact'}
              >
                Share Your Experience
              </Button>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Joining KidsGeniusLab was one of the best decisions we made for our daughter's education..."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Your Name Here</div>
                    <div className="text-xs text-gray-500">Happy Parent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        <blockquote className="text-gray-700 italic mb-6">
          "{testimonial.content}"
        </blockquote>
        
        <div className="flex items-center">
          <img 
            src={testimonial.avatarUrl} 
            alt={testimonial.name}
            className="h-12 w-12 rounded-full object-cover mr-4"
          />
          <div>
            <div className="font-medium text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-primary-600">{testimonial.role}</div>
            
            <div className="flex flex-wrap mt-1">
              {testimonial.childAge && (
                <div className="flex items-center text-xs text-gray-500 mr-3">
                  <User className="h-3 w-3 mr-1" />
                  <span>{testimonial.childAge}</span>
                </div>
              )}
              
              {testimonial.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{testimonial.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;