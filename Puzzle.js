// Arrays sind global
var k_array;
var belegt;
var sortiert;
var mischen = true;
var züge;





//#########################################################
function Puzzle_Statistik(){
    // Datenbank
    var url = "http://localhost/Abschlussprojekt/abfragen.php?req=puzzle";
    var res = Send_Request(url);
    var einträge = JSON.parse(res);
    
    // Anzahl Einträge == Anzahl gespielter Spiele
    var spiele_gesammt = einträge.length;

    // Sofern mindestens ein Eintrag vorhanden ist, soll der Rekord an Zügen und die Rekordzeit gesucht werden
    if(spiele_gesammt>0){
        var züge_min = einträge[0].Spielzüge;
        var zeit_min = einträge[0].Zeit;

        for(var i=0;i<einträge.length;i++){
            if(einträge[i].Spielzüge<züge_min){
                züge_min=einträge[i].Spielzüge;
            }
        }

        for(var i=0;i<einträge.length;i++){
            if(einträge[i].Zeit<zeit_min){
                zeit_min=einträge[i].Zeit;
            }
        }
    }
    else{// Ansonsten beide Rekorde = 0 um Funktionen nicht zu crashen
        züge_min=0;
        zeit_min=0;
    }

    // Den html String für die Anzeige bilden ...        
    /*var html_string = "<h2 class='puzzle_statistik'>Spiele gesammt: </h2><h3>"+spiele_gesammt+"</h3><br>";
    html_string += "<h2 class='puzzle_statistik'>Züge: </h2><h3 id='züge_aktuell'>0</h3><h2> Züge-Rekord: </h2><h3>"+züge_min+"</h3>";
    html_string += "<h2 class='puzzle_statistik'>Zeit: </h2><h3 id='puzzle_zeit'></h3><h2> Zeit-Rekord: </h2><h3>"+Stopuhr_Umrechnen(zeit_min)+"</h3>";*/

    var html_string =  "<div id='puzzle_statistik_box'><p class='puzzle_info' style='width:60%'>Spiele gesammt :</p><p style='width:40%'>"+spiele_gesammt+"</p>";
        html_string += "<p class='puzzle_info' style='width:60%'>Züge :</p><p id='züge_aktuell' style='width:40%'>0</p>";
        html_string += "<p style='width:60%'>Züge-Rekord :</p><p style='width:40%'>"+züge_min+"</p>";
        html_string += "<p class='puzzle_info' style='width:60%'>Zeit :</p><p id='puzzle_zeit' style='width:40%'></p>";
        html_string += "<p style='width:60%'>Zeit-Rekord :</p><p style='width:40%'>"+Stopuhr_Umrechnen(zeit_min)+"</p></div>"; 
    
    // ... und einsetzen
    document.getElementById("puzzle_statistik").innerHTML = html_string;
}
//#########################################################





var gemessene_zeit;
//#########################################################
function Stopuhr(){
    //Funktion wird jede Sekunde ausgeführt und Zähler um 1 erhöht
    gemessene_zeit++;
    // Ins Feld schreiben
    var str = Stopuhr_Umrechnen(gemessene_zeit);
    document.getElementById("puzzle_zeit").innerHTML=str;
    // Widerholung
    setTimeout(() => {
        Stopuhr();
    }, 1000);
}
//#################
function Stopuhr_Umrechnen(zeit){
    // Minuten und sekunden werden bestimmt
    var m = Math.floor(zeit/60);
    var s = Math.round(zeit%60);
    // Der String wird gebildet
    var z = "";
    z+=s;
    // Entsprechendes styling der angezeigten Zeit
    if(s<10){
        z="0"+z;
    }
    if(m>0){
        z=m+":"+z;
    }
    if(m>=59 && s>=59){
        z="59:59";
    }

    return z;
}
//#########################################################




//#########################################################
function Puzzle_Felder_Erstellen(){

    // Die Länge des Array
    k_array = [5];
    belegt = [25];

    // Das Array wird mit negativen Werten gefüllt (später echte Werte)
    for(var i=0;i<5;i++){
        k_array[i] = [-1,-1,-1,-1,-1];
        //belegt[i] = -1;
    }

    // Das 2-dimensionale Array wird durchlaufen
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            // der Index wird durch i und j gebildet
            var index = ((i*5)+j);
            // das 25 Feld ist leer
            if (index == 24){k_array[i][j] = -1;break;}

            r = ((i*5)+j)+1;
        
            belegt[index] = r;
            k_array[i][j] = r;
        }
    }

    sortiert = belegt;
    züge=0;
    gemessene_zeit=0;
    mischen=true;
    Mischen();
    Darstellen();
    Einfärben();
}
//#########################################################





