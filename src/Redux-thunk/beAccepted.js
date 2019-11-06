import * as actions from '../Redux';
import { AcceptUndo, restart } from './accept';

export const BeAcceptedLose = run => {
  run(actions.SetMessage('THUA RỒI', ':('));
  run(actions.FetchDone());
  restart(run);
};
export const BeAcceptedTie = run => {
  run(actions.SetMessage('HÒA RỒI', ':)'));
  run(actions.FetchDone());
  restart(run);
};
export const BeAccepted = (run, state) => {
  const { message } = state();
  switch (message.id) {
    case 1:
      run(AcceptUndo());
      break;
    case 2:
      BeAcceptedLose(run);
      break;
    case 3:
      BeAcceptedTie(run);
      break;
    default:
  }
};
