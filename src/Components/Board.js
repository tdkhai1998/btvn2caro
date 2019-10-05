import React from 'react';
import Square from './Square';

const Board = props => {
  const { onClick, squares, turn, winnerLine } = props;
  const row = [];
  for (let i = 0; i < 20; i += 1) {
    const square = [];
    for (let j = 0; j < 20; j += 1) {
      const index = i * 20 + j;
      square.push(
        <Square
          key={j}
          value={squares[index]}
          dir={winnerLine.dir}
          ok={winnerLine.arr.includes(index)}
          onClick={() => {
            onClick(index, turn);
          }}
        />
      );
    }
    row.push(
      <div key={i} className="board-row">
        {square}
      </div>
    );
  }
  return <div>{row}</div>;
};
export default Board;
