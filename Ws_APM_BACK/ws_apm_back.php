<?php
include('config.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header('Content-Type: application/json; charset=utf-8');
require 'vendor/PHPMailer-master/src/PHPMailer.php';
require 'vendor/PHPMailer-master/src/SMTP.php';
require 'vendor/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$post = json_decode(file_get_contents("php://input"), true);
$respuesta = "";

/*********************************************************************************************************************************************************************************************************************/
/******************************************************************************************FUNCION PARA INICIO DE SESESION*************************************************************************************************/
if ($post['accion'] == "loggin") {
    // Consulta el usuario por correo electrónico
    $sentencia = sprintf("SELECT * FROM user_admin WHERE USAD_EMAIL='%s'", $post['USAD_EMAIL']);
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        // Obtener los datos del usuario
        $row = mysqli_fetch_array($result);

        // Verificar la contraseña usando password_verify
        if (password_verify($post['USAD_PASSWORD'], $row['USAD_PASSWORD'])) {
            // Si la contraseña es correcta, proceder con el inicio de sesión
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

            $respuesta = json_encode(array('estado' => true, "user_admin" => $datos, "mensaje" => "EXITO: BIENVENIDOS AL SISTEMA"));
        } else {
            // Contraseña incorrecta
            $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: CORREO O CONTRASEÑA INCORRECTOS"));
        }
    } else {
        // No se encontró el usuario
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: CORREO O CONTRASEÑA INCORRECTOS"));
    }

    echo $respuesta;
}

/*********************************************************************************************************************************************************************************************************************/
// verificar que el email de recuperacion exista
if ($post['accion'] == "checkEmail") {
    $token = bin2hex(random_bytes(16));
    $sentencia = sprintf("SELECT `USAD_CODE`, `USAD_EMAIL_RECOVERY` FROM `user_admin`  where USAD_EMAIL_RECOVERY='%s'", 
    $post['email']
   
    );
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'USAD_CODE' => $row['USAD_CODE'],
                'USAD_EMAIL_RECOVERY' => $row['USAD_EMAIL_RECOVERY'],  
                'token'=> $token
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos, "mensaje" => "EXISTE"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: EL CORREO NO EXISTE"));
    }
    echo $respuesta;
}
/*********************************************************************************************************************************************************************************************************************/
// MANDAR AL CORREO DE RECUPERACION EL TOKEN
if ($post['accion'] == "sendTokenEmail") {
    $email = $post['email'];
    $token = $post['token'];

    // Inicializa PHPMailer
    $mail = new PHPMailer(true); // Enable exceptions

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Cambia esto a tu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'keevsanchez37@gmail.com'; // Cambia esto a tu usuario de correo SMTP
        $mail->Password = 'cymp oiyo tzyh gyid'; // Cambia esto a tu contraseña
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Protocolo de seguridad (TLS/SSL)
        $mail->Port = 587; // Puerto del servidor SMTP (587 para TLS, 465 para SSL)

        // Configuración del remitente y destinatarios
        $mail->setFrom('no-reply@tu-dominio.com', 'Recuperación de contraseña'); // Cambia esto a tu correo de envío
        $mail->addAddress($email); // Destinatario: el correo de recuperación

        // Contenido del correo
        $mail->isHTML(true); // Establece el formato HTML
        $mail->Subject = 'Recuperación de contraseña';
        $mail->Body = "Aquí está tu token de recuperación: <b>$token</b>";

        // Enviar el correo
        $mail->send();
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Token enviado"));
    } catch (Exception $e) {
        // Manejo de errores
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al enviar el token: {$mail->ErrorInfo}"));
    }

    echo $respuesta;
}

 //REGISTRAR EL USUARIO 
