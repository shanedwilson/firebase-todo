import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleImage from './googleLogin.png';
import './auth.scss';

const loginBtn = () => {
  const domString = `
    <button id="google-auth" class="btn btn-secondary mt-5">
      <img src="${googleImage}">
    </button>
    `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default { loginBtn };
