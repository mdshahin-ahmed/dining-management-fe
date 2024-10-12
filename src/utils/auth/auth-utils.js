const authURL = import.meta.env.VITE_ACCOUNT_ENDPOINT;
console.log(authURL);

function getToken() {
  return JSON.parse(window.localStorage.getItem("asfood"));
}

function setToken(data) {
  return window.localStorage.setItem("asfood", JSON.stringify(data));
}

export { getToken, setToken, authURL };
