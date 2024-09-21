<?php
include 'config.php'; // Incluye tu configuración de base de datos

// Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar opciones preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $respuesta = array('estado' => false);

    // Subida de archivos genéricos (por ejemplo, PDF)
    if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
        $directorioDestino = 'localhost/APM_UCI/Ws_APM_BACK/uploads/pdfs/';
        $archivoNombre = basename($_FILES['archivo']['name']);
        $rutaArchivo = $directorioDestino . $archivoNombre;

        // Crear directorio si no existe
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Mover el archivo cargado
        if (move_uploaded_file($_FILES['archivo']['tmp_name'], $rutaArchivo)) {
            $respuesta['estado'] = true;
            $respuesta['archivo_url'] = $rutaArchivo;
        } else {
            $respuesta['mensaje'] = 'Error al mover el archivo.';
        }
    }

    // Subida del logo
    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
        $directorioDestino = 'uploads/logos/';
        $logoNombre = basename($_FILES['logo']['name']);
        $rutaLogo = $directorioDestino . $logoNombre;

        // Crear directorio si no existe
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Mover el archivo cargado
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $rutaLogo)) {
            $respuesta['estado'] = true;
            $respuesta['archivo_url'] = $rutaLogo;
        } else {
            $respuesta['mensaje'] = 'Error al mover el logo.';
        }
    }

    // Subida de la imagen
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $directorioDestino = 'uploads/imagenes/';
        $imagenNombre = basename($_FILES['imagen']['name']);
        $rutaImagen = $directorioDestino . $imagenNombre;

        // Crear directorio si no existe
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Mover el archivo cargado
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
            $respuesta['estado'] = true;
            $respuesta['archivo_url'] = $rutaImagen;
        } else {
            $respuesta['mensaje'] = 'Error al mover la imagen.';
        }
    }

    // Si no se subió ningún archivo
    if (!$respuesta['estado']) {
        $respuesta['mensaje'] = 'No se ha enviado ningún archivo.';
    }

    // Enviar respuesta
    echo json_encode($respuesta);
}
