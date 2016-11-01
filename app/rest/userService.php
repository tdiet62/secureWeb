<?php
//require_once ("../config.php");
require_once 'lib/simpleRest.php';

class UserService extends SimpleRest
{

    private $statusCode;
    private $returnValue;


    public function getAllusers()
    {

        $userJson = user::JsonBuilder()->with("person")->get();
        if (empty($userJson)) {
            $this->statusCode = 404;
        } else {
            $this->statusCode = 200;
        }
        $this->returnValue = $userJson;
        $requestContentType = $_SERVER['HTTP_ACCEPT'];
        $this->setHttpHeaders($requestContentType, $this->statusCode);
        echo $this->returnValue;
    }

    public function getUser($parameters)
    {
        $id=$parameters["id"];
        $userJson=user::JsonBuilder()->where("id",$id)->get();
        if (empty($userJson)) {
            $this->statusCode = 404;
        } else {
            $this->statusCode = 200;
        }
        $this->returnValue = $userJson;
        $requestContentType = $_SERVER['HTTP_ACCEPT'];
        $this->setHttpHeaders($requestContentType, $this->statusCode);
        echo $this->returnValue;
    }


    public function login($parameters){
        $userName=$parameters->userName;
        $user=user::ObjectBuilder()->where("userName",$userName)->get();
        if($user){
            $firstUser=$user[0];
            $data=$firstUser->pass;
            $pass=$parameters->pass;
            if($data===$pass){
                $session=$this->getSessionByUserId($firstUser->id);
                if($session==null){
                    $session=$this->getNewSession($firstUser->id);
                }
                $this->returnValue=json_encode($session);
                $this->statusCode=200;
            }
            else{
                $this->statusCode=401;
                $warn=["error"=>"Invalid User Name or Password"];
                $this->returnValue=json_encode($warn);
            }
        }else{
            $this->statusCode=401;
            $warn=["error"=>"No User found with name ".$userName];
            $this->returnValue=json_encode($warn);
        }
        $requestContentType = $_SERVER['HTTP_ACCEPT'];
        $this->setHttpHeaders($requestContentType, $this->statusCode);
        echo $this->returnValue;
    }


    private function getSessionByUserId($userId){
        $session=session::ObjectBuilder()->where("userId",$userId)->get();
        if($session){
            if($session[0]->expiryDate>time()){
                return $session;
            }else{
                $delete=$session[0]->id;
                $sessionToDelete=session::byId($delete);
                $sessionToDelete->delete();
                return $this->getNewSession($userId);
            }
        }
        return null;
    }

    private function getNewSession($userId){
        $session=new session();
        $session->userId=$userId;
        $session->sessionKey=uniqid('',true);
        $session->expiryDate=time()+60*60;
        $session->save();
        return $session;
    }
}