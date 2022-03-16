// Import our React library and the css file.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Function component that renders a square on the tic-tac-toe board.
 * Each square is a button with a value inside of it ('X', 'O', null).
 * @param {Object} props, containing the onClick handler for a button and value for the square. 
 * @returns a JSX expression containing a button element.
 */
function Square(props) {
  // Using inline style, may change this for performance.
  let textColor = {color: "black"};
  if(props.value){
    if(props.value === 'X'){
      textColor.color = "blue"
    }else{
      textColor.color = "red";
    }
  }
  return (
    <button 
      className={props.classType}
      onClick={props.onClick}
      style={textColor}
    >
      {props.value}
    </button>
  );
}

/**
 * Function component that renders the game's buttons which resets the game state to a previous move.
 * @param {Object} props, containing:
 *                 prevMoves-> An array of previous move buttons, 
 *                 ascendingOrder-> A boolean value if the list should be ascending order(true) 
 *                 or descending order(false).
 * @returns a JSX expression containing a an ordered list element.
 */
function PreviousMoves(props){
  if(props.ascendingOrder){
    // Ascending order list.
    return <ol>{props.prevMoves}</ol>
  }else{
    // Descending order list.
    return <ol reversed>{props.prevMoves}</ol>
  }
}

class Board extends React.Component {
  /**
   * Board renders nine squares in a 3x3 matrix which will make the board for the tic-tac-toe game.
   */

  /**
   * renderSquare renders a square element which is a button. Gets the value of the button and its handler from
   * the properties of the board.
   * @param {number} i, the ith square number in the board. 
   * @returns A square JSX expression.
   */
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={'squareNum'+ i}
        classType={this.props.classType[i]}
      />
    );
  }

  /**
   * Renders the game's board.
   * @returns a rendered board made of 3x3 buttons.
   */
  render() {
    const boardElements = [];
    let squareNumber = 0;
    for (let row = 0; row < 3; row++) {
      const rowElements = []; // to hold 3 square elements
      for(let col = 0; col < 3; col++){
        rowElements.push(this.renderSquare(squareNumber++));
      }
      // Push the 3 square elements on to the board.
      boardElements.push(<div className="board-row" key={'rowNum'+row}>{rowElements}</div>);
    }

    return (
      <div key="board">
        {boardElements}
      </div>
    );
  }
}

class Game extends React.Component {
  /**
   * 
   * @param {Object} props properties for the Game class React component.
   */
  constructor(props){
    super(props);
    // Constants for the square type class.
    this._SELECT = 'selectedSquare';
    this._UNSELECT = 'square';
    this._WIN = 'winningSquare';
    this.state = {
      // Array of objects
      history: [{
        squares: Array(9).fill(null), // Represents a board of nine squares.
        squareSelected: [-1,-1], // The selected square location mad by the player: [row#, col#].
        playerTurn: 'X',  // The player's turn 'X' or 'O'.
        squareType: Array(9).fill(this._UNSELECT), // Type of square: null-> not selected, 'S'-> selected, 'W'->winning square
        gameStatus: '', // '' -> Game is still at play, 'X' -> winner, 'O' -> winner, 'T'->Tie
      }],
      stepNumber: 0,  // Play turn number.
      xIsNext: true,  // true -> X turn , false -> O turn.
      ascendingOrder: true, // Display move history in ascending order.
      currentGameStatus: '', // Current game status.
    };
    // Bind handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleSortMoves = this.handleSortMoves.bind(this);
  }

  getNextPlayer(){
    return this.state.xIsNext ? 'X' : 'O';
  }

  /**
   * Handles the click of a button/square by the player.
   * Updates the state of the board if the game is not over and is a square that has not been selected.
   * @param {number} i is the square number of the button/square selected by the player.
   */
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // Slice out forward steps from going back in time if we jump back in time.
    const current = history[history.length -1]; // Get the current history which we will update.
    const squares = current.squares.slice();  // Copy the current history which will be our next current state.

    if(current.gameStatus !== '' || squares[i]){
      // If there is already a winner and the selected square has already been selected then do nothing.
      return;
    }
    // Mark the square by the player who made the current move.
    squares[i] = this.getNextPlayer();
    // Get the square selected location.
    const row = Math.floor(i/3);
    const col = i % 3;
    const squareSelected = [row, col];

    const squareType = current.squareType.slice();  // Get a copy of the current squareType array.
    let gameStatus = '';
    const winner = calculateWinner(squares);  // winner->null if no winner, winner->array with 3 elements containing the winning squares.
    if(winner){
      gameStatus = squares[i];  // Game status contains the winning player('X' or 'O').
      for(let val of winner){
        // Mark the winning squares to the winningSquare class so it can be highlighted.
        squareType[val] = this._WIN;
      }
    }else{
      squareType[i] = this._SELECT;
      if(history.length === 9){
        // If there are no more moves available then the game is a tie.
        gameStatus = 'T';
      }
    }


