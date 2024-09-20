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



/***********************************************************************/
/*******************************FUNCION PARA INICIO DE SESESION-USER ADMIN********************************/
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

/***********************************************************************/
// verificar que el email de recuperacion exista
if ($post['accion'] == "checkEmail") {
    $token = bin2hex(random_bytes(16));
    $sentencia = sprintf(
        "SELECT USAD_CODE, USAD_EMAIL_RECOVERY FROM user_admin  where USAD_EMAIL_RECOVERY='%s'",
        $post['email']

    );
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'USAD_CODE' => $row['USAD_CODE'],
                'USAD_EMAIL_RECOVERY' => $row['USAD_EMAIL_RECOVERY'],
                'token' => $token
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos, "mensaje" => "EXISTE"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: EL CORREO NO EXISTE"));
    }
    echo $respuesta;
}
/***********************************************************************/
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
        $mail->Username = ''; // Cambia esto a tu usuario de correo SMTP
        $mail->Password = ''; // Cambia esto a tu contraseña
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
   $hashedPassword = password_hash($clave, PASSWORD_BCRYPT);

    $update_query = sprintf(
        "UPDATE user_admin SET USAD_PASSWORD='%s' WHERE USAD_CODE='%s'",
        $hashedPassword,
        
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


/***********************************************************************/
// Traer los datos a mis campos en la pagina edit-user-rol
if ($post['accion'] == "consultausuarioDATOS") {
    $codigo = $post['codigo']; // Asegúrate de que el parámetro se llama codigousu
    $sentencia = sprintf("SELECT * FROM user_admin WHERE USAD_CODE = $codigo",); // Usa sprintf para formatear la consulta
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'nombre' => $row['USAD_USERNAME'],
                'email' => $row['USAD_EMAIL'],
                'emailrecuperacion' => $row['USAD_EMAIL_RECOVERY'],
                'rol' => $row['USAD_ROLE'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }

    echo $respuesta;
}
/***********************************************************************/

/***********************************************************************/
// busqueda de datos por cedula, email, nombre y apellidos en mi pagina user-rol

if ($post['accion'] == "consultausuario") {
    $cedula = isset($post['cedula']) ? mysqli_real_escape_string($mysqli, $post['cedula']) : '';
    $condiciones = [];

    if ($cedula != '') {
        // Filtro por cédula
        $condiciones[] = "ic.ICLI_CARD = '$cedula'";

        // Filtro por correo
        $condiciones[] = "ua.USAD_EMAIL = '$cedula'";

        // Filtro por nombre completo (combinando nombre y apellido)
        $condiciones[] = "CONCAT(ic.ICLI_FIRST_NAME, ' ', ic.ICLI_LAST_NAME) LIKE '%$cedula%'";
    }

    // Construir la sentencia SQL
    $sentencia = "SELECT * FROM user_admin ua INNER JOIN info_client ic ON ua.ICLI_CODE = ic.ICLI_CODE";

    // Añadir las condiciones con OR si hay algo para buscar
    if (count($condiciones) > 0) {
        $sentencia .= " WHERE " . implode(" OR ", $condiciones);
    }

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
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
/***********************************************************************/



//cargar informacion personal del usuario
if ($post['accion'] == "loadCredentials") {
    $sentencia = sprintf("SELECT * FROM user_admin WHERE USAD_CODE = '%s'", $post['codigo']);
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'username' => $row['USAD_USERNAME'],
                'email' => $row['USAD_EMAIL'],
                'emailr' => $row['USAD_EMAIL_RECOVERY'],
            );
        }
        $respuesta = json_encode(array('estado' => true, 'person' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'ERROR'));
    }

    echo $respuesta;
}

/***********************************************************************/
// Editado de emails y rol de cada usuario en mi pagina edit-user-rol

// Verifica la acción a realizar
if ($post['accion'] == 'editarusuario') {
    $rol = $post['rol'];
    $email = $post['email'];
    $emailrecuperacion = $post['emailrecuperacion'];
    $codigo = $post['codigo'];


    $update_client_query = "UPDATE user_admin SET USAD_EMAIl= '$email', USAD_EMAIL_RECOVERY='$emailrecuperacion',USAD_ROLE = '$rol' WHERE USAD_CODE = '$codigo'";



    // Prepara la consulta SQL para actualizar el usuario
    $update_client_query = "UPDATE user_admin SET USAD_ROLE = '$rol' WHERE USAD_CODE = '$codigo'";

    // Ejecuta la consulta SQL
    if (mysqli_query($mysqli, $update_client_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Información actualizada exitosamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la información del usuario: " . mysqli_error($mysqli)));
    }

    echo $respuesta;
}
/***********************************************************************/


//insertcredentials
if ($post['accion'] == "insertcredentials") {
    $password_hashed = password_hash($post['password'], PASSWORD_BCRYPT);


    $update_query = sprintf(
        "UPDATE user_admin SET USAD_USERNAME='%s', USAD_EMAIL='%s',USAD_PASSWORD='%s', USAD_EMAIL_RECOVERY='%s' WHERE USAD_CODE='%s'",
        $post['username'],
        $post['email'],
        $password_hashed,
        $post['emailr'],
        $post['cod']
    );

    if (mysqli_query($mysqli, $update_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos actualizados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar los datos"));
    }

    echo $respuesta;
}
//loadinfo
if ($post['accion'] == "loadinfo") {
    $sentencia = sprintf("SELECT * FROM info_client WHERE ICLI_CODE = '%s'", $post['codigo']);
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'firstName' => $row['ICLI_FIRST_NAME'],
                'lastName' => $row['ICLI_LAST_NAME'],
                'cardNumber' => $row['ICLI_CARD'],
                'phoneNumber' => $row['ICLI_PHONE_NUMBER'],
                'address' => $row['ICLI_ADDRESS'],
                'city' => $row['ICLI_CITY'],
                'province' => $row['ICLI_PROVINCE'],
                'career' => $row['ICLI_CAREER'],
                'semester' => $row['ICLI_SEMESTER'],
                'age' => $row['ICLI_AGE'],
                'gender' => $row['ICLI_GENDER'],
                'weight' => $row['ICLI_WEIGHT'],
                'height' => $row['ICLI_HEIGHT'],
                'institutionalEmail' => $row['ICLI_INSTITUTIONAL_EMAIL'],
                'dateOfBirth' => $row['ICLI_DATE_OF_BIRTH'],
                'sede' => $row['BUSH_CODE']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'person' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'ERROR'));
    }

    echo $respuesta;
}
//UPDATE DE LA INFORMACION PERSONAL DEL USUARIO
if ($post['accion'] == "updateinfo") {

    // Preparar la consulta SQL para actualizar la información del cliente
    $update_client_query = sprintf(
        "UPDATE info_client SET 
            ICLI_FIRST_NAME = '%s',
            ICLI_LAST_NAME = '%s',
            ICLI_CARD = '%s',
            ICLI_PHONE_NUMBER = '%s',
            ICLI_ADDRESS = '%s',
            ICLI_CITY = '%s',
            ICLI_PROVINCE = '%s',
            ICLI_CAREER = '%s',
            ICLI_SEMESTER = '%s',
            ICLI_AGE = '%d',
            ICLI_GENDER = '%s',
            ICLI_WEIGHT = '%d',
            ICLI_HEIGHT = '%d',
            ICLI_INSTITUTIONAL_EMAIL = '%s',
            ICLI_DATE_OF_BIRTH = '%s',
            BUSH_CODE = '%s'
        WHERE ICLI_CODE = '%s'",
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
        $post['sede'],
        $post['codigo']
    );

    if (mysqli_query($mysqli, $update_client_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Información actualizada exitosamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la información del cliente: " . mysqli_error($mysqli)));
    }

    echo $respuesta;
}

/************************************ */
// CODIGO DE FORMULARIO DE INFORMAICON DE EMPRESA
/************************************ */
// TRAE TODO LOS CAMPOS DE LA TABLA DE EMPRESA 
if ($post['accion'] == "consultarEmpresa") {
    $nombreEmpresa = isset($post['nombreEmpresa']) ? $post['nombreEmpresa'] : '';
    if ($nombreEmpresa != '') {
        $sentencia = sprintf(
            "SELECT * FROM business_information WHERE BUIF_NAME = '%s'",
            mysqli_real_escape_string($mysqli, $nombreEmpresa)
        );
    } else {
        $sentencia = "SELECT * FROM business_information";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['BUIF_CODE'],
                'nombre' => $row['BUIF_NAME'],
                'logo' => $row['BUIF_LOGO'],
                'mision' => $row['BUIF_MISSION'],
                'vision' => $row['BUIF_VISION'],
                'imagen' => $row['BUIF_IMAGE'],
                'estado' => $row['BUIF_STATE'],
                'contacto' => $row['BUIF_CONTACT'],
                'usuario_insert' => $row['BUIF_USER_INSERT'],
                'usuario_update' => $row['BUIF_USER_UPDATE'],
                'fecha_insert' => $row['BUIF_INSERT_DATE'],
                'fecha_update' => $row['BUIF_UPDATE_DATE'],
                'fecha_delete' => $row['BUIF_DELETE_DATE'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

//FUNCION PARA ELIMINAR EMPRESA 
if ($post['accion'] == "eliminarEmpresa") {
    $Empresaid = $post['codigo'];
    $sentencia = sprintf(
        "DELETE FROM business_information WHERE BUIF_CODE = '%s'",
        $Empresaid
    );
    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos eliminados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar datos"));
    }
    echo $respuesta;
}


//FUNCION PARA GUARDAR EMPRESA
// Verifica que la solicitud contiene datos en $_POST
if ($post['accion'] == "insertarEmpresa") {
    $nombre = $post['nombre'];
    $mision = $post['mision'];
    $vision = $post['vision'];
    $estado = $post['estado'];
    $contacto = $post['contacto'];
    $usuarioInsertar = $post['usuarioInsertar'];
    $fechaInsertar = date("Y-m-d H:i:s");

    // Procesar y guardar el logo
    if (isset($_FILES['logo'])) {
        $logoFileName = basename($_FILES['logo']['name']);
        $logoFilePath = 'uploads/logos/' . $logoFileName;
        move_uploaded_file($_FILES['logo']['tmp_name'], $logoFilePath);
    }

    // Procesar y guardar la imagen
    if (isset($_FILES['image'])) {
        $imageFileName = basename($_FILES['image']['name']);
        // $imageFilePath = 'uploads/images/' . $imageFileName;
        $imageFilePath = './uploads/images/' . $imageFileName;
        move_uploaded_file($_FILES['image']['tmp_name'], $imageFilePath);
    }

    // Insertar los datos de la empresa
    $sentencia_insertar = sprintf(
        "INSERT INTO business_information (BUIF_NAME, BUIF_LOGO, BUIF_MISSION, BUIF_VISION, BUIF_IMAGE, BUIF_STATE, BUIF_CONTACT, BUIF_USER_INSERT, BUIF_INSERT_DATE) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
        $nombre,
        $logoFilePath, // Dirección del logo guardada en la base de datos
        $mision,
        $vision,
        $imageFilePath, // Dirección de la imagen guardada en la base de datos
        $estado,
        $contacto,
        $usuarioInsertar,
        $fechaInsertar
    );

    $result_insertar = mysqli_query($mysqli, $sentencia_insertar);

    if ($result_insertar) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Empresa insertada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar empresa"));
    }

    echo $respuesta;
}







/************************************ */
if ($post['accion'] == "loadSportgroup") {

    $sentencia = sprintf(
        "SELECT *
         FROM sports_groups sg
         INNER JOIN rules r ON sg.RU_CODE = r.RU_CODE
         WHERE sg.ICLI_TEAM_LEADER_ID = '%s'",
        $post['codigo']
    );

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'sport_code' => $row['SPG_CODE'],
                'teamName' => $row['SPG_TEAM_NAME'],
                'gender' => $row['SPG_GENDER_TEAM'],
                'rule_code' => $row['RU_CODE'],
                'rule_name' => $row['RU_RULES_FOR_SPORTS']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'ERROR'));
    }

    echo $respuesta;
}


// Verifica la acción y ejecuta la consulta correspondiente
if ($post['accion'] == "Conreglas") {
    $buscar = isset($post['buscar']) ? $post['buscar'] : '';

    // Si se proporciona un nombre para buscar, se filtran las reglas, de lo contrario, se obtienen todas
    if ($buscar != '') {
        $sentencia = sprintf(
            "SELECT * FROM rules WHERE RU_RULES_FOR_SPORTS LIKE '%%%s%%'",
            mysqli_real_escape_string($mysqli, $buscar)
        );
    } else {
        $sentencia = "SELECT * FROM rules";
    }

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigorules' => $row['RU_CODE'],
                'regla' => $row['RU_RULES_FOR_SPORTS'],
                'descripcion' => $row['RU_DESCRIPTION_RULES'],
                'fecha' => $row['RU_DATE'],
                'usuario_id' => $row['USAD_CODE'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

if ($post['accion'] == "reglasdatos") {
    $codigo = $post['id_regla']; // Asegúrate de que el parámetro se llama codigousu
    $sentencia = sprintf("SELECT * FROM rules WHERE RU_CODE = $codigo",); // Usa sprintf para formatear la consulta
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'nombrer' => $row['RU_RULES_FOR_SPORTS'],
                'pdf' => $row['RU_DESCRIPTION_RULES'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

//cargar las rules, en donde esta el nombre del deporte
if ($post['accion'] == "loadSport") {
    $sentencia = "SELECT RU_CODE, RU_RULES_FOR_SPORTS FROM rules";
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'RU_CODE' => $row['RU_CODE'],
                'RU_RULES_FOR_SPORTS' => $row['RU_RULES_FOR_SPORTS']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'info' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay reglas disponibles.'));
    }

    echo $respuesta;
}

if ($post['accion'] == "AgregarRegla" || $post['accion'] == "ActualizarRegla") {
    $nombreRegla = $post['nombre_regla'];
    $fecha = date('Y-m-d');
    $usuarioCodigo = $post['usuario_codigo'];
    $archivoUrl = isset($post['archivo_url']) ? $post['archivo_url'] : '';

    // Preparar la consulta SQL
    if ($post['accion'] == "AgregarRegla") {
        $insertarRegla = sprintf(
            "INSERT INTO rules (RU_RULES_FOR_SPORTS, RU_DESCRIPTION_RULES, RU_DATE, USAD_CODE) 
            VALUES ('%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($mysqli, $nombreRegla),
            mysqli_real_escape_string($mysqli, $archivoUrl),
            mysqli_real_escape_string($mysqli, $fecha),
            mysqli_real_escape_string($mysqli, $usuarioCodigo)
        );

        if (mysqli_query($mysqli, $insertarRegla)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Regla agregada correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al agregar regla: ' . mysqli_error($mysqli)));
        }
    } elseif ($post['accion'] == "ActualizarRegla") {
        $idRegla = $post['id_regla'];
        $actualizarRegla = sprintf(
            "UPDATE rules SET RU_RULES_FOR_SPORTS = '%s', RU_DESCRIPTION_RULES = '%s', RU_DATE = '%s', USAD_CODE = '%s' 
            WHERE RU_CODE = '%s'",
            mysqli_real_escape_string($mysqli, $nombreRegla),
            mysqli_real_escape_string($mysqli, $archivoUrl),
            mysqli_real_escape_string($mysqli, $fecha),
            mysqli_real_escape_string($mysqli, $usuarioCodigo),
            mysqli_real_escape_string($mysqli, $idRegla)
        );

        if (mysqli_query($mysqli, $actualizarRegla)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Regla actualizada correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar regla: ' . mysqli_error($mysqli)));
        }
    }
    echo $respuesta;
}

if ($post['accion'] == 'EliminarRegla') {
    $id_rules = $post['codigorules'];

    $sentencia = sprintf(
        "DELETE FROM rules WHERE RU_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id_rules)
    );

    $result = mysqli_query($mysqli, $sentencia);

    if ($result) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Regla eliminado correctamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar Regla: ' . mysqli_error($mysqli)));
    }

    echo $respuesta;
}

//buscar personas 
if ($post['accion'] == "searchUsers") {
    //me trae el nombre, apellido o cedula
    $searchTerm = $post['result'];
    $sentencia = sprintf(
        "SELECT * FROM info_client WHERE ICLI_FIRST_NAME LIKE '%%%s%%' OR ICLI_LAST_NAME LIKE '%%%s%%' OR ICLI_CARD LIKE '%%%s%%'",
        mysqli_real_escape_string($mysqli, $searchTerm),
        mysqli_real_escape_string($mysqli, $searchTerm),
        mysqli_real_escape_string($mysqli, $searchTerm)
    );
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['ICLI_CODE'],
                'nombre' => $row['ICLI_FIRST_NAME'] . ' ' . $row['ICLI_LAST_NAME'],
                'cedula' => $row['ICLI_CARD']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se encontraron resultados.'));
    }

    echo $respuesta;
}


// Verifica la acción y ejecuta la consulta correspondiente
if ($post['accion'] == "ConGrupos") {
    $buscar = isset($post['buscar']) ? $post['buscar'] : '';
    
    // Si se proporciona un nombre para buscar, se filtran los grupos, de lo contrario, se obtienen todos
    if ($buscar != '') {
        $sentencia = sprintf(
            "SELECT * FROM groups WHERE GRUP_NAME LIKE '%%%s%%'",
            mysqli_real_escape_string($mysqli, $buscar)
        );
    } else {
        $sentencia = "SELECT * FROM groups";
    }

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'GRUP_CODE' => $row['GRUP_CODE'], // Código del grupo
                'nombreGrupo' => $row['GRUP_NAME'], // Nombre del grupo
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}             
/*********************************** */
//CANCHAS
/********************************** */
//BUSCA LAS CANCHAS
if ($post['accion'] == "consultarCanchas") {
    $nombreCanchas = isset($post['nombreCanchas']) ? $post['nombreCanchas'] : '';
    if ($nombreCanchas != '') {
        $sentencia = sprintf(
            "SELECT * FROM court WHERE CANC_NAME = '%s'",
            mysqli_real_escape_string($mysqli, $nombreCanchas)
        );
    } else {
        $sentencia = "SELECT * FROM court";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['CANC_CODE'],
                'nombre' => $row['CANC_NAME'],
                'ubicacion' => $row['CANC_LOCATE'],
                'estado' => $row['CANC_STATE']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

if ($post['accion'] == 'EliminarGrupo') {
    $id_groups = $post['GRUP_CODE'];

    $sentencia = sprintf(
        "DELETE FROM groups WHERE GRUP_CODE = '%s'", 
        mysqli_real_escape_string($mysqli, $id_groups)
    );

    $result = mysqli_query($mysqli, $sentencia);

    if ($result) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Grupo eliminado correctamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar Grupo: ' . mysqli_error($mysqli)));
    }

    echo $respuesta;
}

if ($post['accion'] == "cgrupos") {
    $sentencia = sprintf("SELECT * FROM groups WHERE GRUP_CODE ='%s'",$post['idGrupo']);
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {

            $datos[] = array(
                'codigo' => $row['GRUP_CODE'],
                'nombreGrupo' => $row['GRUP_NAME'],
            );
        }

        $respupesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respupesta = json_encode(array('estado' => false, "mensaje" => "No hay datos"));
    }
    echo $respupesta;
}

if ($post['accion'] == 'AgregarGrupo') {
    $nombreGrupo = $post['nombreGrupo'];
    
    // Verifica si el grupo ya existe
    $verificar_grupo = sprintf("SELECT * FROM groups WHERE GRUP_NAME='%s'", 
    mysqli_real_escape_string($mysqli, $nombreGrupo));
    $resultado_verificacion = mysqli_query($mysqli, $verificar_grupo);

    if (mysqli_num_rows($resultado_verificacion) > 0) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Este grupo ya está registrado.'));
    } else {
        // Inserta el nuevo grupo
        $sentencia = sprintf(
            "INSERT INTO groups (GRUP_NAME) VALUES ('%s')",
            mysqli_real_escape_string($mysqli, $nombreGrupo)
        );

        $result = mysqli_query($mysqli, $sentencia);

        if ($result) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Grupo guardado correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al guardar: ' . mysqli_error($mysqli)));
        }
    }
    echo $respuesta;
} 

    if ($post['accion'] == 'ActualizarGrupo') {
    $id_grupo = $post['id_grupo'];
    $nombreGrupo = $post['nombreGrupo'];

    // Verifica si el nombre del grupo ya está registrado bajo otro ID
    $verificar_grupo = sprintf(
        "SELECT * FROM groups WHERE GRUP_NAME='%s' AND GRUP_CODE != '%s'",
        mysqli_real_escape_string($mysqli, $nombreGrupo),
        mysqli_real_escape_string($mysqli, $id_grupo)
    );
    $resultado_verificacion = mysqli_query($mysqli, $verificar_grupo);

    if (mysqli_num_rows($resultado_verificacion) > 0) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Este grupo ya está registrado con otro nombre.'));
    } else {
        // Actualiza los datos del grupo
        $sentencia = sprintf(
            "UPDATE groups SET GRUP_NAME = '%s' WHERE GRUP_CODE = '%s'",
            mysqli_real_escape_string($mysqli, $nombreGrupo),
            mysqli_real_escape_string($mysqli, $id_grupo)
        );

        $result = mysqli_query($mysqli, $sentencia);

        if ($result) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Grupo actualizado correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar: ' . mysqli_error($mysqli)));
        }
    }
    echo $respuesta;
}

if ($post['accion'] == "ConGroupstage") {
    $grupo = isset($post['GRUP_CODE']) ? $post['GRUP_CODE'] : '';

    // Construir la consulta SQL
    if ($grupo != '') {
        $sentencia = sprintf(
            "SELECT g.GRUP_NAME,gs.GRS_CODE, gs.GRS_TYPE_GANDER, sg.SPG_TEAM_NAME, 
                    icl_leader.ICLI_FIRST_NAME AS leader_name, 
                    icl_mascot.ICLI_FIRST_NAME AS mascot_name, 
                    r.RU_RULES_FOR_SPORTS AS sport_name, 
                    sg.SPG_CREATION_DATE, sg.SPG_GENDER_TEAM
             FROM groups g
             INNER JOIN groupstage gs ON g.GRUP_CODE = gs.GRUP_CODE
             INNER JOIN sports_groups sg ON gs.SPG_CODE = sg.SPG_CODE
             LEFT JOIN info_client icl_leader ON sg.ICLI_TEAM_LEADER_ID = icl_leader.ICLI_CODE
             LEFT JOIN info_client icl_mascot ON sg.ICLI_TEAM_PED_ID = icl_mascot.ICLI_CODE
             LEFT JOIN rules r ON sg.RU_CODE = r.RU_CODE
             WHERE g.GRUP_CODE = '%s'",
            mysqli_real_escape_string($mysqli, $grupo)
        );
    } else {
        $sentencia = "SELECT g.GRUP_NAME,gs.GRS_CODE, gs.GRS_TYPE_GANDER, sg.SPG_TEAM_NAME, 
                          icl_leader.ICLI_FIRST_NAME AS leader_name, 
                          icl_mascot.ICLI_FIRST_NAME AS mascot_name, 
                          r.RU_RULES_FOR_SPORTS AS sport_name, 
                          sg.SPG_CREATION_DATE, sg.SPG_GENDER_TEAM
                    FROM groups g
                    INNER JOIN groupstage gs ON g.GRUP_CODE = gs.GRUP_CODE
                    INNER JOIN sports_groups sg ON gs.SPG_CODE = sg.SPG_CODE
                    LEFT JOIN info_client icl_leader ON sg.ICLI_TEAM_LEADER_ID = icl_leader.ICLI_CODE
                    LEFT JOIN info_client icl_mascot ON sg.ICLI_TEAM_PED_ID = icl_mascot.ICLI_CODE
                    LEFT JOIN rules r ON sg.RU_CODE = r.RU_CODE";
    }

    $result = mysqli_query($mysqli, $sentencia);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $datos = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $datos[] = array(
                    'GRS_CODE' => $row['GRS_CODE'],
                    'GRUP_NAME' => $row['GRUP_NAME'],
                    'GRS_TYPE_GANDER' => $row['GRS_TYPE_GANDER'],
                    'SPG_TEAM_NAME' => $row['SPG_TEAM_NAME'],
                    'leader_name' => $row['leader_name'],
                    'mascot_name' => $row['mascot_name'],
                    'sport_name' => $row['sport_name'],
                    'SPG_CREATION_DATE' => $row['SPG_CREATION_DATE'],
                    'SPG_GENDER_TEAM' => $row['SPG_GENDER_TEAM'],
                );
            }
            $respuesta = json_encode(array('estado' => true, "datos" => $datos));
        } else {
            $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error en la consulta: " . mysqli_error($mysqli)));
    }
    echo $respuesta;
}


if ($post['accion'] == "searchGroups") {
    // Obtener el término de búsqueda
    $searchTerm = $post['result'];
    $sentencia = sprintf(
        "SELECT g.GRUP_CODE, g.GRUP_NAME, 
                (SELECT COUNT(*) FROM groupstage gs WHERE gs.GRUP_CODE = g.GRUP_CODE) AS player_count
         FROM groups g
         WHERE g.GRUP_NAME LIKE '%%%s%%'",
        mysqli_real_escape_string($mysqli, $searchTerm)
    );
    
    $result = mysqli_query($mysqli, $sentencia);
    
    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['GRUP_CODE'],
                'nombre' => $row['GRUP_NAME'],
                'player_count' => $row['player_count'] // Número de jugadores en el grupo
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se encontraron resultados.'));
    }

    echo $respuesta;
}


if ($post['accion'] == "searchTeams") {
    // Trae el nombre del equipo
    $searchTerm = $post['result'];
    $sentencia = sprintf(
        "SELECT sg.SPG_CODE, sg.SPG_TEAM_NAME, avd.AVD_AVAILABLE_DATE, avd.AVD_AVAILABLE_HOUR_SINCE, avd.AVD_AVAILABLE_HOUR_UNITL
         FROM sports_groups sg
         LEFT JOIN available_dates avd ON sg.SPG_CODE = avd.SPG_CODE
         WHERE sg.SPG_TEAM_NAME LIKE '%%%s%%'
         AND sg.SPG_CODE NOT IN (SELECT SPG_CODE FROM groupstage)
         ORDER BY avd.AVD_AVAILABLE_DATE ASC, avd.AVD_AVAILABLE_HOUR_SINCE ASC",
        mysqli_real_escape_string($mysqli, $searchTerm)
    );

    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['SPG_CODE'],
                'nombre' => $row['SPG_TEAM_NAME'],
                'fecha' => $row['AVD_AVAILABLE_DATE'],
                'horaDesde' => $row['AVD_AVAILABLE_HOUR_SINCE'],
                'horaHasta' => $row['AVD_AVAILABLE_HOUR_UNITL']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se encontraron resultados.'));
    }

    echo $respuesta;
}




if ($post['accion'] == "AgregarStGrupo") {
    $sentencia = sprintf(
        "INSERT INTO groupstage (GRUP_CODE, SPG_CODE , GRS_TYPE_GANDER) VALUES ('%s', '%s', '%s')",
        $post['grupCode'],
        $post['spgCode'],
        $post['Genero']
    );
    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos Guardados Correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar"));
    }
    echo $respuesta;
}

if ($post['accion'] == "ActualizarStGrupo") {
    // Obtener los datos del POST
    $stagecod = $post['id_grupoestado'];
    $grupCode = $post['grupCode'];
    $spgCode = $post['spgCode'];
    //$genero = $post['Genero'];
        // Actualizar los datos del grupo
        $sentencia = sprintf(
            "UPDATE groupstage SET GRUP_CODE='%s',SPG_CODE='%s' WHERE GRS_CODE='%s'",
            mysqli_real_escape_string($mysqli, $grupCode),
            mysqli_real_escape_string($mysqli, $spgCode),
            mysqli_real_escape_string($mysqli, $stagecod)
        );

        $result = mysqli_query($mysqli, $sentencia);

        if ($result) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Datos actualizados correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar.'));
        }
    
    echo $respuesta;
}


/*********************************** */
//SEDEES EMPRESA
/********************************** */
//BUSCA LAS SEDES
// BUSCA LAS SEDES Y RELACIONA CON business_information

if ($post['accion'] == "consultarSede") {
    $direcccionSede = isset($post['direcccionSede']) ? $post['direcccionSede'] : '';
    if ($direcccionSede != '') {
        $sentencia = sprintf(
            "SELECT bh.*, bi.BUIF_NAME 
            FROM busineess_headquarters bh 
            JOIN business_information bi ON bh.BUIF_CODE = bi.BUIF_CODE 
            WHERE bh.BUSH_ADDRES = '%s'",
            mysqli_real_escape_string($mysqli, $direcccionSede)
        );
    } else {
        $sentencia = "SELECT bh.*, bi.BUIF_NAME 
                      FROM busineess_headquarters bh 
                      JOIN business_information bi ON bh.BUIF_CODE = bi.BUIF_CODE";
    }

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['BUSH_CODE'],
                'direccion' => $row['BUSH_ADDRES'],
                'ciudad' => $row['BUSH_CITY'],
                'pais' => $row['BUSH_COUNTRY'],
                'telefono' => $row['BUSH_PHONE'],
                'estado' => $row['BUSH_STATE_HEADQUARTERS'],
                'usuario_insert' => $row['BUSH_USER_INSERT'],
                'usuario_update' => $row['BUSH_USER_UPDATE'],
                'usuario_delete' => $row['BUSH_USER_DELETE'],
                'fecha_insert' => $row['BUSH_INSERT_DATE'],
                'fecha_update' => $row['BUSH_UPDATE_DATE'],
                'fecha_delete' => $row['BUSH_DELETE_DATE'],
                'nombre' => $row['BUIF_NAME'] // Trae el nombre de la empresa
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

// ESTE TRAE EMPRESA
//loadbusinessinfo
if ($post['accion'] == "loadbusinessinfo2") {
    // Realizamos el INNER JOIN para obtener BUSH_CODE y BUIF_NAME
    $sentencia = sprintf("SELECT * from business_information");
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'BUIF_CODE' => $row['BUIF_CODE'],
                'BUIF_NAME' => $row['BUIF_NAME']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR"));
    }

    echo $respuesta;
}


if ($post['accion'] == "insertar_sede") {
    // Insertar los datos directamente en la tabla 'busineess_headquarters'
    $sentencia = sprintf(
        "INSERT INTO busineess_headquarters(
            BUSH_ADDRES, 
            BUSH_CITY, 
            BUSH_COUNTRY, 
            BUSH_PHONE, 
            BUSH_STATE_HEADQUARTERS, 
            BUIF_CODE
        ) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')",
        $post['direccion'],
        $post['ciudad'],
        $post['pais'],
        $post['telefono'],
        $post['estado'],
        $post['empresa']
    );

    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos insertados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar datos"));
    }
    echo $respuesta;
}


//FUNCION PARA ELIMINAR EMPRESA 
if ($post['accion'] == "eliminarSede") {
    $Sedeid = $post['codigo'];
    $sentencia = sprintf(
        "DELETE FROM busineess_headquarters WHERE BUSH_CODE = '%s'",
        $Sedeid
    );
    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos eliminados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar datos"));
    }
    echo $respuesta;
}

// if ($post['accion'] == "dsedes") {
//     // Consulta actualizada con los campos de la tabla business_headquarters
//     $sentencia = sprintf(
//         "
//         SELECT bh.BUSH_CODE, bh.BUSH_ADDRES, bh.BUSH_CITY, bh.BUSH_COUNTRY, bh.BUSH_PHONE, 
//                bh.BUSH_STATE_HEADQUARTERS
//         FROM busineess_headquarters bh
//         WHERE bh.BUSH_CODE = '%s'",
//         $post['codigo']
//     );

//     $result = mysqli_query($mysqli, $sentencia);

//     if (mysqli_num_rows($result) > 0) {
//         while ($row = mysqli_fetch_array($result)) {
//             $datos[] = array(
//                 'codigo' => $row['BUSH_CODE'],
//                 'direccion' => $row['BUSH_ADDRES'],
//                 'ciudad' => $row['BUSH_CITY'],
//                 'pais' => $row['BUSH_COUNTRY'],
//                 'telefono' => $row['BUSH_PHONE'],
//                 'estado' => $row['BUSH_STATE_HEADQUARTERS']

//             );
//         }
//         $respuesta = json_encode(array('estado' => true, "info" => $datos));
//     } else {
//         $respuesta = json_encode(array('estado' => false, "mensaje" => "No hay datos"));
//     }
//     echo $respuesta;
// }


