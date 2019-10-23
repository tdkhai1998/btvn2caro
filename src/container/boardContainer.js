import { connect } from 'react-redux';

import Board from '../Components/Board';
import { addToBoard } from '../actions/allActions';

const mapStateToProps = state => ({
  squares: state.squares,
  turn: state.turn,
  winnerLine: state.winnerLine
});

const mapDispatchToProps = dispatch => ({
  onClick: (index, turn) => dispatch(addToBoard(index, turn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
