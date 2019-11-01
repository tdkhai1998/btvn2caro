import React from 'react';
import { connect } from 'react-redux';
import { RemoveHistory } from '../../Redux';

const SideBar = props => {
  const listTurn = () => {
    const { history, onClick, isSorted } = props;
    const arr = !isSorted ? history.arr.slice().reverse() : history.arr.slice();
    const indexHis = history.index;
    return arr.map((item, index) => {
      const postion = `( ${item.index % 20} , ${Math.floor(
        item.index / 20
      )} ) `;
      const index2 = !isSorted ? arr.length - 1 - index : index;
      const id = index;
      if (index2 === indexHis) {
        return (
          <button
            type="button"
            disabled
            className="myButton"
            key={id}
            onClick={() => onClick(indexHis, index2)}
          >
            {index2} TURN {`${item.turn ? 'X' : 'O'} ${postion}`}
          </button>
        );
      }
      return (
        <button
          type="button"
          className="myButton"
          key={id}
          onClick={() => onClick(indexHis, index2)}
        >
          {index2} TURN {`${item.turn ? 'X' : 'O'}  ${postion}`}
        </button>
      );
    });
  };
  return (
    <div style={{ maxHeight: 450, overflow: 'auto', paddingBottom: 20 }}>
      {listTurn()}
    </div>
  );
};
const mapStateToProps = state => ({
  history: state.history,
  turn: state.turn,
  winnerLine: state.winnerLine,
  isSorted: state.isSorted
});

const mapDispatchToProps = dispatch => ({
  onClick: (from, to) => dispatch(RemoveHistory(from, to))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
