import React from 'react';

const Square = props => {
  const { status, value } = props;
  return (
    <button
      type="button"
      className={`square  ${status}`}
      onClick={() => props.onClick()}
    >
      {(() => {
        if (this.props.value === null)
          return <img src="./Anh1.png" alt="dgf" />;
        if (value.value === 'O') {
          if (value.dirMark !== -1) {
            const str1 = `./Anh2.${value.dirMark + 1}.png`;
            return <img src={str1} alt="sfg" />;
          }
          return <img src="./Anh2.png" alt="sfg" />;
        }
        if (value.dirMark !== -1) {
          const str2 = `./Anh3.${value.dirMark + 1}.png`;
          return <img src={str2} alt="sfg" />;
        }
        return <img src="./Anh3.png" alt="sfg" />;
      })()}
    </button>
  );
};
export default Square;
