const Monat_Name = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

//###############################################
function Seite_Füllen(json){

  // Das JSON Objekt wurde im "name" Parameter von "window.open()" geliefert
  // Die Daten können nun in dieser HTML Datei ganz normal genutzt werden,
  // obwohl sie unabhängig vom Hauptprogramm ist
  var json_response = JSON.parse(json);

  // Jeder Eintrag aus dem JSON Objekt wird einzeln in ein Array geschrieben
  var E = json_response.map(x=>x); // E = Alle Einträge

  // Der erste Tag im Monat mit vorhandenem Eintrg wird als int gespeichert und hochgezählt
  // ( -1 , um den nachfolgenden Loop ein wenig zu verallgemeinern)
  var datum = (E[0].Tag -1);
  // Der Output String wird erzeugt
  var output = "";

  // Loop für jeden Eintrag
  for(var i=0;i<E.length;i++){

    // Sollte ein neuer Tag beginnen, wird dies hier anhand der datum Variable und dem Tag aus dem Objekt festgestellt
    // Es wird für den neuen Tag eine Überschrift erstellt und die datum Variable erhält den Wert des aktuellen Tages
    if(E[i].Tag>datum){
      output += "<h1>Alle Einträge: <br>"+E[i].Tag+" "+Monat_Name[E[i].Monat]+" "+E[i].Jahr+"</h1>";
      datum = E[i].Tag;
    }

    // Für den Fall, dass die Uhrzeiten einstellig sind, wird eine Null hinzugefügt
    var f1=""; var f2=""; var f3="";
    if(E[i].Stunde<10){f1="0";}
    if(E[i].Minute<10){f2="0";}
    if(E[i].Sekunde<10){f3="0";}

    // Der Output String wird zusammen gebaut
    output += "<div class='eintrag' id='"+E[i].ID+"' onclick='Eintrag_Löschen(this.id)'><h2 style='background-color: "+E[i].Farbe+"'>"
          +f1+E[i].Stunde+":"
          +f2+E[i].Minute+":"
          +f3+E[i].Sekunde+" Uhr - "
          +E[i].Emotion+"</h2>";
    output += "<p>"+E[i].Was+"</p><br><p>"+E[i].Warum+"</p><br></div>";
  }

  // Output String in das Feld schreiben und das Feld sichtbar machen
  document.getElementById("inhalt").innerHTML = output;

}
//###############################################






// Dies ist eine kleine eigenständige AJAX-Funktion zum löschen von Einträgen aus der Datenbank
// Hier läuft alles so ab, wie in dem AJAX Script, mit dem Unterschied, 
// dass die Antwort nicht mehr weiter gesendet wird 
//###############################################
function Eintrag_Löschen(id){
  
  // Vor dem Löschen soll der Nutzer gefragt werden, ob er sicher ist diesen Eintrag zu löschen
  if (confirm("Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?")) {
    var xml = new XMLHttpRequest();
    var url = "http://localhost/Abschlussprojekt/löschen.php?req=löschen&id="+id;
    var antwort;
    
    xml.open("GET",url,false);
    xml.onreadystatechange = function(){
      if(xml.readyState==4 && xml.status==200){
        antwort = xml.responseText;
      }
      else{
        alert("Löschen fehlgeschlagen\nReadyState: "+xml.readyState+"\nStatus: "+xml.status);
      }
    };
    xml.send();
  
  
    if(antwort=="1"){
      alert("Löschen erfolgreich");
      window.close();
    }
    else{
      alert("Löschen fehlgeschlagen\nFehlercode: ")+antwort;
    }
  }

}
//###############################################