import TYPE from './type';

export const StartSocketIO = () => ({
  type: TYPE.SET
});
export const SetRoomSocket = room => ({
  type: TYPE.SETROOM,
  room
});
export const EndSocketIO = () => ({
  type: TYPE.RESET
});
