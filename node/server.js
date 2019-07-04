// Remember, in a real application, you should ensure your user is authenticated and authorized to view the chart before you return the signed URL.

// Replace these constants with the correct values for your Charts instance
const CHARTS_EMBEDDING_BASE_URL = '~REPLACE~CHARTS_EMBEDDING_BASE_URL';  // Replace with the base URL to your Charts instance, e.g. https://charts.mongodb.com/charts-foo-abcde (no trailing slash)
const CHARTS_TENANT_ID = '~REPLACE~CHARTS_TENANT_ID'; // Replace with your Charts Tenant ID from the Embed Chart snippet
const EMBEDDING_SIGNING_KEY = '~REPLACE~EMBEDDING_SIGNING_KEY'; // Replace with the Embedding Signing Key generated by your Charts admin
const EXPIRY_TIME_SECONDS = 300; // Set to your preferred expiry period
const FILTER_DOCUMENT = null; // Set to a MongoDB Query document if you want to filter the chart, e.g. { foo: { $gt: 10 }}
const AUTOREFRESH_TIME_SECONDS = null; // Set to a number >=10 if you want the chart to autorefresh

const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.get('/api/embeddedchart/:id', (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000);
    let payload = `id=${req.params.id}&tenant=${CHARTS_TENANT_ID}&timestamp=${timestamp}&expires-in=${EXPIRY_TIME_SECONDS}`;
    if (FILTER_DOCUMENT) {
        payload += `&filter=${encodeURIComponent(JSON.stringify(FILTER_DOCUMENT))}`;
    }
    if (AUTOREFRESH_TIME_SECONDS) {
        payload += `&autorefresh=${AUTOREFRESH_TIME_SECONDS}`;
    }
    const hmac = crypto.createHmac('sha256', EMBEDDING_SIGNING_KEY);
    hmac.update(payload);
    const signature = hmac.digest('hex');
    // generate url for iframe
    const url = `${CHARTS_EMBEDDING_BASE_URL}/embed/charts?${payload}&signature=${signature}`;
    res.send(url);
});

app.use(express.static('static'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));
