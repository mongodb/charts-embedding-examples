import "regenerator-runtime/runtime";
import $ from "jquery";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

var refreshInterval = 0;
var refreshCountdown = 0;

async function updateRefreshCounters() {
  refreshInterval = await chart.getRefreshInterval();
  refreshCountdown = refreshInterval;
}

async function renderChart() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://0.0.0.0/mongodb-charts-iwfxn"
  });

  const chart = sdk.createChart({
    chartId: "d98f67cf-374b-4823-a2a8-f86e9d480065"
  });

  await chart.render(document.getElementById("chart"));
  updateRefreshCounters();

  $("#refresh").on("click", () => {
    chart.refresh();
  });
  $("#refresh-interval").on("change", e => {
    refreshInterval = e.target.value;
    refreshCountdown = refreshInterval;
    refreshInterval
      ? chart.setRefreshInterval(Number(refreshInterval))
      : chart.setRefreshInterval(0);
    setInterval(function() {
      refreshCountdown--;
      if (refreshCountdown == 0) {
        refreshCountdown = refreshInterval;
      }

      $("#refreshTicker").text(refreshCountdown.toString());
    }, 1000);
  });
  $("#country-filter").on("change", e => {
    const country = e.target.value;
    country
      ? chart.setFilter({ "address.country": country })
      : chart.setFilter({});
  });
  $("#themeSwitch").change(async function() {
    if (this.checked) {
      await chart.setTheme("dark");
      $("body").css("background-color", "#061621");
      $("body").css("color", "#FFFFFF");
      $("#themeEmoji").text("🌙");
    } else {
      chart.setTheme("light");
      $("body").css("background-color", "#FFFFFF");
      $("body").css("color", "#000000");
      $("#themeEmoji").text("☀️");
    }
  });
}

renderChart().catch(e => window.alert(e.message));
