import React from 'react';
import Square from "./Square";

function haveWinner(square, i, width, height){
    var lenght=width*height;
    const dir=[[-width-1, +width+1],[-width,+width],[-width+1,+width-1],[-1,1]]
    for(var j=0;j<4;j++){
        var result=countDirection(dir[j],i,square,lenght);
        if(result!==false)
            return {
                arr:result,
                dir: j
            }
    }
    return false;
}
function countDirection(dir,i,square,lenght){
    var count=0;
    var turn=square[i].value;
    var temp=i;
    var block=0;
    var mark=[];
    while(i<lenght && i>=0 && square[i]!==null && square[i].value===turn){
        count++;
        mark.push(i);
        i=i+dir[0];
    }
    if(i<lenght && i>=0 && square[i]!==null){
        block++;
    }
    i=temp+dir[1];
    while(i<lenght && i>=0 && square[i]!==null&& square[i].value===turn){
        count++;
        mark.push(i);
        i=i+dir[1];
    }
    if(i<lenght && i>=0 && square[i]!==null){
        block++;
    }
    if(block===2) return false
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
        if(!this.state.result){
            const square = this.state.square.slice();
            if(square[i]===null){
                var data={
                    value: this.state.turn?'X':'O',
                    dirMark:-1
                }
                square[i]=data;
                var result = haveWinner(square, i, this.props.m, this.props.n);
                if(result!==false){
                    result.arr.forEach((j)=>{
                        square[Number(j)].dirMark=result.dir;
                    });
                }
                this.setState({square: square,
                                turn:!this.state.turn,
                                result: result!==false?true:false
                });
            }
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