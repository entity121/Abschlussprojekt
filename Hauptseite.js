//Diese zwei nachfolgenden Funktionen sind dafür zuständig, die Uhrzeit anzuzeigen und gegebenfalls
//eine Null vor Zahlen im einstelligen Bereich anzuhängen
//###############################################
function Uhr(){
  var aktuelle_uhrzeit = new Date();
  var h = uhr_null_hinzufügen(aktuelle_uhrzeit.getHours());
  var m = uhr_null_hinzufügen(aktuelle_uhrzeit.getMinutes());
  var s = uhr_null_hinzufügen(aktuelle_uhrzeit.getSeconds());

  document.getElementById('uhrzeit').innerHTML = h+':'+m+':'+s;
  setTimeout(Uhr, 500);
}
//#####
function uhr_null_hinzufügen(x){
  if(x<10){
    x='0'+x;
  }
  return x;
}//##############################################






//Jeder Button steht für eine Emotion und besitz eine einzigartige Farbe.
//Je nachdem welchen Button man betätigt, wird die Farbe des Buttons in das 
//Anzeigefenster eingefügt, welches sich überhalb befindet und by-default weiß ist,
//###############################################
function Farbe_Auswählen(X){
  var feld = document.getElementById("auswahl_anzeige");

  var farbe = X.style.backgroundColor;
  var emotion = X.id;

  feld.style.backgroundColor = farbe;
  feld.innerHTML = emotion;
}//##############################################






//Diese Funktion wird ausgeführt, sobald der Nutzer den Absenden button gedrückt hat
//Dem Anwendungsfenster werden die entsprechenden Angaben, welche versendet werden sollen, entnommen un in Variablen gespeichert
//Außerdem wird das aktuelle Datum und die Uhrzeit generiert und ebenfalls in Variablen gespeichert
//Die einzelnen Variablen werden zusammengeführt und für das Senden an den Server vorbereitet
//Das Senden der Angaben findet in einer externen Funktion statt, an die die vorbereiteten Pakete geschickt werden 
//###############################################
function Speichern(){

  //Die Werte für Uhrzeit und Datum werden nicht übergeben sonder hier abgefragt
  var date = new Date();

  var tag = date.getDate();
  var monat = date.getMonth();
  var jahr = date.getFullYear();
  var sekunde = date.getSeconds();
  var minute = date.getMinutes();
  var stunde = date.getHours();

  //Dem Anzeige Fenster der Anwendung wird die Farbe sowie die Emotion entnommen 
  var farbe = document.getElementById("auswahl_anzeige").style.backgroundColor;
  var emotion = document.getElementById("auswahl_anzeige").innerHTML;

  //Den Textfelder werden die Angaben zur aktuellen Stimmung entnommen
  var was = document.getElementById("was_ist_los").value;
  var warum = document.getElementById("was_ist_die_ursache").value;

  //Die URL wird erzeugt und mit Variablen befüllt
  var url = "http://localhost/php/stimmungen/speichern.php?req=speichern&tag="+tag+"&monat="+monat+"&jahr="+jahr+"&sekunde="+sekunde+"&minute="+minute+"&stunde="+stunde+"&farbe="+farbe+"&emotion="+emotion+"&was="+was+"&warum="+warum;

  //Die URL und die Zielfunktion für den Rückgabewert werden an die dafür vorgesehene Funktion im AJAX.js Skript geschickt um von dort
  //an den Server versendet zu werden
  Send_Request(url, Speichern_Erfolgreich);
}
//#####
//Wenn das Speichern erfolgreich war oder es einen Fehler gab, dann wird dies dem Nutzer als Meldung am Bildschirm mittgeteilt 
function Speichern_Erfolgreich(x){
  alert(x.responseText);
}
//#########################################################