    // Update the state.
    this.setState((currentState) => {
      return ({
        history: history.concat([{
          squares: squares,
          squareSelected: squareSelected,
          playerTurn: squares[i],
          squareType: squareType, 
          gameStatus: gameStatus,
        }]),
        stepNumber: history.length,
        xIsNext: !currentState.xIsNext,
        currentGameStatus: gameStatus,
      });
    });
  }

  /**
   * jumpTo jumps to a previous Game state.
   * @param {number} step number that the Game will go back in to. 
   */
  jumpTo(step){
    this.setState((state) => {
      return({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        currentGameStatus: state.history[step].gameStatus,
      });
    });
  }

  /**
   * 
   * @param {State} step is a State object from a previous state. 
   * @param {Number} move is the move number from the game([0,9])
   * @returns a JSX component containing a List element and a button to go to a previous state.
   */
  getMoveButton(step, move){
    let desc = '';  // Description of move to previous state.
    let prevMoveDesc = '';
    if(move){
      // If the game already started.
      const [row, col] = step.squareSelected;
      desc = `Go to move #${move}.` // Button description
      prevMoveDesc = `Player ${step.playerTurn} selected (row:${row+1}, col:${col+1})`; // Text description of the move that occurred regarding this state.
    }else{
      // Game has not started, thus there are no previous moves.
      desc = 'Go to game start';
    }

    if(this.state.stepNumber === move){
      // Bold current play or selected item
      desc = <strong>{desc}</strong>
    }
    // Render a previous move button in a list.
    return (
      <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <small>{prevMoveDesc}</small>
      </li>
    );

  }

  /**
   * 
   * @param {State Array} history array containing all previous states of the game. 
   * @returns an Array of JSX components containg a list and an element within each element in the arrray.
   */
  getPrevMoves(history){
    const prevMoves = new Array(history.length);
    if(this.state.ascendingOrder){
      // List previous moves in ascending order.
      for(let i = 0; i < history.length; i++){
        prevMoves[i] = this.getMoveButton(history[i], i)
      }
    }else{
      // List previous moves in descending order.
      let historyIndex = history.length-1;
      for(let i = 0; i < history.length; i++){
        prevMoves[i] = this.getMoveButton(history[historyIndex], historyIndex)
        historyIndex--;
      }
    }
    return prevMoves;
  }

  /**
   * 
   * @param {String} winner character of the player who won. Values: 'X', 'O', or '' if no player has won.
   * @returns 
   */
  getGameStatus(){
    const gameStatus = this.state.currentGameStatus;
    if(gameStatus !== ''){
      if(gameStatus !== 'T'){
        return `Player ${gameStatus} won the game!`
      }else{
        return 'No more moves available. The game is a draw!';
      }
    }else{
      // Game is still at play.
      return 'Next player: ' + this.getNextPlayer();
    }
  }

  /**
   * Handle button when the sort button for moves is clicked.
   * Displays the moves in ascending order or descending order based on the negation of the current state property of ascendingOrder.
   */
  handleSortMoves(){
    this.setState((state) => {
      return({
        ascendingOrder: !state.ascendingOrder,
      })
    });
  }

  /**
   * Renders the game element the top component.  
   * Also displays the winner.
   * @returns rendered Game element. 
   */
  render() {
    const history = this.state.history; // Get the history array.
    const current = history[this.state.stepNumber]; // Get the current game state.

    // Produce JSX elements
    // Produce a list of buttons of the previous moves done. If clicked then go back to that state. 
    const moves = this.getPrevMoves(history);
    const status = this.getGameStatus();
     

    // Return the JSX Game element.
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={this.handleClick}
            classType={current.squareType}
          />
        </div>
        <div className="game-info">
          <div className="game-status">
            {status}
          </div>
          <div className="sort-button">
            <button onClick={this.handleSortMoves}>Sort History</button>
          </div>
          <div className="move-buttons">
            <PreviousMoves 
              ascendingOrder={this.state.ascendingOrder}
              prevMoves={moves}
            />
          </div>
        </div>
      </div>
    );
  }
}
/**
 * 
 * @param {Array} squares contains an array (length=9) of characters containing either 'X', 'O', or null.
 * @returns an Array containing the winning squares if there is a winner, if there is no winner then it returns null.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],  // Horizontal lines.
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  // Vertical lines.
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // Diagonal lines.
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return lines[i];
    }
  }
  return null;  // No winners found.
}
// Render the game to the DOM.
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
