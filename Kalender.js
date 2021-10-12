//Diese Funktion tut nichts weiter, als die Kalender Funktion aufzurufen,
//und das aktuelle Datum als Parameter zu übergeben
//###############################################
function Kalender_Ausführen(){
    var date = new Date();
    Kalender(date.getMonth(),date.getFullYear());
}//##############################################





//Diese Funktion erzeugt einen vollwertigen Kalender, welcher dann später befüllt werden kann mit den Statistiken, 
//welche in dem Projekt erzeugt werden
//###############################################
function Kalender(x,y){

var Woche = ["Mo","Di","Mi","Do","Fr","Sa","So"];
var Monat_Name = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

//diese Variable enthält alle informationen über das aktuelle Datum
var date = new Date();
var tag_aktuell = date.getDate();
var monat_aktuell = date.getMonth();
var jahr_aktuell = date.getFullYear();

//Variablen, für den Monat, der im Kalender dargestellt werden soll. Dieser Monat muss nicht aktuell sein um dargestellt zu werden
var monat = x;
var jahr = y;

//Ein Kalender wird in Form einer Tabelle erzeugt (die div wird geleert bim Aufruf der Funktion)
var kalender = document.getElementById("kalender");
kalender.innerHTML="";
var row;

//Der Tabellenkopf, mit Monat und Jahr
row = kalender.insertRow(0);
row.innerHTML = Monat_Name[monat]+" "+jahr;

//Die Spaltenüberschriften mo di mi do fr sa so
row = kalender.insertRow(1);
for(var i=0;i<7;i++){
    var cell = row.insertCell(i);
    cell.innerHTML = Woche[i];
    cell.style.textAlign = "center";
    if(i==5 || i==6){
    cell.style.border = "2px solid red";
    }
}
//bis zu diesem Punkt ist es bei jedem Monat gleich
//
//
//nun wird es variabel
//
//
//
//
//
//wie viele Tage besitzt dieser Monat
//meistens 31
var anzahl_tage = 31;

//April Juni September November = 30
if(monat==3 || monat==5 || monat==8 || monat==10){
    anzahl_tage-=1;
}

//Besondere Schaltjahrbedingung für Februar
else if(monat==1){
    anzahl_tage-=3;
    if(jahr%4==0){anzahl_tage+=1;}
    else if(jahr%100==0){anzahl_tage-=1;}
    else if(jahr%400==0){anzahl_tage+=1};
}

//Hier wird der erste Tag des Monats als Wochentag gespeichert
var monatserster = new Date(jahr, monat, 1);
//kleine umrechnung um Montag=0 zu setzen
monatserster = (monatserster.getDay() + 6) % 7;

//Der Zähler wird in die Kalenderspalten geschrieben und immer um 1 erhöht,
//bis der Zähler gleich 'anzahl_tage' ist. Dies beendet den Monat
var zähler=1;
//zähler für die rows
var reihe=2;

//Die erste richtige Kalenderzeile wird nun erzeugt
//Diese Unterscheidet sich von den anderen, weil überprüft werden muss,
//wie viele Felder am Anfang nicht befüllt weden, falls der Monatserste kein Montag ist 
row = kalender.insertRow(reihe);
for(var i=0;i<7;i++){

    //Feld einfügen
    cell=row.insertCell(i);


    //Für alle Wochentage, die in der ersten Monatswoche bereits vorkomen
    if(i>=monatserster){

        cell.style.backgroundColor = "white";
        cell.style.border = "1px solid black";

        //Der Monatstag wird in das Kalenderkästchen geschrieben
        cell.innerHTML = zähler;

        //Das Kalender Kästchen bekommt ein onclick Event, welches ein Fenster öffnet in dem 
        //die Statistik des Tages (sofern vorhanden) dargestellt wird.
        cell.onclick = function(){
            document.getElementById("tagesstatistik_datum").innerHTML = this.innerHTML+" "+Monat_Name[monat]+" "+jahr;
            Tagesstatistik_Abrufen(this.innerHTML, monat, jahr);
        }

        //Der aktuelle Tag soll im Kalender eine rote Zahl bekommen
        if(zähler==tag_aktuell && monat==monat_aktuell && jahr==jahr_aktuell){
            cell.style.color="red";
        }

        //Samstage und Sonntage bekommen eine rote Umrandung
        if(i==5 || i==6){
            cell.style.border = "2px solid red";
        }

        zähler+=1;
    }
    //Die Felder werden Grau und ohne Zahl dargestellt, für Wochentage, die noch nicht im aktuellen Monat sind
    else{
    cell.innerHTML='';
    cell.style.backgroundColor="grey";
    }
}
reihe+=1;


//Die folgenden Monate sind gleich es wird mit einer if/else Abfrage ermittelt, ob 'zähler' noch eine weitere Zeile erlaubt.
//Sobald 'zähler' gleich 'anzahl_tage' ist, wird der Rest der Woche wieder leer ausgefüllt, so wie am Monatsanfang, 
//und es wird keine weitere Zeile hinzugefügt
do{
    //Zeile einfügen
    row = kalender.insertRow(reihe);

    for(var i=0;i<7;i++){
        //neue Zelle
        cell = row.insertCell(i);

        //durchführen bis max. anz. tage pro monat
        if(zähler<=anzahl_tage){  

            cell.style.backgroundColor = "white";
            cell.style.border = "1px solid black";

            //datum in feld schreiben
            cell.innerHTML = zähler;

            cell.onclick = function(){
                document.getElementById("tagesstatistik_datum").innerHTML = this.innerHTML+" "+Monat_Name[monat]+" "+jahr;
                Tagesstatistik_Abrufen(this.innerHTML, monat, jahr);
            }

            //rot färben wenn heutiger Tag
            if(zähler==tag_aktuell && monat==monat_aktuell && jahr==jahr_aktuell){
            cell.style.color="red";
            }

            //rot umranden, wenn Wochenende
            if(i==5 || i==6){
            cell.style.border = "2px solid red";
            }

            zähler+=1;
        }
        //Wenn der Monat vorbei ist, die restlichen Wochentage Grau und ohne Zahl darstellen
        else{
            cell.innerHTML='';
            cell.style.backgroundColor="grey";
        }
    }

    reihe+=1;

}
//Stoppen, wenn der monat vorbei ist
while(
    zähler<anzahl_tage
) 
}//##############################################





