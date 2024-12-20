# Deep-Learning-Julia

# Space Invaders DQN Implementation

## Project Overview
This project implements a Deep Q-Network (DQN) agent to play the Atari game Space Invaders. The implementation explores different reward shaping strategies to improve agent performance and learning stability.

## Features
- Deep Q-Network implementation with TensorFlow/Keras
- Custom reward shaping mechanisms
- Real-time game visualization
- Performance tracking and analysis
- Three different implementation strategies:
  - Basic DQN with simple rewards
  - Balanced approach with refined exploration
  - Complex reward shaping with strategic incentives

## Requirements
- Python 3.9+
- TensorFlow
- Gymnasium with Atari environments
- OpenCV for visualization
- Additional dependencies in `requirements.txt`

## Installation

1. Create and activate a virtual environment:
```bash
python -m venv spaceinvaders
spaceinvaders\Scripts\activate
```

2. Install required packages:
```bash
pip install -r requirements.txt
```

3. Install Atari ROMs:
```bash
pip install 'gymnasium[atari]'
```

## Project Structure
```
space_invaders_dqn/
├── models/                # Saved model checkpoints
│   ├── try1/
│   ├── try2/
│   └── try3/
├── plots/                        # Training visualizations
├── logs/                         # Training logs
├── sequential_reward_shaping.ipynb   # Main training script
├── requirements.txt     # Project dependencies
└── README.md           # This file
```

## Implementation Details

### Network Architecture
- Input: 84x84x4 grayscale frames
- 3 Convolutional layers
- 2 Dense layers
- Output: Q-values for each action

### Reward Shaping Strategies

#### Try 1: Basic Implementation
- Simple score-based rewards
- Basic survival incentives
- Movement and shooting rewards

#### Try 2: Balanced Approach
- Refined exploration strategy
- Balanced reward scaling
- Improved stability

#### Try 3: Complex Strategy
- Strategic target prioritization
- Advanced gameplay mechanics
- Multiple behavior shapers

## Results
- **Try 1**: Highest max reward (1003.80), consistent performance
- **Try 2**: Eliminated negative rewards, stable learning
- **Try 3**: More complex behavior, lower but steady rewards

## Usage

### Training
```bash
python main.py --try_number 1  # For first implementation
python main.py --try_number 2  # For second implementation
python main.py --try_number 3  # For third implementation
```

### Evaluation
```bash
python evaluate_model.py --model_path models/try1/final_model.keras
```

## Model Performance
Average rewards over 5 evaluation episodes:
- Model 1: 483.0
- Model 2: 186.0
- Model 3: 181.0

## Visualization
Training progress visualizations are available in the `plots/` directory, showing:
- Average reward over time
- Exploration rate (epsilon) decay
- Performance metrics
