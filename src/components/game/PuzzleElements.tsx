import { motion } from "framer-motion";
import { Puzzle, DoorOpen, Trophy } from "lucide-react";

interface PuzzleElementsProps {
  isCompleted: boolean;
  animate: boolean;
}

export const PuzzleElements = ({ isCompleted, animate }: PuzzleElementsProps) => {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-4">
      {!isCompleted ? (
        <motion.div
          initial={{ scale: 1 }}
          animate={animate ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: animate ? Infinity : 0, repeatDelay: 2 }}
        >
          <Puzzle className="w-8 h-8 text-primary" />
        </motion.div>
      ) : (
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DoorOpen className="w-8 h-8 text-green-500" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};