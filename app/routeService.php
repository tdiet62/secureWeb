<?php

require_once ("config.php");
require_once ('./rest/userService.php');


$routes=[
    action('GET', 'users/list', function () {

            $userService=new UserService();



            $list = $userService->getAllusers();
            echo $list;
            $statusCode=200;
            if(!$list){
                $statusCode=405;
            }
            //$json = json_encode($list);
            //return response($list, $statusCode, ['content-type' => 'application/json']);
            }
        )
    ];

echo match($routes,"GET",'users/list');
