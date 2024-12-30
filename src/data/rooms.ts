import { Room } from "@/types/game";

export const rooms: Room[] = [
  // Science Rooms
  {
    id: 1,
    type: 'physics',
    difficulty: 2,
    storyline: "Welcome to the Physics Lab! Dr. Newton's experiments have gone haywire, and you need to help stabilize the equipment.",
    question: 'A car travels 120 meters in 15 seconds. What is its average speed in meters per second?',
    answer: '8',
    hint: 'Use the formula: Speed = Distance ÷ Time',
    explanation: 'Average speed = 120 meters ÷ 15 seconds = 8 meters per second',
    animation: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    }
  },
  {
    id: 2,
    type: 'chemistry',
    difficulty: 2,
    storyline: "You've entered the Chemical Analysis Chamber! Help balance these equations to prevent a reaction overflow.",
    question: 'If a solution has a pH of 3, how many times more acidic is it than a solution with pH 5?',
    answer: '100',
    hint: 'Each pH unit represents a factor of 10. Calculate the difference in powers of 10.',
    explanation: 'The difference is 2 pH units. Since pH is logarithmic, this means 10² = 100 times more acidic.',
    animation: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 }
    }
  },
  {
    id: 3,
    type: 'biology',
    difficulty: 2,
    storyline: "Welcome to the Genetics Lab! We need your help understanding inheritance patterns.",
    question: 'In a population of 1000 organisms, 25% have a recessive trait. How many individuals carry the dominant phenotype?',
    answer: '750',
    hint: 'Subtract the percentage with recessive trait from the total population.',
    explanation: 'If 25% (250) have the recessive trait, then 75% (750) must show the dominant trait: 1000 - 250 = 750',
    animation: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5 }
    }
  },
  // Technology Rooms
  {
    id: 4,
    type: 'programming',
    difficulty: 2,
    storyline: "Debug the code! There's a critical system that needs your programming expertise.",
    question: 'If a function runs in O(n²) time and takes 4 seconds for 2 items, how many seconds will it take for 4 items?',
    answer: '16',
    hint: 'The time increases with the square of the input size.',
    explanation: 'For O(n²), doubling the input quadruples the time. So 4 seconds becomes 16 seconds.',
    animation: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    }
  },
  // Engineering Rooms
  {
    id: 5,
    type: 'electrical',
    difficulty: 2,
    storyline: "The circuit board is malfunctioning! Calculate the correct voltage to restore power.",
    question: 'In a circuit with 6 ohms resistance and 2 amperes current, what is the voltage according to Ohm\'s law?',
    answer: '12',
    hint: 'Use Ohm\'s law: V = IR (Voltage = Current × Resistance)',
    explanation: 'V = IR = 2 amperes × 6 ohms = 12 volts',
    animation: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 }
    }
  },
  // Mathematics Rooms
  {
    id: 6,
    type: 'algebra',
    difficulty: 2,
    storyline: "Solve the equation to unlock the next chamber!",
    question: 'If 3x + 7 = 22, what is the value of x?',
    answer: '5',
    hint: 'Subtract 7 from both sides, then divide by 3.',
    explanation: '3x + 7 = 22 → 3x = 15 → x = 5',
    animation: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration: 0.5 }
    }
  }
];