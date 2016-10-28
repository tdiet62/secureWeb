<?php 
require_once("config.php");


class test {
	private $_users=Array();
	
	public static function getUsers(){
		return user::with("person")->get();
	}
	
	public static function getUser($id){
		
	}
	
	public static function pingTest(){
		global $db;
		return $db->ping();
	}
	
	public static function restGetUsers(){
		return user::JsonBuilder()->get();
	}
	
}



?>