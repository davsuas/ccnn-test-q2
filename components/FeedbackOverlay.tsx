
import React from 'react';

interface FeedbackOverlayProps {
  isCorrect: boolean;
  correctAnswer: string;
  onNext: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ isCorrect, correctAnswer, onNext }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-300 ${isCorrect ? 'bg-[#26890c]/90' : 'bg-[#e21b3c]/90'}`}>
      <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-[0_30px_100px_rgba(0,0,0,0.5)] text-center transform scale-100 animate-in zoom-in-95 duration-300 border-b-[15px] border-gray-200">
        <div className={`text-5xl font-black mb-6 ${isCorrect ? 'text-[#26890c]' : 'text-[#e21b3c]'} tracking-tighter`}>
          {isCorrect ? '¡INCREÍBLE! ✨' : '¡CARIÑO! 💡'}
        </div>
        
        <div className="text-8xl mb-6">
          {isCorrect ? '🦁' : '🧐'}
        </div>

        <p className="text-3xl font-black text-[#333] mb-4">
          {isCorrect ? '¡Puntos ganados!' : 'La respuesta era:'}
        </p>

        {!isCorrect && (
          <div className="mb-8 p-6 bg-gray-100 rounded-3xl border-4 border-dashed border-red-200">
            <span className="text-2xl font-black text-[#e21b3c] uppercase">{correctAnswer}</span>
          </div>
        )}

        <button 
          onClick={onNext}
          className="w-full py-6 bg-[#46178f] hover:bg-[#5a1db8] text-white text-3xl font-black rounded-3xl shadow-[0_10px_0_rgb(50,16,102)] hover:shadow-[0_5px_0_rgb(50,16,102)] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all kahoot-btn uppercase"
        >
          ¡VAMOS!
        </button>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
