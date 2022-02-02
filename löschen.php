<?php
    header("Access-Control-Allow-Origin: *");

    $server = "localhost"; // Privatrechner
    //$server = "127.0.0.1:3305"; // Arbeitsrechner
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    $connection = new mysqli($server,$name,$passwort,$datenbank);    
    $connection->set_charset("utf8mb4");

    if($connection->connect_error){
        die("Verbindung fehlgeschlagen\n\n".$connection->connect_error);
    }



    if($_GET['req']=="option"){

        $tabelle = $_GET['tabelle'];
        $spalte = $_GET['spalte'];
        $value = $_GET['selected'];

        $sql = "DELETE FROM $tabelle WHERE $spalte='$value'";

        $erg = $connection->query($sql);

        if(mysqli_error($connection)){
            die("Löschen fehlgeschlagen\n\n".mysqli_error($connection));
        }
        else{
            echo "Option gelöscht";
        }

    }



    /*
    if($_GET['req']=="eintrag"){

        $id = $_GET['id'];

        $sql = "DELETE FROM angaben WHERE ID=".$id;

        $erg = $connection->query($sql);

        if(mysqli_error($connection)){
            die("Löschen fehlgeschlagen\n\n".mysqli_error($connection));
        }
        else{
            echo $erg;
        }
    }*/

?>