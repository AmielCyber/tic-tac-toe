import React from 'react';
import {CurrStatus} from '../GameUtils'

/**
 * Renders a component containing the text description of the current game status. 
 * @param {Number} props.gameStatus 
 * @param {Boolean} props.xIsNext 
 * @returns GameStatus component 
 */
function GameStatus(props){
  let statusDesc = '';
  if(props.gameStatus !== CurrStatus.PENDING){
    if(props.gameStatus !== CurrStatus.TIE){
      const winner = props.gameStatus === CurrStatus.X_WON ? 'X' : 'O';
      statusDesc = `Player ${winner} won the game!`;
    }else{
      statusDesc = 'The game is a draw! No more moves available.';
    }
  }else{
    statusDesc = `Next player: ${props.xIsNext ? 'X':'O'}`;
  }

  return (
    <div className='game-status' key='game-status'>
      {statusDesc}
    </div>
  )
}

export default GameStatus;
