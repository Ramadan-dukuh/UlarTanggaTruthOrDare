import { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';
import Game from './components/Game';

function App() {
  const [gameState, setGameState] = useState('setup'); // 'setup' or 'playing'
  const [players, setPlayers] = useState([]);
  const [gameMode, setGameMode] = useState('party');

  const handleStartGame = (newPlayers, newGameMode) => {
    setPlayers(newPlayers);
    setGameMode(newGameMode);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('setup');
    setPlayers([]);
  };

  const handleRestart = () => {
    const resetPlayers = players.map((p) => ({ ...p, position: 1 }));
    setPlayers(resetPlayers);
  };

  return (
    <>
      {gameState === 'setup' && (
        <PlayerSetup onStartGame={handleStartGame} />
      )}
      {gameState === 'playing' && (
        <Game
          players={players}
          gameMode={gameMode}
          onBackToMenu={handleBackToMenu}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
