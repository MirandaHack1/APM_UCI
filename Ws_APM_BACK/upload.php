<?php
include 'config.php'; // Incluye tu configuración de base de datos

// Permitir solicitudes desde cualquier origen (puedes especificar un origen específico si prefieres)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar opciones preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
        $directorioDestino = './uploads/pdfs/';
        $archivoNombre = basename($_FILES['archivo']['name']);
        $rutaArchivo = $directorioDestino . $archivoNombre;

        // Crear directorio si no existe
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Mover el archivo cargado
        if (move_uploaded_file($_FILES['archivo']['tmp_name'], $rutaArchivo)) {
            // Enviar respuesta
            $respuesta = array('estado' => true, 'archivo_url' => $rutaArchivo);
        } else {
            $respuesta = array('estado' => false, 'mensaje' => 'Error al mover el archivo.');
        }
    } else {
        $respuesta = array('estado' => false, 'mensaje' => 'No se ha enviado ningún archivo.');
    }
    echo json_encode($respuesta);
}



?>
