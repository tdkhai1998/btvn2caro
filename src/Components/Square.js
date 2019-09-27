import React from 'react';

class Square extends React.Component {
  render() {
    return (
      <button
        className={"square " + this.props.status}
        onClick={() => this.props.onClick()}
      >
        {(() => {
          if (this.props.value === null)
            return <img src="./Anh1.png" alt="dgf"></img>
          else if (this.props.value.value === 'O') {
            if (this.props.value.dirMark !== -1) {
              var str1 = "./Anh2." + (this.props.value.dirMark + 1) + ".png";
              return <img src={str1} alt="sfg"></img>
            }
            return <img src="./Anh2.png" alt="sfg"></img>
          }
          else {
            if (this.props.value.dirMark !== -1) {
              var str2 = "./Anh3." + (this.props.value.dirMark + 1) + ".png";
              return <img src={str2} alt="sfg"></img>
            }
            return <img src="./Anh3.png" alt="sfg"></img>
          }
        })()
        }
      </button>
    );
  }
}
export default Square;
