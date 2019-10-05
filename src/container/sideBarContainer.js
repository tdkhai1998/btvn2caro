import { connect } from 'react-redux';

import SideBar from '../components/SideBar';
import { RemoveHis } from '../actions/allActions';

const mapStateToProps = state => ({
  history: state.history,
  turn: state.turn,
  winnerLine: state.winnerLine,
  isSorted: state.isSorted
});

const mapDispatchToProps = dispatch => ({
  onClick: (from, to) => dispatch(RemoveHis(from, to))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
