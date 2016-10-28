<?php 
require_once("lib/database/MysqliDb.php");
require_once("lib/database/dbObject.php");
require_once("lib/database/models/user.php");
require_once("lib/database/models/person.php");


global $db;




$db = new MysqliDb (Array (
		'host' => 'localhost',
		'username' => 'courseHandler',
		'password' => 'courseHandler',
		'db'=> 'coursecert',
		'port' => 3306,
		'charset' => 'utf8'));


?>