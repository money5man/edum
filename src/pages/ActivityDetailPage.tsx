import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import activitiesData, { Activity } from '../data/activitiesData';
import ActivityEmbed from '../components/activities/ActivityEmbed';

const ActivityDetailPage: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Find the activity by id (string)
  const activity: Activity | undefined = activitiesData.find((act) => act.id === activityId);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Show loading while checking activity not found yet
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // If no activity found, redirect to activities page
  if (!activity) {
    navigate('/activities');
    return null;
  }

  return (
    <div className="py-12 md:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {!started ? (
          <>
            <button
              onClick={() => navigate('/activities')}
              className="mb-8 inline-flex items-center text-primary-600 hover:text-primary-700"
              aria-label="Back to activities"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Activities
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              <div>
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full object-cover aspect-video rounded-xl shadow-md"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-full py-1 px-3 shadow flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">Ages {activity.ageRange}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800">
                    {activity.category}
                  </span>
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                    Ages {activity.ageRange}
                  </span>
                </div>

                <h1 className="font-nunito font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                  {activity.title}
                </h1>

                <p className="text-lg text-gray-600 mb-6">{activity.description}</p>

                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-2">Skills Developed:</h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-secondary-100 text-secondary-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStarted(true)}
                  className="w-full md:w-auto"
                >
                  Start Activity
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
              <h2 className="text-xl font-semibold mb-2">How to Play</h2>
              <p className="text-gray-600 mb-4">{activity.instructions}</p>
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setStarted(false)}
              className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Exit Activity
            </button>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="font-nunito font-bold text-2xl text-gray-800 mb-6 text-center">
                {activity.title}
              </h1>
              <ActivityEmbed embedUrl={activity.tinyTapEmbedUrl} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetailPage;