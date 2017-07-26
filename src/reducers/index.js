import { combineReducer } from "redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import crud from './crud';
import DataService from "../middlewares/dataService";
import Constant from "../constant";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ALL_PRODUCT_PENDING": {
      console.log("hell1", action.payload);
      return state;
      break;
    }
    case "ALL_PRODUCT_FULFILLED": {
      console.log("hell2", action);
      console.log(action.payload);
      //state.set("products",action.payload);
      state.products = action.payload["data"];
      console.log("hellllllloo",state);

      return action.payload;
      break;
    }
     case "EDIT_PRODUCT_PENDING": {
      console.log(state);
      return action.payload;
      break;
    }
    case "EDIT_PRODUCT_FULLFILLED": {
      console.log(action)
      return true
      break;
    }
    case "DELETE_PRODUCT_PENDING": {
      console.log(action)
      state.delete_bool = false;
      return state;      
      break;
    }
    case "DELETE_PRODUCT_FULFILLED": {
      console.log(action)
      state.delete_bool = true;
      console.log(state)
      return state;
      break;
    }
    default:
      return state;
  }
    
};
export default reducer;
