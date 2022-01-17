<?php
    //diese Zeile erlaubt die Kommunikation zwischen verschiedenen Domänen dh. Browser und Privater Server
    header("Access-Control-Allow-Origin: *");

    // Die nötigen Werte um sich mit dem Richtigen Server und Datenbank zu verbinden
    // In der Servervariablen muss was anderes stehen, je nachdem welchen PC ich nutze
    //$server = "localhost"; // Privatrechner
    $server = "127.0.0.1:3305"; // Arbeitsrechner
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    //Verbindungsaufbau
    $connection = new mysqli($server, $name, $passwort, $datenbank);
    // UTF-8
    $connection->set_charset("utf8mb4");

    //Wenn es bei der Verbindung ein Problem gab, soll das Skript beendet und ein 
    //Fehler zurück gegeben werden
    if($connection->connect_error){
        die("Verbindung fehlgeschlagen\n".$connection->connect_error);
    }



    
    //Dies ist die Speicherfunktion auf dem Server
    //Die Daten werden per url hierher gesendet, zerteilt und in entspechenden Variablen gespeichert
    //Anschließend werden sie per SQL Anweisung in der Datenbank abgespeichert
    //#####################################################
    if($_GET['req']=="speichern"){

        // Die einzelnen übergebenen Daten werden aus der URL in Varablen geschrieben
        $tag = (int)$_GET['tag'];
        $monat = (int)$_GET['monat'];
        $jahr = (int)$_GET['jahr'];
        $sekunde = (int)$_GET['sekunde'];
        $minute = (int)$_GET['minute'];
        $stunde = (int)$_GET['stunde'];
        $farbe = $_GET['farbe'];
        $gedanken = $_GET['gedanken'];
        $situation = $_GET['situation'];
        $produk = (int)$_GET['produk'];
        $handeln = (int)$_GET['handeln'];
        $bewertung = (int)$_GET['bewertung'];
        $essen = $_GET['essen'];
        $verträglichkeit = (int)$_GET['verträglichkeit'];
        $schlaf = (int)$_GET['schlaf'];
        $müde = (int)$_GET['müde'];
        $wetter = $_GET['wetter'];
        $warm = (int)$_GET['warm'];
        $event = $_GET['event'];   
        $kontrolle = (int)$_GET['kontrolle'];
        $ort = $_GET['ort'];
        $kontakt = $_GET['kontakt'];
        $verhältnis = (int)$_GET['verhältnis'];
        $lösung = $_GET['lösung'];
        $notiz = $_GET['notiz'];
        //$ = $_GET[''];



        //Es wird ein SQL Befehl als String erzeugt
        // !!! WICHTIG !!! Die Variablen, die Strings beinhalten mussen in einfache Anführungsstriche gesetzt werden -> '$str' 
        $sql = "INSERT INTO einträge (Tag, Monat, Jahr, Sekunde, Minute, Stunde, Farbe, Gedanken, Situation, Produktivität, Handeln, Bewertung, Essen, Verträglichkeit, ";
        $sql .= "Schlaf, Müde, Wetter, Warm, Event, Kontrolle, Ort, Kontakt, Verhältnis, Lösung, Notiz)"; 
        $sql .= "VALUES ($tag, $monat, $jahr, $sekunde, $minute, $stunde, '$farbe', '$gedanken', '$situation', $produk, $handeln, $bewertung, '$essen', $verträglichkeit, $schlaf, ";
        $sql .= "$müde, '$wetter', $warm, '$event', $kontrolle, '$ort', '$kontakt', $verhältnis, '$lösung', '$notiz')";

    }
    //#############
    else if($_GET['req']=="speichern_light"){

        $tag = (int)$_GET['tag'];
        $monat = (int)$_GET['monat'];
        $jahr = (int)$_GET['jahr'];
        $sekunde = (int)$_GET['sekunde'];
        $minute = (int)$_GET['minute'];
        $stunde = (int)$_GET['stunde'];
        $farbe = $_GET['farbe'];

        $sql = "INSERT INTO einträge (Tag, Monat, Jahr, Sekunde, Minute, Stunde, Farbe) VALUES ($tag, $monat, $jahr, $sekunde, $minute, $stunde, '$farbe')";
    }
    //############
    else if($_GET['req']=="hinzufügen"){

        $tabelle = $_GET['tabelle'];
        $spalte = $_GET['spalte'];
        $eingabe = $_GET['eingabe'];

        $sql = "INSERT INTO ".$tabelle." (".$spalte.") VALUES ('".$eingabe."')";

    }



    
    //Der SQL Befehl wird ausgeführt
    $execute = $connection->query($sql);

    //Wenn es beim Speichern der Daten ein Problem geben sollte, dann wird hier eine entsprechende Fehlermeldung zurück gegeben
    //und das Skript beendet
    if(mysqli_error($connection)){
        die("Speichern fehlgeschlagen\n\n".mysqli_error($connection));
    }

    //Wenn alles ohne Probleme funktioniert hat, dann wird diese Meldung an den Client zurück geschickt
    if($_GET['req']=="hinzufügen"){
        echo "Antwortmöglichkeit hinzugefügt";
    }
    else{
        echo "Angaben wurden erfolgreich gespeichert";
    }
    
?>