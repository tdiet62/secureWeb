<?php 
require_once ("../config.php");
require_once 'userService.php';


header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$mode=NULL;
	$ids=NULL;
	$model=NULL;
	if(isset($_GET["model"])){
		$model = htmlspecialchars($_GET["model"]) ;
	}
	if(isset($_GET["mode"])){
		$mode = htmlspecialchars($_GET["mode"]) ;
	}
	if(isset($_GET["ids"])){
		$ids =  htmlspecialchars($_GET["ids"]) ;
	}
	if($model===NULL){
		$requestContentType = $_SERVER['HTTP_ACCEPT'];
		header("HTTP/1.1". " "."400" ." ". "Bad Request");
		header("Content-Type:". $requestContentType);
		return;
	}

	switch($model){
		case "users":
			$userService=new userService($mode,$ids);
			$userService->execute();
			break;
	}
	
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		echo "REST::POST";
}



?>