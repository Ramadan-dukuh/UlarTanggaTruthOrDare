// Data papan permainan ular tangga
// 100 kotak, dengan posisi ular dan tangga
export const BOARD_SIZE = 100;

// Posisi awal dan akhir ular (turun)
export const SNAKES = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
};

// Posisi awal dan akhir tangga (naik)
export const LADDERS = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

// Warna kotak berdasarkan tipe
export const SQUARE_TYPES = {
  NORMAL: 'normal',
  TRUTH: 'truth',
  DARE: 'dare',
  SNAKE: 'snake',
  LADDER: 'ladder',
};

// Tentukan tipe kotak berdasarkan nomor kotak
export const getSquareType = (squareNumber) => {
  // Cek apakah ada ular atau tangga di posisi ini
  if (SNAKES[squareNumber]) {
    return SQUARE_TYPES.SNAKE;
  }
  if (LADDERS[squareNumber]) {
    return SQUARE_TYPES.LADDER;
  }

  // Untuk kotak normal, tentukan Truth/Dare berdasarkan nomor kotak
  // Pola: setiap kelipatan 7 = Truth, setiap kelipatan 5 = Dare
  if (squareNumber % 7 === 0 && squareNumber !== 0) {
    return SQUARE_TYPES.TRUTH;
  }
  if (squareNumber % 5 === 0 && squareNumber !== 0) {
    return SQUARE_TYPES.DARE;
  }

  return SQUARE_TYPES.NORMAL;
};

// Level kesulitan berdasarkan rentang kotak
export const getDifficulty = (squareNumber) => {
  if (squareNumber <= 30) return 'easy';
  if (squareNumber <= 60) return 'medium';
  return 'hard';
};

// Warna untuk setiap tipe kotak
export const getSquareColor = (squareType, difficulty) => {
  const colors = {
    normal: 'bg-gray-100 hover:bg-gray-200',
    truth: 'bg-green-400 hover:bg-green-500',
    dare: 'bg-red-400 hover:bg-red-500',
    snake: 'bg-purple-500 hover:bg-purple-600',
    ladder: 'bg-amber-400 hover:bg-amber-500',
  };
  
  // Variasi warna berdasarkan kesulitan
  if (squareType === SQUARE_TYPES.TRUTH) {
    if (difficulty === 'easy') return 'bg-green-300 hover:bg-green-400';
    if (difficulty === 'medium') return 'bg-green-500 hover:bg-green-600';
    return 'bg-green-700 hover:bg-green-800';
  }
  
  if (squareType === SQUARE_TYPES.DARE) {
    if (difficulty === 'easy') return 'bg-red-300 hover:bg-red-400';
    if (difficulty === 'medium') return 'bg-red-500 hover:bg-red-600';
    return 'bg-red-700 hover:bg-red-800';
  }
  
  return colors[squareType] || colors.normal;
};

// Warna pemain
export const PLAYER_COLORS = [
  'bg-blue-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500',
];
