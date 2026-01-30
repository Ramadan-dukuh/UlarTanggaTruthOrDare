import { Trophy, RotateCcw, Home } from 'lucide-react';

export default function WinnerModal({ winner, onPlayAgain, onHome }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-8 text-center">
          <Trophy className="w-20 h-20 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">🎉 SELAMAT! 🎉</h2>
          <p className="text-lg opacity-90">Permainan Selesai!</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`w-24 h-24 rounded-full ${winner.color} mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-xl`}>
              {winner.id}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {winner.name}
            </h3>
            <p className="text-gray-600">Adalah Pemenangnya! 🏆</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Main Lagi
            </button>

            <button
              onClick={onHome}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Kembali ke Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
