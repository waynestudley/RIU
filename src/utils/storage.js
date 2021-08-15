import axios from "axios";

export function getStorage(item) {
  return localStorage.getItem(item);
}
export function setStorage(item, value) {
  return localStorage.setItem(item, value);
}
export function clearStorage(item) {
  return localStorage.removeItem(item);
}
export function clearAllStorage() {
  return localStorage.clear();
}

export function setAxiosHeaders() {
  console.log(getStorage("Login.token"));
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + getStorage("Login.token");
}
