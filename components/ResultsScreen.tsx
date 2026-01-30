
import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / (totalQuestions * 100)) * 100);
  
  let feedback = "¡Sigue practicando!";
  let emoji = "🌱";
  let colorClass = "text-[#ffa600]";
  
  if (percentage >= 90) {
    feedback = "¡Súper Guardián!";
    emoji = "🏆";
    colorClass = "text-[#26890c]";
  } else if (percentage >= 70) {
    feedback = "¡Gran trabajo!";
    emoji = "🌟";
    colorClass = "text-[#1368ce]";
  } else if (percentage >= 50) {
    feedback = "¡Casi un experto!";
    emoji = "🦋";
    colorClass = "text-[#e21b3c]";
  }

  return (
    <div className="bg-white rounded-[3rem] p-12 max-w-xl w-full shadow-[0_40px_100px_rgba(0,0,0,0.5)] text-center animate-in zoom-in-90 duration-500 border-b-[15px] border-gray-100">
      <div className="text-[100px] mb-8 animate-bounce leading-none drop-shadow-xl">{emoji}</div>
      <h1 className={`text-6xl font-black mb-4 tracking-tighter ${colorClass}`}>
        {feedback}
      </h1>
      <p className="text-2xl font-bold text-gray-500 mb-10">¡Has completado la misión!</p>
      
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-50 p-8 rounded-[2rem] border-b-8 border-gray-200">
          <span className="block text-sm text-gray-400 uppercase font-black tracking-widest mb-2">Puntos</span>
          <span className="text-5xl font-black text-[#46178f]">{score}</span>
        </div>
        <div className="bg-gray-50 p-8 rounded-[2rem] border-b-8 border-gray-200">
          <span className="block text-sm text-gray-400 uppercase font-black tracking-widest mb-2">Aciertos</span>
          <span className="text-5xl font-black text-[#46178f]">{score / 100} / {totalQuestions}</span>
        </div>
      </div>

      <button 
        onClick={onRestart}
        className="group relative w-full py-7 bg-[#26890c] hover:bg-[#2eaa0e] text-white text-4xl font-black rounded-[2rem] shadow-[0_12px_0_rgb(26,94,9)] hover:shadow-[0_6px_0_rgb(26,94,9)] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all kahoot-btn uppercase tracking-tighter"
      >
        ¡JUGAR DE NUEVO!
      </button>
      
      <p className="mt-8 text-gray-400 text-lg font-bold italic">
        ¡Nuevas preguntas te esperan!
      </p>
    </div>
  );
};

export default ResultsScreen;
