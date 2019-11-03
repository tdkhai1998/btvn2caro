import React from 'react';
import { connect } from 'react-redux';
import { AddOneToBoad, SetMessage } from '../../Redux';
import Square from '../Square/index';
import Popup from '../Popup';

// import { TypeGameMode } from '../../Redux';

const Message = 'Không phải lượt của bạn';
const Board = props => {
  const { onClick, squares, turn, winnerLine, gameMode, socketIO } = props;
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
            if (gameMode.yourTurn === turn && socketIO.socket)
              socketIO.socket.emit('play', index, socketIO.room);
            onClick(index, turn, gameMode);
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
const mapStateToProps = state => ({
  squares: state.squares,
  turn: state.turn,
  winnerLine: state.winnerLine,
  gameMode: state.gameMode,
  socketIO: state.socketIO
});

const mapDispatchToProps = dispatch => ({
  onClick: (index, turn, modeGame) => {
    console.log('My turn is', modeGame.yourTurn, 'and global turn is', turn);
    if (modeGame.yourTurn === turn) {
      return dispatch(AddOneToBoad(index, turn));
    }
    return dispatch(SetMessage(Message, 'CRAZY (-_-)'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
