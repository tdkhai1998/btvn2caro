import React from 'react';

const Square = props => {
  const { status, dir, ok, value, onClick } = props;
  return (
    <button
      type="button"
      className={`square  ${status}`}
      onClick={() => onClick()}
    >
      {(() => {
        if (value === null) return <img src="./Anh1.png" alt="dgf" />;
        if (value.value === 'O') {
          if (ok === true) {
            const str1 = `./Anh2.${dir + 1}.png`;
            return <img src={str1} alt="sfg" />;
          }
          return <img src="./Anh2.png" alt="sfg" />;
        }
        if (ok === true) {
          const str2 = `./Anh3.${dir + 1}.png`;
          return <img src={str2} alt="sfg" />;
        }
        return <img src="./Anh3.png" alt="sfg" />;
      })()}
    </button>
  );
};
export default Square;
