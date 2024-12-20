# app.py
import streamlit as st
import numpy as np
import tensorflow as tf
import gymnasium as gym
import ale_py
from gymnasium.wrappers import FrameStackObservation, AtariPreprocessing, RecordVideo
import plotly.graph_objects as go
from pathlib import Path

class SpaceInvadersApp:
    def __init__(self):
        self.setup_page()
        self.load_model()
        self.initialize_environment()

    def setup_page(self):
        st.set_page_config(
            page_title="Space Invaders AI Arena",
            page_icon="👾",
            layout="wide"
        )
        st.title("🎮 Space Invaders AI Arena 👾")

    def load_model(self):
        try:
            model_path = "models/episode312_space_invaders_model.keras"
            self.model = tf.keras.models.load_model(model_path)
            st.sidebar.success(f"Model loaded successfully from {model_path}!")
        except Exception as e:
            st.sidebar.error(f"Error loading model: {str(e)}")

    def initialize_environment(self):
        gym.register_envs(ale_py)
        self.env = gym.make("SpaceInvadersNoFrameskip-v4", render_mode="rgb_array")
        self.env = AtariPreprocessing(self.env)
        self.env = FrameStackObservation(self.env, 4)

    def play_episode(self):
        state, _ = self.env.reset()
        total_reward = 0
        frames = []
        
        done = False
        while not done:
            # Convert state for prediction
            state_tensor = tf.convert_to_tensor(state)
            state_tensor = tf.transpose(state_tensor, [1, 2, 0])
            state_tensor = tf.expand_dims(state_tensor, 0)

            # Get action
            action_probs = self.model(state_tensor, training=False)
            action = tf.argmax(action_probs[0]).numpy()

            # Step environment
            state, reward, done, _, info = self.env.step(action)
            total_reward += reward
            
            # Capture frame
            frame = self.env.render()
            frames.append(frame)

        return total_reward, frames

    def run_tournament(self, num_episodes):
        scores = []
        progress_bar = st.progress(0)
        score_chart = st.empty()
        
        # Create two columns
        col1, col2 = st.columns(2)
        
        # Setup metrics
        with col1:
            score_metric = st.metric(label="Current Score", value=0)
        with col2:
            high_score_metric = st.metric(label="High Score", value=0)

        for episode in range(num_episodes):
            # Run episode
            score, frames = self.play_episode()
            scores.append(score)
            
            # Update progress and metrics
            progress = (episode + 1) / num_episodes
            progress_bar.progress(progress)
            score_metric.metric("Current Score", int(score))
            high_score_metric.metric("High Score", int(max(scores)))
            
            # Update score plot
            fig = go.Figure(data=go.Scatter(y=scores, mode='lines+markers'))
            fig.update_layout(
                title="Tournament Scores",
                xaxis_title="Episode",
                yaxis_title="Score",
                template="plotly_dark"
            )
            score_chart.plotly_chart(fig, use_container_width=True)

            # Save video of best episode
            if score == max(scores):
                self.best_frames = frames

    def run(self):
        st.sidebar.header("Tournament Settings")
        num_episodes = st.sidebar.slider("Number of Episodes", 1, 20, 5)
        
        if st.sidebar.button("Start Tournament"):
            if hasattr(self, 'model'):
                self.run_tournament(num_episodes)
                
                # Display best episode video
                if hasattr(self, 'best_frames'):
                    st.header("Best Episode Replay")
                    st.video(self.best_frames)
            else:
                st.sidebar.error("Please load a model first")

if __name__ == "__main__":
    app = SpaceInvadersApp()
    app.run()