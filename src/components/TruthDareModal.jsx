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
    truth: 'Truth 🟢',
    dare: 'Dare 🔴',
  };

  const difficultyColors = {
    easy: 'bg-blue-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  const difficultyEmojis = {
    easy: '😄 Easy',
    medium: '😅 Medium',
    hard: '😳 Hard',
  };

  const typeGradients = {
    truth: 'from-green-500 to-emerald-500',
    dare: 'from-red-500 to-rose-500',
  };

  return (
    <div className="fixed inset-0 bg-retro-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-retro-fade-in retro-scanlines">
      <div className="retro-card bg-retro-white max-w-lg w-full max-h-[90vh] overflow-hidden animate-retro-bounce-in">
        {/* Header */}
        <div className={`text-retro-white p-4 md:p-6 ${type === 'truth' ? 'bg-retro-green' : 'bg-retro-red'}`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="retro-font text-lg md:text-xl font-bold retro-text-shadow">{typeLabels[type]}</h2>
            <button
              onClick={onClose}
              className="retro-btn p-1.5 bg-retro-black text-retro-white rounded hover:bg-retro-dark-gray"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`retro-badge px-3 py-1 text-xs md:text-sm font-bold ${difficultyColors[difficulty]} text-retro-white`}>
              {difficultyEmojis[difficulty]}
            </span>
            <span className="retro-font-body text-xs md:text-sm font-bold">TURN: {playerName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="retro-border bg-retro-cream p-4 md:p-6 mb-4 md:mb-6">
            <p className="retro-font-body text-base md:text-lg text-retro-black font-bold text-center leading-relaxed">
              {content}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2 md:space-y-3">
            <button
              onClick={onAccept}
              className="retro-btn w-full py-3 md:py-3 px-6 bg-retro-green text-retro-white rounded-2xl hover:bg-retro-green font-bold text-base md:text-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">✓</span>
              ACCEPT!
            </button>

            <button
              onClick={onReject}
              className="retro-btn w-full py-3 md:py-3 px-6 bg-retro-gray text-retro-white rounded-2xl hover:bg-retro-dark-gray font-medium flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
              REJECT (-3)
            </button>
          </div>

          {/* Info */}
          <div className="mt-3 md:mt-4 text-center retro-font-body text-[10px] md:text-xs text-retro-dark-gray retro-card p-2">
            <p>⚠ Reject = Move back 3 squares</p>
          </div>
        </div>
      </div>
    </div>
  );
}
