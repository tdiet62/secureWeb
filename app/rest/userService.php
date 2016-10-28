<?php
require_once '../config.php';
require_once 'lib/simpleRest.php';

class userService extends SimpleRest{
	
	private $mode;
	private $ids;
	private $statusCode;
	private $returnValue;
	
	public function __construct($m,$i){
		$this->mode=$m;
		$this->ids=$i;
	}
	
	public function getAllusers(){
		if($this->checkMode()){				
			$userJson=user::JsonBuilder()->with("person")->get();
				if(empty($userJson)){
					$this->statusCode=404;
					//$userJson = json_encode(array('error' => 'No data found!'));
				}else{
					$this->statusCode=200;
					}			
			$this->returnValue=$userJson;
		}
		$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$this ->setHttpHeaders($requestContentType, $this->statusCode);
		echo $this->returnValue;
	}
	
	public function getUser(){
		
	}
	
	private function checkMode(){
		if (!isset($this->mode) || $this->mode===NULL){
			$error=["error"=>"Mode must be specified !!!"];
			$this->returnValue=json_encode($error);
			$this->statusCode=412;
			return FALSE;
		}
		return TRUE;
	}
	
}