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

if ($post['accion'] == "userRegister") {
    // Paso 1: Insertar en la tabla info_client
    $insert_client_query = sprintf(
        "INSERT INTO info_client (`ICLI_FIRST_NAME`, `ICLI_LAST_NAME`, `ICLI_CARD`, `ICLI_PHONE_NUMBER`, `ICLI_ADDRESS`, `ICLI_CITY`, `ICLI_PROVINCE`, `ICLI_CAREER`, `ICLI_SEMESTER`, `ICLI_AGE`, `ICLI_GENDER`, `ICLI_WEIGHT`, `ICLI_HEIGHT`, `ICLI_INSTITUTIONAL_EMAIL`, `ICLI_DATE_OF_BIRTH`, `BUIF_CODE`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
        $post['firstName'],
        $post['lastName'],
        $post['cardNumber'],
        $post['phoneNumber'],
        $post['address'],
        $post['city'],
        $post['province'],
        $post['career'],
        $post['semester'],
        $post['age'],
        $post['gender'],
        $post['weight'],
        $post['height'],
        $post['institutionalEmail'],
        $post['dateOfBirth'],
        $post['sede']
    );

    if (mysqli_query($mysqli, $insert_client_query)) {
        $icli_code = mysqli_insert_id($mysqli);

        // Paso 2: Insertar en la tabla user_admin con el ICLI_CODE obtenido
        $insert_user_query = sprintf(
            "INSERT INTO user_admin (`USAD_USERNAME`, `USAD_EMAIL`, `USAD_PASSWORD`, `USAD_EMAIL_RECOVERY`, `USAD_ROLE`, `USAD_DATE_CREATED`, `ICLI_CODE`) VALUES ('%s', '%s', '%s', '%s', 'Estudiante', NOW(), '%s')",
            $post['user_name'],
            $post['email_user'],
            password_hash($post['password_user'], PASSWORD_BCRYPT),
            $post['email_user_re'],
            $icli_code
        );

        if (mysqli_query($mysqli, $insert_user_query)) {
            $respuesta = json_encode(array('estado' => true, "mensaje" => "Registro exitoso"));
        } else {
            $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar usuario"));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar cliente"));
    }

    echo $respuesta;
}