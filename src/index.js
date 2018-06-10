import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
  constructor(props) {
    super(props) //need to explicitly call super(); when defining the constructor of a subcls when defining the constructor of a subcls
    this.state = {
      value: null,
    };
  }
  render() {
    return ( // change to display the val. fr. the curr. state & to toggle it on click
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
        { /*whenever this.setState is called, an update to
          the component is scheduled causing React to merge in the passed state
          update and re-render the component along w/ its decendants,
          this.state.value will be 'X', so you'll see an 'X' in the grid. */ }
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  // Pass down a function from Board -> Square that gets called when
  // the square is clicked
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
     />
   );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
