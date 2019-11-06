import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Redux';
import {
  RequestUndo,
  LeaveRoom,
  RequestLose,
  RequestTie
} from '../../Redux-thunk';

const Controls = props => {
  const {
    isSorted,
    turn,
    restart,
    sorted,
    history,
    undo,
    redo,
    gameMode,
    leave,
    lose,
    tie,
    winnerLine,
    chat
  } = props;
  const hiddenRestart = () => {
    if (gameMode.mode === actions.TypeGameMode.modeType.Online) {
      if (winnerLine.dir === -1) {
        return true;
      }
      return false;
    }
    return false;
  };
  const undoHidden = () => {
    if (gameMode.mode === actions.TypeGameMode.modeType.Online) {
      if (history.index < 2) return true;
      return false;
    }
    return false;
  };

  return (
    <div>
      <div>
        <div style={{ margin: 20, maxWidth: 350 }}>
          <h3>{chat.name}</h3>
          <h3>
            {gameMode.yourTurn ? 'Quân của bạn là X' : 'Quân của bạn là O'}
          </h3>
          <h4>
            {turn !== gameMode.yourTurn
              ? 'Lượt của đối phương'
              : 'Lượt của bạn'}
          </h4>
        </div>
        <div>
          <button
            hidden={hiddenRestart()}
            type="button"
            className="button"
            onClick={() => restart()}
          >
            RESTART
          </button>
        </div>
        <div>
          <button
            hidden={gameMode.mode !== actions.TypeGameMode.modeType.Online}
            type="button"
            className="button"
            onClick={() => leave()}
          >
            LEAVE
          </button>
          <button type="button" className="button" onClick={() => sorted()}>
            {isSorted ? 'SORTED' : 'SORT'}
          </button>
        </div>
      </div>
      <div>
        <button
          hidden={!hiddenRestart()}
          type="button"
          className="button"
          onClick={() => tie()}
        >
          TIE
        </button>
        <button
          hidden={!hiddenRestart()}
          type="button"
          className="button"
          onClick={() => lose()}
        >
          LOSE
        </button>
      </div>
      <div>
        <button
          hidden={undoHidden()}
          type="button"
          className="button"
          onClick={() => undo(history.index, gameMode)}
        >
          UNDO
        </button>

        <button
          hidden={
            gameMode.mode === actions.TypeGameMode.modeType.Online &&
            history.index === history.arr.length - 1
          }
          disabled={history.index === history.arr.length - 1}
          type="button"
          className="button"
          onClick={() => redo(history.index, gameMode)}
        >
          REDO
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isSorted: state.isSorted,
  turn: state.turn,
  history: state.history,
  gameMode: state.gameMode,
  winnerLine: state.winnerLine,
  chat: state.chat
});
const restarte = dispatch => {
  dispatch(actions.ResetBoard());
  dispatch(actions.SetTurn(false));
  dispatch(actions.RemoveWinnerLine());
  dispatch(actions.ReSetHistory());
};
const restart = dispatch => {
  restarte(dispatch);
  dispatch(actions.SetRequest('BẮT LẠI NHÉ', ';)', 4));
};
const mapDispatchToProps = dispatch => ({
  restart: () => restart(dispatch),
  sorted: () => dispatch(actions.Sort()),
  undo: (index, gameMode) => {
    if (gameMode.mode === actions.TypeGameMode.modeType.Offline) {
      dispatch(actions.RemoveHistory(index, index - (index % 2 === 0 ? 1 : 2)));
    } else {
      dispatch(RequestUndo());
    }
  },
  redo: (index, gameMode) => {
    if (gameMode.mode === actions.TypeGameMode.modeType.Offline) {
      dispatch(actions.RemoveHistory(index, index + (index % 2 === 0 ? 1 : 2)));
    }
  },
  leave: () => dispatch(LeaveRoom()),
  tie: () => dispatch(RequestTie()),
  lose: () => dispatch(RequestLose())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
