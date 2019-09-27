import React from 'react';
import Square from "./Square";

class Board extends React.Component {
    print() {
        var row = []
        let x = this.props.selectedIndex % 20;
        let y = Math.floor(this.props.selectedIndex / 20);
        for (var i = 0; i < this.props.n; i++) {
            var squares = []
            for (var j = 0; j < this.props.m; j++) {
                const index = i * this.props.m + j;
                if (i === y || j === x) {
                    squares.push(<Square key={j} result={this.props.result} status='todam' value={this.props.square[index]} onClick={() => { this.props.onClick(index) }} />)
                }
                else {
                    squares.push(<Square key={j} result={this.props.result} value={this.props.square[index]} onClick={() => { this.props.onClick(index) }} />)
                }
            }
            row.push(<div key={i} className="board-row">{squares}</div>)
        }
        return row
    }
    listTurn() {
        var arr = !this.props.isSorted ? this.props.history.slice().reverse() : this.props.history.slice();
        var indexHis = this.props.indexHistory;
        return arr.map((item, index) => {
            var postion = "( " + (item.index % 20) + " , " + Math.floor((item.index / 20)) + " ) ";
            let index2 = !this.props.isSorted ? arr.length - 1 - index : index;
            if (index2 === indexHis) {
                return <button disabled className="myButton" key={index} onClick={() => this.props.amazing(index2)}>{index2} TURN {(item.turn ? 'X' : 'O') + ' ' + postion}</button>
            }
            return <button className="myButton" key={index} onClick={() => this.props.amazing(index2)}> {index2} TURN {(item.turn ? 'X' : 'O') + ' ' + postion}</button>
        })
    }
    render() {
        return (
            <div >
                <div className="flex-container">
                    <div>{this.print()}</div>
                    <div style={{ paddingTop: 10, width: 500 }}>
                        <div style={{ width: 250 }}>{!this.props.result ? ("TURN " + (this.props.turn ? "X" : "O")) : ((this.props.turn ? "O" : "X") + " WON!!!")}</div>
                        <button className="button" onClick={() => this.props.restart()}> RESTART</button>
                        <button className="button" onClick={() => this.props.sort()}> {this.props.isSorted ? 'SORTED' : 'SORT'}</button>
                        <div style={{ maxHeight: 450, overflow: 'auto', paddingBottom: 20 }}> {this.listTurn()}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Board;