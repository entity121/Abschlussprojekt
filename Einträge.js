const Monat_Name = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];


//###############################################
function Seite_Füllen(json){

  // Das JSON Objekt wurde im "name" Parameter von "window.open()" geliefert
  // Die Daten können nun in dieser HTML Datei ganz normal genutzt werden,
  // obwohl sie unabhängig vom Hauptprogramm ist
  var json_response = JSON.parse(json);

  // Jeder Eintrag aus dem JSON Objekt wird einzeln in ein Array geschrieben
  var E = json_response.map(x=>x); // E = Alle Einträge

  // Der Output String wird erzeugt
  var output = "<h1>Alle Einträge: <br>"+E[0].Tag+" "+Monat_Name[E[0].Monat]+" "+E[0].Jahr+"</h1>";


  //document.getElementById("inhalt").innerHTML = ;


  // Loop für jeden Eintrag
  for(var i=0;i<E.length;i++){

  // Für den Fall, dass die Uhrzeiten einstellig sind, wird eine Null hinzugefügt
  var f1=""; var f2=""; var f3="";
  if(E[i].Stunde<10){f1="0";}
  if(E[i].Minute<10){f2="0";}
  if(E[i].Sekunde<10){f3="0";}

  // Der Output String wird zusammen gebaut
  output += "<div class='eintrag'><h2 style='background-color: "+E[i].Farbe+"'>"+f1+E[i].Stunde+":"+f2+E[i].Minute+":"+f3+E[i].Sekunde+" Uhr - "+E[i].Emotion+"</h2>";
  output += "<p>"+E[i].Was+"</p><br><p>"+E[i].Warum+"</p><br></div>";
  }

  // Überschrift
  output += output;

  // Output String in das Feld schreiben und das Feld sichtbar machen
  document.getElementById("inhalt").innerHTML = output;

}
//###############################################