import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Room } from "@/types/game";
import { PuzzleElements } from "./game/PuzzleElements";
import { DoorAnimation } from "./game/DoorAnimation";

interface RoomDisplayProps {
  room: Room;
  isCompleted: boolean;
  showHint: boolean;
  showExplanation: boolean;
}

export const RoomDisplay = ({ room, isCompleted, showHint, showExplanation }: RoomDisplayProps) => {
  const points = Math.floor(1000 * room.difficulty);
  
  return (
    <Card className="p-8 space-y-6 relative overflow-hidden">
      <PuzzleElements isCompleted={isCompleted} animate={!isCompleted} />
      <DoorAnimation isUnlocked={isCompleted} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="flex items-center gap-2 text-yellow-500">
          <Star className="w-5 h-5" />
          <span className="font-medium">{points} max points</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Room {room.id}: {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Challenge
            {' '}(Difficulty: {room.difficulty})
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground italic"
          >
            {room.storyline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-secondary/50 rounded-lg space-y-4 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            <p className="text-xl font-medium text-center">
              {room.question}
            </p>
          </motion.div>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md"
            >
              <p className="text-sm text-yellow-800">
                💡 Hint: {room.hint}
                <span className="block mt-1 text-xs text-yellow-600">
                  (Using hints reduces points earned by 50%)
                </span>
              </p>
            </motion.div>
          )}

          {showExplanation && !isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md"
            >
              <p className="text-sm text-blue-800">
                📚 Explanation: {room.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Card>
  );
};