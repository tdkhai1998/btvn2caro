import React from 'react';

const SideBar = props => {
  const listTurn = () => {
    console.log(props);
    const { history, onClick, isSorted } = props;
    const arr = !isSorted ? history.arr.slice().reverse() : history.arr.slice();
    const indexHis = history.index;
    return arr.map((item, index) => {
      console.log(item);
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
          {console.log(indexHis, index2)}
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
export default SideBar;
