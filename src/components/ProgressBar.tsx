import { motion } from "framer-motion";
import { rooms } from "@/data/rooms";

interface ProgressBarProps {
  completedRooms: number[];
  currentRoom: number;
}

export const ProgressBar = ({ completedRooms, currentRoom }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm font-medium">
          {completedRooms.length}/{rooms.length} Rooms
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(completedRooms.length / rooms.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              completedRooms.includes(room.id)
                ? "bg-primary text-primary-foreground"
                : room.id === currentRoom
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {room.id}
          </div>
        ))}
      </div>
    </div>
  );
};