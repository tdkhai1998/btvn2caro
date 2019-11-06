import * as actions from '../Redux';
// import { AcceptUndo, restart } from './accept';

export const BeRejectedUndo = run => {
  run(actions.FetchDone());
  run(actions.SetMessage('Yêu cầu Undo không được chấp nhận', 'Thất bại'));
};
export const BeRejectedLose = run => {
  run(actions.FetchDone());
  run(actions.SetMessage('Không cho thua đó', 'Thất bại'));
};
export const BeRejectedTie = run => {
  run(actions.FetchDone());
  run(actions.SetMessage('Không cho hòa đó, chơi tiếp đi', 'Thất bại'));
};
export const BeRejected = (run, state) => {
  const { message } = state();
  switch (message.id) {
    case 1:
      BeRejectedUndo(run);
      break;
    case 2:
      BeRejectedLose(run);
      break;
    case 3:
      BeRejectedTie(run);
      break;
    default:
  }
};
