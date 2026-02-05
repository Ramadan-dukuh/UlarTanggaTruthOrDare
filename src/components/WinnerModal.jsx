import { Trophy, RotateCcw, Home, Sparkles } from 'lucide-react';

export default function WinnerModal({ winner, onPlayAgain, onHome }) {
  return (
    <div className="fixed inset-0 bg-retro-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-retro-fade-in retro-scanlines">
      <div className="retro-card bg-retro-white max-w-md w-full overflow-hidden animate-retro-bounce-in">
        {/* Header */}
        <div className="bg-retro-yellow text-retro-black p-6 md:p-8 text-center animate-retro-zoom-flash">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 md:w-20 md:h-20 animate-retro-float" />
          </div>
          <h2 className="retro-font text-xl md:text-2xl font-bold mb-2 animate-retro-text-glow">VICTORY!</h2>
          <p className="retro-font-body text-base md:text-lg font-bold">GAME COMPLETE</p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <div className={`retro-avatar w-20 h-20 md:w-24 md:h-24 rounded-2xl ${winner.color} mx-auto mb-4 flex items-center justify-center text-retro-white text-3xl md:text-4xl font-bold animate-retro-pulse-glow`}>
              {winner.id}
            </div>
            <h3 className="retro-font text-xl md:text-2xl font-bold text-retro-black mb-2 retro-text-shadow">
              {winner.name}
            </h3>
            <p className="retro-font-body text-sm md:text-base text-retro-dark-gray flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-retro-orange animate-retro-pop" />
              IS THE WINNER!
              <Sparkles className="w-4 h-4 text-retro-orange animate-retro-pop" />
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-2 md:space-y-3">
            <button
              onClick={onPlayAgain}
              className="retro-btn w-full py-3 md:py-3 px-6 bg-retro-purple text-retro-white rounded-2xl hover:bg-retro-purple font-bold text-base md:text-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
              PLAY AGAIN
            </button>

            <button
              onClick={onHome}
              className="retro-btn w-full py-3 md:py-3 px-6 bg-retro-blue text-retro-white rounded-2xl hover:bg-retro-blue font-medium flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              MAIN MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
