import React from 'react';
import Square from './Square';

class Board extends React.Component {
  print() {
    const { selectedIndex, n, m, result, square, onClick } = this.props;
    const row = [];
    const x = selectedIndex % 20;
    const y = Math.floor(selectedIndex / 20);
    for (let i = 0; i < n; i += 1) {
      const squares = [];
      for (let j = 0; j < m; j += 1) {
        const index = i * m + j;
        if (i === y || j === x) {
          squares.push(
            <Square
              key={j}
              result={result}
              status="todam"
              value={square[index]}
              onClick={() => {
                onClick(index);
              }}
            />
          );
        } else {
          squares.push(
            <Square
              key={j}
              result={result}
              value={square[index]}
              onClick={() => {
                onClick(index);
              }}
            />
          );
        }
      }
      row.push(
        <div key={i} className="board-row">
          {squares}
        </div>
      );
    }
    return row;
  }

  listTurn() {
    const { isSorted, history, indexHistory, amazing } = this.props;
    const arr = !isSorted ? history.slice().reverse() : history.slice();
    const indexHis = indexHistory;
    return arr.map((item, index) => {
      const postion = `( ${item.index % 20} , ${Math.floor(
        item.index / 20
      )} ) `;
      const index2 = !isSorted ? arr.length - 1 - index : index;
      const id = index;
      if (index2 === indexHis) {
        return (
          <button
            type="button"
            disabled
            className="myButton"
            key={id}
            onClick={() => amazing(index2)}
          >
            {index2} TURN {`${item.turn ? 'X' : 'O'} postion`}
          </button>
        );
      }
      return (
        <button
          type="button"
          className="myButton"
          key={id}
          onClick={() => amazing(index2)}
        >
          {' '}
          {index2} TURN {`${item.turn ? 'X' : 'O'}  ${postion}`}
        </button>
      );
    });
  }

  render() {
    const { result, turn, restart, sort, isSorted } = this.props;
    return (
      <div>
        <div className="flex-container">
          <div>{this.print()}</div>
          <div style={{ paddingTop: 10, width: 500 }}>
            <div style={{ width: 250 }}>
              {!result
                ? `TURN ${turn ? 'X' : 'O'}`
                : `${turn ? 'O' : 'X'}  WON!!!`}
            </div>
            <button type="button" className="button" onClick={() => restart()}>
              RESTART
            </button>
            <button type="button" className="button" onClick={() => sort()}>
              {isSorted ? 'SORTED' : 'SORT'}
            </button>
            <div
              style={{ maxHeight: 450, overflow: 'auto', paddingBottom: 20 }}
            >
              {this.listTurn()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Board;
