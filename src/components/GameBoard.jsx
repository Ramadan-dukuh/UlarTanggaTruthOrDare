import { getSquareType, getSquareColor, getDifficulty, BOARD_SIZE, SNAKES, LADDERS } from '../data/boardData';
import { ArrowDownToLine, TrendingUp } from 'lucide-react';

export default function GameBoard({ players, currentPlayerIndex, onSquareClick }) {
  // Buat grid 10x10
  const createGrid = () => {
    const grid = [];
    for (let row = 9; row >= 0; row--) {
      const rowSquares = [];
      for (let col = 0; col < 10; col++) {
        let squareNumber;
        if (row % 2 === 0) {
          squareNumber = row * 10 + col + 1;
        } else {
          squareNumber = row * 10 + (9 - col) + 1;
        }
        rowSquares.push(squareNumber);
      }
      grid.push(rowSquares);
    }
    return grid;
  };

  const grid = createGrid();
  const squareType = (num) => getSquareType(num);
  const difficulty = (num) => getDifficulty(num);
  const squareColor = (num) => getSquareColor(squareType(num), difficulty(num));

  const getPlayersAtSquare = (squareNumber) => {
    return players.filter((player) => player.position === squareNumber);
  };

  return (
    <div className="retro-card bg-retro-white p-2 md:p-4 rounded-lg animate-retro-fade-in retro-crt">
      <div className="grid grid-cols-10 gap-0.5 md:gap-1 w-full aspect-square max-w-2xl mx-auto">
        {grid.map((row, rowIndex) => (
          row.map((squareNumber, colIndex) => {
            const type = squareType(squareNumber);
            const diff = difficulty(squareNumber);
            const color = squareColor(squareNumber);
            const playersAtSquare = getPlayersAtSquare(squareNumber);
            const isCurrentPlayerPosition = players.some(
              (p, idx) => p.position === squareNumber && idx === currentPlayerIndex
            );

            return (
              <div
                key={squareNumber}
                onClick={() => onSquareClick(squareNumber)}
                className={`
                  ${color}
                  relative rounded-sm
                  flex items-center justify-center
                  cursor-pointer transition-all duration-200
                  border-2 border-retro-black
                  hover:scale-110 hover:z-10 hover:shadow-lg
                  retro-font text-[10px] md:text-xs
                  ${isCurrentPlayerPosition ? 'animate-retro-pulse-glow z-10' : ''}
                  animate-retro-slide-up
                `}
                style={{ animationDelay: `${(rowIndex * 10 + colIndex) * 10}ms` }}
              >
                <span className="absolute top-0.5 left-1 text-retro-black font-bold text-[8px] md:text-[10px]">
                  {squareNumber}
                </span>

                {type === 'snake' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-80">
                    <ArrowDownToLine className="w-4 h-4 md:w-6 md:h-6 text-retro-white animate-retro-float" />
                  </div>
                )}

                {type === 'ladder' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-80">
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-retro-white animate-retro-float" />
                  </div>
                )}

                {type === 'truth' && (
                  <div className="absolute bottom-0.5 right-0.5 animate-retro-pop">
                    <span className="retro-font text-[6px] md:text-[8px] text-retro-white font-bold px-1 bg-retro-green retro-border-sm">
                      T
                    </span>
                  </div>
                )}
                {type === 'dare' && (
                  <div className="absolute bottom-0.5 right-0.5 animate-retro-pop">
                    <span className="retro-font text-[6px] md:text-[8px] text-retro-white font-bold px-1 bg-retro-red retro-border-sm">
                      D
                    </span>
                  </div>
                )}

                {playersAtSquare.length > 0 && (
                  <div className="absolute top-1 right-1 flex flex-wrap gap-0.5 animate-retro-bounce-in">
                    {playersAtSquare.map((player) => (
                      <div
                        key={player.id}
                        className={`
                          retro-avatar w-3 h-3 md:w-4 md:h-4 rounded-full ${player.color}
                          border-2 border-retro-black
                          flex items-center justify-center
                          text-[6px] md:text-[8px] text-retro-white font-bold
                        `}
                        title={player.name}
                      >
                        {player.id}
                      </div>
                    ))}
                  </div>
                )}

                {(type === 'truth' || type === 'dare') && (
                  <div className="absolute bottom-0.5 left-0.5">
                    <span className={`
                      retro-font text-[5px] md:text-[6px] px-1 font-bold retro-border-sm
                      ${diff === 'easy' ? 'bg-retro-blue text-retro-white' : ''}
                      ${diff === 'medium' ? 'bg-retro-yellow text-retro-black' : ''}
                      ${diff === 'hard' ? 'bg-retro-red text-retro-white' : ''}
                    `}>
                      {diff === 'easy' ? 'E' : diff === 'medium' ? 'M' : 'H'}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 md:mt-4 flex flex-wrap justify-center gap-2 md:gap-3">
        <div className="retro-badge bg-retro-white text-retro-black retro-font-body text-[10px] md:text-xs flex items-center gap-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-retro-white retro-border-sm rounded"></div>
          <span>NORMAL</span>
        </div>
        <div className="retro-badge bg-retro-green text-retro-white retro-font-body text-[10px] md:text-xs flex items-center gap-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-retro-green retro-border-sm rounded"></div>
          <span>TRUTH</span>
        </div>
        <div className="retro-badge bg-retro-red text-retro-white retro-font-body text-[10px] md:text-xs flex items-center gap-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-retro-red retro-border-sm rounded"></div>
          <span>DARE</span>
        </div>
        <div className="retro-badge bg-retro-purple text-retro-white retro-font-body text-[10px] md:text-xs flex items-center gap-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-retro-purple retro-border-sm rounded"></div>
          <span>SNAKE</span>
        </div>
        <div className="retro-badge bg-retro-orange text-retro-white retro-font-body text-[10px] md:text-xs flex items-center gap-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-retro-orange retro-border-sm rounded"></div>
          <span>LADDER</span>
        </div>
      </div>
    </div>
  );
}
