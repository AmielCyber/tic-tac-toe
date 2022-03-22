import React, {useState} from 'react';

import GameStatus from './GameStatus';
import GameHistory from './GameHistory';
import MoveButton from './MoveButton';

/**
 * Render a component that displays the game statuse and a list of buttons containing previous moves. 
 * @param {Array} props.gameHistory A list of previous game states.
 * @param {Number} props.stepNumber  The current move number of the game.
 * @param {Function} props.handlePrevMove Handles an event when the user wishes to go to a previous game state. 
 * @returns A GameInfo component 
 */
function GameInfo(props){
  // Set state for ascending order view of the previous moves.
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Handler when the user clicks the sort moves button.
  const handleSortMoves = () => {
    setAscendingOrder((prevState) => !prevState);
  };

  // Produces a list of move buttons containg previous game states.
  const getPrevMoves = (history) =>{
    const prevMoves = new Array(history.length);
    if(ascendingOrder){
      // List previous moves in ascending order.
      for(let i =0; i < history.length; i++){
        prevMoves[i] = (
          <MoveButton 
            key={i}
            step={history[i]}
            move={i}
            stepNumber={props.stepNumber}
            handleJump={props.handlePrevMove}
          />
        );
      }
    }else{
      // List previous moves in descending order.
      let historyIndex = history.length-1;
      for(let i = 0; i < history.length; i++){
        prevMoves[i] = (
          <MoveButton 
            key={'move'+historyIndex}
            step={history[historyIndex]}
            move={historyIndex}
            stepNumber={props.stepNumber}
            handleJump={props.handlePrevMove}
          />
        );
        historyIndex--;
      }
    }
    return prevMoves;
  }

  const current = props.gameHistory[props.stepNumber];  // Get game's current state.
  return (
    <div className='game-info' key='game-info'>
      <GameStatus
        gameStatus={current.gameStatus}
        xIsNext={current.xIsNext}
      />
      <GameHistory
        ascendingOrder={ascendingOrder}
        prevMovesList={getPrevMoves(props.gameHistory)}
        handleSortMoves={handleSortMoves}
      />
    </div>

  );
}

export default GameInfo;
