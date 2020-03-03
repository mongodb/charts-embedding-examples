import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import "regenerator-runtime/runtime";
import jwt from "jsonwebtoken";
import config from "../config";

document
  .getElementById("loginButton")
  .addEventListener("click", async () => await tryLogin());

function user() {
  return document.getElementById("username").value;
}

function pass() {
  return document.getElementById("password").value;
}

async function tryLogin() {
  if (login(user(), pass())) {
    document.getElementById("login-page").className = "hideLogin";
    document.getElementById("chart").style.visibility = "visible";
    document.getElementById("lock").innerText = "🔓";
    await renderChart();
    //await renderUnauthenticatedChart();
  }
}

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

async function renderChart() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://localhost/mongodb-charts-iwfxn",
    chartId: "d98f67cf-374b-4823-a2a8-f86e9d480065",
    getUserToken: function() {
      login(user(), pass());
    }
  });

  const chart = sdk.createChart({ id: "d98f67cf-374b-4823-a2a8-f86e9d480065" });

  // render the chart into a container
  chart.render(document.getElementById("chart"));
}
