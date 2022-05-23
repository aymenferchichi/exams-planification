import { combineReducers } from "redux";

import auth from "./auth";
import alert from "./alert";
import group from "./group";
import salle from "./salle";
import exam from "./exam";
import calendar from "./calendar";
import reclamation from "./reclamation";

export default combineReducers({
  reclamation,
  auth,
  alert,
  group,
  exam,
  salle,
  calendar,
});