if ($post['accion'] == "userRegister") {

    $insert_client_query = sprintf(
        "INSERT INTO info_client (ICLI_FIRST_NAME, ICLI_LAST_NAME, ICLI_CARD, ICLI_PHONE_NUMBER, ICLI_ADDRESS, ICLI_CITY, ICLI_PROVINCE, ICLI_CAREER, ICLI_SEMESTER, ICLI_AGE, ICLI_GENDER, ICLI_WEIGHT, ICLI_HEIGHT, ICLI_INSTITUTIONAL_EMAIL, ICLI_DATE_OF_BIRTH, BUSH_CODE) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
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

        // Encriptar la contraseña antes de insertarla
        $password_hashed = password_hash($post['password_user'], PASSWORD_BCRYPT);
        
        $insert_user_query = sprintf(
            "INSERT INTO user_admin (USAD_USERNAME, USAD_EMAIL, USAD_PASSWORD, USAD_EMAIL_RECOVERY, USAD_ROLE, USAD_DATE_CREATED, ICLI_CODE) VALUES ('%s', '%s', '%s', '%s', 'estudiante', NOW(), '%s')",
            $post['user_name'],
            $post['email_user'],
            $password_hashed,  // Guardar la contraseña encriptada
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

//ACTUALIZAR LA CLAVE POR MEDIO DE CONFIRMAR EL TOKEN
if ($post['accion'] == "updatePassword") {
    $clave = $post['clave'];
    $codigo = $post['codigo'];

    // Cifra la nueva contraseña
    //$hashedPassword = password_hash($clave, PASSWORD_BCRYPT);

    $update_query = sprintf(
        "UPDATE user_admin SET USAD_PASSWORD='%s' WHERE USAD_CODE='%s'",
        $clave,
        $codigo
    );

    if (mysqli_query($mysqli, $update_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Contraseña actualizada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la contraseña"));
    }

    echo $respuesta;
}
//loadbusinessinfo
if ($post['accion'] == "loadbusinessinfo") {
    // Realizamos el INNER JOIN para obtener BUSH_CODE y BUIF_NAME
    $sentencia = sprintf("SELECT bh.BUSH_CODE, bi.BUIF_NAME FROM busineess_headquarters bh INNER JOIN business_information bi ON bh.BUIF_CODE = bi.BUIF_CODE");

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'BUSH_CODE' => $row['BUSH_CODE'],
                'BUIF_NAME' => $row['BUIF_NAME']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR"));
    }

    echo $respuesta;
}

if ($post['accion'] == "consultausuarioDATOS") {
    $codigo = $post['codigousu']; // Asegúrate de que el parámetro se llama `codigousu`
    $sentencia = sprintf("SELECT * FROM user_admin WHERE USAD_CODE = $codigo", ); // Usa sprintf para formatear la consulta
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'nombre' => $row['USAD_USERNAME'],
                'rol' => $row['USAD_ROLE'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }

    echo $respuesta;
}


//consultar usuarios
if ($post['accion'] == "consultausuario") {
    $cedula = isset($post['cedula']) ? $post['cedula'] : '';
    if ($cedula != '') {
        $sentencia = sprintf(
            "SELECT * FROM user_admin ua INNER JOIN info_client ic ON ua.ICLI_CODE= ic.ICLI_CODE WHERE ic.ICLI_CARD = '%s'",
            mysqli_real_escape_string($mysqli, $cedula)
        );
    } else {
        $sentencia = "SELECT * FROM user_admin";
    }

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['USAD_CODE'],
                'nombre' => $row['USAD_USERNAME'],
                'email' => $row['USAD_EMAIL'],
                'emailr' => $row['USAD_EMAIL_RECOVERY'],
                'rol' => $row['USAD_ROLE'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }

    echo $respuesta;
}

    // Verifica la acción a realizar
    if ($post['accion'] == 'editarusuario') {
        $codigo = $post['codigo'];
        $nombre = $post['nombre'];
        $rol = $post['rol'];

        // Prepara la consulta SQL para actualizar el usuario
        $sentencia = "UPDATE user_admin SET USAD_USERNAME = ?, USAD_ROLE = ? WHERE USAD_CODE = ?";

        // Prepara la sentencia SQL
        $stmt = mysqli_prepare($mysqli, $sentencia);

        // Verifica si la sentencia se preparó correctamente
        if ($stmt === false) {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al preparar la consulta: ' . mysqli_error($mysqli)));
            echo $respuesta;
            exit();
        }

        // Asocia los parámetros y ejecuta la sentencia
        mysqli_stmt_bind_param($stmt, 'ssi', $nombre, $rol, $codigo);

        if (mysqli_stmt_execute($stmt)) {
            $respuesta = json_encode(array('estado' => true));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar el usuario: ' . mysqli_stmt_error($stmt)));
        }

        // Cierra la sentencia
        mysqli_stmt_close($stmt);
        echo $respuesta;
    }
