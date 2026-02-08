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
    <div className="min-h-screen modern-gradient-bg modern-grid flex items-center justify-center p-4">
      <div className="modern-card p-6 md:p-8 max-w-lg w-full animate-retro-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4 animate-retro-float">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="modern-font-heading text-2xl md:text-3xl font-bold mb-2 text-text-primary">
            ULAR TANGGA
          </h1>
          <p className="modern-font-body text-base text-primary font-semibold">
            Truth or Dare Edition
          </p>
          <p className="text-sm text-text-muted mt-2">
            Press Start to begin! 🎮
          </p>
        </div>

        {/* Mode Selection */}
        <div className="mb-6">
          <h2 className="modern-font-heading text-sm font-bold mb-3 text-text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-yellow" />
            SELECT GAME MODE
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {GAME_MODES.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`
                    modern-btn p-3 rounded-xl flex flex-col items-center gap-2 transition-all
                    ${selectedMode === mode.id
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-bg-card text-text-primary hover:bg-bg-card hover:scale-102'
                    }
                    animate-retro-slide-up
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="modern-font-heading text-xs font-bold">{mode.name}</span>
                  <span className="modern-font-body text-[10px] opacity-80">{mode.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Setup */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="modern-font-heading text-sm font-bold text-text-primary flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              ADD PLAYERS
            </h2>
            <span className="px-3 py-1 bg-primary text-white rounded-full modern-font-body text-xs font-semibold">
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
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-transform hover:scale-110 shadow-2xl ring-2 ring-white ring-offset-2 ${player.color}`}
                >
                  {player.id}
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border-color bg-bg-dark text-text-primary modern-font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={`Player ${player.id}`}
                />
                {players.length > 2 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="modern-btn p-2.5 bg-bg-card border border-border-color rounded-xl hover:bg-accent-red hover:text-white transition-all"
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
              className="modern-btn w-full py-3 px-4 bg-bg-card border border-border-color text-text-primary rounded-xl flex items-center justify-center gap-2 modern-font-heading text-xs hover:border-primary hover:text-primary transition-all"
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
            modern-btn w-full py-4 px-6 modern-btn-success rounded-xl font-bold modern-font-heading text-base shadow-lg
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          {isAnimating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              LOADING...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              START GAME
              <span className="animate-pulse">▶</span>
            </span>
          )}
        </button>

        {/* Info */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="modern-card bg-gradient-to-br from-fun-purple to-fun-pink text-white p-3 rounded-xl text-center">
            <p className="modern-font-heading font-bold text-sm">🐍 SNAKE</p>
            <p className="modern-font-body text-[10px] opacity-90">Slide down + Truth</p>
          </div>
          <div className="modern-card bg-gradient-to-br from-fun-orange to-accent-yellow text-white p-3 rounded-xl text-center">
            <p className="modern-font-heading font-bold text-sm">🪜 LADDER</p>
            <p className="modern-font-body text-[10px] opacity-90">Climb up + Skip</p>
          </div>
        </div>
      </div>
    </div>
  );
}
