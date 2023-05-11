<?php
    //diese Zeile erlaubt die Kommunikation zwischen verschiedenen Domänen dh. Browser und Privater Server
    header("Access-Control-Allow-Origin: *");

    // Die nötigen Werte um sich mit dem Richtigen Server 
    // und Datenbank zu verbinden
    // In den Servervariablen muss was anderes stehen, 
    // je nachdem welchen PC ich nutze
    // $server = "localhost"; // Privatrechner
    // $server = "127.0.0.1:3305"; // Arbeitsrechner
    $server = fgets(fopen("config.txt","r"));
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



    
    // Dies ist die Speicherfunktion auf dem Server
    // Die Daten werden per URL hierher gesendet, 
    // zerteilt und in entspechenden Variablen gespeichert
    // Anschließend wird ein SQL Statement gebildet, 
    // mit welchem die Daten in die Datenbank gespeichert werden
    //#####################################################
    if($_GET['req']=="speichern"){

        // Es wird ein SQL prapared Statement als String erzeugt
        // Die Fragezeichen stehen stellvertretend 
        // für die Werte der Variablen 
        $sql = $connection->prepare("INSERT INTO einträge 
        (Tag,Monat,Jahr,Sekunde,Minute,Stunde,Farbe,Emotion,
        Gedanken,Situation,Produktivität,Handeln,
        Bewertung,Essen,Verträglichkeit,Schlaf,Müde,
        Wetter,Warm,Ereignis,Ort,Kontakt,Verhältnis,Lösung,Notiz) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

        $sql->bind_param('iiiiiissssiiisiiisisssiss',
        $tag,$monat,$jahr,$sekunde,$minute,$stunde,$farbe,
        $emotion,$gedanken,$situation,$produk,$handeln,$bewertung,
        $essen,$verträglichkeit,$schlaf,$müde,$wetter,$warm,
        $ereignis,$ort,$kontakt,$verhältnis,$lösung,$notiz);

        $tag = (int)$_GET['tag'];
        $monat = (int)$_GET['monat'];
        $jahr = (int)$_GET['jahr'];
        $sekunde = (int)$_GET['sekunde'];
        $minute = (int)$_GET['minute'];
        $stunde = (int)$_GET['stunde'];
        $farbe = $_GET['farbe'];
        $emotion = $_GET['emotion'];
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
        $ereignis = $_GET['event'];   
        $ort = $_GET['ort'];
        $kontakt = $_GET['kontakt'];
        $verhältnis = (int)$_GET['verhältnis'];
        $lösung = $_GET['lösung'];
        $notiz = $_GET['notiz'];

        $sql->execute();

        $sql->close();

        $connection->close();


        echo "Angaben wurden erfolgreich gespeichert";
    }
    //#############
    //
    else if($_GET['req']=="hinzufügen"){

        $tabelle = $_GET['tabelle'];

        switch($tabelle){
            case 'gedanken_auswahl':
                $sql = $connection->prepare("INSERT INTO gedanken_auswahl (Gedanken) VALUES (?)");
                break;
            case 'essen_auswahl':
                $sql = $connection->prepare("INSERT INTO essen_auswahl (Essen) VALUES (?)");
                break;
            case 'wetter_auswahl':
                $sql = $connection->prepare("INSERT INTO wetter_auswahl (Wetter) VALUES (?)");
                break;
            case 'event_auswahl':
                $sql = $connection->prepare("INSERT INTO event_auswahl (Ereignis) VALUES (?)");
                break;
            case 'ort_auswahl':
                $sql = $connection->prepare("INSERT INTO ort_auswahl (Ort) VALUES (?)");
                break;
            case 'lösungen_auswahl':
                $sql = $connection->prepare("INSERT INTO lösungen_auswahl (Lösung) VALUES (?)");
                break;
        }

        $sql->bind_param('s',$eingabe);

        $eingabe = $_GET['eingabe'];

        $sql->execute();
        $sql->close();
        $connection->close();
    }
    //#############
    else if($_GET['req']=="puzzle"){

        $sql = $connection->prepare("INSERT INTO puzzle (Zeit,Spielzüge)VALUES(?,?)");
        $sql->bind_param('ii',$zeit,$züge);

        $zeit = $_GET['zeit'];
        $züge = $_GET['züge'];

        $sql->execute();
        $sql->close();
        $connection->close();
    }

    /*
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
    */
?>