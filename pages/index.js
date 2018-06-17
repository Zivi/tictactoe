import Head from 'next/head';
import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextMove: 'x',
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
  }

  handleClick(event) {
    let cell = event.target.dataset.cell;

    // Do not set value if there is already a value in the state
    if (this.state[cell] !== null) {
      return;
    }
    this.setState({
      [cell]: this.state.nextMove,
      nextMove: this.state.nextMove === 'x' ? 'o' : 'x'
    });
  }

  resetGame() {
    this.setState({
      nextMove: 'x',
      a1: null,
      a2: null,
      a3: null,
      b1: null,
      b2: null,
      b3: null,
      c1: null,
      c2: null,
      c3: null
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Tic Tac Toe</title>
          <link
            href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREiIiIiIhEREiIiIiIiIREiICIiAiIiESIgAiIAIiIRIAAAAAAAIhEgAAAAAAAiESIgACIAIiIRIiIAIgACIhEiAAAAAAACESIAAAAAAAIRIiIAIiACIhEiIiAiIgIiERIiIiIiIiERESIiIiIiEREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
            rel="icon"
            type="image/x-icon"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <h1>Let's play a game of Tictactoe!</h1>
        <table className="game-board" onClick={this.handleClick.bind(this)}>
          <tr className="game-board-row game-board-row1">
            <td className="a1 row1 col1" data-cell="a1">
              {this.state.a1 && this.state.a1.toUpperCase()}
            </td>
            <td className="a2 row1 col2" data-cell="a2">
              {this.state.a2 && this.state.a2.toUpperCase()}
            </td>
            <td className="a3 row1 col3" data-cell="a3">
              {this.state.a3 && this.state.a3.toUpperCase()}
            </td>
          </tr>
          <tr className="game-board-row game-board-row2">
            <td className="b1 row2 col1" data-cell="b1">
              {this.state.b1 && this.state.b1.toUpperCase()}
            </td>
            <td className="b2 row2 col2" data-cell="b2">
              {this.state.b2 && this.state.b2.toUpperCase()}
            </td>
            <td className="b3 row2 col3" data-cell="b3">
              {this.state.b3 && this.state.b3.toUpperCase()}
            </td>
          </tr>
          <tr className="game-board-row game-board-row2">
            <td className="c1 row3 col1" data-cell="c1">
              {this.state.c1 && this.state.c1.toUpperCase()}
            </td>
            <td className="c2 row3 col2" data-cell="c2">
              {this.state.c2 && this.state.c2.toUpperCase()}
            </td>
            <td className="c3 row3 col3" data-cell="c3">
              {this.state.c3 && this.state.c3.toUpperCase()}
            </td>
          </tr>
        </table>
        <button className="reset-game" onClick={this.resetGame.bind(this)}>
          Reset
        </button>
        <style jsx>{`
          td {
            height: 20px;
            width: 20px;
          }
          .row1 {
            border-bottom: 1px solid black;
          }
          .row3 {
            border-top: 1px solid black;
          }
          .col1 {
            border-right: 1px solid black;
          }
          .col3 {
            border-left: 1px solid black;
          }
        `}</style>
      </div>
    );
  }
}
