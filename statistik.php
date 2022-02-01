<?php
    header("Access-Control-Allow-Origin: *");

    //$server = "localhost";
    $server = "127.0.0.1:3305";
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    $connection = new mysqli($server,$name,$passwort,$datenbank);
    $connection->set_charset("utf8mb4");

    if($connection->connect_error){
        die("Verbindung fehlgeschlagen");
    }



    if($_GET['req']=="kategorie"){

        $allRows = array();
        $table = $_GET['table'];

        $sql = "SELECT * FROM $table";
        $erg = $connection->query($sql);
        
        while($row = $erg->fetch_assoc()){
            $allRows[] = $row;
        }

        echo json_encode($allRows);
    }



?>