import React, { useState } from 'react';
import { Rocket, Brain, Database, Star, Zap, Trophy } from 'lucide-react';

const SpaceAcademyManual = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = {
    intro: {
      title: "Welcome to Space Academy: AI Division",
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      content: `Greetings, cadet! You're about to learn about our most advanced AI system for defending Earth 
      against the Space Invader threat. This training manual will break down the key components of our
      defense system.`
    },
    brain: {
      title: "The Neural Core (DQNAgent)",
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      content: `At the heart of our defense system lies the DQN (Deep Q-Network) Agent. Think of it as the 
      brain of our operation. It uses advanced convolutional neural networks to process visual data from 
      the battlefield and make split-second decisions on how to respond to the alien threat.`
    },
    memory: {
      title: "The Memory Banks (ReplayBuffer)",
      icon: <Database className="w-8 h-8 text-green-500" />,
      content: `Just like our best pilots learn from past encounters, our AI system stores its experiences 
      in a special memory bank called the ReplayBuffer. This allows it to replay past battles and learn 
      from both victories and defeats, constantly improving its strategy.`
    },
    rewards: {
      title: "The Motivation System (RewardShaper)",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      content: `To encourage optimal battle tactics, we've implemented a sophisticated reward system. It 
      celebrates successful hits, strategic movement, and careful resource management while discouraging 
      risky behavior that might leave Earth defenseless.`
    },
    training: {
      title: "The Training Protocol",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      content: `Training happens over thousands of simulated battles. Our AI starts as a rookie with random 
      actions (high epsilon) and gradually becomes more strategic (epsilon decay), learning to make better 
      decisions through experience and constant evaluation.`
    },
    achievements: {
      title: "Mission Objectives",
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      content: `Success metrics include: 
      • Maximizing alien elimination rate
      • Maintaining defensive positioning
      • Efficient use of defense resources
      • Survival time optimization
      The system automatically saves its best configurations for future deployments.`
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="text-center p-4 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold text-blue-400">🚀 Space Academy AI Training Manual 🛸</h1>
        <p className="text-gray-400">Classified Document: Advanced AI Defense Systems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(sections).map(([key, section]) => (
          <div
            key={key}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSection === key ? 'bg-blue-900 border-2 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection(key)}
          >
            <div className="flex items-center space-x-3 mb-2">
              {section.icon}
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            <div className={`transition-opacity duration-200 ${
              activeSection === key ? 'opacity-100' : 'opacity-0 h-0'
            }`}>
              <p className="text-gray-300">{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        Remember: The fate of Earth depends on your understanding of these systems, cadet!
      </div>
    </div>
  );
};

export default SpaceAcademyManual;