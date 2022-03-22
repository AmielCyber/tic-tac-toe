import React from 'react';

/**
 * Renders a MoveButton component that displays a button that when clicked, it will move the game to a previous state. 
 * @param {GameState} props.step 
 * @param {Number} props.move The move number of the game state passed.
 * @param {Number} props.stepNumber  The move number of the current game state.
 * @returns MoveButton component. 
 */
function MoveButton(props){
  let desc = '';
  let prevMovesDesc = '';
  if(props.move){
    const [row, col] = props.step.squareSelected;
    desc = `Go to move #${props.move}.`;
    prevMovesDesc = `Player ${props.step.xIsNext ? 'X' : 'O'} selected (row:${row+1}, col:${col+1})`;
  }else{
    desc = 'Go to game start';
  }

  if(props.stepNumber === props.move){
    desc = <strong>{desc}</strong>
    prevMovesDesc = <strong>{prevMovesDesc}</strong>
  }

  return(
    <li className='move-button' key={props.move}>
      <button className='history-button' onClick={() => props.handleJump(props.move)}>{desc}</button>
      <small className='moveHistoryDesc'>{prevMovesDesc}</small>
    </li>
  )
}

export default MoveButton;
