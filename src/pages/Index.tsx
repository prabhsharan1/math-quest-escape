import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { GameRoom } from "@/components/GameRoom";
import { RoomType, Difficulty } from "@/types/game";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>(2);
  const [selectedSubjects, setSelectedSubjects] = useState<RoomType[]>([]);

  const handleGameStart = (diff: Difficulty, subjects: RoomType[]) => {
    setDifficulty(diff);
    setSelectedSubjects(subjects);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-4xl">
        {!gameStarted ? (
          <WelcomeScreen onStart={handleGameStart} />
        ) : (
          <GameRoom 
            onReturn={() => setGameStarted(false)} 
            initialDifficulty={difficulty}
            selectedSubjects={selectedSubjects}
          />
        )}
      </div>
    </div>
  );
};

export default Index;