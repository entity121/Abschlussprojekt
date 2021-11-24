//Eine Funktion, die eine Reihe von anderen Funktionen aufruft, nachdem das Dokument geladen wurde
//###############################################
function On_Load(){
  Uhr();


}
//###############################################





//Die so genannten Links wechseln beim anklicken den div Container, welcher auf dem Bildschirm angezeigt wird.
//Alle Seiten sind gleichzeitig geladen aber nur eine ist zur selben Zeit aktiviert
// 1=Hauptseite  2=Statistik  3=Stress  4=Kalender  5=Archiv
//###############################################
function Seiten_Wechseln(x,y){

  //die aktuelle Seite ausblenden
  document.getElementById("seite_"+x).style.display="none";

  //die gewählte Seite darstellen und den Link ergrauen lassen
  document.getElementById("seite_"+y).style.display="block";
  if(y!=1){
    document.getElementById("link_seite_"+y+""+y).style.backgroundColor="grey";
  }

  // Bei der Wahl der Hauptseite sollen die Felder und Farben wieder zurück auf Standard gesetzt werden
  if(y==1){

    // Das Feld zur Anzeige der Auswahl wird auf NEUTRAL gesetzt 
    var box = document.getElementById("auswahl_anzeige");
    box.style.backgroundColor = "white";
    // und es wird der Reset-Button eingefügt
    box.innerHTML = "<p id='auswahl_anzeige_text'>NEUTRAL</p>"
    +"<button id='farbe_zurücksetzen' onclick='Farbe_Zurücksetzen()'>Farbe zurücksetzen</button>";
    // Auswahl felder leeren (WIRD ENTFERT SPÄTER!!!!)
    document.getElementById("was_ist_die_ursache").value = "";
    document.getElementById("was_ist_los").value = "";
  };

  //den Kalender generieren, falls die Kalender Seite gewählt wurde
  if(y==4){
    Kalender_Ausführen();
    //und die Statistik des aktuellen Tages anzeigen
    var date = new Date();
    Tagesstatistik_Abrufen(date.getDate(),date.getMonth(),date.getFullYear());
  };


  if(y==5){
    Puzzle_Felder_Erstellen();
  }



}//############################################## 






