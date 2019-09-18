import React from 'react';
import Square from "./Square";

function haveWinner(square, i, width, height){
    width=Number(width); height=Number(height);
    const dir=[[[-1,-1], [1,1]],[[0,-1],[0,+1]],[[1,-1],[-1,1]],[[-1,0],[1,0]]];
    for(var j=0;j<4;j++){
        var result=countDirection(dir[j],i,square,width, height);
        if(result!==false)// have a winner
            return {
                arr: result,
                dir: j
            }
    }
    return false;
}
function countDirection(dir,i,square, width, height){
    var count=0, turn=square[i].value, block=0;
    var mark=[];
    var check=(x,y)=>(x>=0&&x<width) && (y>=0&&y<height);
    var countByTrend=(trend)=>{
        var x = i % width , y = Math.floor(i/width);
        var index=i;
        while(check(x,y) && square[index]!=null &&square[index].value===turn){
            count++;
            mark.push(index);
            x+=dir[trend][0];
            y+=dir[trend][1];
            index=y*width+x;
        }
        if(check(x,y) && square[index]!=null && square[index].value!==turn){
            block++;
        }
    }
    countByTrend(0);//up trend
    countByTrend(1);//down trend
    count--;
    if(count===5 && block===2) return false
    if(count<5) return false;
    return mark;
}
class Board extends React.Component{
    constructor(props){
        super(props)
        this.state={
            square: Array(this.props.m*this.props.n).fill(null),
            turn:true   
        }  
    }
    onClick(i){
        if(!this.state.result && this.state.square[i]===null){
            var square = this.state.square.slice();
            square[i]={ value: this.state.turn?'X':'O', dirMark:-1 }
            var result = haveWinner(square, i, this.props.m, this.props.n);
            if(result!==false){
                result.arr.forEach((j)=>{
                    square[j].dirMark=result.dir;
                });
            }
            this.setState({square: square,
                            turn:!this.state.turn,
                            result: result!==false?true:false
            });
        }
    }
    restart(){
        this.setState({
            square: Array(this.props.m*this.props.n).fill(null),
            turn:true,
            result:false 
        })
    }
    print(){
        var row=[]
        for(var i=0;  i<this.props.n;i++){
            var squares=[]
            for(var j=0;j<this.props.m;j++){
                const index=i*this.props.m+j;
               squares.push(<Square key={j}  value={this.state.square[index]} onClick={() => {this.onClick(index)}}/>)
            }
            row.push(<div key ={i} className="board-row">{squares}</div>)
        }
        return row
    }
    render(){
        return (
            <div >
                <div className="flex-container"> 
                    <div>{this.print()}</div>
                    <div style={{padding: 50}}>
                        <img style={{height:200, width: 200}} src="./index.png" alt="loi"/>
                        <div style={{width: 250}}>{!this.state.result?("TURN "+(this.state.turn?"X":"O")):((this.state.turn?"O":"X")+" WON!!!")}</div>
                        <button className="button" onClick={()=>this.restart()}> RESTART</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Board;