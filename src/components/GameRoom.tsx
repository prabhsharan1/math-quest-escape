import { useState, useEffect } from "react";
import { toast } from "sonner";
import { rooms } from "@/data/rooms";
import { ProgressBar } from "./ProgressBar";
import { GameState, RoomType, Difficulty, Room } from "@/types/game";
import { AchievementsPanel } from "./AchievementsPanel";
import { calculateNextDifficulty, getDynamicQuestion } from "@/utils/difficultyAdjustment";
import { initializeRooms } from "@/utils/gameInitialization";
import { GameHeader } from "./game/GameHeader";
import { GameContent } from "./game/GameContent";
import { Loader2 } from "lucide-react";
import { generateQuestion } from "@/utils/questionGenerator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface GameRoomProps {
  onReturn: () => void;
  initialDifficulty: Difficulty;
  selectedSubjects: RoomType[];
}

export const GameRoom = ({ onReturn, initialDifficulty, selectedSubjects }: GameRoomProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(() => {
    const availableRooms = rooms.filter(room => selectedSubjects.includes(room.type));
    return availableRooms.map(room => ({
      ...room,
      difficulty: initialDifficulty
    }));
  });

  const [gameState, setGameState] = useState<GameState>({
    currentRoom: filteredRooms.length > 0 ? filteredRooms[0].id : 1,
    completedRooms: [],
    startTime: Date.now(),
    endTime: null,
    performance: {
      attempts: 0,
      hintsUsed: 0,
      averageSolveTime: 0,
      score: 0,
      achievements: [
        {
          id: "speed_demon",
          title: "Speed Demon",
          description: "Complete a room in under 30 seconds",
          icon: "⚡",
          unlocked: false,
        },
        {
          id: "perfect_solve",
          title: "Perfect Solver",
          description: "Solve a room without hints or mistakes",
          icon: "🎯",
          unlocked: false,
        },
        {
          id: "stem_master",
          title: "STEM Master",
          description: "Complete rooms from all STEM categories",
          icon: "🎓",
          unlocked: false,
        },
      ],
    },
  });

  const generateNewQuestions = async () => {
    if (!apiKey) {
      toast.error("Please enter your Perplexity API key");
      return;
    }

    setIsGeneratingQuestions(true);
    try {
      const newQuestions = await Promise.all(
        selectedSubjects.map(async (subject) => {
          const generatedQ = await generateQuestion(subject, initialDifficulty, apiKey);
          return {
            id: filteredRooms.length + Math.random(),
            type: subject,
            difficulty: initialDifficulty,
            storyline: `New ${subject.charAt(0).toUpperCase() + subject.slice(1)} Challenge`,
            ...generatedQ,
            animation: {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 }
            }
          };
        })
      );

      setFilteredRooms(prev => [...prev, ...newQuestions]);
      toast.success("New questions generated successfully!");
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate new questions. Please check your API key.");
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const currentRoom = filteredRooms.find((r) => r.id === gameState.currentRoom);

  useEffect(() => {
    const initializeGame = async () => {
      setIsLoading(true);
      try {
        const availableRooms = rooms.filter(room => selectedSubjects.includes(room.type));
        
        if (availableRooms.length === 0) {
          toast.error("Please select at least one subject to start the game");
          onReturn();
          return;
        }

        const processedRooms = initializeRooms(availableRooms, selectedSubjects, initialDifficulty);
        setFilteredRooms(processedRooms);
        
        setGameState(prev => ({
          ...prev,
          currentRoom: processedRooms[0].id
        }));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing game:", error);
        toast.error("Failed to initialize game. Please try again.");
        onReturn();
      }
    };

    initializeGame();
  }, [selectedSubjects, initialDifficulty, onReturn]);

  const checkAchievements = (solveTime: number, usedHint: boolean, attempts: number) => {
    const newAchievements = [...gameState.performance.achievements];
    
    if (solveTime < 30 && !newAchievements.find(a => a.id === "speed_demon")?.unlocked) {
      newAchievements.find(a => a.id === "speed_demon")!.unlocked = true;
      toast.success("🏆 Achievement Unlocked: Speed Demon!");
    }

    if (!usedHint && attempts === 1 && !newAchievements.find(a => a.id === "perfect_solve")?.unlocked) {
      newAchievements.find(a => a.id === "perfect_solve")!.unlocked = true;
      toast.success("🏆 Achievement Unlocked: Perfect Solver!");
    }

    const completedTypes = new Set(
      filteredRooms
        .filter(room => gameState.completedRooms.includes(room.id))
        .map(room => room.type)
    );
    if (completedTypes.size === selectedSubjects.length && !newAchievements.find(a => a.id === "stem_master")?.unlocked) {
      newAchievements.find(a => a.id === "stem_master")!.unlocked = true;
      toast.success("🏆 Achievement Unlocked: STEM Master!");
    }

    return newAchievements;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRoom) return;

    const attemptStartTime = gameState.startTime || Date.now();
    const solveTime = (Date.now() - attemptStartTime) / 1000;

    if (answer.toLowerCase() === currentRoom.answer.toLowerCase()) {
      const newCompletedRooms = [...gameState.completedRooms, currentRoom.id];
      const pointsEarned = Math.floor(
        (1000 / solveTime) * (showHint ? 0.5 : 1) * currentRoom.difficulty
      );
      
      const newAchievements = checkAchievements(
        solveTime,
        showHint,
        gameState.performance.attempts + 1
      );

      const newPerformance = {
        attempts: gameState.performance.attempts,
        hintsUsed: showHint ? gameState.performance.hintsUsed + 1 : gameState.performance.hintsUsed,
        averageSolveTime: (gameState.performance.averageSolveTime + solveTime) / 2,
        score: gameState.performance.score + pointsEarned,
        achievements: newAchievements,
      };

      setGameState((prev) => ({
        ...prev,
        completedRooms: newCompletedRooms,
        performance: newPerformance,
      }));

      setShowExplanation(false);
      toast.success(`🎉 Brilliant! You've solved the puzzle! (+${pointsEarned} points)`, {
        description: currentRoom.explanation,
      });

      if (newCompletedRooms.length === filteredRooms.length) {
        setGameState((prev) => ({
          ...prev,
          endTime: Date.now(),
        }));
        toast.success("🏆 Congratulations! You've escaped!", {
          description: "You've completed all the rooms!",
        });
      }
    } else {
      setGameState((prev) => ({
        ...prev,
        performance: {
          ...prev.performance,
          attempts: prev.performance.attempts + 1,
        },
      }));
      
      setShowExplanation(true);
      toast.error("🤔 That's not quite right", {
        description: "Try again! Remember to check your calculations carefully.",
      });
    }
  };

  const handleNextRoom = () => {
    if (currentRoom && gameState.completedRooms.includes(currentRoom.id)) {
      setIsLoading(true);
      const nextRoomId = currentRoom.id + 1;
      
      if (nextRoomId <= filteredRooms.length) {
        const nextDifficulty = calculateNextDifficulty(gameState.performance) as Difficulty;
        const nextRoom = filteredRooms.find(r => r.id === nextRoomId);
        
        if (nextRoom) {
          nextRoom.difficulty = nextDifficulty;
          const updatedRooms = filteredRooms.map(room => 
            room.id === nextRoom.id 
              ? { ...nextRoom, question: getDynamicQuestion(nextRoom.question, nextDifficulty) }
              : room
          );
          setFilteredRooms(updatedRooms);
        }

        setGameState(prev => ({
          ...prev,
          currentRoom: nextRoomId,
        }));
        setAnswer("");
        setShowHint(false);
        setShowExplanation(false);
      }
      setIsLoading(false);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const elapsedTime = gameState.startTime
    ? formatTime((gameState.endTime || Date.now()) - gameState.startTime)
    : "0:00";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">
          Preparing your adventure...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GameHeader
        onReturn={onReturn}
        elapsedTime={elapsedTime}
        score={gameState.performance.score}
        showAchievements={showAchievements}
        setShowAchievements={setShowAchievements}
      />

      {filteredRooms.length === 0 && (
        <div className="p-4 space-y-4 bg-secondary/20 rounded-lg">
          <p className="text-center text-muted-foreground">
            No rooms available. Generate new questions to continue!
          </p>
          <div className="flex gap-4">
            <Input
              type="password"
              placeholder="Enter your Perplexity API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={generateNewQuestions}
              disabled={isGeneratingQuestions}
            >
              {isGeneratingQuestions ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Questions'
              )}
            </Button>
          </div>
        </div>
      )}

      <ProgressBar
        completedRooms={gameState.completedRooms}
        currentRoom={gameState.currentRoom}
      />

      {showAchievements && (
        <AchievementsPanel achievements={gameState.performance.achievements} />
      )}

      {currentRoom && (
        <GameContent
          currentRoom={currentRoom}
          completedRooms={gameState.completedRooms}
          showHint={showHint}
          setShowHint={setShowHint}
          showExplanation={showExplanation}
          answer={answer}
          setAnswer={setAnswer}
          handleSubmit={handleSubmit}
          handleNextRoom={handleNextRoom}
          maxRooms={filteredRooms.length}
        />
      )}
    </div>
  );
};