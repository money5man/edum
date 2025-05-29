export interface GameData {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  category: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
  instructions: string;
  isLocked: boolean;
}

const gamesData: GameData[] = [
  {
    id: 'math-wizards',
    title: 'Math Wizards',
    description: 'Cast powerful spells by solving math problems and defeat the number monsters! Perfect for practicing basic arithmetic in a fun, magical setting.',
    ageRange: '6-10',
    category: 'Mathematics',
    imageUrl: 'https://images.pexels.com/photos/3693101/pexels-photo-3693101.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'easy',
    skills: ['Addition', 'Subtraction', 'Multiplication', 'Problem Solving'],
    instructions: 'Solve math problems to cast spells. Each correct answer earns points and helps you level up. Watch out for your lives and use shields wisely!',
    isLocked: false
  },
  {
    id: 'art-studio',
    title: 'Art Studio',
    description: 'Express your creativity and learn about colors, shapes, and digital art in this interactive drawing studio.',
    ageRange: '4-12',
    category: 'Art',
    imageUrl: 'https://images.pexels.com/photos/4545108/pexels-photo-4545108.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'easy',
    skills: ['Creativity', 'Color Theory', 'Digital Art', 'Fine Motor Skills'],
    instructions: 'Use different tools and colors to create your masterpiece. Try the fill tool for large areas and the eraser to fix mistakes. Save your artwork when finished!',
    isLocked: false
  },
  {
    id: 'melody-maker',
    title: 'Melody Maker',
    description: 'Create beautiful music and learn about musical notes, rhythm, and composition in this interactive music studio.',
    ageRange: '5-12',
    category: 'Music',
    imageUrl: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    skills: ['Music Theory', 'Rhythm', 'Composition', 'Creativity'],
    instructions: 'Click on the grid to create musical patterns. Use different notes to compose melodies, adjust the tempo, and play back your creation. Save your favorite tunes!',
    isLocked: false
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Test and improve your memory with this engaging card-matching game featuring educational content about animals, math, and science.',
    ageRange: '4-12',
    category: 'Cognitive Skills',
    imageUrl: 'https://images.pexels.com/photos/3905729/pexels-photo-3905729.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'easy',
    skills: ['Memory', 'Concentration', 'Pattern Recognition', 'Quick Thinking'],
    instructions: 'Flip cards to find matching pairs. Choose from different categories and difficulty levels. Learn interesting facts about each match you find!',
    isLocked: false
  },
  {
    id: 'science-lab',
    title: 'Science Lab',
    description: 'Mix potions, conduct experiments, and learn about chemistry, states of matter, and scientific principles.',
    ageRange: '7-12',
    category: 'Science',
    imageUrl: 'https://images.pexels.com/photos/8535214/pexels-photo-8535214.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    skills: ['Scientific Method', 'Chemistry', 'Problem Solving', 'Critical Thinking'],
    instructions: 'Mix different elements to create reactions. Follow the experiment goals and learn fascinating facts about chemistry and physics along the way!',
    isLocked: false
  },
  {
    id: 'word-safari',
    title: 'Word Safari',
    description: 'Explore the jungle while learning new words, improving vocabulary, and practicing spelling skills.',
    ageRange: '6-10',
    category: 'Language Arts',
    imageUrl: 'https://images.pexels.com/photos/8451490/pexels-photo-8451490.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    skills: ['Vocabulary', 'Spelling', 'Reading Comprehension', 'Word Recognition'],
    instructions: 'Unscramble letters to form words based on their definitions. Use hints when needed and try to complete each level with the highest score!',
    isLocked: false
  }
];

export default gamesData;