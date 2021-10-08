<?php
    //diese Zeile erlaubt die Kommunikation zwischen verschiedenen Domänen dh. Browser und Privater Server
    header("Access-Control-Allow-Origin: *");

    //Die nötigen Werte um sich mit dem Richtigen Server und Datenbank zu verbinden
    $server = "localhost";
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    //Verbindungsaufbau
    $connection = new mysqli($server, $name, $passwort, $datenbank);

    //Wenn es bei der Verbindung ein Problem gab, soll das Skript beendet und ein 
    //Fehler zurück gegeben werden
    if($connection->connect_error){
        die("Verbindung fehlgeschlagen");
    }

    

    //#####################################################
    if($_GET['req']=="tagesstatistik"){

        //Die einzelnen übergebenen Daten werden aus der URL in Varablen geschrieben
        $tag = (int)$_GET['tag'];
        $monat = (int)$_GET['monat'];
        $jahr = (int)$_GET['jahr'];
        $sekunde = (int)$_GET['sekunde'];
        $minute = (int)$_GET['minute'];
        $stunde = (int)$_GET['stunde'];
        $farbe = $_GET['farbe'];
        $emotion = $_GET['emotion'];
        $was = $_GET['was'];
        $warum = $_GET['warum'];

        //Es wird ein SQL Befehl als String erzeugt
        // !!! WICHTIG !!! Die Variablen, die Strings beinhalten mussen in einfache Anführungsstriche gesetzt werden -> '$str' 
        $sql = "INSERT INTO angaben (Tag, Monat, Jahr, Stunde, Minute, Sekunde, Farbe, Emotion, Was, Warum) VALUES ($tag, $monat, $jahr, $stunde, $minute, $sekunde, '$farbe', '$emotion', '$was', '$warum')";

        //Der SQL Befehl wird ausgeführt
        $execute = $connection->query($sql);

        //Wenn es beim Speichern der Daten ein Problem geben sollte, dann wird hier eine entsprechende Fehlermeldung zurück gegeben
        //und das Skript beendet
        if(mysqli_error($connection)){
            die("Speichern fehlgeschlagen\n\n".mysqli_error($connection));
        }

        //Wenn alles ohne Probleme funktioniert hat, dann wird diese Meldung an den Client zurück geschickt
        echo "Angaben wurden erfolgreich gespeichert";
    }
    //#####################################################


?>