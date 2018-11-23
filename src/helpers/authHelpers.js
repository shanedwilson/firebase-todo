import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#all-tasks').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-new').show();
      $('#navbar-button-logout').show();
    } else {
      $('#auth').show();
      $('#new-task').hide();
      $('#all-tasks').hide();
      $('#completed-tasks').hide();
      $('#navbar-button-auth').show();
      $('#navbar-button-new').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

export default { checkLoginStatus };