if ($post['accion'] == "dsedes") {
    // Consulta actualizada con JOIN para obtener el BUIF_CODE de la tabla business_information
    $sentencia = sprintf(
        "
        SELECT bh.BUSH_CODE, bh.BUSH_ADDRES, bh.BUSH_CITY, bh.BUSH_COUNTRY, bh.BUSH_PHONE, 
               bh.BUSH_STATE_HEADQUARTERS, bi.BUIF_CODE
        FROM busineess_headquarters bh
        INNER JOIN business_information bi ON bh.BUIF_CODE = bi.BUIF_CODE
        WHERE bh.BUSH_CODE = '%s'",
        $post['codigo']
    );

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['BUSH_CODE'],
                'direccion' => $row['BUSH_ADDRES'],
                'ciudad' => $row['BUSH_CITY'],
                'pais' => $row['BUSH_COUNTRY'],
                'telefono' => $row['BUSH_PHONE'],
                'estado' => $row['BUSH_STATE_HEADQUARTERS'],
                'empresa' => $row['BUIF_CODE'] // Código de la información de negocios
            );
        }
        $respuesta = json_encode(array('estado' => true, "info" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No hay datos"));
    }
    echo $respuesta;
}



if ($post['accion'] == "actualizar_sede") {
    // Paso 1: Preparar la sentencia de actualización
    $sentencia = sprintf(
        "UPDATE busineess_headquarters 
         SET BUSH_ADDRES = '%s', 
             BUSH_CITY = '%s', 
             BUSH_COUNTRY = '%s', 
             BUSH_PHONE = '%s', 
             BUSH_STATE_HEADQUARTERS = '%s', 
             BUIF_CODE = '%s' 
         WHERE BUSH_CODE = '%s'",
        $post['direccion'],
        $post['ciudad'],
        $post['pais'],
        $post['telefono'],
        $post['estado'],
        $post['empresa'],
        $post['codigo'] // Este es el campo que se usa para hacer la actualización
    );

    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos actualizados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar datos"));
    }
    echo $respuesta;
}
// //buscar personas 
// if ($post['accion'] == "searchUsers") {
//     //me trae el nombre, apellido o cedula
//     $searchTerm = $post['result'];
//     $sentencia = sprintf(
//         "SELECT * FROM info_client WHERE ICLI_FIRST_NAME LIKE '%%%s%%' OR ICLI_LAST_NAME LIKE '%%%s%%' OR ICLI_CARD LIKE '%%%s%%'",
//         mysqli_real_escape_string($mysqli, $searchTerm),
//         mysqli_real_escape_string($mysqli, $searchTerm),
//         mysqli_real_escape_string($mysqli, $searchTerm)
//     );
//     $result = mysqli_query($mysqli, $sentencia);
//     if (mysqli_num_rows($result) > 0) {
//         $datos = array();
//         while ($row = mysqli_fetch_array($result)) {
//             $datos[] = array(
//                 'codigo' => $row['ICLI_CODE'],
//                 'nombre' => $row['ICLI_FIRST_NAME'] . ' ' . $row['ICLI_LAST_NAME'],
//                 'cedula' => $row['ICLI_CARD']
//             );
//         }
//         $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
//     } else {
//         $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se encontraron resultados.'));
//     }

//     echo $respuesta;
// }
// loadGroup
if ($post['accion'] == "loadGroupData") {
    $spg_code = $post['SPG_CODE']; // Código del grupo deportivo

    // Consulta para obtener los datos del grupo deportivo, incluyendo los datos de madrina, mascota, y el deporte
    $sentencia = "
        SELECT 
            sg.SPG_TEAM_NAME, 
            sg.SPG_CREATION_DATE,
            sg.SPG_SIGNATURE,
            sg.SPG_OBSERVATIONS,
            sg.SPG_GENDER_TEAM,
            sg.SPG_LOGO,
            r.RU_RULES_FOR_SPORTS AS sport_name,
            r. RU_CODE AS rule_code,
            godmother.ICLI_FIRST_NAME AS godmother_first_name,
            godmother.ICLI_LAST_NAME AS godmother_last_name,
            godmother.ICLI_CODE AS godmother_code,
            pet.ICLI_FIRST_NAME AS pet_first_name,
            pet.ICLI_LAST_NAME AS pet_last_name,
            pet.ICLI_CODE AS pet_code
        FROM 
            sports_groups sg
        INNER JOIN 
            info_client godmother ON sg.ICLI_GODMOTHER = godmother.ICLI_CODE
        INNER JOIN 
            info_client pet ON sg.ICLI_TEAM_PED_ID = pet.ICLI_CODE
        INNER JOIN 
            rules r ON sg.RU_CODE = r.RU_CODE
        WHERE 
            sg.SPG_CODE = '$spg_code'
    ";

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = mysqli_fetch_array($result);
        $respuesta = json_encode(array(
            'estado' => true, 
            'info' => array(
                'group_name' => $datos['SPG_TEAM_NAME'],
                'creation_date' => $datos['SPG_CREATION_DATE'],
                'rule_code' => $datos['rule_code'],
                'signature' => $datos['SPG_SIGNATURE'],
                'logo' => $datos['SPG_LOGO'],
                'observations' => $datos['SPG_OBSERVATIONS'],
                'gender_team' => $datos['SPG_GENDER_TEAM'],
                'sport_name' => $datos['sport_name'],
                'godmother_name' => $datos['godmother_first_name'] . ' ' . $datos['godmother_last_name'],
                'godmother_code' => $datos['godmother_code'],
                'pet_name' => $datos['pet_first_name'] . ' ' . $datos['pet_last_name'],
                'pet_code' => $datos['pet_code']
            )
        ));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se encontraron datos para el grupo.'));
    }

    echo $respuesta;
}

