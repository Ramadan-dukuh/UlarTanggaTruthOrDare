import { useState } from 'react';
import { ArrowRight, Home, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import GameBoard from './GameBoard';
import TruthDareModal from './TruthDareModal';
import WinnerModal from './WinnerModal';
import { SNAKES, LADDERS, getSquareType, getDifficulty } from '../data/boardData';
import { truthDareData } from '../data/gameData';

export default function Game({ players, gameMode, onBackToMenu, onRestart }) {
  const [gamePlayers, setGamePlayers] = useState(players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameLog, setGameLog] = useState([]);
  const [showTruthDare, setShowTruthDare] = useState(false);
  const [currentTruthDare, setCurrentTruthDare] = useState(null);
  const [winner, setWinner] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [movingPlayer, setMovingPlayer] = useState(null);
  const [clickedSquare, setClickedSquare] = useState(null);

  const currentPlayer = gamePlayers[currentPlayerIndex];

  const getRandomTruthDare = (type, difficulty) => {
    const data = truthDareData[gameMode][difficulty][type];
    return data[Math.floor(Math.random() * data.length)];
  };

  const handleSquareClick = (squareNumber) => {
    setClickedSquare(squareNumber);
  };

  const handleTruthDareSquare = (squareNumber, type, difficulty) => {
    // Only show modal if it's the current player's turn
    const playerOnSquare = gamePlayers.find(p => p.position === squareNumber);
    if (playerOnSquare && playerOnSquare.id === currentPlayer.id) {
      const content = getRandomTruthDare(type, difficulty);
      setCurrentTruthDare({ type, content, difficulty });
      setShowTruthDare(true);
    }
  };

  const rollDice = () => {
    if (isRolling || movingPlayer) return;

    setIsRolling(true);
    let rolls = 0;
    const maxRolls = 15;

    const rollInterval = setInterval(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newDiceValue);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        setIsRolling(false);
        movePlayer(newDiceValue);
      }
    }, 80);
  };

  const movePlayer = (steps) => {
    setMovingPlayer(currentPlayer.id);
    const currentPosition = currentPlayer.position;
    const targetPosition = Math.min(currentPosition + steps, 100);

    // Animate movement step by step
    let currentStep = 0;
    const moveInterval = setInterval(() => {
      currentStep++;
      const nextPosition = Math.min(currentPosition + currentStep, targetPosition);

      setGamePlayers((prev) =>
        prev.map((p) =>
          p.id === currentPlayer.id ? { ...p, position: nextPosition } : p
        )
      );

      // Add log for each step (optional, can be removed if too verbose)
      if (currentStep === steps || nextPosition === targetPosition) {
        clearInterval(moveInterval);
        addLog(`${currentPlayer.name} melempar dadu ${steps} dan pindah ke kotak ${targetPosition}`);

        // Check for win
        if (targetPosition === 100) {
          setWinner(currentPlayer);
          setMovingPlayer(null);
          return;
        }

        // Check for snake or ladder
        setTimeout(() => {
          if (SNAKES[targetPosition]) {
            const snakeEnd = SNAKES[targetPosition];
            addLog(`${currentPlayer.name} kena ular! 🐍 Turun ke kotak ${snakeEnd}`);

            setTimeout(() => {
              setGamePlayers((prev) =>
                prev.map((p) =>
                  p.id === currentPlayer.id ? { ...p, position: snakeEnd } : p
                )
              );

              setTimeout(() => {
                showTruthDareModal('hard');
                setMovingPlayer(null);
              }, 1000);
            }, 1000);
          } else if (LADDERS[targetPosition]) {
            const ladderEnd = LADDERS[targetPosition];
            addLog(`${currentPlayer.name} naik tangga! 🪜 Ke kotak ${ladderEnd}`);

            setTimeout(() => {
              setGamePlayers((prev) =>
                prev.map((p) =>
                  p.id === currentPlayer.id ? { ...p, position: ladderEnd } : p
                )
              );

              setTimeout(() => {
                nextPlayer();
                setMovingPlayer(null);
              }, 1000);
            }, 1000);
          } else {
            const squareType = getSquareType(targetPosition);
            if (squareType === 'truth' || squareType === 'dare') {
              const difficulty = getDifficulty(targetPosition);
              setTimeout(() => {
                showTruthDareModal(difficulty, squareType);
                setMovingPlayer(null);
              }, 1000);
            } else {
              setTimeout(() => {
                nextPlayer();
                setMovingPlayer(null);
              }, 1000);
            }
          }
        }, 800);
      }
    }, 400); // Move every 400ms per step (slower for better visibility)
  };

  const showTruthDareModal = (difficulty, forceType = null) => {
    const type = forceType || (Math.random() < 0.5 ? 'truth' : 'dare');
    const content = getRandomTruthDare(type, difficulty);

    setCurrentTruthDare({ type, content, difficulty });
    setShowTruthDare(true);
  };

  const handleAcceptTruthDare = () => {
    addLog(`${currentPlayer.name} melaksanakan ${currentTruthDare.type}!`);
    setShowTruthDare(false);
    nextPlayer();
  };

  const handleRejectTruthDare = () => {
    const newPosition = Math.max(1, currentPlayer.position - 3);
    setGamePlayers((prev) =>
      prev.map((p) =>
        p.id === currentPlayer.id ? { ...p, position: newPosition } : p
      )
    );
    addLog(`${currentPlayer.name} menolak dan mundur 3 kotak ke ${newPosition}`);
    setShowTruthDare(false);
    nextPlayer();
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % gamePlayers.length);
  };

  const addLog = (message) => {
    setGameLog((prev) => [message, ...prev].slice(0, 8));
  };

  // Render 3D dice cube
  const render3DDice = (value) => {
    const getDotsPosition = (val) => {
      const positions = {
        1: ['center'],
        2: ['top-left', 'bottom-right'],
        3: ['top-left', 'center', 'bottom-right'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
      };
      return positions[val] || [];
    };

    const dots = getDotsPosition(value);
    const dotPosition = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'middle-left': 'top-1/2 left-2 -translate-y-1/2',
      'middle-right': 'top-1/2 right-2 -translate-y-1/2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
    };

    return (
      <div className="relative w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-inner border-2 border-amber-400">
        {dots.map((pos, idx) => (
          <div
            key={idx}
            className={`absolute w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-md ${dotPosition[pos]}`}
          />
        ))}
      </div>
    );
  };

  const handlePlayAgain = () => {
    const resetPlayers = players.map((p) => ({ ...p, position: 1 }));
    setGamePlayers(resetPlayers);
    setCurrentPlayerIndex(0);
    setDiceValue(1);
    setGameLog([]);
    setWinner(null);
    setCurrentTruthDare(null);
    setShowTruthDare(false);
    setMovingPlayer(null);
  };

  return (
    <div className="min-h-screen modern-gradient-bg modern-grid p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="modern-card p-4 md:p-5 mb-4 animate-retro-fade-in">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={onBackToMenu}
                className="modern-btn modern-btn-danger p-2.5 rounded-xl"
              >
                <Home className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <h1 className="modern-font-heading text-lg md:text-xl font-bold text-text-primary">
                  ULAR TANGGA ToD
                </h1>
                <p className="modern-font-body text-xs text-text-secondary">
                  MODE: <span className="font-semibold uppercase text-primary">{gameMode}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="modern-btn p-2.5 bg-bg-card border border-border-color rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={handlePlayAgain}
                className="modern-btn modern-btn-secondary p-2.5 rounded-xl"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Players Info - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {gamePlayers.map((player, index) => (
            <div
              key={player.id}
              className={`
                modern-card p-3 transition-all duration-300
                ${index === currentPlayerIndex ? 'border-3 border-primary scale-105 shadow-2xl ring-2 ring-primary ring-offset-2' : ''}
                animate-retro-slide-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${player.color} shadow-2xl ring-2 ring-white ring-offset-2 ${index === currentPlayerIndex ? 'animate-player-bounce' : ''}`}>
                  {player.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="modern-font-body font-semibold text-text-primary text-sm truncate">{player.name}</p>
                  <p className="modern-font-body text-xs text-text-secondary">Pos: {player.position}</p>
                </div>
              </div>
              {index === currentPlayerIndex && (
                <div className="mt-2 modern-btn-primary text-white text-xs font-semibold text-center py-1.5 rounded-lg animate-pulse">
                  YOUR TURN! ⚡
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Game Area */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Game Board */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <GameBoard
              players={gamePlayers}
              currentPlayerIndex={currentPlayerIndex}
              onSquareClick={handleSquareClick}
              onTruthDareSquare={handleTruthDareSquare}
              movingPlayer={movingPlayer}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4 order-1 lg:order-2">
            {/* Dice */}
            <div className="modern-card p-5 md:p-6 animate-retro-fade-in">
              <h3 className="modern-font-heading text-sm font-bold text-text-primary mb-4 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-yellow animate-retro-pop" />
                ROLL DICE
              </h3>
              <div className="flex flex-col items-center gap-4">
                <div className={`
                  relative w-20 h-20 md:w-28 md:h-28
                  ${isRolling ? 'animate-dice-roll-3d' : ''}
                `}>
                  <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 border-3 border-amber-400">
                    {render3DDice(diceValue)}
                  </div>
                </div>
                <button
                  onClick={rollDice}
                  disabled={isRolling || movingPlayer}
                  className={`
                    modern-btn w-full py-4 px-6 modern-font-heading text-sm flex items-center justify-center gap-2 rounded-xl
                    ${isRolling || movingPlayer
                      ? 'bg-bg-card text-text-muted cursor-not-allowed'
                      : 'modern-btn-primary'
                    }
                  `}
                >
                  {isRolling ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ROLLING...
                    </span>
                  ) : movingPlayer ? (
                    <span>MOVING...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ROLL DICE
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Game Log */}
            <div className="modern-card p-4 animate-retro-fade-in">
              <h3 className="modern-font-heading text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="text-accent-green">▶</span>
                GAME LOG
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {gameLog.length === 0 ? (
                  <p className="modern-font-body text-text-muted text-xs text-center py-4">No activity yet</p>
                ) : (
                  gameLog.map((log, index) => (
                    <div 
                      key={index} 
                      className="modern-font-body text-xs text-text-primary bg-bg-dark/50 border border-border-color p-3 rounded-lg animate-retro-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTruthDare && currentTruthDare && (
        <TruthDareModal
          isOpen={showTruthDare}
          onClose={() => setShowTruthDare(false)}
          type={currentTruthDare.type}
          content={currentTruthDare.content}
          difficulty={currentTruthDare.difficulty}
          playerName={currentPlayer.name}
          onAccept={handleAcceptTruthDare}
          onReject={handleRejectTruthDare}
        />
      )}

      {winner && (
        <WinnerModal
          winner={winner}
          onPlayAgain={handlePlayAgain}
          onHome={onBackToMenu}
        />
      )}
    </div>
  );
}
