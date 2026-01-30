
import React, { useState, useCallback } from 'react';
import { GameState, Question } from './types';
import { QUESTIONS_BANK } from './questions';
import { getNextBatch } from './utils';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import FeedbackOverlay from './components/FeedbackOverlay';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestions: [],
    currentIndex: 0,
    score: 0,
    usedIds: [],
    status: 'welcome',
    lastAnswerCorrect: null,
    selectedAnswer: null,
  });

  const startNewGame = useCallback(() => {
    const { batch, updatedUsedIds } = getNextBatch(QUESTIONS_BANK, gameState.usedIds, 30);
    
    setGameState(prev => ({
      ...prev,
      currentQuestions: batch,
      currentIndex: 0,
      score: 0,
      usedIds: updatedUsedIds,
      status: 'playing',
      lastAnswerCorrect: null,
      selectedAnswer: null,
    }));
  }, [gameState.usedIds]);

  const handleAnswer = useCallback((answer: string) => {
    const currentQuestion = gameState.currentQuestions[gameState.currentIndex];
    const isCorrect = answer.trim().toLowerCase() === currentQuestion.respuesta_correcta.trim().toLowerCase();
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      lastAnswerCorrect: isCorrect,
      score: isCorrect ? prev.score + 100 : prev.score,
      status: 'feedback'
    }));
  }, [gameState.currentQuestions, gameState.currentIndex]);

  const nextQuestion = useCallback(() => {
    if (gameState.currentIndex + 1 >= gameState.currentQuestions.length) {
      setGameState(prev => ({ ...prev, status: 'finished' }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        status: 'playing',
        lastAnswerCorrect: null,
        selectedAnswer: null,
      }));
    }
  }, [gameState.currentIndex, gameState.currentQuestions.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#46178f] p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#e21b3c] rounded-full blur-[100px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1368ce] rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-[#ffa600] rounded-full blur-[80px] opacity-20"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {gameState.status === 'welcome' && (
          <WelcomeScreen onStart={startNewGame} />
        )}

        {(gameState.status === 'playing' || gameState.status === 'feedback') && (
          <QuizScreen 
            question={gameState.currentQuestions[gameState.currentIndex]} 
            currentIndex={gameState.currentIndex}
            totalQuestions={gameState.currentQuestions.length}
            onAnswer={handleAnswer}
            disabled={gameState.status === 'feedback'}
          />
        )}

        {gameState.status === 'feedback' && (
          <FeedbackOverlay 
            isCorrect={gameState.lastAnswerCorrect ?? false} 
            correctAnswer={gameState.currentQuestions[gameState.currentIndex].respuesta_correcta}
            onNext={nextQuestion}
          />
        )}

        {gameState.status === 'finished' && (
          <ResultsScreen 
            score={gameState.score} 
            totalQuestions={gameState.currentQuestions.length}
            onRestart={startNewGame} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
