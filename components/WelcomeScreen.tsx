
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white rounded-[2rem] p-10 max-w-xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center transform hover:scale-[1.01] transition-all duration-500 border-b-8 border-gray-200">
      <div className="mb-8 flex justify-center">
        <div className="w-32 h-32 bg-[#ffc000] rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
          <span className="text-6xl drop-shadow-md">🇪🇨</span>
        </div>
      </div>
      <h1 className="text-5xl font-black text-[#46178f] mb-6 tracking-tight">
        EcoExploradores <span className="text-[#e21b3c]">Ecuador</span>
      </h1>
      <p className="text-gray-700 text-xl mb-10 leading-relaxed font-semibold">
        ¡Hola, aventurero! Prepárate para descubrir los secretos de la naturaleza. 
        Responde 30 preguntas y conviértete en un <span className="text-[#26890c]">Súper Guardián Ambiental</span>.
      </p>
      <button 
        onClick={onStart}
        className="group relative w-full py-6 bg-[#e21b3c] hover:bg-[#ff1e42] text-white text-3xl font-black rounded-2xl shadow-[0_10px_0_rgb(163,18,44)] hover:shadow-[0_5px_0_rgb(163,18,44)] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all kahoot-btn uppercase tracking-wider"
      >
        ¡EMPEZAR YA!
      </button>
      <div className="mt-10 flex justify-center space-x-3">
        <div className="w-4 h-4 bg-[#e21b3c] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-[#1368ce] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-4 h-4 bg-[#ffa600] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-[#26890c] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
