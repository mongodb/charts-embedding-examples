<?php

namespace MongoDB;

class Charts
{
    private $chartUri;
    private $payload;
    private $embeddingSigningKey;
    private $expiry = 300; #in seconds
    private $chartsBaseUrl;
    private $filter;
    private $autoRefreshSeconds;
    private $signature;

    public function __construct($baseUrl, $signingKey, $filter, $autoRefreshSeconds){
        $this->chartsBaseUrl = $baseUrl;
        $this->embeddingSigningKey = $signingKey;
        $this->filter = $filter;
        $this->autoRefreshSeconds = $autoRefreshSeconds;
    }

    private function _genSignature(){
        $sig = hash_hmac('sha256', $this->payload, $this->embeddingSigningKey);
        $this->signature = $sig;
    }

    private function _buildPayload($chartId){
        $fmt = 'id=%s&tenant=%s&timestamp=%d&expires-in=%d';
        $now = time();
        $this->payload = sprintf($fmt,$chartId,$this->tenantId,$now,$this->expiry);
        if ($this->filter !== NULL) {
            $this->payload .= '&filter=' . rawurlencode($this->filter);
        }
        if ($this->autoRefreshSeconds !== NULL) {
            $this->payload .= '&autorefresh=' . $this->autoRefreshSeconds;
        }
    }

    public function getChartUri($chartId){
        $this->_buildPayload($chartId);
        $this->_genSignature();
        $uri = '%s/embed/charts?%s&signature=%s';
        $this->chartUri = sprintf($uri,$this->chartsBaseUrl,$this->payload,$this->signature);
        return $this->chartUri;
    }

    public function setExpirey($expire){
        $this->expirey = $expire;
    }

}
