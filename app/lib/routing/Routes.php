<?php
require_once 'Route.php';
require_once '../rest/userService.php';

class Routes
{
    private $routes = [];
    private $serviceClasses = ["users" => "UserService", "person" => "personService"];

    public function addRoute($route)
    {
        array_push($this->routes, $route);
    }

    public function findRouteByParams($requestMethod, $queryType, $baseClass)
    {
        foreach ($this->getRoutes() as $route) {
            $found = $route->match($requestMethod, $queryType, $baseClass);
            if ($found) {
                return $route;
                break;
            }
        }
    }

    public function getRoutes()
    {
        return $this->routes;
    }

    public function setRoutes($routes)
    {
        $this->routes = $routes;
    }

    public function dispatch()
    {
        $parameters=null;
        error_log("reached dispatch");
        $requestMethod = strtoupper($_SERVER['REQUEST_METHOD']);
        $queryType = strtoupper($_GET['queryType']);
        $baseClass = $_GET['class'];
        if ($requestMethod === "GET") {
            $parameters = array_slice($_GET, 2);
        }
        if ($requestMethod === "POST") {
            $parameters = $GLOBALS['HTTP_RAW_POST_DATA'];
            $parameters=json_decode($parameters);
            error_log("Post Paras".print_r($parameters,true));
        }
        error_log($queryType);
        if ($queryType === "LOGIN") {
            error_log("Query IS login");
             if((!$requestMethod==='POST')){
                 $this->sendBadRequest();
                 return;
             }
            $baseClass = 'users';
        } else {
            error_log("Query ISN'T login");

            $sessionKey = $this->checkHeaderSessionExists();
            if (!$sessionKey) {
                $this->sendUnauthorised();
                return;
            } else {
                error_log($sessionKey);
                if (!$this->checkHeaderSessionIsValid($sessionKey)) {
                    $this->sendUnauthorised();
                    return;
                }
            }
        }


        $r = $this->findRouteByParams($requestMethod, $queryType, $baseClass);
        $service = $this->serviceClasses[$baseClass];
        if ($r) {
            $s = new $service();
            $f = $r->func;
            $s->$f($parameters);
        } else {
            $this->sendBadRequest();
        }
    }

    private function checkHeaderSessionExists()
    {
        $headers = getallheaders();
        error_log(print_r($headers,true));
        $sessionKey = $headers['securewebsessionkey'];

        return $sessionKey;
    }

    private function checkHeaderSessionIsValid($sessionKey)
    {
        $session = session::ObjectBuilder()->where("sessionKey", $sessionKey)->get();
        if (!$session) {
            return true;
        }
        if ($session[0]->expiryDate > time()) {
            return $session;
        } else {
            $deleteID = $session[0]->id;
            $sessionToDelete = session::byId($deleteID);
            $sessionToDelete->delete();
            return false;
        }
        return true;
    }

    private function sendBadRequest()
    {
        ob_start();
        header("HTTP/1.1" . " " . 400 . " " . "Bad Request");
        header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Cache-Control: post-check=0, pre-check=0', FALSE);
        header('Pragma: no-cache');
        ob_end_flush();
    }

    private function sendUnauthorised()
    {
        ob_start();
        header("HTTP/1.1" . " " . 401 . " " . "Unauthorised");
        header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Cache-Control: post-check=0, pre-check=0', FALSE);
        header('Pragma: no-cache');
        ob_end_flush();
    }
}