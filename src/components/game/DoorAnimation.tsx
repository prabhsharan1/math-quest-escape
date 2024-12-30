import { motion } from "framer-motion";
import { DoorOpen, Lock } from "lucide-react";
import confetti from 'canvas-confetti';

interface DoorAnimationProps {
  isUnlocked: boolean;
}

export const DoorAnimation = ({ isUnlocked }: DoorAnimationProps) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      {isUnlocked ? (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
          onClick={triggerConfetti}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              rotateY: [0, 90],
              transition: { duration: 1, repeat: 1 }
            }}
          >
            <DoorOpen className="w-8 h-8" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium block mt-1 text-center"
          >
            Door Unlocked!
          </motion.span>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-5, 5, -5, 0],
          }}
          transition={{ duration: 0.5 }}
          className="text-red-500"
        >
          <Lock className="w-8 h-8" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium block mt-1 text-center"
          >
            Can't Escape Yet
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};