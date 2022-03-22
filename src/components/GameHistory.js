import React from 'react';

/**
 * 
 * Renders a list of previous buttons to the user to go to a previous game state. 
 * @param {Boolean} props.ascendingOrder Variable to display the list in ascending order or descending order. 
 * @param {Array} props.prevMovesList A list of button elements to go to a particalar state in the game.
 * @param {Function} props.handleSortMoves Button handler when a user wants to sort the list in another way.
 * @returns 
 */
function GameHistory(props){
  let prevMovesOrderedList= null;

  if(props.ascendingOrder){
    prevMovesOrderedList = (
      <ol>
        {props.prevMovesList}
      </ol>
    )
  }else{
    prevMovesOrderedList = (
      <ol reversed>
        {props.prevMovesList}
      </ol>
    )
  }
    return(
      <div className='game-history' key='game-history'>
        <button onClick={props.handleSortMoves}>
          Sort moves 
        </button>
        {prevMovesOrderedList}
      </div>
    );
}

export default GameHistory;
