import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import "regenerator-runtime/runtime";
import jwt from "jsonwebtoken";
import config from "../config";

document
  .getElementById("loginButton")
  .addEventListener("click", async () => await tryLogin());

function getUser() {
  return document.getElementById("username").value;
}

function getPass() {
  return document.getElementById("password").value;
}

async function tryLogin() {
  if (login(getUser(), getPass())) {
    document.body.classList.toggle("logged-in", true);
    await renderChart();
  }
}

/*
  login(username, password) is the function we are going to give to the
  SDK to authenticate the user. It can be any function that returns a 
  JWT token on success. The core of this function is the jwt.sign code,
  which creates the token using the users username and our previously
  defined secret called 'topsecret'.
*/
function login(username, password) {
  // mock a check against the database
  let mockedUsername = "admin";
  let mockedPassword = "password";

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      let token = jwt.sign({ username: username }, config.secret, {
        expiresIn: "24h" // expires in 24 hours
      });
      return token;
    }
  } else {
    return false;
  }
}

/*
  Chart rendering is much the same as our unauthenticated charts. However,
  we now need to give the SDK a value for 'getUserToken'. This value needs
  to be a function that returns a valid JWT. We are using an anonymous 
  function syntax in order to pass variables to the function that
  will be called at a later time by the SDK code.
 */
async function renderChart() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://localhost/mongodb-charts-iwfxn", // Optional: ~REPLACE~ with the Base URL from your Embed Chart dialog
    chartId: "d98f67cf-374b-4823-a2a8-f86e9d480065", // Optional: ~REPLACE~ with the Chart ID from your Embed Chart dialog
    getUserToken: function() {
      login(getUser(), getPass());
    }
  });

  const chart = sdk.createChart({ id: "d98f67cf-374b-4823-a2a8-f86e9d480065" }); // Optional: ~REPLACE~ with the Chart ID from your Embed Chart dialog

  // render the chart into a container
  chart.render(document.getElementById("chart"));
}
