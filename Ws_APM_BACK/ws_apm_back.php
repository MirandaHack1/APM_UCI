<?php 
include('config.php');
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Credentials: true');
header ('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header ('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header ('Content-Type: application/json; charset=utf-8');
$post= json_decode(file_get_contents("php://input"), true);

// Se ingresa los if