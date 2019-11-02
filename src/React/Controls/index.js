import React from 'react';
import { connect } from 'react-redux';
import {
  ResetBoard,
  SetTurn,
  RemoveWinnerLine,
  ReSetHistory,
  Sort,
  RemoveHistory,
  CutHistory
} from '../../Redux';

const Controls = props => {
  const { isSorted, turn, restart, sorted, history, undo, redo } = props;
  console.log(
    history.index,
    history.arr.length,
    history.index === history.arr.length
  );
  return (
    <div>
      <div>
        <h1>{turn ? 'NEXT TURN :X' : 'NEXT TURN :O'}</h1>
        <button type="button" className="button" onClick={() => restart()}>
          RESTART
        </button>

        <button type="button" className="button" onClick={() => sorted()}>
          {isSorted ? 'SORTED' : 'SORT'}
        </button>
      </div>
      <div>
        <button
          disabled={history.index === 1}
          type="button"
          className="button"
          onClick={() => undo(history.index)}
        >
          UNDO
        </button>
        <button
          disabled={history.index === history.arr.length - 1}
          type="button"
          className="button"
          onClick={() => redo(history.index)}
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
  history: state.history
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
  undo: index => {
    dispatch(RemoveHistory(index, index - (index % 2 === 0 ? 1 : 2)));
  },
  redo: index => {
    dispatch(RemoveHistory(index, index + (index % 2 === 0 ? 1 : 2)));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
