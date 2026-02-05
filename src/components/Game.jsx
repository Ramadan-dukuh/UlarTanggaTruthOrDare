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
    const newPosition = Math.min(currentPlayer.position + steps, 100);

    setTimeout(() => {
      setGamePlayers((prev) =>
        prev.map((p) =>
          p.id === currentPlayer.id ? { ...p, position: newPosition } : p
        )
      );
      addLog(`${currentPlayer.name} melempar dadu ${steps} dan pindah ke kotak ${newPosition}`);

      if (newPosition === 100) {
        setWinner(currentPlayer);
        setMovingPlayer(null);
        return;
      }

      if (SNAKES[newPosition]) {
        setTimeout(() => {
          const snakeEnd = SNAKES[newPosition];
          setGamePlayers((prev) =>
            prev.map((p) =>
              p.id === currentPlayer.id ? { ...p, position: snakeEnd } : p
            )
          );
          addLog(`${currentPlayer.name} kena ular! Turun ke kotak ${snakeEnd}`);

          setTimeout(() => {
            showTruthDareModal('hard');
            setMovingPlayer(null);
          }, 800);
        }, 800);
      } else if (LADDERS[newPosition]) {
        setTimeout(() => {
          const ladderEnd = LADDERS[newPosition];
          setGamePlayers((prev) =>
            prev.map((p) =>
              p.id === currentPlayer.id ? { ...p, position: ladderEnd } : p
            )
          );
          addLog(`${currentPlayer.name} naik tangga! Ke kotak ${ladderEnd}`);

          setTimeout(() => {
            nextPlayer();
            setMovingPlayer(null);
          }, 800);
        }, 800);
      } else {
        const squareType = getSquareType(newPosition);
        if (squareType === 'truth' || squareType === 'dare') {
          const difficulty = getDifficulty(newPosition);
          setTimeout(() => {
            showTruthDareModal(difficulty, squareType);
            setMovingPlayer(null);
          }, 800);
        } else {
          setTimeout(() => {
            nextPlayer();
            setMovingPlayer(null);
          }, 800);
        }
      }
    }, 500);
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

  // Render dice dots based on value
  const renderDiceDots = (value) => {
    const dots = [];
    const dotSize = "w-2 h-2 md:w-3 md:h-3";
    
    for (let i = 0; i < value; i++) {
      dots.push(
        <div
          key={i}
          className={`${dotSize} bg-retro-cream rounded-full animate-retro-pop`}
          style={{ animationDelay: `${i * 50}ms` }}
        />
      );
    }
    
    return (
      <div className="grid grid-cols-3 gap-1 p-2 md:p-3 place-items-center">
        {dots}
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
    <div className="min-h-screen bg-retro-dark-blue retro-grid p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="retro-card bg-retro-cream p-3 md:p-4 mb-4 animate-retro-fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={onBackToMenu}
                className="retro-btn p-2 bg-retro-red text-retro-white rounded hover:bg-retro-red"
              >
                <Home className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <div>
                <h1 className="retro-font text-sm md:text-lg font-bold text-retro-black retro-text-shadow">
                  ULAR TANGGA ToD
                </h1>
                <p className="retro-font-body text-[10px] md:text-xs text-retro-dark-gray">
                  MODE: <span className="font-bold uppercase">{gameMode}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="retro-btn p-2 bg-retro-teal text-retro-white rounded hover:bg-retro-teal"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 md:w-5 md:h-5" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
              <button
                onClick={handlePlayAgain}
                className="retro-btn p-2 bg-retro-yellow text-retro-black rounded hover:bg-retro-yellow"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Players Info - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {gamePlayers.map((player, index) => (
            <div
              key={player.id}
              className={`
                retro-card bg-retro-cream p-2 md:p-3 transition-all duration-300
                ${index === currentPlayerIndex ? 'border-retro-orange scale-105 animate-retro-shake' : ''}
                animate-retro-slide-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2">
                <div className={`retro-avatar w-8 h-8 md:w-10 md:h-10 bg-retro-black border-2 border-retro-black flex items-center justify-center text-white font-bold ${player.color}`}>
                  {player.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="retro-font-body font-bold text-retro-black text-[10px] md:text-xs truncate">{player.name}</p>
                  <p className="retro-font-body text-[8px] md:text-[10px] text-retro-dark-gray">POS: {player.position}</p>
                </div>
              </div>
              {index === currentPlayerIndex && (
                <div className="mt-2 retro-badge bg-retro-orange text-retro-white text-[8px] md:text-[10px] font-bold text-center animate-retro-blink">
                  TURN!
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
            />
          </div>

          {/* Controls */}
          <div className="space-y-4 order-1 lg:order-2">
            {/* Dice */}
            <div className="retro-card bg-retro-cream p-4 md:p-6 animate-retro-fade-in">
              <h3 className="retro-font text-xs font-bold text-retro-black mb-3 md:mb-4 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-retro-orange animate-retro-pop" />
                ROLL DICE
              </h3>
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <div className={`
                  retro-border w-16 h-16 md:w-24 md:h-24 bg-retro-black flex items-center justify-center transition-all duration-300
                  ${isRolling ? 'animate-retro-coin-spin' : ''}
                `}>
                  {!isRolling && renderDiceDots(diceValue)}
                </div>
                <button
                  onClick={rollDice}
                  disabled={isRolling || movingPlayer}
                  className={`
                    retro-btn w-full py-3 px-6 retro-font text-xs md:text-sm flex items-center justify-center gap-2 rounded
                    ${isRolling || movingPlayer
                      ? 'bg-retro-gray text-retro-white cursor-not-allowed'
                      : 'bg-retro-orange text-retro-white hover:bg-retro-red'
                    }
                  `}
                >
                  {isRolling ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-retro-white border-t-retro-black rounded-full animate-retro-coin-spin" />
                      ROLLING...
                    </span>
                  ) : movingPlayer ? (
                    <span>MOVING...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ROLL!
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Game Log */}
            <div className="retro-card bg-retro-cream p-3 md:p-4 animate-retro-fade-in">
              <h3 className="retro-font text-xs font-bold text-retro-black mb-2 md:mb-3 flex items-center gap-2">
                <span className="animate-retro-blink">▶</span>
                GAME LOG
              </h3>
              <div className="space-y-1.5 md:space-y-2 max-h-32 md:max-h-48 overflow-y-auto">
                {gameLog.length === 0 ? (
                  <p className="retro-font-body text-retro-dark-gray text-[10px] md:text-xs text-center py-4">NO ACTIVITY</p>
                ) : (
                  gameLog.map((log, index) => (
                    <div 
                      key={index} 
                      className="retro-font-body text-[10px] md:text-xs text-retro-black bg-retro-white border-2 border-retro-black p-2 animate-retro-slide-up"
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
