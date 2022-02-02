<?php
header("Access-Control-Allow-Origin: *");

    $server = "localhost";    // Privatrechner
    //$server = "127.0.0.1:3305"; // Arbeitsrechner
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    //Verbindungsaufbau
    $connection = new mysqli($server, $name, $passwort, $datenbank);
    $connection->set_charset("utf8mb4");

    if($connection->connect_error){
        die("Verbindung fehlgeschlagen");
    }


    if($_GET['req']=="erstellen"){

        $fragennamen=[
            0=>"essen_auswahl",
            1=>"event_auswahl",
            2=>"gedanken_auswahl",
            3=>"wetter_auswahl",
            4=>"lösungen_auswahl",
            5=>"ort_auswahl",
            //...........
        ];

        $allRows = array();
        
        for($i=0;$i<6;$i++){

            $sql = "SELECT * FROM $fragennamen[$i]";
            $erg = $connection->query($sql);
            while($row = $erg->fetch_assoc()){
                $allRows[] = $row;
            }

        }

        echo json_encode($allRows);
    } 
    
?>