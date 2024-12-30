type Performance = {
  attempts: number;
  hintsUsed: number;
  averageSolveTime: number;
};

export const calculateNextDifficulty = (performance: Performance): 1 | 2 | 3 => {
  const score = 
    (performance.attempts > 3 ? -1 : 1) + 
    (performance.hintsUsed > 2 ? -1 : 1) + 
    (performance.averageSolveTime > 120 ? -1 : 1); // 120 seconds threshold

  if (score <= -2) return 1; // Easy
  if (score >= 2) return 3;  // Hard
  return 2; // Medium
};

export const getDynamicQuestion = (baseQuestion: string, difficulty: 1 | 2 | 3): string => {
  switch (difficulty) {
    case 1:
      return baseQuestion.replace(/\d+/g, n => String(Math.floor(Number(n) * 0.7)));
    case 3:
      return baseQuestion.replace(/\d+/g, n => String(Math.floor(Number(n) * 1.3)));
    default:
      return baseQuestion;
  }
};