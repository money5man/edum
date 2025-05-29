import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after showing success message
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-nunito font-bold text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have questions or feedback? We'd love to hear from you!
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-primary-100 p-3 rounded-full inline-block mb-4">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-nunito font-bold text-xl text-gray-800 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
                <a href="mahdi09004@gmail.com" className="text-primary-600 hover:text-primary-700 font-medium">
                  support@kidsgeniuslab.com
                </a>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-primary-100 p-3 rounded-full inline-block mb-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-nunito font-bold text-xl text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Mon-Fri, 9am-5pm EST</p>
                <a href="tel:+971-507003021" className="text-primary-600 hover:text-primary-700 font-medium">
                  +1 (555) 123-4567
                </a>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-primary-100 p-3 rounded-full inline-block mb-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-nunito font-bold text-xl text-gray-800 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-2">123 Learning Lane</p>
                <p className="text-primary-600 font-medium">
                  Education City, EC 12345
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="bg-primary-600 p-8 text-white md:col-span-2">
                <h2 className="font-nunito font-bold text-2xl mb-4">Send Us a Message</h2>
                <p className="text-primary-100 mb-6">
                  Whether you have a question about features, subscription plans, need a demo, or anything else, our team is ready to answer all your questions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary-200 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Technical Support</h3>
                      <p className="text-sm text-primary-200">
                        Having trouble with our platform? Our support team is just a message away.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary-200 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Educational Inquiries</h3>
                      <p className="text-sm text-primary-200">
                        Questions about our curriculum or approach? Our education specialists can help.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary-200 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Partnership Opportunities</h3>
                      <p className="text-sm text-primary-200">
                        Interested in collaborating with KidsGeniusLab? We'd love to explore possibilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:col-span-3">
                {formStatus === 'success' ? (
                  <motion.div 
                    className="h-full flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="h-16 w-16 text-success-500 mb-4" />
                    <h3 className="font-nunito font-bold text-2xl text-gray-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => setFormStatus('idle')}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name*
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email*
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Subscription Question">Subscription Question</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      variant="primary"
                      disabled={formStatus === 'submitting'}
                      className="w-full"
                      icon={formStatus === 'submitting' ? undefined : <Send className="h-4 w-4" />}
                      iconPosition="right"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-nunito font-bold text-3xl text-center text-gray-800 mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  How do I get started with KidsGeniusLab?
                </h3>
                <p className="text-gray-600">
                  Getting started is easy! Simply <a href="/register" className="text-primary-600 hover:text-primary-700">create an account</a>, choose a subscription plan (or start with our free tier), and you'll have immediate access to our educational games and activities.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  What age group is KidsGeniusLab suitable for?
                </h3>
                <p className="text-gray-600">
                  Our platform is designed for children aged 3-14, with content specifically tailored for different developmental stages and learning levels. Each game and activity includes a recommended age range.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  Can I cancel my subscription at any time?
                </h3>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  Do you offer educational resources for teachers?
                </h3>
                <p className="text-gray-600">
                  Absolutely! We offer special educator accounts with additional resources, classroom management tools, and discounted group plans for schools. Contact us for more information about our educator options.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  Is my child's data safe and private?
                </h3>
                <p className="text-gray-600">
                  We take privacy extremely seriously, especially when it comes to children. We're fully COPPA-compliant, collect minimal personal information, and never share data with third parties. You can review our complete <a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a> for details.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">
                Don't see your question answered here?
              </p>
              <a href="#contact-form" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                Contact our support team
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;