import { Room, Difficulty, RoomType } from "@/types/game";
import { getDynamicQuestion } from "./difficultyAdjustment";

export const initializeRooms = (
  rooms: Room[],
  selectedSubjects: RoomType[],
  initialDifficulty: Difficulty
): Room[] => {
  const filteredRooms = rooms.filter(room => selectedSubjects.includes(room.type));
  
  return filteredRooms.map(room => ({
    ...room,
    difficulty: (room.id === 1 ? initialDifficulty : room.difficulty) as Difficulty,
    question: getDynamicQuestion(room.question, room.difficulty)
  }));
};