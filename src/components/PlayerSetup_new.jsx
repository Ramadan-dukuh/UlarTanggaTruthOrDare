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
    <div className="min-h-screen modern-gradient-bg modern-grid flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent-yellow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="modern-card p-4 sm:p-6 md:p-8 max-w-lg w-full animate-retro-fade-in relative z-10 border border-border-color/50">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-block mb-3 sm:mb-4 relative">
            {/* Glowing effect behind icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl sm:shadow-2xl animate-retro-float">
              <Gamepad2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-yellow rounded-full flex items-center justify-center text-lg shadow-lg animate-bounce">
              ⭐
            </div>
          </div>
          <h1 className="modern-font-heading text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-text-primary relative">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ULAR TANGGA
            </span>
          </h1>
          <p className="modern-font-body text-sm sm:text-base md:text-lg font-semibold text-primary mb-1">
            Truth or Dare Edition
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-text-muted">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-bg-dark/50 rounded-full border border-primary/30">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
              Ready to Play
            </span>
            <span>🎮</span>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-4 sm:mb-6">
          <h2 className="modern-font-heading text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-text-primary flex items-center gap-1.5 sm:gap-2">
            <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-accent-yellow to-accent-orange rounded-lg text-white text-sm">✨</span>
            SELECT GAME MODE
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {GAME_MODES.map((mode, index) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`
                    relative group p-2 sm:p-3 rounded-lg sm:rounded-xl 
                    flex flex-col items-center gap-1 sm:gap-2 
                    transition-all duration-300 overflow-hidden
                    ${isSelected
                      ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl scale-105 ring-2 ring-primary ring-offset-2'
                      : 'bg-bg-card text-text-primary hover:bg-bg-card hover:scale-102 border border-border-color/50 hover:border-primary/50'
                    }
                    animate-retro-slide-up
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background gradient on hover */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`
                    relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center
                    transition-all duration-300
                    ${isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-bg-dark/50 group-hover:bg-primary/20'
                    }
                  `}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  {/* Mode name */}
                  <span className="modern-font-heading text-[10px] sm:text-xs font-bold relative z-10">
                    {mode.name}
                  </span>
                  
                  {/* Description */}
                  <span className={`modern-font-body text-[8px] sm:text-[10px] opacity-80 relative z-10 ${isSelected ? 'text-white/90' : ''}`}>
                    {mode.description}
                  </span>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-accent-yellow rounded-full flex items-center justify-center text-[8px] font-bold animate-pulse">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Setup */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="modern-font-heading text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5 sm:gap-2">
              <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-accent-green to-teal-500 rounded-lg text-white text-sm">👥</span>
              ADD PLAYERS
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-primary to-primary-light text-white rounded-full modern-font-body text-[10px] sm:text-xs font-bold shadow-lg">
                {players.length}/8
              </span>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3 max-h-36 sm:max-h-48 overflow-y-auto pr-1">
            {players.map((player, index) => (
              <div 
                key={player.id} 
                className="group relative flex items-center gap-1.5 sm:gap-2 animate-retro-slide-up bg-bg-card/50 rounded-lg sm:rounded-xl p-2 border border-border-color/50 hover:border-primary/50 transition-all hover:bg-bg-card/80"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Player Avatar */}
                <div className="relative">
                  <div
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl 
                      flex items-center justify-center 
                      text-white font-bold text-base sm:text-lg 
                      transition-all duration-300
                      shadow-lg sm:shadow-xl
                      ${player.color}
                      group-hover:scale-110 group-hover:shadow-2xl
                      ring-2 ring-white ring-offset-2 ring-offset-bg-card
                    `}
                  >
                    {player.id}
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-lg sm:rounded-xl ${player.color} blur-md opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                </div>

                {/* Input */}
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-border-color bg-bg-dark text-text-primary modern-font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all placeholder:text-text-muted/50"
                  placeholder={`Player ${player.id}`}
                />

                {/* Delete Button */}
                {players.length > 2 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="modern-btn p-1.5 sm:p-2.5 bg-bg-card border border-border-color rounded-lg sm:rounded-xl hover:bg-accent-red hover:text-white hover:border-accent-red hover:shadow-lg transition-all group-hover:scale-110"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Player Button */}
          {players.length < 8 && (
            <button
              onClick={addPlayer}
              className="modern-btn w-full py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-dashed border-primary/50 text-primary rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 modern-font-heading text-[10px] sm:text-xs hover:border-primary hover:bg-primary hover:text-white transition-all hover:shadow-lg group"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-90 transition-transform duration-300" />
              ADD PLAYER
            </button>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={isAnimating}
          className={`
            relative w-full py-3 sm:py-4 px-4 sm:px-6 
            bg-gradient-to-r from-accent-green to-emerald-600 
            text-white rounded-lg sm:rounded-xl 
            font-bold modern-font-heading text-sm sm:text-base 
            shadow-xl hover:shadow-2xl
            transition-all duration-300
            hover:scale-105 active:scale-95
            overflow-hidden group
            ${isAnimating ? 'animate-pulse opacity-80' : ''}
          `}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          <span className="relative flex items-center justify-center gap-2">
            {isAnimating ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                LOADING...
              </>
            ) : (
              <>
                <span className="text-lg">🎮</span>
                START GAME
                <span className="animate-pulse">▶</span>
              </>
            )}
          </span>
        </button>

        {/* Info Pills - Compact Horizontal */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-lg flex-shrink-0">
            <span className="text-lg">🐍</span>
            <span className="modern-font-body text-[9px] sm:text-[10px] font-semibold text-violet-400">Slide Down</span>
          </div>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg flex-shrink-0">
            <span className="text-lg">🪜</span>
            <span className="modern-font-body text-[9px] sm:text-[10px] font-semibold text-amber-400">Climb Up</span>
          </div>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex-shrink-0">
            <span className="text-lg">🏆</span>
            <span className="modern-font-body text-[9px] sm:text-[10px] font-semibold text-emerald-400">Reach 100</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 border border-primary/30 rounded-lg flex-shrink-0">
            <span className="text-lg">✨</span>
            <span className="modern-font-body text-[9px] sm:text-[10px] font-semibold text-primary">Truth/Dare</span>
          </div>
        </div>

        {/* Footer - Minimal */}
        <div className="mt-3 sm:mt-4 text-center">
          <p className="modern-font-body text-[9px] sm:text-xs text-text-muted">
            🎮 May the best player win! 🎲
          </p>
        </div>
      </div>
    </div>
  );
}
