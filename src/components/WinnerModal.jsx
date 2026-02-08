import { Trophy, RotateCcw, Home, Sparkles } from 'lucide-react';

export default function WinnerModal({ winner, onPlayAgain, onHome }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-retro-fade-in">
      <div className="modern-card max-w-md w-full overflow-hidden animate-retro-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-accent-yellow to-accent-orange text-bg-dark p-6 md:p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Trophy className="w-12 h-12 md:w-16 md:h-16 animate-retro-float" />
            </div>
          </div>
          <h2 className="modern-font-heading text-2xl md:text-3xl font-bold mb-2">VICTORY!</h2>
          <p className="modern-font-body text-base md:text-lg font-semibold">GAME COMPLETE</p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <div className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl ${winner.color} mx-auto mb-4 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-2xl animate-retro-pulse-glow`}>
              {winner.id}
            </div>
            <h3 className="modern-font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
              {winner.name}
            </h3>
            <p className="modern-font-body text-sm md:text-base text-text-secondary flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-yellow animate-retro-pop" />
              IS THE WINNER!
              <Sparkles className="w-5 h-5 text-accent-yellow animate-retro-pop" />
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="modern-btn modern-btn-primary w-full py-4 px-6 text-white rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
              PLAY AGAIN
            </button>

            <button
              onClick={onHome}
              className="modern-btn w-full py-3 px-6 bg-bg-card border border-border-color text-text-primary rounded-2xl font-medium flex items-center justify-center gap-2 text-sm md:text-base hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <Home className="w-5 h-5 md:w-6 md:h-6" />
              MAIN MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
