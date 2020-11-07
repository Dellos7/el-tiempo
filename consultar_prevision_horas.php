<?php

include_once( "./bootstrap.php" );

$apiKey = $_ENV['OPENWEATHERMAP_API_KEY'];
$apiBaseUrl = $_ENV['API_BASE_URL'] . '/onecall';
$apiTiempoPorHorasUrl = $apiBaseUrl . '?appid=' . $apiKey . '&lang=es&units=metric&exclude=minutely';
$apiTiempoPorHorasUrl .= '&lat=' . floatval($_POST['lat']) . '&lon=' . floatval($_POST['lon']);

$requestRes = file_get_contents($apiTiempoPorHorasUrl);
$jsonRes = json_decode($requestRes);
//echo "<pre>" . print_r($jsonRes, true) .  "</pre>";
header('Content-Type: application/json');
echo $requestRes;