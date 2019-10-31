import { TYPE } from './infoUserAction';

const initialInfoUser = {
  username: '',
  hoten: '',
  gioitinh: '',
  ngaysinh: '',
  avatar: '',
  fetched: false
};

const infoUser = (state = initialInfoUser, action) => {
  switch (action.type) {
    case TYPE.ADD: {
      return { ...action.user };
    }
    case TYPE.UPDATE: {
      return { ...state, ...action.user };
    }
    case TYPE.RESET: {
      return initialInfoUser;
    }
    default:
      return state;
  }
};

export default infoUser;
