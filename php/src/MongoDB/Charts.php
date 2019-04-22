<?php

namespace MongoDB;

class Charts
{
    private $chartUri;
    private $payload;
    private $embeddingSigningKey;
    private $tenantId;
    private $expirey = 300; #in seconds
    private $chartsBaseUrl;
    private $signature;

    public function __construct($baseUrl, $tenantId, $signingKey){
        $this->chartsBaseUrl = $baseUrl;
        $this->tenantId = $tenantId;
        $this->embeddingSigningKey = $signingKey;
    }

    private function _genSignature(){
        $sig = hash_hmac('sha256', $this->payload, $this->embeddingSigningKey);
        $this->signature = $sig;
    }

    private function _buildPayload($chartId){
        $fmt = 'id=%s&tenant=%s&timestamp=%d&expires-in=%d';
        $now = time();
        $this->payload = sprintf($fmt,$chartId,$this->tenantId,$now,$this->expirey);
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
