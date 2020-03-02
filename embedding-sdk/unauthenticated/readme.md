# MongoDB Charts Embedding Example - Unauthenticated Embedded Chart

## Background

---

MongoDB Charts allows you to create visualizations of your MongoDB data using a simple web interface. You can view the visualizations within the Charts UI, or you can use the Embedding feature to render the charts in an external web application. When you embed a chart, you can choose whether you want it to be Unauthenticated (meaning anyone who has the embed code can view the chart), or to use "Verified Signature" authentication (which checks the integrity of a signature in the URL before the chart will render).

For the "Unauthenticated" option, you can copy the provided snippet and include it in any web site; no extra steps are required. This demo will provide an example on how to do exactly that, along with showing off the various ways your application can interact with the Embedded Charts API.

#### The features included in this demo are as follows:

- Set the charts theme to either `'light'` or `'dark'`
- Get the charts current theme
- Set the charts refresh interval
  - Note, the default interval is 0, implying that after rendering, the chart will never refresh.
  - The minimum refresh interval is 10 seconds.
- Get the charts current refresh interval
- Manually refresh the chart
- Set the charts current filter
  - Note, filtering on a chart requires setting up white listed fields in MongoDB Charts. We have done this for our sample data.
- Get the current filter on a chart

## Preparing your Chart for Embedding

---

If you would like you use our sample data, feel free to skip to running the demo.

Othwerise, do the following:

1. Log onto MongoDB Charts

2. If you haven't done so already, create a chart on any dashboard that you would like to embed.

3. Go to the Data Sources tab, find the data source that you are using on the chart, and choose Embedding Options from the ... menu. Make sure that embedding is enabled for this data source and select '**Unauthenticated or Verified Signature**'

4. Find the chart you want to embed, click the **...** menu and select **Embed Chart**

5. Ensure the Unauthenticated tab is selected and turn on '**Enable unauthenticated access**'

6. Select the **Javascript SDK** option

7. Note the Chart ID and the Chart Base URL, as you will need them for running the demo.

8. **Optional**
   In the same menu, note the **User Specified Filters** option. If you wish to try out filtering on your own dataset, you will need to whitelist a field by which to filter on. For example, our sample AirBnB dataset filters on `address.country`.
   Furthermore, the filter related code in `src/index.js` will need to be updated to conform to the filter query you wish to run, and the options provided in `index.html` will need to be updated too. To be clear,
   - Update the query **field** in `src/index.js`
   - Update the query **values** in `index.html`

## Running this Sample

---

_The following steps presume the use of npm, though yarn works as well._

1. Ensure you have Node installed. You can confirm with `node --version`. On some operating systems, Node available as the `nodejs` binary instead.

2. Clone the Git repository or download the code to your computer.

3. **Optional**
   If you do not wish to use our sample data and have completed the above steps to prepare your own chart for embedding,
   - Open the _index.js_ file (`src/index.js`)
   - Replace the `baseUrl` string on `line 7` with the base URL you copied from the MongoDB Charts Embedded Chart menu.
   - Replace the `chartID` string on `line 12` with the chartID you copied from the MongoDB Charts Embedded Chart menu.
4. Run `npm install` to install the package dependencies.
5. Run `npm install -g parcel-bundler`to install Parcel. You may need to run `sudo npm install -g parcel-bundler` if you lack permissions.
   - Optional Parcel.js documentation https://parceljs.org/ for more information on what this is
6. Run `parcel index.html` to launch the sample application

This should create a local server running the Charts demo. Open a web browser and navigate to `http://localhost:1234` in the url bar to see the sample.

## Next Steps

Once you gain an understanding of the API, consider the following

- Take on the optional steps to prepare and manipulate your own data source rather than the sample.
- Think whether an unauthenticated chart is the feature you're after. Embedding iframes from Charts is a great way to showcase your data if you don't need the user to interact with the chart.
- Consider the data you're making available, and the queries you're allowing. Look into authenticated chart embedding to see if it better suits your application.

Happy Charting! 🚀📈
