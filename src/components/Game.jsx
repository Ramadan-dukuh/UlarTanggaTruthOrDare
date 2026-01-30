import { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, ArrowRight, Home, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import GameBoard from './GameBoard';
import TruthDareModal from './TruthDareModal';
import WinnerModal from './WinnerModal';
import { SNAKES, LADDERS, getSquareType, getDifficulty } from '../data/boardData';
import { truthDareData } from '../data/gameData';

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

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

  const currentPlayer = gamePlayers[currentPlayerIndex];

  const getRandomTruthDare = (type, difficulty) => {
    const data = truthDareData[gameMode][difficulty][type];
    return data[Math.floor(Math.random() * data.length)];
  };

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    let rolls = 0;
    const maxRolls = 10;

    const rollInterval = setInterval(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newDiceValue);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        setIsRolling(false);
        movePlayer(newDiceValue);
      }
    }, 100);
  };

  const movePlayer = (steps) => {
    const newPosition = Math.min(currentPlayer.position + steps, 100);

    setGamePlayers((prev) =>
      prev.map((p) =>
        p.id === currentPlayer.id ? { ...p, position: newPosition } : p
      )
    );

    addLog(`${currentPlayer.name} melempar dadu ${steps} dan pindah ke kotak ${newPosition}`);

    // Cek menang
    if (newPosition === 100) {
      setWinner(currentPlayer);
      return;
    }

    // Cek ular atau tangga
    if (SNAKES[newPosition]) {
      setTimeout(() => {
        const snakeEnd = SNAKES[newPosition];
        setGamePlayers((prev) =>
          prev.map((p) =>
            p.id === currentPlayer.id ? { ...p, position: snakeEnd } : p
          )
        );
        addLog(`${currentPlayer.name} kena ular! Turun ke kotak ${snakeEnd}`);

        // Tampilkan Truth/Dare dengan level hard
        setTimeout(() => {
          showTruthDareModal('hard');
        }, 500);
      }, 500);
    } else if (LADDERS[newPosition]) {
      setTimeout(() => {
        const ladderEnd = LADDERS[newPosition];
        setGamePlayers((prev) =>
          prev.map((p) =>
            p.id === currentPlayer.id ? { ...p, position: ladderEnd } : p
          )
        );
        addLog(`${currentPlayer.name} naik tangga! Ke kotak ${ladderEnd}`);

        // Skip Truth/Dare karena naik tangga
        setTimeout(() => {
          nextPlayer();
        }, 500);
      }, 500);
    } else {
      // Cek kotak Truth/Dare
      const squareType = getSquareType(newPosition);
      if (squareType === 'truth' || squareType === 'dare') {
        const difficulty = getDifficulty(newPosition);
        setTimeout(() => {
          showTruthDareModal(difficulty, squareType);
        }, 500);
      } else {
        setTimeout(() => {
          nextPlayer();
        }, 500);
      }
    }
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
    setGameLog((prev) => [message, ...prev].slice(0, 10));
  };

  const DiceIcon = DICE_ICONS[diceValue - 1];

  const handlePlayAgain = () => {
    const resetPlayers = players.map((p) => ({ ...p, position: 1 }));
    setGamePlayers(resetPlayers);
    setCurrentPlayerIndex(0);
    setDiceValue(1);
    setGameLog([]);
    setWinner(null);
    setCurrentTruthDare(null);
    setShowTruthDare(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToMenu}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  🎮 Ular Tangga Truth or Dare
                </h1>
                <p className="text-sm text-gray-600">Mode: {gameMode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={handlePlayAgain}
                className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Players Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {gamePlayers.map((player, index) => (
            <div
              key={player.id}
              className={`
                bg-white rounded-xl p-3 shadow-lg transition-all
                ${index === currentPlayerIndex ? 'ring-4 ring-purple-500 scale-105' : ''}
              `}
            >
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-lg ${player.color} flex items-center justify-center text-white font-bold`}>
                  {player.id}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{player.name}</p>
                  <p className="text-xs text-gray-600">Posisi: {player.position}</p>
                </div>
              </div>
              {index === currentPlayerIndex && (
                <div className="mt-2 bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full text-center">
                  Giliran Ini
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Game Area */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <GameBoard
              players={gamePlayers}
              currentPlayerIndex={currentPlayerIndex}
              onSquareClick={() => {}}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Dice */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-center">Lempar Dadu 🎲</h3>
              <div className="flex flex-col items-center gap-4">
                <div className={`
                  w-24 h-24 rounded-xl flex items-center justify-center transition-all
                  ${isRolling ? 'animate-spin bg-purple-100' : 'bg-gradient-to-br from-purple-500 to-pink-500'}
                `}>
                  {!isRolling && <DiceIcon className="w-16 h-16 text-white" />}
                </div>
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className={`
                    w-full py-3 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2
                    ${isRolling
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  {isRolling ? 'Melempar...' : 'Lempar Dadu'}
                  {!isRolling && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Game Log */}
            <div className="bg-white rounded-xl shadow-xl p-4">
              <h3 className="font-bold text-gray-800 mb-3">Log Permainan</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {gameLog.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">Belum ada aktivitas</p>
                ) : (
                  gameLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
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
