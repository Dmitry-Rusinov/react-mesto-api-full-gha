import { api } from "../utils/Api";

export const BASE_URL = "https://api.mesto-rus.students.nomoredomainsrocks.ru";
//export const BASE_URL = "http://localhost:3000";

export const register = ( { email, password } ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(api.checkResponse)
    .then((data) => data);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(api.checkResponse)
    .then((data) => {
        localStorage.setItem("userId", data._id);
        return data;
    });
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then(api.checkResponse);
};
