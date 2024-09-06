<?php
include('config.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header('Content-Type: application/json; charset=utf-8');
$post = json_decode(file_get_contents("php://input"), true);
$respuesta = "";

/*********************************************************************************************************************************************************************************************************************/
/******************************************************************************************FUNCION PARA INICIO DE SESESION*************************************************************************************************/
if ($post['accion'] == "loggin") {
    $sentencia = sprintf("SELECT * FROM user_admin WHERE USAD_EMAIL='%s' AND USAD_PASSWORD='%s'", $post['USAD_EMAIL'], $post['USAD_PASSWORD']);
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'USAD_CODE' => $row['USAD_CODE'],
                'USAD_USERNAME' => $row['USAD_USERNAME'],
                'USAD_EMAIL' => $row['USAD_EMAIL'],
                'USAD_PASSWORD' => $row['USAD_PASSWORD'],
                'USAD_EMAIL_RECOVERY' => $row['USAD_EMAIL_RECOVERY'],
                'USAD_ROLE' => $row['USAD_ROLE'],
                'USAD_DATE_CREATED' => $row['USAD_DATE_CREATED'],
                'ICLI_CODE' => $row['ICLI_CODE']
            );
        }
        $respuesta = json_encode(array('estado' => true, "user_admin" => $datos, "mensaje" => "EXITO:BIENVENIDOS AL SISTEMA"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: CORREO O CONTRASEÑA INCORRECTOS"));
    }
    echo $respuesta;
}
/*********************************************************************************************************************************************************************************************************************/
// verificar que el email de recuperacion exista
if ($post['accion'] == "checkEmail") {
    $sentencia = sprintf("SELECT `USAD_CODE`, `USAD_EMAIL_RECOVERY` FROM `user_admin`  where USAD_EMAIL_RECOVERY='%s'", 
    $post['email']
   
    );
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'USAD_CODE' => $row['USAD_CODE'],
                'USAD_EMAIL_RECOVERY' => $row['USAD_EMAIL_RECOVERY']   
            );
        }
        $respuesta = json_encode(array('estado' => true, "user_admin" => $datos, "mensaje" => "EXISTE"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: EL CORREO NO EXISTE"));
    }
    echo $respuesta;
}
/*********************************************************************************************************************************************************************************************************************/