import React, {useState} from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import {calculateWinner, CurrStatus, SquareType} from './GameUtils.mjs'

/**
 * Responsible for rendering the game and the game's history.
 * @returns The Game Componenent
 */
function Game(){
  // React Hooks.
  const [stepNumber, setStepNumber] = useState(0);  // Current move number.
  // History of the game state.
  const [history, updateHistory] = useState(
    [{
      squares: Array(9).fill(''),
      squareType: Array(9).fill(SquareType.UNSELECTED),
      squareSelected: [-1,-1],
      xIsNext: true,
      gameStatus: CurrStatus.PENDING,
    },
    ]
  )

  const handleSquareSelection = (i) => {
    // Create new history copy and slice out the future history entries if we jump back to a prev state.
    const newHistory = history.slice(0, stepNumber+1);
    const current = newHistory[newHistory.length-1];  // Get current state.

    if(current.gameStatus !== CurrStatus.PENDING || current.squares[i]){
      // If there is already a winner and the selected square has already been selected, then do nothing.
      return;
    }

    // Create new properties for our current state.
    const squares = current.squares.slice();
    squares[i] = current.xIsNext ? 'X' : 'O';       // Mark the square by the player who made the current move.
    const squareSelected = [Math.floor(i/3), i%3];  // Get the square selected location.
    const squareType = current.squareType.slice();  // Get a copy of the current squareType array.
    let gameStatus = CurrStatus.PENDING;       // Create a new game status and change if conditions are met below. 

    // Get the winning squares: winner->null if no winner, winner->array containing the 3 winning squares on the board.
    const winningSquares = calculateWinner(squares);

    if(winningSquares){
      gameStatus = squares[i] === 'X' ? CurrStatus.X_WON : CurrStatus.O_WON;
      for(let val of winningSquares){
        // Mark the winning squares to the winningSquare class so it can be highlighted.
        squareType[val] = SquareType.WIN;
      }
    }else{
      squareType[i] = SquareType.SELECTED;
      if(stepNumber === 8){
        // If there are no more moves available then the game is a tie.
        gameStatus = CurrStatus.TIE;
      }
    }

    // Add the new result of our state to the history.
    newHistory.push({
      squares: squares,
      squareType: squareType,
      squareSelected: squareSelected,
      xIsNext: !current.xIsNext,
      gameStatus: gameStatus,
    })

    // Update our states.
    setStepNumber(newHistory.length-1);
    updateHistory(newHistory);
  }

  // Jump to a previous state handler.
  const jumpTo = (stepNum) => {setStepNumber(stepNum)};

  const current = history[stepNumber]; // Get current state.
  return (
    <div className='game'>
      <Board
        squares={current.squares}
        squareType={current.squareType}
        handleSquareSelection={handleSquareSelection}
      />
      <GameInfo
        gameHistory={history}
        stepNumber={stepNumber}
        handlePrevMove={jumpTo}
      /> 
    </div>
  )
}

export default Game;
