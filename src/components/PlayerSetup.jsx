import { useState } from 'react';
import { Plus, Trash2, Users, Sparkles, Heart, UserPlus, GraduationCap, Gamepad2 } from 'lucide-react';
import { PLAYER_COLORS } from '../data/boardData';

const GAME_MODES = [
  { id: 'party', name: 'Party Mode', icon: Sparkles, color: 'bg-purple-500', description: 'Santai & Lucu' },
  { id: 'couple', name: 'Couple Mode', icon: Heart, color: 'bg-pink-500', description: 'Lebih Personal' },
  { id: 'friend', name: 'Friend Mode', icon: Users, color: 'bg-blue-500', description: 'Untuk Teman' },
  { id: 'school', name: 'Sekolah Mode', icon: GraduationCap, color: 'bg-green-500', description: 'Aman & Sopan' },
];

export default function PlayerSetup({ onStartGame }) {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Pemain 1', color: PLAYER_COLORS[0] },
    { id: 2, name: 'Pemain 2', color: PLAYER_COLORS[1] },
  ]);
  const [selectedMode, setSelectedMode] = useState('party');
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    setTimeout(() => {
      const playersWithPosition = players.map((p) => ({ ...p, position: 1 }));
      onStartGame(playersWithPosition, selectedMode);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-retro-dark-blue retro-grid flex items-center justify-center p-4">
      <div className="retro-card rounded-lg p-6 md:p-8 max-w-md w-full animate-retro-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4 animate-retro-float">
            <Gamepad2 className="w-16 h-16 text-retro-purple mx-auto" />
          </div>
          <h1 className="retro-font text-xl md:text-2xl font-bold mb-2 text-retro-white retro-text-shadow">
            ULAR TANGGA
          </h1>
          <p className="retro-font text-sm text-retro-yellow retro-text-glow">
            TRUTH OR DARE
          </p>
          <p className="text-sm text-retro-gray mt-2">
            Press Start! 🎮
          </p>
        </div>

        {/* Mode Selection */}
        <div className="mb-6">
          <h2 className="retro-font text-xs font-bold mb-3 text-retro-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-retro-yellow animate-retro-pop" />
            SELECT MODE
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {GAME_MODES.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`
                    retro-btn p-3 rounded flex flex-col items-center gap-1
                    ${selectedMode === mode.id
                      ? 'bg-retro-purple text-retro-white'
                      : 'bg-retro-white text-retro-black'
                    }
                    animate-retro-slide-up
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="retro-font text-[10px] font-bold">{mode.name}</span>
                  <span className="retro-font-body text-[8px] opacity-80">{mode.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Setup */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="retro-font text-xs font-bold text-retro-white flex items-center gap-2">
              <Users className="w-5 h-5 text-retro-blue" />
              PLAYERS
            </h2>
            <span className="retro-badge bg-retro-yellow text-retro-black">
              {players.length}/8
            </span>
          </div>

          <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
            {players.map((player, index) => (
              <div 
                key={player.id} 
                className="flex items-center gap-2 animate-retro-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`retro-avatar w-10 h-10 rounded flex items-center justify-center text-white font-bold transition-transform hover:scale-110 ${player.color}`}
                >
                  {player.id}
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="retro-input flex-1 px-3 py-2 rounded text-sm retro-font-body"
                  placeholder={`P${player.id} NAME`}
                />
                {players.length > 2 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="retro-btn p-2 bg-retro-red text-retro-white rounded hover:bg-retro-red"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {players.length < 8 && (
            <button
              onClick={addPlayer}
              className="retro-btn w-full py-2.5 px-4 bg-retro-blue text-retro-white rounded flex items-center justify-center gap-2 retro-font text-xs"
            >
              <Plus className="w-4 h-4" />
              ADD PLAYER
            </button>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={isAnimating}
          className={`
            retro-btn w-full py-4 px-6 bg-retro-green text-retro-white rounded
            font-bold retro-font text-sm
            ${isAnimating ? 'animate-retro-pulse-glow' : ''}
          `}
        >
          {isAnimating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-retro-white border-t-retro-black rounded-full animate-retro-coin-spin" />
              LOADING...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              START GAME
              <span className="animate-retro-blink">▶</span>
            </span>
          )}
        </button>

        {/* Info */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="retro-card bg-retro-purple text-retro-white p-2 rounded text-center">
            <p className="retro-font font-bold">🐍 SNAKE</p>
            <p className="retro-font-body text-[10px] opacity-90">DOWN + HARD</p>
          </div>
          <div className="retro-card bg-retro-orange text-retro-white p-2 rounded text-center">
            <p className="retro-font font-bold">🪜 LADDER</p>
            <p className="retro-font-body text-[10px] opacity-90">UP + SKIP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
