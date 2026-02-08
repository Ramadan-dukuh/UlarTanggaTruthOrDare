import { X, SkipBack } from 'lucide-react';

export default function TruthDareModal({
  isOpen,
  onClose,
  type,
  content,
  difficulty,
  playerName,
  onAccept,
  onReject,
}) {
  if (!isOpen) return null;

  const typeLabels = {
    truth: 'Truth 💚',
    dare: 'Dare 🔥',
  };

  const difficultyColors = {
    easy: 'bg-blue-600',
    medium: 'bg-yellow-500',
    hard: 'bg-red-600',
  };

  const difficultyEmojis = {
    easy: '😄 Easy',
    medium: '😅 Medium',
    hard: '😳 Hard',
  };

  const typeGradients = {
    truth: 'from-teal-500 to-emerald-600',
    dare: 'from-orange-500 to-red-600',
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-retro-fade-in">
      <div className="modern-card max-w-lg w-full max-h-[90vh] overflow-hidden animate-retro-bounce-in">
        {/* Header */}
        <div className={`text-white p-5 md:p-6 ${type === 'truth' ? 'bg-gradient-to-r from-teal-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'}`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="modern-font-heading text-xl md:text-2xl font-bold">{typeLabels[type]}</h2>
            <button
              onClick={onClose}
              className="modern-btn p-2 bg-black/30 hover:bg-black/50 text-white rounded-xl transition-all"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-full ${difficultyColors[difficulty]} text-white shadow-lg`}>
              {difficultyEmojis[difficulty]}
            </span>
            <span className="modern-font-body text-sm md:text-base font-semibold">Turn: {playerName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <div className="modern-card bg-bg-dark/50 p-5 md:p-6 mb-5 md:mb-6">
            <p className="modern-font-body text-base md:text-lg text-text-primary font-semibold text-center leading-relaxed">
              {content}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <button
              onClick={onAccept}
              className="modern-btn modern-btn-success w-full py-4 px-6 text-white rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">✓</span>
              ACCEPT CHALLENGE
            </button>

            <button
              onClick={onReject}
              className="modern-btn w-full py-3 px-6 bg-bg-card border border-border-color text-text-primary rounded-2xl font-medium flex items-center justify-center gap-2 text-sm md:text-base hover:bg-accent-red hover:text-white hover:border-accent-red transition-all"
            >
              <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
              REJECT (-3 SQUARES)
            </button>
          </div>

          {/* Info */}
          <div className="mt-4 text-center modern-font-body text-xs text-text-muted modern-card p-3">
            <p>⚠️ Rejecting will move you back 3 squares</p>
          </div>
        </div>
      </div>
    </div>
  );
}
