import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Timer, Lightbulb } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { RoomType, Difficulty } from "@/types/game";

interface WelcomeScreenProps {
  onStart: (difficulty: Difficulty, subjects: RoomType[]) => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(2);
  const [selectedSubjects, setSelectedSubjects] = useState<RoomType[]>(['physics', 'chemistry', 'biology', 'algebra']);

  const handleSubjectToggle = (subject: RoomType) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const subjects = {
    Science: [
      { id: 'physics', label: 'Physics' },
      { id: 'chemistry', label: 'Chemistry' },
      { id: 'biology', label: 'Biology' },
    ],
    Technology: [
      { id: 'programming', label: 'Programming' },
      { id: 'cybersecurity', label: 'Cybersecurity' },
      { id: 'networking', label: 'Networking' },
    ],
    Engineering: [
      { id: 'mechanical', label: 'Mechanical' },
      { id: 'electrical', label: 'Electrical' },
      { id: 'civil', label: 'Civil' },
    ],
    Mathematics: [
      { id: 'algebra', label: 'Algebra' },
      { id: 'geometry', label: 'Geometry' },
      { id: 'calculus', label: 'Calculus' },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-8 space-y-6 bg-gradient-to-br from-background to-secondary/20">
        <div className="space-y-2 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Math Adventure
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          >
            Welcome to the STEM Escape Room
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Solve challenging puzzles, unlock doors, and escape using your math skills!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Select Difficulty</h3>
            <RadioGroup
              defaultValue={difficulty.toString()}
              onValueChange={(value) => setDifficulty(Number(value) as Difficulty)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="easy" />
                <Label htmlFor="easy">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="hard" />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Select STEM Subjects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(subjects).map(([category, categorySubjects]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-primary">{category}</h4>
                  <div className="space-y-2">
                    {categorySubjects.map((subject) => (
                      <div key={subject.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject.id}
                          checked={selectedSubjects.includes(subject.id as RoomType)}
                          onCheckedChange={() => handleSubjectToggle(subject.id as RoomType)}
                        />
                        <Label htmlFor={subject.id}>{subject.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-6 space-y-2 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <feature.icon className="w-10 h-10 text-primary group-hover:text-primary/80 transition-colors" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => onStart(difficulty, selectedSubjects)}
            className="px-8 py-6 text-lg font-medium hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            disabled={selectedSubjects.length === 0}
          >
            Start Adventure
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

const features = [
  {
    title: "Solve Puzzles",
    description: "Challenge yourself with engaging math problems across different topics.",
    icon: Brain,
  },
  {
    title: "Track Progress",
    description: "Monitor your advancement through each room and challenge.",
    icon: Timer,
  },
  {
    title: "Get Hints",
    description: "Stuck on a puzzle? Use our hint system to guide you forward.",
    icon: Lightbulb,
  },
];
