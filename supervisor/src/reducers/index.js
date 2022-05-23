import { combineReducers } from "redux";

import auth from "./auth";
import alert from "./alert";
import salle from "./salle";
import calendar from "./calendar";
import reclamation from "./reclamation";

export default combineReducers({
  reclamation,
  calendar,
  salle,
  auth,
  alert,
});
