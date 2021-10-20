<?php
    header("Access-Control-Allow-Origin: *");

    $server = "127.0.0.1:3305";
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    $connection = new mysqli($server,$name,$passwort,$datenbank);

    if($connection->connect_error){
        die("Verbindung fehlgeschlagen\n\n".$connection->connect_error);
    }




    if($_GET['req']=="löschen"){

        $id = $_GET['id'];

        $sql = "DELETE FROM angaben WHERE ID=".$id;

        $erg = $connection->query($sql);

        if(mysqli_error($connection)){
            die("Löschen fehlgeschlagen\n\n".mysqli_error($connection));
        }
        else{
            echo $erg;
        }
    }

?>