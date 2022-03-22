import React from 'react';
import Square from './Square'

/**
 * Renders the board element which contains 3X3 elements of Squares.
 * @param {Array} props.squares Squares selected by the players (Array of characters). 
 * @param {Array} props.squareType Square type of a particular square: WinningSquare, selectedSquare, unselectedSquare.
 * @param {Function} props.handleSquareSelection Handler for the Square button when is clicked.
 * @returns Board Element 
 */
function Board(props){
  // Render a Square element which is made of a button.
  const renderSquare = (i) => {
    return (
      <Square
        className='square'
        value={props.squares[i]}
        handleSquareSelection={() => props.handleSquareSelection(i)}
        key={`squareNum${i}`}
        classType={props.squareType[i]}
      />
    );
  };

  // Create a 3X3 array containing a square element in each array element.
  const boardElements = new Array(3);
  let squareNumber = 0;
  for(let row = 0; row < 3; row++){
    const rowElements = new Array(3);
    for(let col = 0; col < 3; col++){
      rowElements[col] = renderSquare(squareNumber++);
    }
    boardElements[row] = (
      <div className='board-row' key={'rowNum'+row}>
        {rowElements}
      </div>
    )
  }

  return(
    <div className='board' key='board'>
      {boardElements}
    </div>
  );
}

export default Board;
