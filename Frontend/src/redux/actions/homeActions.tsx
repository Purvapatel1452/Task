import axios from "axios";

export const SET_USERS = 'SET_USERS';
export const GROUP_DATA='GROUP_DATA';
export const FRIEND_LIST='FRIEND_LIST';
export const FRIEND_LIST_S='FRIEND_LIST_S';
export const FRIEND_LIST_F='FRIEND_LIST_F';


export const setUsers = (users: any) => ({
  type: SET_USERS,
  payload: users,
});



export const friend_List=(userId)=>{
  console.log("RED1",userId)
  return async (dispatch)=>{
    dispatch({type:FRIEND_LIST});
    try{
console.log("RED",userId)
      const response = await fetch(`http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`);
      const data=await response.json()
      console.log('DATA',data)
      dispatch({type:FRIEND_LIST_S, payload:data})
    }
    catch(error){
      dispatch({type:FRIEND_LIST_F,payload:error.message})

    }
  };
};
