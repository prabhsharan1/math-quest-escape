import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb } from "lucide-react";

interface GameControlsProps {
  onSubmit: (e: React.FormEvent) => void;
  answer: string;
  setAnswer: (value: string) => void;
  showHint: boolean;
  setShowHint: (value: boolean) => void;
  isCompleted: boolean;
}

export const GameControls = ({
  onSubmit,
  answer,
  setAnswer,
  showHint,
  setShowHint,
  isCompleted,
}: GameControlsProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="answer" className="text-sm font-medium">
          Your Answer
        </label>
        <Input
          id="answer"
          type="text"
          placeholder="Enter your solution..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="game-input"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="w-full hover:scale-105 transition-transform duration-300"
          disabled={isCompleted}
        >
          Submit Answer
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowHint(!showHint)}
          className="w-full group hover:scale-105 transition-transform duration-300"
        >
          <Lightbulb className="w-4 h-4 mr-2 group-hover:text-yellow-500 transition-colors" />
          {showHint ? "Hide Hint" : "Show Hint"}
        </Button>
      </div>
    </form>
  );
};