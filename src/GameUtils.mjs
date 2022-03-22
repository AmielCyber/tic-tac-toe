export function calculateWinner(squares){
  const LINES = [
    [0, 1, 2],  // Horizontal lines.
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  // Vertical lines.
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // Diagonal lines.
    [2, 4, 6],
  ]; 
  for(let i = 0; i < LINES.length; i++){
    const [a, b, c] = LINES[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return LINES[i];  // Winning squares.
    }
  }
  return null;  // No winners found.
}

export const CurrStatus ={
  PENDING: 0,
  X_WON: 1,
  O_WON: 2,
  TIE: 3,
}

export const SquareType = {
  SELECTED: 'selectedSquare', 
  UNSELECTED: 'square',
  WIN: 'winningSquare',
}
