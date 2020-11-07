<?php

include_once( "./bootstrap.php" );
//$apiKey = '977d63d66ab0b41b847912f5c1bd6ee9';
//$apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
$apiKey = $_ENV['OPENWEATHERMAP_API_KEY'];
$apiBaseUrl = $_ENV['API_BASE_URL'] . '/weather';
$apiBusquedaUrl .= $apiBaseUrl . '/?appid=' . $apiKey . '&lang=es&units=metric';

if( isset($_POST['localidad']) && $_POST['localidad'] ){
    $apiBusquedaUrl .= '&q=' . $_POST['localidad'];
} else if( isset($_POST['lat']) && isset($_POST['lon']) ){
    echo "entraaaaa <br>";
    $apiBusquedaUrl .= '&lat=' . $_POST['lat'] . '&lon=' . $_POST['lon'];
}
$requestRes = file_get_contents($apiBusquedaUrl);
$jsonRes = json_decode($requestRes);

if( $jsonRes ){
    echo "<pre>" . print_r($jsonRes, true) . "</pre>";
    $tiempo = $jsonRes->weather[0]->description;
    $tiempoIcono = $jsonRes->weather[0]->icon;
    $temperatura = floor( $jsonRes->main->temp );
    $salidaDelSol = $jsonRes->sys->sunrise;
    $puestaDelSol = $jsonRes->sys->sunset;
    $latitud = $jsonRes->coord->lat;
    $longitud = $jsonRes->coord->lon;
    $localidad = $jsonRes->name;
    header( "Location: index.php?tiempo=" . $tiempo . '&temperatura=' . $temperatura . 
            '&tiempoIcono=' . $tiempoIcono . '&localidad=' . $localidad .
            '&salidaDelSol=' . $salidaDelSol . '&puestaDelSol=' . $puestaDelSol .
            '&lat=' . $latitud . '&lon=' . $longitud );
} else{
    $error = 'No se han encontrado resultados para los datos proporcionados.';
    echo $error . '<br>';
    header( "Location: index.php?error=" . $error );
}
