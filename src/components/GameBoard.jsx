import { getSquareType, getSquareColor, getDifficulty, BOARD_SIZE, SNAKES, LADDERS } from '../data/boardData';
import { ArrowDownToLine, TrendingUp, CircleDot } from 'lucide-react';

export default function GameBoard({ players, currentPlayerIndex, onSquareClick }) {
  // Buat grid 10x10
  const createGrid = () => {
    const grid = [];
    // Urutan dari bawah ke atas, zigzag
    for (let row = 9; row >= 0; row--) {
      const rowSquares = [];
      for (let col = 0; col < 10; col++) {
        // Hitung nomor kotak dengan pola zigzag
        let squareNumber;
        if (row % 2 === 0) {
          // Baris genap: kiri ke kanan
          squareNumber = row * 10 + col + 1;
        } else {
          // Baris ganjil: kanan ke kiri
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

  // Dapatkan pemain di kotak tertentu
  const getPlayersAtSquare = (squareNumber) => {
    return players.filter((player) => player.position === squareNumber);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-2xl">
      <div className="grid grid-cols-10 gap-1 w-full max-w-2xl mx-auto">
        {grid.map((row, rowIndex) => (
          row.map((squareNumber) => {
            const type = squareType(squareNumber);
            const diff = difficulty(squareNumber);
            const color = squareColor(squareNumber);
            const playersAtSquare = getPlayersAtSquare(squareNumber);

            return (
              <div
                key={squareNumber}
                onClick={() => onSquareClick(squareNumber)}
                className={`
                  ${color}
                  relative aspect-square rounded-md 
                  flex items-center justify-center
                  cursor-pointer transition-all duration-200
                  border-2 border-gray-300
                  hover:scale-105 hover:shadow-lg
                  font-bold text-xs
                `}
              >
                <span className="absolute top-0.5 left-1 text-gray-700">
                  {squareNumber}
                </span>

                {/* Ikon ular */}
                {type === 'snake' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArrowDownToLine className="w-6 h-6 text-white" />
                  </div>
                )}

                {/* Ikon tangga */}
                {type === 'ladder' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                )}

                {/* Label Truth/Dare */}
                {type === 'truth' && (
                  <div className="absolute bottom-0.5 right-0.5">
                    <span className="text-[8px] text-white font-bold px-1 bg-green-600 rounded">
                      T
                    </span>
                  </div>
                )}
                {type === 'dare' && (
                  <div className="absolute bottom-0.5 right-0.5">
                    <span className="text-[8px] text-white font-bold px-1 bg-red-600 rounded">
                      D
                    </span>
                  </div>
                )}

                {/* Pemain di kotak ini */}
                {playersAtSquare.length > 0 && (
                  <div className="absolute top-1 right-1 flex flex-wrap gap-0.5">
                    {playersAtSquare.map((player) => (
                      <div
                        key={player.id}
                        className={`
                          w-4 h-4 rounded-full ${player.color}
                          border-2 border-white shadow
                          flex items-center justify-center
                          text-[8px] text-white font-bold
                        `}
                        title={player.name}
                      >
                        {player.id}
                      </div>
                    ))}
                  </div>
                )}

                {/* Level difficulty badge */}
                {(type === 'truth' || type === 'dare') && (
                  <div className="absolute bottom-0.5 left-0.5">
                    <span className={`
                      text-[6px] px-1 rounded font-bold
                      ${diff === 'easy' ? 'bg-blue-400 text-white' : ''}
                      ${diff === 'medium' ? 'bg-yellow-400 text-white' : ''}
                      ${diff === 'hard' ? 'bg-red-400 text-white' : ''}
                    `}>
                      {diff === 'easy' ? '😄' : diff === 'medium' ? '😅' : '😳'}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-100 rounded border"></div>
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span>Truth</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span>Dare</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Ular</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-amber-400 rounded"></div>
          <span>Tangga</span>
        </div>
      </div>
    </div>
  );
}
