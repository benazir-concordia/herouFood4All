import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import users from "./users";
import food from "./food"

export default combineReducers({
  auth,
  alerts,
  users,
  food
});
