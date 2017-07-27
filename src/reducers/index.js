import { combineReducer } from "redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import crud from './crud';
import DataService from "../middlewares/dataService";
import Constant from "../constant";

const State = {
  products :[],
  delete_bool: false
};

export const getEntityByKey = (state, key) => {
  if(state && state[key]){
    return state[key];
  }
  return null;
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ALL_PRODUCT_PENDING": {
      return {...state};
      break;
    }
    case "ALL_PRODUCT_FULFILLED": {
      let products = action.payload["data"];
      let delete_bool = false
      return {...state, products, delete_bool};
      break;
    }
    // case "ADD_PRODUCT_PENDING": {
    //   return action.payload;
    //   break;
    // }
    case "ADD_PRODUCT_FULFILLED": {
      const check1 = Object.assign({}, state, {delete_bool:true});
      return check1
      //return {...
      
    }
    // case "EDIT_PRODUCT_PENDING": {
    //   return action.payload;
    //   break;
    // }
    case "EDIT_PRODUCT_FULFILLED": {
      const check1 = Object.assign({}, state, {delete_bool:true});
      console.log('check1',check1);
      return check1;
    }
  
    case "DELETE_PRODUCT_FULFILLED": {
      console.log('chwckstate', state);
      const check1 = Object.assign({}, state, {delete_bool:true});
      console.log('check1',check1);
      return check1
      //return {...state, delete_bool};
    }
    default :return state
  }
    
};
export default reducer;
