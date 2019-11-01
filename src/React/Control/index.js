import React from 'react';
import { connect } from 'react-redux';
import { ResetBoard } from '../../Redux/Squares/squaresAction';
import { SetTurn } from '../../Redux/Turn/turnAction';
import { RemoveWinnerLine } from '../../Redux/WinnerLine/winnerLineAction';
import { ReSetHistory } from '../../Redux/History/historyAction';
import { Sort } from '../../Redux/IsSorted/isSortedAction';

const Controls = props => {
  const { isSorted, turn, restart, sorted } = props;
  return (
    <div>
      <h1>{turn ? 'NEXT TURN :X' : 'NEXT TURN :O'}</h1>
      <button type="button" className="button" onClick={() => restart()}>
        RESTART
      </button>
      <button type="button" className="button" onClick={() => sorted()}>
        {isSorted ? 'SORTED' : 'SORT'}
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  isSorted: state.isSorted,
  turn: state.turn
});
const restart = dispatch => {
  dispatch(ResetBoard());
  dispatch(SetTurn(false));
  dispatch(RemoveWinnerLine());
  dispatch(ReSetHistory());
};
const mapDispatchToProps = dispatch => ({
  restart: () => restart(dispatch),
  sorted: () => dispatch(Sort())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
