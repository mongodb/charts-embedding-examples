<?php

require_once('src/MongoDB/Charts.php');

use \MongoDB\Charts;

$embeddingKey = ''; //Charts Embedding Key
$baseUrl = ''; //Charts Base Url
$tenantId = ''; //Tenant Id

$charts = new Charts($baseUrl, $tenantId, $embeddingKey);

$chartId = ''; //Chart Id to Embed

?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <iframe style="border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="<?php echo $charts->getChartUri($chartId); ?>"></iframe>

    <p>If you're getting an error code instead of a chart, <a href="https://docs.mongodb.com/charts/saas/embedding-charts/#embedded-charts-error-codes" target="_blank">click here</a> 
        to find out what the code means.</p>   
</body>
</html>
