<?php
require_once '../lib/routing/Routes.php';
require_once '../config.php';


$routes = new Routes();
$routes->addRoute( new Route("GET", "list", "users", "getAllUsers"));
$routes->addRoute( new Route("GET", "get", "users", "getUser"));
$routes->addRoute( new Route("POST", "get", "users", "getUser"));
$routes->addRoute( new Route("POST", "login", "users", "login"));

$routes->dispatch();






