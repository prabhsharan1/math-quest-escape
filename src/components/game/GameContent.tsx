import { Room } from "@/types/game";
import { RoomDisplay } from "../RoomDisplay";
import { GameControls } from "../GameControls";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface GameContentProps {
  currentRoom: Room | undefined;
  completedRooms: number[];
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  showExplanation: boolean;
  answer: string;
  setAnswer: (answer: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleNextRoom: () => void;
  maxRooms: number;
}

export const GameContent = ({
  currentRoom,
  completedRooms,
  showHint,
  setShowHint,
  showExplanation,
  answer,
  setAnswer,
  handleSubmit,
  handleNextRoom,
  maxRooms,
}: GameContentProps) => {
  if (!currentRoom) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-primary">Loading room...</h2>
      </div>
    );
  }

  return (
    <>
      <RoomDisplay
        room={currentRoom}
        isCompleted={completedRooms.includes(currentRoom.id)}
        showHint={showHint}
        showExplanation={showExplanation}
      />

      <GameControls
        onSubmit={handleSubmit}
        answer={answer}
        setAnswer={setAnswer}
        showHint={showHint}
        setShowHint={setShowHint}
        isCompleted={completedRooms.includes(currentRoom.id)}
      />

      {completedRooms.includes(currentRoom.id) && currentRoom.id < maxRooms && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <Button
            onClick={handleNextRoom}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Next Room <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      )}
    </>
  );
};