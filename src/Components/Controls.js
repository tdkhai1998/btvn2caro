import React from 'react';

const Controls = props => {
  const { isSorted, turn, restart, sorted } = props;
  return (
    <div>
      <p>{turn ? 'NEXT TURN :X' : 'NEXT TURN :O'}</p>
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
