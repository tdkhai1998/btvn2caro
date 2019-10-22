import React from 'react';

const Controls = props => {
  const { isSorted, turn, restart, sorted } = props;
  return (
    <div>
      <h1>{turn ? 'NEXT TURN :X' : 'NEXT TURN :O'}</h1>
      <button type="button" className="button" onClick={() => restart()}>
        RESTART
      </button>
      <button type="button" className="button" onClick={() => sorted()}>
        {isSorted ? 'SORTED' : 'SORT'}
      </button>
    </div>
  );
};
export default Controls;