if ($post['accion'] == "insertGroup") {
    $insert_query = sprintf(
        "INSERT INTO sports_groups (SPG_TEAM_NAME, RU_CODE, SPG_LOGO, ICLI_GODMOTHER, ICLI_TEAM_PED_ID, ICLI_TEAM_LEADER_ID, SPG_SIGNATURE, SPG_OBSERVATIONS, SPG_CREATION_DATE, SPG_GENDER_TEAM, SPG_STATE_MATCH) 
        VALUES ('%s', '%s','%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
        $post['group_name'],
        $post['rule_code'],
        $post['logo'],
        $post['godmother_code'],
        $post['pet_code'],
        $post['leader_code'],
        $post['signature'],
        $post['observations'],
        $post['creation_date'],
        $post['gender_team'],
        "Equipo no clasificado"
    );

    if (mysqli_query($mysqli, $insert_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Grupo deportivo insertado correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar el grupo deportivo"));
    }

    echo $respuesta;
}

if ($post['accion'] == "updateGroup") {
    $update_query = sprintf(
        "UPDATE sports_groups 
        SET SPG_TEAM_NAME='%s', RU_CODE='%s', SPG_LOGO='%s', ICLI_GODMOTHER='%s', ICLI_TEAM_PED_ID='%s', ICLI_TEAM_LEADER_ID='%s', SPG_SIGNATURE='%s', SPG_OBSERVATIONS='%s', SPG_CREATION_DATE='%s', SPG_GENDER_TEAM='%s', SPG_STATE_MATCH='Equipo no clasificado'
        WHERE SPG_CODE='%s'",
        $post['group_name'],
        $post['rule_code'],
        $post['logo'],
        $post['godmother_code'],
        $post['pet_code'],
        $post['leader_code'],
        $post['signature'],
        $post['observations'],
        $post['creation_date'],
        $post['gender_team'],
        $post['SPG_CODE']
    );

    if (mysqli_query($mysqli, $update_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Grupo deportivo actualizado correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar el grupo deportivo"));
    }

    echo $respuesta;
}

if ($post['accion'] == "loadDates") {
    $sentencia = sprintf(
        "SELECT *
        FROM available_dates av
        INNER JOIN sports_groups sp ON av.SPG_CODE = sp.SPG_CODE
        WHERE sp.ICLI_TEAM_LEADER_ID = '%s' and sp.SPG_CODE='%s' ", 
        $post['codigo'],
        $post['codigo2'],

    );
    
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'sport_code' => $row['SPG_CODE'],
                'date_code' => $row['AVD_CODE'],
                'date_type' => $row['AVD_TYPE'],
                'date_avaliable' => $row['AVD_AVAILABLE_DATE'],
                'date_hour_since' => $row['AVD_AVAILABLE_HOUR_SINCE'],
                'date_hour_until' => $row['AVD_AVAILABLE_HOUR_UNITL']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existe fechas para este grupo'));
    }

    echo $respuesta;
}

if ($post['accion'] == "loadSportGroupName") {
    $sentencia = sprintf(
        "SELECT SPG_CODE, SPG_TEAM_NAME
         FROM sports_groups 
         WHERE SPG_CODE = '%s'", 
        $post['codigo']
    );
    
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'sport_code' => $row['SPG_CODE'],
                'teamName' => $row['SPG_TEAM_NAME'],
                
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'ERROR'));
    }

    echo $respuesta;
}


if ($post['accion'] == "loadAvaliableDates") {
    $sentencia = sprintf(
        "SELECT * FROM available_dates where AVD_CODE= '%s'", 
        $post['codigo']
    );
    
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'type' => $row['AVD_TYPE'],
                'sportGroupName' => $row['SPG_CODE'],
                'date' => $row['AVD_AVAILABLE_DATE'],
                'timeFrom' => $row['AVD_AVAILABLE_HOUR_SINCE'],
                'timeTo' => $row['AVD_AVAILABLE_HOUR_UNITL'],
                
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'ERROR'));
    }

    echo $respuesta;
}
//insertar dates insertAvaliableDates  
if ($post['accion'] == "insertAvaliableDates") {
    $insert_query = sprintf(
        "INSERT INTO available_dates (AVD_TYPE, SPG_CODE, AVD_AVAILABLE_DATE, AVD_AVAILABLE_HOUR_SINCE, AVD_AVAILABLE_HOUR_UNITL)
        VALUES ('%s', '%s', '%s', '%s', '%s')",
        $post['type'],
        $post['sportGroupName'],
        $post['date'],
        $post['timeFrom'],
        $post['timeTo']
    );

    if (mysqli_query($mysqli, $insert_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Fecha insertada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar la fecha"));
    }

    echo $respuesta;
}
//updateAvaliableDates
if ($post['accion'] == "updateAvaliableDates") {
    $update_query = sprintf(
        "UPDATE available_dates
        SET AVD_TYPE='%s', SPG_CODE='%s', AVD_AVAILABLE_DATE='%s', AVD_AVAILABLE_HOUR_SINCE='%s', AVD_AVAILABLE_HOUR_UNITL='%s'
        WHERE AVD_CODE='%s'",
        $post['type'],
        $post['sportGroupName'],
        $post['date'],
        $post['timeFrom'],
        $post['timeTo'],
        $post['codigo']
    );

    if (mysqli_query($mysqli, $update_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Fecha actualizada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la fecha"));
    }

    echo $respuesta;
}
//deleteAvaliableDates
if ($post['accion'] == "deleteDate") {
    $delete_query = sprintf(
        "DELETE FROM available_dates
        WHERE AVD_CODE='%s'",
        $post['codigo']
    );

    if (mysqli_query($mysqli, $delete_query)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Fecha eliminada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar la fecha"));
    }

    echo $respuesta;
}



