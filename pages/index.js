import Head from 'next/head';
import React from 'react';

const defaultState = {
  nextMove: 'X',
  numMoves: 0,
  hasWinner: false,
  winner: '',
  a1: null,
  a2: null,
  a3: null,
  b1: null,
  b2: null,
  b3: null,
  c1: null,
  c2: null,
  c3: null
};

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState);
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('state')) {
      this.setState(JSON.parse(window.sessionStorage.getItem('state')));
    }
  }

  updateSessionstorage() {
    window.sessionStorage.setItem('state', JSON.stringify(this.state));
  }

  handleClick(event) {
    let cell = event.target.dataset.cell;

    // Do not set value if there is already a value in the cell or a game winner
    if (this.state[cell] !== null || this.state.hasWinner) {
      return;
    }
    this.setState(
      {
        [cell]: this.state.nextMove,
        nextMove: this.state.nextMove === 'X' ? 'O' : 'X',
        numMoves: (this.state.numMoves += 1)
      },
      () => {
        this.updateSessionstorage();
        this.checkForWinners();
      }
    );
  }

  checkForWinners() {
    if (this.state.numMoves >= 5) {
      const rows = ['a', 'b', 'c'];
      const cols = [1, 2, 3];

      // check for winners horizontally
      rows.forEach(row => {
        if (
          this.state[`${row}1`] != null &&
          this.state[`${row}1`] === this.state[`${row}2`] &&
          this.state[`${row}1`] === this.state[`${row}3`]
        ) {
          this.setWinner(this.state[`${row}1`]);
        }
      });

      // check for winners vertically
      cols.forEach(col => {
        if (
          this.state[`a${col}`] !== null &&
          this.state[`a${col}`] === this.state[`b${col}`] &&
          this.state[`a${col}`] === this.state[`c${col}`]
        ) {
          this.setWinner(this.state[`a${col}`]);
        }
      });

      // check for winners diagonally
      if (
        this.state.a1 !== null &&
        this.state.a1 === this.state.b2 &&
        this.state.a1 === this.state.c3
      ) {
        this.setWinner(this.state.a1);
      }

      if (
        this.state.a3 !== null &&
        this.state.a3 === this.state.b2 &&
        this.state.a3 === this.state.c1
      ) {
        this.setWinner(this.state.a3);
      }
    }
  }

  setWinner(winner) {
    this.setState({ winner });
  }

  resetGame() {
    this.setState(defaultState, () => this.updateSessionstorage());
  }

  render() {
    const border = '5px solid #E7712E';
    return (
      <div className="app-body">
        <Head>
          <title>Tic Tac Toe</title>
          <link href="/static/favicon.ico" rel="icon" type="image/x-icon" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <h1>Let's play a game of Tictactoe!</h1>
        <table
          className="game-board"
          cellSpacing="0"
          onClick={this.handleClick.bind(this)}
        >
          <tbody>
            <tr className="game-board-row game-board-row1">
              <td className="a1 row1 col1" data-cell="a1">
                {this.state.a1}
              </td>
              <td className="a2 row1 col2" data-cell="a2">
                {this.state.a2}
              </td>
              <td className="a3 row1 col3" data-cell="a3">
                {this.state.a3}
              </td>
            </tr>
            <tr className="game-board-row game-board-row2">
              <td className="b1 row2 col1" data-cell="b1">
                {this.state.b1}
              </td>
              <td className="b2 row2 col2" data-cell="b2">
                {this.state.b2}
              </td>
              <td className="b3 row2 col3" data-cell="b3">
                {this.state.b3}
              </td>
            </tr>
            <tr className="game-board-row game-board-row2">
              <td className="c1 row3 col1" data-cell="c1">
                {this.state.c1}
              </td>
              <td className="c2 row3 col2" data-cell="c2">
                {this.state.c2}
              </td>
              <td className="c3 row3 col3" data-cell="c3">
                {this.state.c3}
              </td>
            </tr>
          </tbody>
        </table>
        <button className="reset-game" onClick={this.resetGame.bind(this)}>
          Reset Game
        </button>
        <div className="game-winner">
          {this.state.winner
            ? `${this.state.winner.toUpperCase()} has won!`
            : ''}
        </div>
        <style jsx>{`
          .app-body {
            font-family: 'Source Sans Pro', 'Lucida Grande', sans-serif;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
          }
          td {
            height: 200px;
            width: 200px;
            font-size: 50px;
            text-align: center;
          }
          .row1 {
            border-bottom: ${border};
          }
          .row3 {
            border-top: ${border};
          }
          .col1 {
            border-right: ${border};
          }
          .col3 {
            border-left: ${border};
          }
          .reset-game {
            background-color: #e7712e;
            color: white;
            width: 100%;
            height: 30px;
            font-size: 16px;
            margin-top: 20px;
          }
          .game-winner {
            margin-top: 15px;
          }
        `}</style>
      </div>
    );
  }
}
