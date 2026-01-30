import { X, SkipBack, RotateCcw } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{typeLabels[type]}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${difficultyColors[difficulty]}`}>
              {difficultyEmojis[difficulty]}
            </span>
            <span className="text-sm opacity-90">Giliran: {playerName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 font-medium text-center leading-relaxed">
              {content}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <button
              onClick={onAccept}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-bold text-lg shadow-lg"
            >
              ✓ Lakukan!
            </button>

            <button
              onClick={onReject}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-2"
            >
              <SkipBack className="w-5 h-5" />
              Tolak (Hukuman: Mundur 3 kotak)
            </button>
          </div>

          {/* Info */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>💡 Kalau menolak, kamu akan mundur 3 kotak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
