import TYPE from './type';

const initialInfoUser = {
  username: '',
  hoten: '',
  gioitinh: '',
  ngaysinh: '',
  avatar: '',
  fetched: false
};

export default (state = initialInfoUser, action) => {
  switch (action.type) {
    case TYPE.ADD: {
      console.log('add infor', { ...action.user });
      return { ...action.user };
    }
    case TYPE.UPDATE: {
      console.log('update info', { ...state, ...action.user });
      return { ...state, ...action.user };
    }
    case TYPE.RESET: {
      return initialInfoUser;
    }
    default:
      return state;
  }
};
