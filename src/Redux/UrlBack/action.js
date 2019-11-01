import TYPE from './type';

export const SetUrlBack = url => ({ type: TYPE.SET, url });
export const ResetUrlBack = () => ({ type: TYPE.RESET });
