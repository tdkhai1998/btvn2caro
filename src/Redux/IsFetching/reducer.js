import TYPE from './type';

export default (state = false, action) => {
  switch (action.type) {
    case TYPE.SET: {
      if(action.value){
        console.log("fetching.............")
      
      
      }
      else{
        console.log("done")
      }
      return action.value;
    }
    default:
      return state;
  }
};
