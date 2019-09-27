import React from 'react';
import Board from './Board';
import haveWinner from './BusinessLogic';

const n = 20;
const m = 20;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      square: Array(n * m).fill(null),
      turn: true,
      result: false,
      history: [],
      indexHistory: -1,
      selectedIndex: -1
    };
  }

  onClick(i) {
    const { square, turn, indexHistory } = this.state;
    let { history, result } = this.state;
    if (!result && square[i] === null) {
      if (indexHistory < history.length - 1) {
        // ĐÁNH TRONG QUÁ KHỨ THÌ CẮT BỎ
        history = history.slice(0, indexHistory + 1);
      }
      square[i] = { value: turn ? 'X' : 'O', dirMark: -1 };
      result = haveWinner(square, i, m, n);
      if (result !== false) {
        result.arr.forEach(j => {
          square[j].dirMark = result.dir;
        });
      }
      history.push({ index: i, turn });
      this.setState({
        square,
        turn: !turn,
        history,
        indexHistory: history.length - 1,
        result: result !== false,
        selectedIndex: i
      });
    }
  }

  restart() {
    this.setState({
      square: Array(n * m).fill(null),
      turn: true,
      result: false,
      history: [],
      indexHistory: -1,
      isSorted: false
    });
  }

  amazing(index) {
    const { indexHistory, square, history } = this.state;
    let result = false;
    if (index < 0 || indexHistory === index) return;
    for (let i = 0; i < square.length; i += 1) {
      if (square[i] !== null) {
        square[i].dirMark = -1;
      }
    }
    if (index > indexHistory) {
      for (let i = index; i > indexHistory; i -= 1) {
        square[history[i].index] = {
          value: history[i].turn ? 'X' : 'O',
          dirMark: -1
        };
      }
      result = haveWinner(square, history[index].index, m, n);
      if (result !== false) {
        result.arr.forEach(j => {
          square[j].dirMark = result.dir;
        });
      }
    } else {
      for (let i = index + 1; i <= indexHistory; i += 1) {
        square[history[i].index] = null;
      }
    }
    this.setState({
      indexHistory: index,
      square,
      history,
      turn: !history[index].turn,
      selectedIndex: history[index].index,
      result: result !== false
    });
  }

  sort() {
    const { isSorted } = this.state;
    this.setState({
      isSorted: !isSorted
    });
  }

  render() {
    const {
      square,
      turn,
      result,
      history,
      indexHistory,
      selectedIndex,
      isSorted
    } = this.state;
    return (
      <Board
        n={n}
        m={m}
        square={square}
        turn={turn}
        result={result}
        onClick={i => this.onClick(i)}
        restart={() => this.restart()}
        history={history}
        indexHistory={indexHistory}
        amazing={index => this.amazing(index)}
        selectedIndex={selectedIndex}
        isSorted={isSorted}
        sort={() => this.sort()}
      />
    );
  }
}
export default Game;