//Diese Kleine Funktion ruft bei Knopfdruck die Kalenderfunktion mit Parametern
//des vorherigen oder nächsten Monats auf
//###############################################

//globale Variable zum erhalt des Wertes
//werden der monat/jahr variable addiert
var monat_darstellung=0;
var jahr_darstellung=0;

function Monat_Wechseln(x){
    var date = new Date();
    var monat = date.getMonth();
    var jahr = date.getFullYear();

    //mit jedem Aufruf der funktion wird diese Variable mit +-1 addiert
    monat_darstellung+=x;

    //wenn der aktuelle Monat minus Darstellungsvariable kleiner 0 ist wird das Jahr um 1 verringert
    //und die Darstellungsvariable geht anhand des aktuellen Monats nach oben um Dezember darzustellen
    if(monat+monat_darstellung<0){
        jahr_darstellung-=1;
        monat_darstellung=11-monat;
    }
    //so wie bei der Monat kleiner bedingung mit dem Unterschied Monat+Darstellungsvariable >11
    if(monat+monat_darstellung>11){
        jahr_darstellung+=1;
        monat_darstellung=monat*-1;
    }

    //Der anzuzeigende Monat wird in Variablen gespeichert und an die Kalenderfunktion übergeben
    monat=monat+monat_darstellung;
    jahr=jahr+jahr_darstellung;
    
    Kalender(monat,jahr);
}
//###############################################