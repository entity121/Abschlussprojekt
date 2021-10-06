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

  //den Kalender generieren, falls die Kalender Seite gewählt wurde
  if(y==4){
    Kalender_Ausführen();
  }

  //die gewählte Seite darstellen und den Link ergrauen lassen
  document.getElementById("seite_"+y).style.display="block";
  document.getElementById("link_seite_"+y+""+y).style.backgroundColor="grey";
}//############################################## 






