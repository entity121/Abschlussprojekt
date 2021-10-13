
// Das JSON Objekt wird von der Kreisdiagramm Funktion hierher witergegeben,
// damit es hier gespeichert und ebenfalls existieren und verwendet werden kann
// Eine zusätzliche Server Kommunikation wird dadurch eingespart
//###############################################
var daten; // Darf niemals verändert werden
function Einträge_Empfangen(json){
  daten=json;
  //daten=JSON.parse(json);
}
//###############################################





// Jeder Eintrag des gewählten Tages soll einsehbar sein,
// in einem kleinen Fenster das auf Knopfdruck ein und ausgeblendet werden soll
//###############################################
function Einträge_Anschauen(bool){
  


  // Eine if Abfrage, um das Fenster entweder ein oder aus zu blenden
  // Einblenden
  if(bool == 0){
    // Jeder Eintrag aus dem JSON Objekt wird einzeln in ein Array geschrieben
    var E = daten.map(x=>x); // E = Alle Einträge

    // Der Output String wird erzeugt
    var output = "";
    // Loop für jeden Eintrag
    for(var i=0;i<E.length;i++){
      // Für den Fall, dass die Uhrzeiten einstellig sind, wird eine Null hinzugefügt
      var f1="";var f2="";var f3="";
      if(E[i].Stunde<10){f1="0";}
      if(E[i].Minute<10){f2="0";}
      if(E[i].Sekunde<10){f3="0";}
  
      // Der Output String wird zusammen gebaut
      output += "<h1 style='background-color: "+E[i].Farbe+"'>"+f1+E[i].Stunde+":"+f2+E[i].Minute+":"+f3+E[i].Sekunde+" Uhr - "+E[i].Emotion+"</h1>";
      output += "<p>"+E[i].Was+"</p><br><p>"+E[i].Warum+"</p><br>";
    }


    // Überschrift !!!! TODO DATUM !!!!
    output = "<h2>Einträge</h2>"+output;
  
    // Output String in das Feld schreiben und das Feld sichtbar machen
  
    //feld.style.display = "block";
    // Den Button für das Fenster von ein- auf ausschalten umstellen
    document.getElementById("einträge_ausblenden").style.display = "block";
    document.getElementById("einträge_anschauen").style.display = "none";
  }
  // Ausblenden
  else{
    // Das Fenster
    var feld = document.getElementById("alle_einträge");
  
    // String löschen und Fenster ausblenden
    feld.innerHTML = "";
    feld.style.display = "none";
    // Button umschalten
    document.getElementById("einträge_ausblenden").style.display = "none";
    document.getElementById("einträge_anschauen").style.display = "block";
  }

}
//###############################################