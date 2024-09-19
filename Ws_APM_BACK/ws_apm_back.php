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
/******************************************************************************************FUNCION PARA INICIO DE SESESION-USER ADMIN*************************************************************************************************/
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
    $sentencia = sprintf(
        "SELECT `USAD_CODE`, `USAD_EMAIL_RECOVERY` FROM `user_admin`  where USAD_EMAIL_RECOVERY='%s'",
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


/*********************************************************************************************************************************************************************************************************************/
// Traer los datos a mis campos en la pagina edit-user-rol
if ($post['accion'] == "consultausuarioDATOS") {
    $codigo = $post['codigo']; // Asegúrate de que el parámetro se llama `codigousu`
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
/*********************************************************************************************************************************************************************************************************************/

/*********************************************************************************************************************************************************************************************************************/
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
/*********************************************************************************************************************************************************************************************************************/



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

/*********************************************************************************************************************************************************************************************************************/
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
/*********************************************************************************************************************************************************************************************************************/


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

/************************************************************************************************************ */
// CODIGO DE FORMULARIO DE INFORMAICON DE EMPRESA
/************************************************************************************************************ */
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
        "INSERT INTO `business_information` (`BUIF_NAME`, `BUIF_LOGO`, `BUIF_MISSION`, `BUIF_VISION`, `BUIF_IMAGE`, `BUIF_STATE`, `BUIF_CONTACT`, `BUIF_USER_INSERT`, `BUIF_INSERT_DATE`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
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







/************************************************************************************************************ */
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
    $codigo = $post['id_regla']; // Asegúrate de que el parámetro se llama `codigousu`
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
/***************************************************************************************************** */
//CANCHAS
/****************************************************************************************************** */
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
            "SELECT g.GRUP_NAME, gs.GRS_TYPE_GANDER, sg.SPG_TEAM_NAME, 
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
        $sentencia = "SELECT g.GRUP_NAME, gs.GRS_TYPE_GANDER, sg.SPG_TEAM_NAME, 
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
