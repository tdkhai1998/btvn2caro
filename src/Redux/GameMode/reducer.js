import TYPE from './type';

const initialState = {
  mode: TYPE.modeType.Offline,
  yourTurn: TYPE.turnType.O
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.UPDATE: {
      console.log('update_modeGame', action.s);
      return { ...state, ...action.s };
    }
    case TYPE.RESET:
      console.log('reset_modeGame');
      return initialState;
    default:
      return state;
  }
};
