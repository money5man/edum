// src/data/activitiesData.ts

export interface Activity {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  ageRange: string;
  difficulty: string;
  description: string;
  skills: string[];
  instructions: string;
  type: string;
  tinyTapEmbedUrl: string;
}

const activitiesData: Activity[] = [
  {
    id: 'activity-1',
    title: 'Activity 1',
    imageUrl: '/images/activity1.jpg',
    category: 'Category 1',
    ageRange: '3-5',
    difficulty: 'easy',
    description: 'Description for activity 1',
    skills: ['Skill A', 'Skill B'],
    instructions: 'Click "Start Activity" to begin.',
    type: 'tinytap',
    tinyTapEmbedUrl: 'https://www.tinytap.com/activities/g5uzx/player/embed/',
  },
  {
    id: 'activity-2',
    title: 'Activity 2',
    imageUrl: '/images/activity2.jpg',
    category: 'Category 2',
    ageRange: '3-6',
    difficulty: 'easy',
    description: 'Description for activity 2',
    skills: ['Skill C', 'Skill D'],
    instructions: 'Click "Start Activity" to begin.',
    type: 'tinytap',
    tinyTapEmbedUrl: 'https://www.tinytap.com/activities/g5uzy/player/embed/',
  },
  {
    id: 'activity-3',
    title: 'Activity 3',
    imageUrl: '/images/activity3.jpg',
    category: 'Category 3',
    ageRange: '4-7',
    difficulty: 'medium',
    description: 'Description for activity 3',
    skills: ['Skill E', 'Skill F'],
    instructions: 'Click "Start Activity" to begin.',
    type: 'tinytap',
    tinyTapEmbedUrl: 'https://www.tinytap.com/activities/g5uzz/player/embed/',
  },
  {
    id: 'activity-4',
    title: 'Activity 4',
    imageUrl: '/images/activity4.jpg',
    category: 'Category 4',
    ageRange: '5-7',
    difficulty: 'medium',
    description: 'Description for activity 4',
    skills: ['Skill G', 'Skill H'],
    instructions: 'Click "Start Activity" to begin.',
    type: 'tinytap',
    tinyTapEmbedUrl: 'https://www.tinytap.com/activities/g5v00/player/embed/',
  },
  {
    id: 'activity-5',
    title: 'Activity 5',
    imageUrl: '/images/activity5.jpg',
    category: 'Category 5',
    ageRange: '5-8',
    difficulty: 'medium',
    description: 'Description for activity 5',
    skills: ['Skill I', 'Skill J'],
    instructions: 'Click "Start Activity" to begin.',
    type: 'tinytap',
    tinyTapEmbedUrl: 'https://www.tinytap.com/activities/g5v01/player/embed/',
  },
  {
    id: 'activity-6',
    title: 'Activity 6',
    imageUrl: '/images/activity6.jpg',
    category: 'Category 6',
    ageRange: '6-9',
    difficulty: 'hard',
    description: 'Description for activity 6',
    skills: ['Skill K', 'Skill L'],
    instructions: 'Click "Start Activity" to begin.',
    type: 'tinytap',
    tinyTapEmbedUrl: 'https://www.tinytap.com/activities/g5uzw/player/embed/',
  },
];

export default activitiesData;
