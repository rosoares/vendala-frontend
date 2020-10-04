export const TOKEN_KEY = '@VENDALA::token';

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token || null;
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLogged() {
  const token = getToken();
  return token !== '' ? true : false;
}