
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { shuffleArray } from '../utils';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer,
  disabled 
}) => {
  const [fillValue, setFillValue] = useState('');
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (question.tipo_pregunta === 'opción múltiple' && question.opciones) {
      setShuffledOptions(shuffleArray(question.opciones));
    } else if (question.tipo_pregunta === 'verdadero/falso') {
      setShuffledOptions(['Verdadero', 'Falso']);
    }
    setFillValue('');
  }, [question]);

  const handleSubmitFill = (e: React.FormEvent) => {
    e.preventDefault();
    if (fillValue.trim()) {
      onAnswer(fillValue);
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col min-h-[80vh] animate-in fade-in slide-in-from-bottom-10 duration-500">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/20 px-6 py-3 rounded-2xl font-black text-2xl text-white shadow-lg">
          {currentIndex + 1} de {totalQuestions}
        </div>
        <div className="bg-white/90 px-6 py-3 rounded-2xl font-black text-xl text-[#46178f] shadow-lg uppercase tracking-wider">
          {question.tema}
        </div>
      </div>

      {/* Question Text Area */}
      <div className="bg-white rounded-[2.5rem] p-10 mb-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center min-h-[300px] border-b-[12px] border-gray-100">
        <h2 className="text-4xl md:text-5xl font-black text-[#333] leading-tight">
          {question.pregunta}
        </h2>
      </div>

      {/* Interaction Area */}
      <div className="flex-grow flex items-stretch">
        {question.tipo_pregunta === 'completar espacio' ? (
          <form onSubmit={handleSubmitFill} className="w-full max-w-3xl mx-auto flex flex-col justify-center">
            <input 
              type="text"
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              disabled={disabled}
              placeholder="ESCRIBE AQUÍ TU RESPUESTA..."
              className="w-full p-8 text-3xl font-black rounded-3xl border-[6px] border-[#46178f] focus:border-[#e21b3c] outline-none transition-all text-center shadow-2xl mb-6 uppercase placeholder:text-gray-300"
              autoFocus
            />
            <button 
              type="submit"
              disabled={disabled || !fillValue.trim()}
              className="w-full py-6 bg-[#26890c] hover:bg-[#2eaa0e] disabled:bg-gray-400 text-white text-3xl font-black rounded-3xl shadow-[0_10px_0_rgb(26,94,9)] transition-all kahoot-btn uppercase"
            >
              ¡ENVIAR!
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {shuffledOptions.map((opt, idx) => {
              const buttonStyles = [
                { 
                  bg: 'bg-[#e21b3c] hover:bg-[#ff3355]', 
                  shadow: 'shadow-[0_8px_0_rgb(163,18,44)]', 
                  icon: '▲',
                  activeShadow: 'shadow-[0_4px_0_rgb(163,18,44)]'
                },
                { 
                  bg: 'bg-[#1368ce] hover:bg-[#268eff]', 
                  shadow: 'shadow-[0_8px_0_rgb(14,75,150)]', 
                  icon: '◆',
                  activeShadow: 'shadow-[0_4px_0_rgb(14,75,150)]'
                },
                { 
                  bg: 'bg-[#ffa600] hover:bg-[#ffc000]', 
                  shadow: 'shadow-[0_8px_0_rgb(194,126,0)]', 
                  icon: '●',
                  activeShadow: 'shadow-[0_4px_0_rgb(194,126,0)]'
                },
                { 
                  bg: 'bg-[#26890c] hover:bg-[#2eaa0e]', 
                  shadow: 'shadow-[0_8px_0_rgb(26,94,9)]', 
                  icon: '■',
                  activeShadow: 'shadow-[0_4px_0_rgb(26,94,9)]'
                }
              ];
              
              const style = buttonStyles[idx % buttonStyles.length];
              
              return (
                <button
                  key={idx}
                  onClick={() => onAnswer(opt)}
                  disabled={disabled}
                  className={`group relative flex items-center p-8 text-white text-2xl md:text-3xl font-black rounded-2xl transition-all duration-75 kahoot-btn ${style.bg} ${style.shadow} hover:translate-y-1 active:translate-y-2 active:shadow-none h-full min-h-[120px]`}
                >
                  <div className="mr-6 text-5xl opacity-40 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    {style.icon}
                  </div>
                  <span className="flex-1 text-left drop-shadow-sm">{opt}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
