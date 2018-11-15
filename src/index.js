import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import auth from './components/Auth/auth';

import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginBtn();
};

initApp();
