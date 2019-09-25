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
    console.log(count);
    if(count===5 && block===2) return false
    if(count<5) return false;
    return mark;
}
export {
    haveWinner
} 