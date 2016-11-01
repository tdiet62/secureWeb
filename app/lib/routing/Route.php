<?php

class Route{
    public $requestMethod;
    public $queryType;
    public $baseClass;
    public $func;

    public function __construct($requestMethod,$queryType,$baseClass,$func)
    {
        $this->requestMethod=strtoupper($requestMethod);
        $this->queryType=strtoupper($queryType);
        $this->baseClass=$baseClass;
        $this->func=$func;
    }

    public function match($requestMethod,$queryType,$baseClass){
        if($this->requestMethod===$requestMethod && $this->queryType===$queryType && $this->baseClass===$baseClass){
            return true;
        }
        return false;
    }

}