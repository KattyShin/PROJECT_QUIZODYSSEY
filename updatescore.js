import {
  app,
  db,
  ref,
  set,
  get,
  child,
  getDatabase,
  onValue,
  update,
  remove,
  push,
} from "../firebaseCOnnection/firebaseCon.js";

window.finishExit = async function () {
  let bestcore = sessionStorage.getItem("bestscore");
  let username = sessionStorage.getItem("username");
  let quiz_id = sessionStorage.getItem("quiz_id");
 
  if (window.overAllScore > bestcore) {
 
    const dbref = ref(db, `user/${username}/quizzes/${quiz_id}`);
    await update(dbref, { bestscore: window.overAllScore });
  }

  window.location.href = "home.html";
};
