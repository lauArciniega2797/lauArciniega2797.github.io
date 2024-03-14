<?php
$palabras_juego = [
    "Laurencia", 
    'Arciniega', 
    'Yagate Kimi Ni Naru', 
    'Watashi no Oshi wa Akuyaku Reijou', 
    'Citrus',
    'Shingeki no kyojin', 
    'anime', 
    'JavaScript'
];
define('MAX_ATTEMPT', 6); #limite de intentos
$letras_user = array();
$intentos = 1;
$palabra = strtolower($palabras_juego[rand(0, 7)]);
$adivino = '';
$end_game = '';

do {
    echo "¡Salva a Pancho de la horca! 😮 \n";
    echo "Palabra de " . strlen($palabra)." letras. Tienes " . MAX_ATTEMPT . " intentos";
    do {
        echo "\n\n" . letras_adivinadas($palabra, $letras_user) . "\n";
        $respuesta_user = validateReadline(trim(strtolower(readline("Ingresa una letra: "))));

        if (!$respuesta_user) {
            continue;
        }

        check_letter($respuesta_user);


    } while ($adivino != 'si' && $adivino != 's' && $intentos <= MAX_ATTEMPT);

    echo "\n\n";
    end_game();

    $end_game = readline("¿Quieres seguir jugando? ");

    if ($end_game == 'si' or $end_game == 's') {
        reload_game();
    }
} while ($end_game != 'no' && $end_game != 'n');


function reload_game () {
    // system('cls');
    popen('cls', 'w');
    $GLOBALS['letras_user'] = array();
    $GLOBALS['intentos'] = 1;
    $GLOBALS['palabra'] = strtolower($GLOBALS['palabras_juego'][rand(0, 7)]);
    $GLOBALS['adivino'] = '';
    $GLOBALS['end_game'] = '';

}

function end_game () {
    if ($GLOBALS['intentos'] >= MAX_ATTEMPT) {
        echo setMonito(6);
        echo "¡Ups! La palabra era: '" . $GLOBALS['palabra'] . "'. Intenta de nuevo\n\n";
        return;
    }

    $user_attempt = trim(readline("¿Adivinaste la palabra? Ingresa la palabra/frase: "));
    if ($user_attempt == $GLOBALS['palabra']) {
        echo setMonito('saved');
        echo "¡Lo lograste! la palabra/frase a adivinar era '" . $GLOBALS['palabra'] . "' \n\n" ;
    } else {
        echo setMonito(6);
        echo "¡Ups! La palabra era: '" . $GLOBALS['palabra'] . "'. Intenta de nuevo. \n\n";
    }
}

function check_letter ($respuesta_user) {
    if (str_contains($GLOBALS['palabra'], $respuesta_user)) {
        echo '¡Buen trabajo! Encontramos ' . substr_count($GLOBALS['palabra'], $respuesta_user) . ' coincidencias.';
        array_push($GLOBALS['letras_user'], $respuesta_user);
        if (count($GLOBALS['letras_user']) % 3 == 0) {
            $GLOBALS['adivino'] = strtolower(readline("\n¿Lo has adivinado? "));
        }
    } else {
        echo setMonito($GLOBALS['intentos']);
        echo "No has acertado. Te quedan " . MAX_ATTEMPT - $GLOBALS['intentos'] . " intentos. \n";
        $GLOBALS['intentos']++;
        
    }
}

function setMonito ($attempt) {
    $monito = '';
    switch ($attempt) {
        case 1:
            $monito = "
                  __
                 |  |
                 |
                 |
                 |
                _|_____
            ";
            break;
        case 2:
            $monito = "
                  __
                 |  |
                 | 😮
                 |
                 |
                _|_____
            ";
            break;
        case 3:
            $monito = "
                  __
                 |  |
                 | 😮
                 |  |
                 |
                _|_____
            ";            
            break;
        case 4:
            $monito = "
                  __
                 |  |
                 | 😮
                 | /|
                 |
                _|_____
            ";  
            break;
        case 5:
            $monito = "
                  __
                 |  |
                 | 😮
                 | /|\
                 |
                _|_____
            ";  
            break;
        case 5:
            $monito = "
                  __
                 |  |
                 | 😮
                 | /|\
                 | /
                _|_____
                 
            ";  
            break;
        case 6:
            $monito = "
                 __
                |  |
                | 😵
                | /|\
                | / \
               _|_____
            ";  
            break;
        case 'saved':
            $monito = "
            🎉 \😉/ 🎉
                 |   
                / \
            ";  
            break;
    }

    return $monito;
}

function validateReadline ($letra) {

    if (strlen($letra) < 1) {
        return false;
    }

    return str_split($letra)[0];

}

function letras_adivinadas($palabra, $adivinadas) {
    $progreso_adivinanza = str_pad('', strlen($palabra), '_');

    if (count($adivinadas)) {
        $palabra = str_split($palabra);

        foreach ($palabra as $ix => $letra) {
            if (array_search($letra, $adivinadas) !== false) {
                $progreso_adivinanza = substr_replace($progreso_adivinanza, $letra, $ix, 1);
            }
        }
    }

    return $progreso_adivinanza;
}