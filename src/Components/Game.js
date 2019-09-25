import React from 'react';
import Board from './Board';
import { haveWinner } from './BusinessLogic';

const n = 20;
const m = 20;
class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            square: Array(n * m).fill(null),
            turn: true,
            result: false,
            history: [],
            indexHistory: -1,
            selectedIndex: -1
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
        })
    }
    onClick(i) {
        if (!this.state.result && this.state.square[i] === null) {
            var history = this.state.history.slice();
            var square = this.state.square.slice();
            if (this.state.indexHistory < (history.length - 1)) {//ĐÁNH TRONG QUÁ KHỨ THÌ CẮT BỎ 
                history = history.slice(0, this.state.indexHistory + 1);
            }
            square[i] = { value: this.state.turn ? 'X' : 'O', dirMark: -1 }
            var result = haveWinner(square, i, m, n);
            if (result !== false) {
                result.arr.forEach((j) => {
                    square[j].dirMark = result.dir;
                });
            }
            history.push({ index: i, turn: this.state.turn });
            this.setState({
                square: square,
                turn: !this.state.turn,
                history: history,
                indexHistory: history.length - 1,
                result: result !== false ? true : false,
                selectedIndex: i
            });
        }
    }
    amazing(index) {
        var result = false;
        if (index < 0 || this.state.indexHistory === index) return;
        var square = this.state.square.slice();
        square.forEach(i => {
            if (i) i.dirMark = -1;
        })
        var history = this.state.history.slice();
        if (index > this.state.indexHistory) {
            for (let i = index; i > this.state.indexHistory; i--) {
                square[history[i].index] = { value: history[i].turn ? 'X' : 'O', dirMark: -1 }
            }
            result = haveWinner(square, history[index].index, m, n);
            if (result !== false) {
                result.arr.forEach((j) => {
                    square[j].dirMark = result.dir;
                });
            }
        }
        else {
            for (let i = index + 1; i <= this.state.indexHistory; i++) {
                square[history[i].index] = null;
            }
        }

        this.setState({
            indexHistory: index,
            square: square,
            history: history,
            turn: !history[index].turn,
            selectedIndex: history[index].index,
            result: result !== false ? true : false
        })
    }
    sort() {
        this.setState({
            isSorted: !this.state.isSorted
        })
    }
    render() {
        return (
            <Board n={n} m={m} square={this.state.square} turn={this.state.turn}
                result={this.state.result}
                onClick={(i) => this.onClick(i)}
                restart={() => this.restart()}
                history={this.state.history}
                indexHistory={this.state.indexHistory}
                amazing={(index) => this.amazing(index)}
                selectedIndex={this.state.selectedIndex}
                isSorted={this.state.isSorted}
                sort={() => this.sort()}
            />
        )
    }
}
export default Game;