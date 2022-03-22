import React from 'react';

/**
 * Renders a single Square component that contains a button which will be a square of the board.
 * @param {String} props.value The value of the square: 'X', 'O', or an empty string if the square has not been selected. 
 * @param {String} props.classType The type of square used for our css styling.
 * @param {Function} props.handleSquareSelection Handles the event when a player clicks on the square.
 * @returns Square Component. 
 */
function Square(props){
  // Using inline style, may change this for performance.
  let textColor = {color: 'black'};
  if(props.value){
    if(props.value === 'X'){
      textColor.color = 'blue';
    }else{
      textColor.color = 'red';
    }
  }

  return (
    <button
      className={props.classType}
      onClick={props.handleSquareSelection}
      style={textColor}
    >
    {props.value}
    </button>
  )
}

export default Square;
