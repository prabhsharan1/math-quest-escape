import { Achievement } from "@/types/game";
import { motion } from "framer-motion";
import { Trophy, Lock, Medal } from "lucide-react";
import { Card } from "./ui/card";

interface AchievementsPanelProps {
  achievements: Achievement[];
}

export const AchievementsPanel = ({ achievements }: AchievementsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`p-4 ${
              achievement.unlocked
                ? "bg-gradient-to-br from-yellow-50 to-yellow-100"
                : "opacity-75"
            }`}
          >
            <div className="flex items-center gap-3">
              {achievement.unlocked ? (
                <Medal className="w-8 h-8 text-yellow-500" />
              ) : (
                <Lock className="w-8 h-8 text-gray-400" />
              )}
              <div>
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};