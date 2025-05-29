import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Brain, Award, Users, Calendar, Activity, ChevronRight, Star, Clock, Settings } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import gamesData from '../data/gamesData';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [childProfile, setChildProfile] = useState<'child1' | 'child2'>('child1');
  
  // Dummy data for the dashboard
  const recentActivities = [
    { id: 1, type: 'game', title: 'Math Wizards', score: 8, date: '2 hours ago', xp: 120 },
    { id: 2, type: 'activity', title: 'Dinosaur Fossil Dig', completed: true, date: 'Yesterday', xp: 80 },
    { id: 3, type: 'game', title: 'Word Explorer', score: 6, date: '2 days ago', xp: 90 },
    { id: 4, type: 'activity', title: 'Nature Observation Journal', completed: false, date: '3 days ago', xp: 0 }
  ];
  
  const childProfiles = {
    child1: {
      name: 'Emma',
      age: 8,
      avatar: 'https://images.pexels.com/photos/3771672/pexels-photo-3771672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      progress: {
        math: 65,
        reading: 78,
        science: 42,
        creativity: 90
      },
      streakDays: 12,
      totalXP: 1240,
      level: 8,
      badges: 14,
      favoriteSubject: 'Reading'
    },
    child2: {
      name: 'Noah',
      age: 6,
      avatar: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      progress: {
        math: 45,
        reading: 52,
        science: 70,
        creativity: 80
      },
      streakDays: 8,
      totalXP: 860,
      level: 5,
      badges: 9,
      favoriteSubject: 'Science'
    }
  };
  
  const activeChildData = childProfiles[childProfile];
  
  // Recommended games based on the child's progress
  const recommendedGames = gamesData.slice(0, 4);
  
  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="font-nunito font-bold text-3xl text-gray-800 mb-2">
              Welcome back, {user?.name}!
            </h1>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'progress'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Learning Progress
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'achievements'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Achievements
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Settings
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <OverviewCard 
                    title="Learning Streak"
                    value={`${activeChildData.streakDays} days`}
                    icon={<Calendar className="h-6 w-6 text-primary-500" />}
                    color="primary"
                  />
                  <OverviewCard 
                    title="Total XP"
                    value={activeChildData.totalXP}
                    icon={<Activity className="h-6 w-6 text-accent-500" />}
                    color="accent"
                  />
                  <OverviewCard 
                    title="Current Level"
                    value={activeChildData.level}
                    icon={<Users className="h-6 w-6 text-secondary-500" />}
                    color="secondary"
                  />
                  <OverviewCard 
                    title="Badges Earned"
                    value={activeChildData.badges}
                    icon={<Award className="h-6 w-6 text-warning-500" />}
                    color="warning"
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="font-nunito font-bold text-xl text-gray-800 mb-4">
                      Subject Progress
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="space-y-6">
                        <ProgressBar 
                          label="Math" 
                          value={activeChildData.progress.math} 
                          color="primary"
                        />
                        <ProgressBar 
                          label="Reading" 
                          value={activeChildData.progress.reading} 
                          color="secondary"
                        />
                        <ProgressBar 
                          label="Science" 
                          value={activeChildData.progress.science} 
                          color="accent"
                        />
                        <ProgressBar 
                          label="Creativity" 
                          value={activeChildData.progress.creativity} 
                          color="success"
                        />
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Learning Insights:
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {activeChildData.name} is showing great progress in {activeChildData.favoriteSubject}! 
                          We recommend focusing more on Science to help balance skill development.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="font-nunito font-bold text-xl text-gray-800 mb-4">
                      Recent Activity
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        {recentActivities.map(activity => (
                          <div 
                            key={activity.id} 
                            className="bg-white p-3 rounded-md shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-medium text-gray-800">{activity.title}</div>
                              <div className="text-xs text-gray-500">{activity.date}</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                {activity.type === 'game' ? (
                                  <span>Score: {activity.score}/10</span>
                                ) : (
                                  <span>{activity.completed ? 'Completed' : 'In progress'}</span>
                                )}
                              </div>
                              <div className="text-xs font-medium text-primary-600">
                                +{activity.xp} XP
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <button className="text-sm text-primary-600 font-medium">
                          View all activity
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-nunito font-bold text-xl text-gray-800">
                      Recommended Games
                    </h2>
                    <Link to="/games" className="text-sm text-primary-600 font-medium flex items-center">
                      View all games
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedGames.map(game => (
                      <Link key={game.id} to={`/games/${game.id}`}>
                        <Card hover>
                          <Card.Image 
                            src={game.imageUrl} 
                            alt={game.title}
                            className="h-36"
                          />
                          <Card.Content>
                            <Card.Title className="text-base">{game.title}</Card.Title>
                            <div className="flex items-center mt-2 text-xs text-gray-600">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>Ages {game.ageRange}</span>
                              <span className="mx-1">•</span>
                              <span className="capitalize">{game.difficulty}</span>
                            </div>
                          </Card.Content>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'progress' && (
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-primary-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Detailed Learning Progress</h3>
                <p className="text-gray-600 mb-6">
                  Track {activeChildData.name}'s learning journey, skill development, and accomplishments over time.
                </p>
                <Button variant="primary">View Progress Report</Button>
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-primary-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Learning Achievements</h3>
                <p className="text-gray-600 mb-6">
                  {activeChildData.name} has earned {activeChildData.badges} badges and reached level {activeChildData.level}!
                </p>
                <Button variant="primary">View All Achievements</Button>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-primary-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Account Settings</h3>
                <p className="text-gray-600 mb-6">
                  Manage profiles, privacy settings, and preferences.
                </p>
                <Button variant="primary">Manage Settings</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'warning' | 'success' | 'error';
}

const OverviewCard = ({ title, value, icon, color }: OverviewCardProps) => {
  return (
    <div className={`bg-${color}-50 p-4 rounded-lg border border-${color}-100`}>
      <div className="flex items-center mb-2">
        <div className="mr-3">{icon}</div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <div className={`text-2xl font-bold text-${color}-700`}>{value}</div>
    </div>
  );
};

interface ProgressBarProps {
  label: string;
  value: number;
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

const ProgressBar = ({ label, value, color }: ProgressBarProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="font-medium text-gray-700">{label}</div>
        <div className="text-sm text-gray-600">{value}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`bg-${color}-500 h-2.5 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardPage;