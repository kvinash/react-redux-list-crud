import { combineReducer } from "redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import crud from './crud';
import DataService from "../middlewares/dataService";
import Constant from "../constant";

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
    case "ADD_PRODUCT_PENDING": {
      return action.payload;
      break;
    }
    case "ADD_PRODUCT_FULFILLED": {
      return true;
      break;
    }
    case "EDIT_PRODUCT_PENDING": {
      return action.payload;
      break;
    }
    case "EDIT_PRODUCT_FULFILLED": {
      return true;
      break;
    }
  
    case "DELETE_PRODUCT_FULFILLED": {
      let delete_bool = true;
      return {...state, delete_bool};
      break
    }
  }
    
};
export default reducer;
