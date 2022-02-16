<?php
    header("Access-Control-Allow-Origin: *");

    //$server = "localhost";
    //$server = "127.0.0.1:3305";
    $server = fgets(fopen("config.txt","r"));
    $name = "root";
    $passwort = "";
    $datenbank = "stimmungen";

    $connection = new mysqli($server,$name,$passwort,$datenbank);
    $connection->set_charset("utf8mb4");

    if($connection->connect_error){
        die("Verbindung fehlgeschlagen");
    }


    if($_GET['req']=="suchen"){

        $erstes = true;
        
        $emotion = $_GET['emotion'];
        $gedanken = $_GET['gedanken'];
        $produk = $_GET['produk'];
        $handeln = $_GET['handeln'];
        $bewertung = $_GET['bewertung'];
        $essen = $_GET['essen'];
        $verträglichkeit = $_GET['verträglichkeit'];
        $schlaf = $_GET['schlaf'];
        $müde = $_GET['müde'];
        $wetter = $_GET['wetter'];
        $warm = $_GET['warm'];
        $event = $_GET['event'];   
        $ort = $_GET['ort'];
        $kontakt = $_GET['kontakt'];
        $verhältnis = $_GET['verhältnis'];
        $lösung = $_GET['lösung'];
        

        
        $sql = "SELECT * FROM einträge WHERE ";
        // Emotionen
        if($emotion!=""){$sql .= "Emotion='$emotion'"; $erstes=false;};
        // Gedanken
        if($gedanken!=""){if($erstes==false){$sql.=" AND ";};$sql.= "Gedanken='$gedanken'"; $erstes=false;};
        // Produktivität
        if($produk==1){if($erstes==false){$sql.=" AND ";};$sql.="Produktivität>0"; $erstes=false;};
        // Handeln
        if($handeln==1){if($erstes==false){$sql.=" AND ";};$sql.="Handeln>0"; $erstes=false;};
        // Bewertung
        if($bewertung=="-" ){if($erstes==false){$sql.=" AND ";};$sql.="Bewertung<0"; $erstes=false;};
        if($bewertung=="+" ){if($erstes==false){$sql.=" AND ";};$sql.="Bewertung>0"; $erstes=false;};
        // Essen
        if($essen!=""){if($erstes==false){$sql.=" AND ";};$sql.="Essen='$essen'"; $erstes=false;};
        // Verträglichkeit
        if($verträglichkeit=="-" ){if($erstes==false){$sql.=" AND ";};$sql.="Verträglichkeit<0"; $erstes=false;};
        if($verträglichkeit=="+" ){if($erstes==false){$sql.=" AND ";};$sql.="Verträglichkeit>0"; $erstes=false;};
        // Schlaf
        if($schlaf!=""){if($erstes==false){$sql.=" AND ";};$sql.="Schlaf<=$schlaf"; $erstes=false;};
        // Müde
        if($müde=="-" ){if($erstes==false){$sql.=" AND ";};$sql.="Müde<0"; $erstes=false;};
        if($müde=="+" ){if($erstes==false){$sql.=" AND ";};$sql.="Müde>0"; $erstes=false;};
        // Wetter
        if($wetter!=""){if($erstes==false){$sql.=" AND ";};$sql.="Wetter='$wetter'"; $erstes=false;};
        // Warm
        if($warm=="-" ){if($erstes==false){$sql.=" AND ";};$sql.="Warm<0"; $erstes=false;};
        if($warm=="+" ){if($erstes==false){$sql.=" AND ";};$sql.="Warm>0"; $erstes=false;};
        // Event
        if($event!=""){if($erstes==false){$sql.=" AND ";};$sql.="Event='$event'"; $erstes=false;};
        // Ort
        if($ort!=""){if($erstes==false){$sql.=" AND ";};$sql.="Ort='$ort'"; $erstes=false;};
        // Kontakt
        if($kontakt=="1"){if($erstes==false){$sql.=" AND ";};$sql.="Kontakt='JA'"; $erstes=false;};
        // Verhältnis
        if($kontakt=="-" ){if($erstes==false){$sql.=" AND ";};$sql.="Kontakt<0"; $erstes=false;};
        if($kontakt=="+" ){if($erstes==false){$sql.=" AND ";};$sql.="Kontakt>0"; $erstes=false;};
        // Lösung
        if($lösung!=""){if($erstes==false){$sql.=" AND ";};$sql.="Lösung='$lösung'"; $erstes=false;};



        if($sql!="SELECT * FROM einträge WHERE "){

            $erg = $connection->query($sql);

            $allRows = array();
            while($row = $erg->fetch_assoc()){
                $allRows[] = $row;
            }
    
            echo json_encode($allRows);
            
        }
        else{
            echo "Bitte Parameter für die Suche angeben!";
        }

    }








    /*if($_GET['req']=="kategorie"){

        $allRows = array();
        $table = $_GET['table'];

        $sql = "SELECT * FROM $table";
        $erg = $connection->query($sql);
        
        while($row = $erg->fetch_assoc()){
            $allRows[] = $row;
        }

        echo json_encode($allRows);
    }*/

?>