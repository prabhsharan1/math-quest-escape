export type RoomType = 
  // Science
  'physics' | 'chemistry' | 'biology' |
  // Technology
  'programming' | 'cybersecurity' | 'networking' |
  // Engineering
  'mechanical' | 'electrical' | 'civil' |
  // Mathematics
  'algebra' | 'geometry' | 'calculus';

export type Difficulty = 1 | 2 | 3;

export type Animation = {
  initial: object;
  animate: object;
  transition: {
    duration: number;
    [key: string]: any;
  };
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type Room = {
  id: number;
  type: RoomType;
  difficulty: Difficulty;
  storyline: string;
  question: string;
  answer: string;
  hint: string;
  explanation: string;
  animation: Animation;
  points?: number;
};

export type GameState = {
  currentRoom: number;
  completedRooms: number[];
  startTime: number | null;
  endTime: number | null;
  performance: {
    attempts: number;
    hintsUsed: number;
    averageSolveTime: number;
    score: number;
    achievements: Achievement[];
  };
};