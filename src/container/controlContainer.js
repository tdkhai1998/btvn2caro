import { connect } from 'react-redux';
import Controls from '../Components/Controls';
import {
  reStart,
  setTurn,
  sort,
  ReSetHis,
  RemoveWinner
} from '../actions/allActions';

const mapStateToProps = state => ({
  isSorted: state.isSorted,
  turn: state.turn
});
const restart = dispatch => {
  dispatch(reStart());
  dispatch(setTurn(false));
  dispatch(RemoveWinner());
  dispatch(ReSetHis());
};
const mapDispatchToProps = dispatch => ({
  restart: () => restart(dispatch),
  sorted: () => dispatch(sort())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
