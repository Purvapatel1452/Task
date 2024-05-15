import { GROUP_DATA, SET_USERS,FRIEND_LIST } from "../actions/homeActions";


// const initialState = {
//   users: [],
//   groupData:[],
// };

const initialState={
  users:[],
  groupData:[],
  data:[],
  loading:false,
  error:null
}

const homeReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GROUP_DATA:
      return{
        ...state,
        groupData:action.payload,
      }  
      case FRIEND_LIST:
        return{
          ...state,
          loading:true,
        } 
        case GROUP_DATA:
      return{
        ...state,
        loading: false,
        data: action.payload,
        error: null
      } 
      case GROUP_DATA:
      return{
        ...state,
        loading: false,
        error: action.payload
      } 
    default:
      return state;
  }
};

export default homeReducer;