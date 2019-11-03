import React from 'react';
import { connect } from 'react-redux';

import {
  ResetBoard,
  SetTurn,
  RemoveWinnerLine,
  ReSetHistory,
  Sort,
  RemoveHistory,
  TypeGameMode
} from '../../Redux';
import { RequestUndo } from '../../Redux-thunk';
import { type } from 'os';

const Controls = props => {
  const {
    isSorted,
    turn,
    restart,
    sorted,
    history,
    undo,
    redo,
    gameMode
  } = props;
  console.log(
    history.index,
    history.arr.length,
    history.index === history.arr.length
  );
  return (
    <div>
      <div>
        <div style={{ margin: 20 }}>
          <h3>
            {gameMode.yourTurn ? 'Quân của bạn là X' : 'Quân của bạn là O'}
          </h3>
          <h4>
            {turn !== gameMode.yourTurn
              ? 'Lượt của đối phương'
              : 'Lượt của bạn'}
          </h4>
        </div>

        <button type="button" className="button" onClick={() => restart()}>
          RESTART
        </button>

        <button type="button" className="button" onClick={() => sorted()}>
          {isSorted ? 'SORTED' : 'SORT'}
        </button>
      </div>
      <div>
        <button
          hidden={history.index < 2}
          type="button"
          className="button"
          onClick={() => undo(history.index, gameMode)}
        >
          UNDO
        </button>
        <button
          hidden={gameMode.mode === TypeGameMode.modeType.Online}
          disabled={history.index === history.arr.length - 1}
          type="button"
          className="button"
          onClick={() => redo(history.index, gameMode)}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isSorted: state.isSorted,
  turn: state.turn,
  history: state.history,
  gameMode: state.gameMode
});
const restart = dispatch => {
  dispatch(ResetBoard());
  dispatch(SetTurn(false));
  dispatch(RemoveWinnerLine());
  dispatch(ReSetHistory());
};
const mapDispatchToProps = dispatch => ({
  restart: () => restart(dispatch),
  sorted: () => dispatch(Sort()),
  undo: (index, gameMode) => {
    if (gameMode.mode === TypeGameMode.modeType.Offline) {
      dispatch(RemoveHistory(index, index - (index % 2 === 0 ? 1 : 2)));
    } else {
      dispatch(RequestUndo());
    }
  },
  redo: (index, gameMode) => {
    if (gameMode.mode === TypeGameMode.modeType.Offline) {
      dispatch(RemoveHistory(index, index + (index % 2 === 0 ? 1 : 2)));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
