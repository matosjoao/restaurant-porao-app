import axios from 'axios';

const API_KEY = 'AIzaSyA71PIChWuZ8AlUk6HevcfaUwelaUmpGHQ';

export async function login(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}
