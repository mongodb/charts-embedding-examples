<?php

require_once('src/MongoDB/Charts.php');

use \MongoDB\Charts;

$embeddingKey = '~REPLACE~EMBEDDING_SIGNING_KEY'; //Charts Embedding Key
$baseUrl = '~REPLACE~CHARTS_EMBEDDING_BASE_URL'; // Replace with the base URL to your Charts instance, e.g. https://charts.mongodb.com/charts-foo-abcde (no trailing slash)
$tenantId = '~REPLACE~CHARTS_TENANT_ID'; // Replace with your Charts Tenant ID from the Embed Chart snippet
$chartId = '~REPLACE~CHART_ID'; //Chart Id to Embed
$filter = NULL; // Set to a MongoDB Query document if you want to filter the chart, e.g. { foo: { $gt: 10 }}
$autoRefreshSeconds = NULL; // Set to a number >=10 if you want the chart to autorefresh

$charts = new Charts($baseUrl, $tenantId, $embeddingKey, $filter, $autoRefreshSeconds);

?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <h1>MongoDB Charts Embedding Example (PHP)</h1>
    <iframe style="border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="<?php echo $charts->getChartUri($chartId); ?>"></iframe>

    <p>If you're getting an error code instead of a chart, <a href="https://docs.mongodb.com/charts/saas/embedding-charts/#embedded-charts-error-codes" target="_blank">click here</a> 
        to find out what the code means.</p>   
</body>
</html>
