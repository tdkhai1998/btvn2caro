import React from 'react';
import { connect } from 'react-redux';
import { AddOneToBoad, SetMessage } from '../../Redux';
import Square from '../Square/index';
import Popup from '../Popup';

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
        <Popup />
        {square}
      </div>
    );
  }
  return <div>{row}</div>;
};
const mapStateToProps = state => ({
  squares: state.squares,
  turn: state.turn,
  winnerLine: state.winnerLine
});
const mapDispatchToProps = dispatch => ({
  onClick: (index, turn) => {
    if (!turn) return dispatch(AddOneToBoad(index, turn));
    return dispatch(SetMessage('Bạn không thể đánh khi đến lượt của máy. Để đánh, Undo lại lúc đúng lượt của bạn'));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