//#########################################################
function Mischen(){

    for(var i=0 ; i<1000 ; i++){

        var leerA;
        var leerB;
        var leerI;
    
        for(var j=0;j<5;j++){
            for(var k=0;k<5;k++){
                if(k_array[j][k] == -1){
                    leerA = j;
                    leerB = k;
                    leerI = ((j*5)+k)
                }
            }
        }


        var prüf = false;

        do{
            var dir = Math.floor(Math.random() *4);

            switch(dir){
                case 0:{
                    if((leerA-1)>=0){
                        Bewegen(leerI-5);
                        prüf = true;
                    }
                }break;
                case 1:{
                    if((leerB+1)<=4){
                        Bewegen(leerI+1);
                        prüf = true;
                    }
                }break;
                case 2:{
                    if((leerA+1)<=4){
                        Bewegen(leerI+5);
                        prüf = true;
                    }
                }break;
                case 3:{
                    if((leerB-1)>=0){
                        Bewegen(leerI-1);
                        prüf = true;
                    }
                }break;
            }
        }
        while(prüf == false);
    }
    mischen = false;
    Stopuhr();
}
//#########################################################





//#########################################################
function Darstellen(){
    var sp = document.getElementById("puzzle_spielfeld");
    sp.innerHTML = '';

    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            var div = document.createElement("DIV");
            div.className = "kachel";
        
            div.onmousedown = function(){
                Bewegen(this.id);
            }
            div.onmouseover = function(){

                var leerA;
                var leerB;
            
                for(var i=0;i<5;i++){
                    for(var j=0;j<5;j++){
                        if(k_array[i][j] == -1){
                            leerA = i;
                            leerB = j;
                        }
                    }
                }

                if((leerA*5)+leerB != this.id){
                    this.style.backgroundColor = "#8be6ff";
                }

            }
            div.onmouseout = function(){
                Einfärben();
            }

            var index = ((i*5)+j);
            
            div.setAttribute("id", index);
            if(k_array[i][j] != -1){
                div.innerHTML = k_array[i][j];
            }
            
            sp.appendChild(div);
        }
    }


}
//#########################################################





// Färbt alle Felder außer dem Leeren Blau ein
//#########################################################
function Einfärben(){
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            var index = ((i*5)+j);

            // Wenn der Inhalt des Array ungleich -1 ist, 
            // wird der index gebildet und das Feld, mit der ID gleich dem Index, gefärbt
            if(k_array[i][j] == -1){
                document.getElementById(index).style.backgroundColor = "#dcd579";
            }
            else if(k_array[i][j] == sortiert[index]){
                document.getElementById(index).style.backgroundColor = "#268856";
            }
            else{
                document.getElementById(index).style.backgroundColor = "#dcd579";
            }

        }
    }
}
//#########################################################





//#########################################################
function Bewegen(index){

    // Beim Klicken auf eine Kachel werden seine Koordinaten im 2d_Array ermittelt
    var wahlB = index%5;
    var wahlA = (index-wahlB) /5;
    

    // Ebenfalls werden die Koordinaten des leeren Feldes ermittelt
    var leerA;
    var leerB;

    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){
            if(k_array[i][j] == -1){
                leerA = i;
                leerB = j;
            }
        }
    }
    

    // Für die angeklickte Kachel wird nun in alle vier Himmelsrichtungen geprüft,
    // ob sich dort das leere Feld befindet.
    // Ist dies der Fall soll die Kachel mit dem leeren Feld den Platz im Array tauschen
    if(wahlB>0){
        if(k_array[wahlB-1][wahlA] == k_array[leerB][leerA]){
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
            if(mischen==false){züge++;};
        }
    }
    if(wahlB<4){
        if(k_array[wahlB+1][wahlA] == k_array[leerB][leerA]){    
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
            if(mischen==false){züge++;};
        }
    }
    if(wahlA>0){
        if(k_array[wahlB][wahlA-1] == k_array[leerB][leerA]){
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
            if(mischen==false){züge++;};
        }
    }
    if(wahlA<4){
        if(k_array[wahlB][wahlA+1] == k_array[leerB][leerA]){
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
            if(mischen==false){züge++;};
        }
    }

    document.getElementById("züge_aktuell").innerHTML = züge;

    if(mischen == false){
        Darstellen();
        Einfärben();
        Reihenfolge_Überprüfen();
    }
}
//#########################################################





// Hier wird das Kachel Array mit dem sortierten Array verglichen
// Wenn eine Zahl an seiner richtigen Position ist, wird das Feld Grün gefärbt
//#########################################################
function Reihenfolge_Überprüfen(){

    var index;
    var zähler = 0;

    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            index = ((i*5)+j);

            if(k_array[i][j] == sortiert[index]){
                zähler++;
            }

        }
    }

    if(zähler == 24){
        Puzzle_Beenden();
    }
}
//#########################################################




//#########################################################
function Puzzle_Beenden(){
    alert("Gewonnen\nZüge: "+züge+"\nZeit: "+Stopuhr_Umrechnen(gemessene_zeit));

    var url = "http://localhost/Abschlussprojekt/speichern.php?req=puzzle&züge="+züge+"&zeit="+gemessene_zeit;
    var res = Send_Request(url);

    if(res == "Angaben wurden erfolgreich gespeichert"){
        Puzzle_Statistik();
        Puzzle_Felder_Erstellen();
    }
}
//#########################################################