import * as actions from '../Redux';

const RequestForUndo = (rest, dispatch) => {
  dispatch(actions.UpdateGameMode({ undo: rest[0] }));
  dispatch(actions.SetRequest('Xin phép bạn cho mình UNDO nhé', 'REQUEST', 1));
};
export const RequestForLose = run => {
  run(actions.SetRequest('Xin phép bạn cho mình THUA nhé', 'REQUEST LOSE', 2));
};
export const RequestForTie = run => {
  run(actions.SetRequest('Xin phép bạn cho mình HÒA nhé', 'REQUEST LOSE', 3));
};
export const HaveRequest = (reqCode, rest, run) => {
  switch (reqCode) {
    case 1:
      RequestForUndo(rest, run);
      break;
    case 2:
      RequestForLose(run);
      break;
    case 3:
      RequestForTie(run);
      break;
    default:
  }
};
