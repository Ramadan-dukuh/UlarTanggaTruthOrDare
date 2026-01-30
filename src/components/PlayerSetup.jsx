import { useState } from 'react';
import { Plus, Trash2, Users, Sparkles, Heart, UserPlus, GraduationCap } from 'lucide-react';
import { PLAYER_COLORS } from '../data/boardData';

const GAME_MODES = [
  { id: 'party', name: 'Party Mode', icon: Sparkles, color: 'bg-purple-500' },
  { id: 'couple', name: 'Couple Mode', icon: Heart, color: 'bg-pink-500' },
  { id: 'friend', name: 'Friend Mode', icon: Users, color: 'bg-blue-500' },
  { id: 'school', name: 'Sekolah Mode', icon: GraduationCap, color: 'bg-green-500' },
];

export default function PlayerSetup({ onStartGame }) {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Pemain 1', color: PLAYER_COLORS[0] },
    { id: 2, name: 'Pemain 2', color: PLAYER_COLORS[1] },
  ]);
  const [selectedMode, setSelectedMode] = useState('party');

  const addPlayer = () => {
    if (players.length >= 8) return;
    const newId = players.length + 1;
    setPlayers([
      ...players,
      {
        id: newId,
        name: `Pemain ${newId}`,
        color: PLAYER_COLORS[players.length],
        position: 1,
      },
    ]);
  };

  const removePlayer = (id) => {
    if (players.length <= 2) return;
    setPlayers(players.filter((p) => p.id !== id));
  };

  const updatePlayerName = (id, name) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const handleStart = () => {
    const playersWithPosition = players.map((p) => ({ ...p, position: 1 }));
    onStartGame(playersWithPosition, selectedMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          🎮 Ular Tangga Truth or Dare
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Main game seru bareng teman!
        </p>

        {/* Mode Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Pilih Mode</h2>
          <div className="grid grid-cols-2 gap-2">
            {GAME_MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`
                    p-3 rounded-lg border-2 transition-all
                    flex items-center gap-2
                    ${selectedMode === mode.id
                      ? `${mode.color} text-white border-current`
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{mode.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Setup */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-700">Pemain</h2>
            <span className="text-sm text-gray-500">{players.length}/8</span>
          </div>

          <div className="space-y-2 mb-3">
            {players.map((player) => (
              <div key={player.id} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-lg ${player.color} flex items-center justify-center text-white font-bold`}
                >
                  {player.id}
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder={`Nama Pemain ${player.id}`}
                />
                {players.length > 2 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {players.length < 8 && (
            <button
              onClick={addPlayer}
              className="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Tambah Pemain
            </button>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Mulai Game 🎲
        </button>

        {/* Info */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>🐍 Ular = Turun + Truth/Dare Hard</p>
          <p>🪜 Tangga = Naik + Skip Truth/Dare</p>
        </div>
      </div>
    </div>
  );
}
