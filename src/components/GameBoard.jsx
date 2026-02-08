import { getSquareType, getSquareColor, getDifficulty, BOARD_SIZE, SNAKES, LADDERS } from '../data/boardData';
import { ArrowDownToLine, TrendingUp } from 'lucide-react';

export default function GameBoard({ players, currentPlayerIndex, onSquareClick, onTruthDareSquare, movingPlayer }) {
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

  // Get position of a square for drawing lines - matches grid creation exactly
  const getSquarePosition = (squareNumber) => {
    const row = Math.floor((squareNumber - 1) / 10);
    const colInRow = (squareNumber - 1) % 10;

    // Grid row (inverted)
    const gridRow = 9 - row;

    // Grid column based on zigzag
    let gridCol;
    if (gridRow % 2 === 0) {
      gridCol = colInRow;
    } else {
      gridCol = 9 - colInRow;
    }

    return { row: gridRow, col: gridCol };
  };

  const grid = createGrid();
  const squareType = (num) => getSquareType(num);
  const difficulty = (num) => getDifficulty(num);
  const squareColor = (num) => getSquareColor(squareType(num), difficulty(num));

  const getPlayersAtSquare = (squareNumber) => {
    return players.filter((player) => player.position === squareNumber);
  };

  return (
    <div className="modern-card p-3 md:p-4 rounded-2xl animate-retro-fade-in relative">
      <div className="grid grid-cols-10 gap-1 md:gap-1.5 w-full aspect-square max-w-2xl mx-auto relative z-20">
        {grid.map((row, rowIndex) => (
          row.map((squareNumber, colIndex) => {
            const type = squareType(squareNumber);
            const diff = difficulty(squareNumber);
            const color = squareColor(squareNumber);
            const playersAtSquare = getPlayersAtSquare(squareNumber);
            const isCurrentPlayerPosition = players.some(
              (p, idx) => p.position === squareNumber && idx === currentPlayerIndex
            );

            const isSnakeStart = Object.keys(SNAKES).includes(squareNumber.toString());
            const isLadderStart = Object.keys(LADDERS).includes(squareNumber.toString());
            const isSnakeEnd = Object.values(SNAKES).includes(squareNumber);
            const isLadderEnd = Object.values(LADDERS).includes(squareNumber);

            return (
              <div
                key={squareNumber}
                onClick={() => {
                  onSquareClick(squareNumber);
                  if (type === 'truth' || type === 'dare') {
                    onTruthDareSquare(squareNumber, type, diff);
                  }
                }}
                title={
                  isSnakeStart
                    ? `🐍 Snake! Go down to square ${SNAKES[squareNumber]}`
                    : isLadderStart
                    ? `🪜 Ladder! Climb up to square ${LADDERS[squareNumber]}`
                    : isSnakeEnd
                    ? `↓ Snake ends here from square ${Object.keys(SNAKES).find(key => SNAKES[key] === squareNumber)}`
                    : isLadderEnd
                    ? `↑ Ladder ends here from square ${Object.keys(LADDERS).find(key => LADDERS[key] === squareNumber)}`
                    : `Square ${squareNumber}`
                }
                className={`
                  ${color}
                  relative rounded-lg
                  flex items-center justify-center
                  cursor-pointer transition-all duration-200
                  border-2
                  ${isSnakeStart ? 'border-violet-500 border-3' : ''}
                  ${isLadderStart ? 'border-amber-500 border-3' : ''}
                  ${isSnakeEnd ? 'border-violet-400 border-2' : ''}
                  ${isLadderEnd ? 'border-amber-400 border-2' : ''}
                  ${!isSnakeStart && !isLadderStart && !isSnakeEnd && !isLadderEnd ? 'border-gray-300' : ''}
                  hover:scale-110 hover:z-30 hover:shadow-xl
                  modern-font-body text-[10px] md:text-xs
                  ${isCurrentPlayerPosition ? 'ring-4 ring-yellow-400 ring-offset-2 z-10 shadow-2xl scale-105' : ''}
                  ${(type === 'truth' || type === 'dare') ? 'shadow-md' : ''}
                  ${playersAtSquare.length > 0 ? 'shadow-lg' : ''}
                  animate-retro-slide-up
                `}
                style={{ animationDelay: `${(rowIndex * 10 + colIndex) * 10}ms` }}
              >
                <span className="absolute top-1 left-1 text-gray-800 font-bold text-[8px] md:text-[10px] drop-shadow-sm z-10">
                  {squareNumber}
                </span>

                {/* Destination indicator for snakes and ladders */}
                {isSnakeStart && (
                  <div className="absolute top-1 right-1 z-10 animate-pulse">
                    <span className="text-[7px] md:text-[9px] font-bold text-white bg-violet-600 px-1.5 py-0.5 rounded-md border-2 border-violet-400 shadow-lg">
                      ↓{SNAKES[squareNumber]}
                    </span>
                  </div>
                )}

                {isLadderStart && (
                  <div className="absolute top-1 right-1 z-10 animate-pulse">
                    <span className="text-[7px] md:text-[9px] font-bold text-white bg-amber-600 px-1.5 py-0.5 rounded-md border-2 border-amber-400 shadow-lg">
                      ↑{LADDERS[squareNumber]}
                    </span>
                  </div>
                )}

                {type === 'snake' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-70 z-0">
                    <ArrowDownToLine className="w-4 h-4 md:w-6 md:h-6 text-white animate-retro-float" />
                  </div>
                )}

                {type === 'ladder' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-70 z-0">
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white animate-retro-float" />
                  </div>
                )}

                {type === 'truth' && (
                  <div className="absolute bottom-1 right-1 animate-retro-pop">
                    <span className="modern-font-heading text-[6px] md:text-[8px] text-white font-bold px-1.5 py-0.5 bg-gray-800 rounded-md shadow-md">
                      T
                    </span>
                  </div>
                )}
                {type === 'dare' && (
                  <div className="absolute bottom-1 right-1 animate-retro-pop">
                    <span className="modern-font-heading text-[6px] md:text-[8px] text-white font-bold px-1.5 py-0.5 bg-gray-800 rounded-md shadow-md">
                      D
                    </span>
                  </div>
                )}

                {playersAtSquare.length > 0 && (
                  <div className="absolute top-0.5 right-0.5 flex flex-wrap gap-1 animate-retro-bounce-in z-20">
                    {playersAtSquare.map((player) => {
                      const isCurrentMovingPlayer = movingPlayer === player.id;
                      return (
                        <div
                          key={player.id}
                          className={`
                            w-6 h-6 md:w-7 md:h-7 rounded-full ${player.color}
                            border-4 border-white shadow-2xl
                            flex items-center justify-center
                            text-[9px] md:text-[11px] text-white font-black
                            ring-2 ring-offset-2 ring-yellow-400
                            ${isCurrentMovingPlayer ? 'animate-player-hop' : 'animate-player-bounce'}
                            cursor-pointer hover:scale-110 transition-transform
                          `}
                          title={player.name}
                        >
                          {player.id}
                        </div>
                      );
                    })}
                  </div>
                )}

                {(type === 'truth' || type === 'dare') && (
                  <div className="absolute bottom-1 left-1">
                    <span className={`
                      modern-font-heading text-[5px] md:text-[6px] px-1 py-0.5 font-bold rounded-md
                      ${diff === 'easy' ? 'bg-blue-600 text-white' : ''}
                      ${diff === 'medium' ? 'bg-yellow-500 text-black' : ''}
                      ${diff === 'hard' ? 'bg-red-600 text-white' : ''}
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
      <div className="mt-4 md:mt-5 space-y-3">
        {/* Game Elements */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <div className="px-3 py-2 bg-bg-card border border-border-color rounded-xl modern-font-body text-xs flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-50 rounded-md border-2 border-gray-300"></div>
            <span className="text-text-primary font-medium">Normal</span>
          </div>
          <div className="px-3 py-2 bg-bg-card border border-border-color rounded-xl modern-font-body text-xs flex items-center gap-2">
            <div className="w-4 h-4 bg-teal-400 rounded-md border-2 border-gray-300"></div>
            <span className="text-text-primary font-medium">Truth</span>
          </div>
          <div className="px-3 py-2 bg-bg-card border border-border-color rounded-xl modern-font-body text-xs flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded-md border-2 border-gray-300"></div>
            <span className="text-text-primary font-medium">Dare</span>
          </div>
        </div>

        {/* Snake and Ladder Info - with badges */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <div className="px-3 py-2 bg-violet-100 border-2 border-violet-500 rounded-xl modern-font-body text-xs flex flex-col items-center gap-1">
            <span className="text-violet-800 font-bold text-[10px] bg-violet-600 text-white px-2 py-0.5 rounded-md">↓6</span>
            <span className="text-violet-800 font-medium">Snake: Slide Down</span>
            <span className="text-violet-600 text-[9px]">Badge shows destination</span>
          </div>
          <div className="px-3 py-2 bg-amber-100 border-2 border-amber-500 rounded-xl modern-font-body text-xs flex flex-col items-center gap-1">
            <span className="text-amber-800 font-bold text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-md">↑38</span>
            <span className="text-amber-800 font-medium">Ladder: Climb Up</span>
            <span className="text-amber-600 text-[9px]">Badge shows destination</span>
          </div>
        </div>
      </div>
    </div>
  );
}
