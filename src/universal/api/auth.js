
import config from '../../server/config';

const GET_CONFIG = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
const POST_CONFIG = {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

/**
 * Attempt authentication using the fruksWeb session if it exists.
 * NOTE Catching errors is the responsibility of this functions CALLER
 * @return {Promise}  - Resolves to the result from the authenticateWithToken function
 */
export function authenticateFromSession() {
  return fetch(`${config.fruks_web_hostname}/ajax/webtoken`, {
      ...GET_CONFIG,
      mode: 'cors'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Session authentication failed');
      }
    })
    .then(key => authenticateWithToken(key));
}

/**
 * Authentication with the blog server using a json webtoken.
 * NOTE Catching errors is the responsibility of this functions CALLER
 * @param  {string} token - JWT token
 * @return {Promise}        Resolves to the authenticated user
 */
export function authenticateWithToken(token: string) {
  if (!token)
    return Promise.reject();

  console.log(token);
  
  return fetch(`/api/token-auth/${token}`, POST_CONFIG)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        return data.user;
      } else {
        throw new Error('Authentication failed');
      }
    });
}

/**
 * Authenticate with FruksWeb API with credentials
 * @param  {String}   - email
 * @param  {String}   - password
 * @return {Promise}  - resolves to the user
 */
export function authenticateWithCredentials(email, password) {
  return fetch(`${config.fruks_web_hostname}/api/login`, {
      ...POST_CONFIG,
      mode: 'cors',
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log(data);
        return authenticateWithToken(data.token);
      } else {
        throw new Error('Authentication failed');
      }
    });
}

export function fetchArticles() {
  return fetch('/api/articles', GET_CONFIG)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        return data.articles;
      } else {
        throw new Error(data.error);
      }
    })
    .catch((err) => {
      console.error("fetchArticles error - ", err);
    });
}
