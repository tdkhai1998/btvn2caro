import React from 'react';
import Board from './Board';

class Game extends React.Component{
    render(){
        return (
            <Board n="20" m="20"  />
        )
    }
}

export default Game;