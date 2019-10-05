import React from 'react';
import Square from './Square';
import SideBar from '../container/sideBarContainer';

const Board = props => {
  const { onClick, squares, turn, winnerLine } = props;
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
            onClick(index, turn);
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
  return (
    <div>
      <div className="flex-container">
        <div>{row}</div>
        <div style={{ paddingTop: 10, width: 500 }}>
          <div style={{ maxHeight: 450, overflow: 'auto', paddingBottom: 20 }}>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;

// class Board extends React.Component {
//   // print() {
//   //   const {
//   //     selectedIndex,
//   //     height,
//   //     width,
//   //     result,
//   //     square,
//   //     onClick
//   //   } = this.props;
//   //   const row = [];
//   //   const x = selectedIndex % 20;
//   //   const y = Math.floor(selectedIndex / 20);
//   //   for (let i = 0; i < height; i += 1) {
//   //     const squares = [];
//   //     for (let j = 0; j < width; j += 1) {
//   //       const index = i * width + j;
//   //       if (i === y || j === x) {
//   //         squares.push(
//   //           <Square
//   //             key={j}
//   //             result={result}
//   //             status="todam"
//   //             value={square[index]}
//   //             onClick={() => {
//   //               onClick(index);
//   //             }}
//   //           />
//   //         );
//   //       } else {
//   //         squares.push(
//   //           <Square
//   //             key={j}
//   //             result={result}
//   //             value={square[index]}
//   //             onClick={() => {
//   //               onClick(index);
//   //             }}
//   //           />
//   //         );
//   //       }
//   //     }
//   //     row.push(
//   //       <div key={i} className="board-row">
//   //         {squares}
//   //       </div>
//   //     );
//   //   }
//   //   return row;
//   // }

//   // listTurn() {
//   //   const { isSorted, history, indexHistory, amazing, width } = this.props;
//   //   const arr = !isSorted ? history.slice().reverse() : history.slice();
//   //   const indexHis = indexHistory;
//   //   return arr.map((item, index) => {
//   //     const postion = `( ${item.index % width} , ${Math.floor(
//   //       item.index / width
//   //     )} ) `;
//   //     const index2 = !isSorted ? arr.length - 1 - index : index;
//   //     const id = index;
//   //     if (index2 === indexHis) {
//   //       return (
//   //         <button
//   //           type="button"
//   //           disabled
//   //           className="myButton"
//   //           key={id}
//   //           onClick={() => amazing(index2)}
//   //         >
//   //           {index2} TURN {`${item.turn ? 'X' : 'O'} ${postion}`}
//   //         </button>
//   //       );
//   //     }
//   //     return (
//   //       <button
//   //         type="button"
//   //         className="myButton"
//   //         key={id}
//   //         onClick={() => amazing(index2)}
//   //       >
//   //         {index2} TURN {`${item.turn ? 'X' : 'O'}  ${postion}`}
//   //       </button>
//   //     );
//   //   });
//   // }

//   print() {
//     const { square, onClick } = this.props;
//     console.log(this.props);
//     const row = [];
//     for (let i = 0; i < 20; i += 1) {
//       const squares = [];
//       for (let j = 0; j < 20; j += 1) {
//         const index = i * 20 + j;
//         squares.push(
//           <Square
//             key={j}
//             value={square[index]}
//             onClick={() => {
//               onClick(index);
//             }}
//           />
//         );
//       }
//       row.push(
//         <div key={i} className="board-row">
//           {squares}
//         </div>
//       );
//     }
//     return row;
//   }

//   render() {
//     return (
//       <div>
//         <div className="flex-container">
//           <div>{this.print()}</div>
//           {/* <div style={{ paddingTop: 10, width: 500 }}>
//             <div style={{ width: 250 }}>
//               {!result
//                 ? `TURN ${turn ? 'X' : 'O'}`
//                 : `${turn ? 'O' : 'X'}  WON!!!`}
//             </div>
//             <button type="button" className="button" onClick={() => restart()}>
//               RESTART
//             </button>
//             <button type="button" className="button" onClick={() => sort()}>
//               {isSorted ? 'SORTED' : 'SORT'}
//             </button>
//             <div
//               style={{ maxHeight: 450, overflow: 'auto', paddingBottom: 20 }}
//             >
//               {this.listTurn()}
//             </div>
//           </div>
//         </div> */}
//         </div>
//       </div>
//     );
//   }
//   // render() {
//   //   const { result, turn, restart, sort, isSorted } = this.props;
//   //   return (
//   //     <div>
//   //       <div className="flex-container">
//   //         <div>{this.print()}</div>
//   //         <div style={{ paddingTop: 10, width: 500 }}>
//   //           <div style={{ width: 250 }}>
//   //             {!result
//   //               ? `TURN ${turn ? 'X' : 'O'}`
//   //               : `${turn ? 'O' : 'X'}  WON!!!`}
//   //           </div>
//   //           <button type="button" className="button" onClick={() => restart()}>
//   //             RESTART
//   //           </button>
//   //           <button type="button" className="button" onClick={() => sort()}>
//   //             {isSorted ? 'SORTED' : 'SORT'}
//   //           </button>
//   //           <div
//   //             style={{ maxHeight: 450, overflow: 'auto', paddingBottom: 20 }}
//   //           >
//   //             {this.listTurn()}
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }
// }
