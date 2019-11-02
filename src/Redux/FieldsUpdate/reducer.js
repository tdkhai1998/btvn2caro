import TYPE from './type';

const initial = {
  hoten: true,
  gioitinh: true,
  ngaysinh: true,
  avatar: true,
  password: true
};

export default (state = initial, action) => {
  switch (action.type) {
    case TYPE.UPDATE: {
      console.log('update field can update', { ...state, ...action.fields });
      return { ...state, ...action.fields };
    }
    case TYPE.RESET: {
      console.log('reset field can update');
      return initial;
    }
    default:
      return state;
  }
};
