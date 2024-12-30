import { Button } from "@/components/ui/button";
import { Timer, ArrowLeft, Trophy } from "lucide-react";

interface GameHeaderProps {
  onReturn: () => void;
  elapsedTime: string;
  score: number;
  showAchievements: boolean;
  setShowAchievements: (show: boolean) => void;
}

export const GameHeader = ({
  onReturn,
  elapsedTime,
  score,
  showAchievements,
  setShowAchievements,
}: GameHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Button
        variant="outline"
        onClick={onReturn}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Menu
      </Button>
      <div className="flex items-center gap-4">
        <div className="text-lg font-medium text-primary">
          <Timer className="inline-block mr-2" />
          Time: {elapsedTime}
        </div>
        <div className="text-lg font-medium text-yellow-500">
          Score: {score}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAchievements(!showAchievements)}
          className="flex items-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          Achievements
        </Button>
      </div>
    </div>
  );
};