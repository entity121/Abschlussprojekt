<?php
    //diese Zeile erlaubt die Kommunikation zwischen verschiedenen Domänen dh. Browser und Privater Server
    header("Access-Control-Allow-Origin: *");

    //Die nötigen Werte um sich mit dem Richtigen Server und Datenbank zu verbinden
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
        die("Verbindung fehlgeschlagen");
    }

    //Das erfragte Datum in Variablen (Tag nur bei Tagesstatistik)
    if($_GET['req']=="tagesstatistik"){$tag = (int)$_GET['tag'];}
    $monat = (int)$_GET['monat'];
    $jahr = (int)$_GET['jahr'];

    //Es wird ein Array für alle Einträge, die der Anforderung entsprechen in ein Array gespeichert
    //Dieses Array soll später zurück geschickt werden
    $allRows = array();

    //SQL Befehl alle Einträge finden
    if($_GET['req']=="tagesstatistik"){$sql = "SELECT * FROM einträge WHERE Tag=$tag AND Monat=$monat AND Jahr=$jahr";} // Tag
    if($_GET['req']=="monatsstatistik"){$sql = "SELECT * FROM einträge WHERE Monat=$monat AND Jahr=$jahr";} // Monat

    //Alle Einträge als Array zurück bekommen
    $erg = $connection->query($sql);

    //Diese While-Schleife tut offenbar folgendes 
    //Bei jedem neuen Durchlauf wird die chonologisch nächste 
    //Row aus dem vollständigen Array(erg) rausgeholt und in ein anderes Array(row) gespeichert
    //es wird immer nur eine einzelne Row gespeichert und beim nächsten durchlauf überschrieben
    //wenn alle rows abgearbeitet wurden, dann beendet sich der loop, weil die Bedingung nicht mehr zutrifft
    //die Bedingung interpretiere ich wie folgt: Wenn eine Row aus dem gesammten Array(erg) in das Array(row) gespeichert werden konnte
    //Ist false wenn es keine chronologisch nächste Reihe im Array(erg gibt)
    //Um das Überschreiben zu verhindern wird jede Row in ein dafür vorgesehenes Array gespeichert

    while($row = $erg->fetch_assoc()){
        $allRows[] = $row;
    }
    
    //$out = $erg->fetch_assoc();
    //echo json_encode($out);

    //$out = $erg->fetch_all()
    echo json_encode($allRows);
?>