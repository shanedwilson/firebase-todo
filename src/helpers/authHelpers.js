import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#tasks').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-logout').show();
    } else {
      $('#auth').show();
      $('#tasks').hide();
      $('#navbar-button-auth').show();
      $('#navbar-button-logout').hide();
    }
  });
};

export default { checkLoginStatus };
