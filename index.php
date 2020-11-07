<?php

include "html/header.html";

include "html/formulario_consulta.html";

if( isset( $_GET['tiempo'] ) && isset( $_GET['temperatura'] ) && isset( $_GET['tiempoIcono'] ) && isset( $_GET['localidad'] ) ){
    include "html/tiempo.html";
    echo <<<EOT
<script defer src="js/colocarTiempo.js"></script>
EOT;
}
if( isset( $_GET['error'] ) ){
    include "html/error.html";
    echo <<<EOT
<script defer src="js/mostrarError.js"></script>
EOT;
}

include "html/footer.html";