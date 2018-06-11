import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

/* We've removed the constructor, and React supports a simpler syntax called
functional components */
function Square(props) {
  return ( // change to display the val. fr. the curr. state & to toggle it on click
    <button className="square" onClick={props.onClick}> {/* 1. onClick tells React to setup a click event listener */}
    {props.value}
    { /*whenever this.setState is called, an update to
      the component is scheduled causing React to merge in the passed state
      update and re-render the component along w/ its decendants,
      this.state.value will be 'X', so you'll see an 'X' in the grid. */ }
    </button>
  );
}

/*
change Board so that it takes `squares` via props and has its own
`onClick` prop specified by Game, like the transformation we made sure Square
earlier. You can pass location of each square into the click handler so that
we still know which square was clicked.
*/
class Board extends React.Component {
  // Pass down a function from Board -> Square that gets called when
  // the square is clicked
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      /> // 3. Board passed onClick to Square so when called, it runs this.handleClick(i) on the Board
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }


  handleClick(i) { // push a new entry onto the stack by concatenating the new history
    // entry to make a new history array
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //call .slice() to copy the sq arrays instead of mutating the existing array
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  /*
  Should look at the most recent history entry and can take over calculating the game status
  */
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// ======== Declaring a winner =============
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
