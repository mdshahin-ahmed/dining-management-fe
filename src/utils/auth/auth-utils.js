const authURL = "http://localhost:5000/api/v1/auth";
console.log(authURL);

function getToken() {
  return JSON.parse(window.localStorage.getItem("asfood"));
}

function setToken(data) {
  return window.localStorage.setItem("asfood", JSON.stringify(data));
}

export { getToken, setToken, authURL };
