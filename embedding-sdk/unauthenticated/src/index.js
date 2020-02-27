import "regenerator-runtime/runtime";
import $ from "jquery";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://0.0.0.0/mongodb-charts-iwfxn"
});

const chart = sdk.createChart({
  chartId: "d98f67cf-374b-4823-a2a8-f86e9d480065",
  height: "700px"
});

async function renderChart() {
  await chart.render(document.getElementById("chart"));

  /*
    chart.refresh()
    Manually fetches the latest data for the chart
   */
  $("#refresh").on("click", () => {
    chart.refresh();
  });

  /*
    chart.setRefreshInterval(interval: number)
    The default rate is to never refresh after rendering.
    The minimum rate is every 10 seconds.
    Setting to 0 returns the chart to the default setting.

    chart.getRefreshInterval()
    Returns a number pertaining to the charts current
    refresh interval.
   */
  $("#refresh-interval").on("change", async e => {
    var refreshInterval = e.target.value;
    refreshInterval
      ? chart.setRefreshInterval(Number(refreshInterval))
      : chart.setRefreshInterval(0);

    var currentRefreshInterval = await chart.getRefreshInterval();
    $("#currentRefreshInterval").text(currentRefreshInterval);
  });

  /*
    chart.setFilter(filter: object)
    Filters the chart with the given filter string.
    It's important to manually whitelist fields you want users
    to be able to filter on. Do this in the Embedded settings of 
    your chart. 

    chart.getFilter()
    Returns the current filter object. The key is the field,
    and the value the query.
   */
  $("#country-filter").on("change", async e => {
    const country = e.target.value;
    country
      ? chart.setFilter({ "address.country": country })
      : chart.setFilter({});

    var currentFilter = await chart.getFilter();
    var keyName = Object.keys(currentFilter)[0];
    $("#currentFilter").text(
      "{ " + keyName + " : " + currentFilter[keyName] + " }"
    );
  });

  /*
    chart.setTheme(theme: 'dark' | 'light');
    When the chart is set to dark, it's background becomes transparent.
    It is important when activating this setting you set the background of 
    the body to an appropriate colour.

    chart.getTheme()
    The current state of the charts theme is maintained by the chart.
    Returns a string.
   */
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

    var currentTheme = await chart.getTheme();
    $("#currentTheme").text(currentTheme);
  });
}

renderChart().catch(e => window.alert(e.message));
