const Monat_Name = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

// Alle entsprechenden Einträge sollen sortiert und gelistet angezeigt werden
//#########################################################
function Seite_Füllen(json){

  // Das JSON Objekt wurde im "name" Parameter von "window.open()" geliefert
  // Die Daten können nun in dieser HTML Datei ganz normal genutzt werden,
  // obwohl sie unabhängig vom Hauptprogramm ist
  var E = JSON.parse(json);

  // Jeder Eintrag aus dem JSON Objekt wird einzeln in ein Array geschrieben
  var E = E.map(x=>x); // E = Alle Einträge

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
    output += "<div class='eintrag' id='"+E[i].ID+"' onclick='Vollständiger_Eintrag(this.id)'><h2 style='background-color: "+E[i].Farbe+"'>"
          +f1+E[i].Stunde+":"
          +f2+E[i].Minute+":"
          +f3+E[i].Sekunde+" Uhr - "
          +E[i].Emotion+"</h2>";
    output += "<p>"+E[i].Notiz+"</p><br></div>";
  }

  // Output String in das Feld schreiben und das Feld sichtbar machen
  document.getElementById("eintrag_liste").innerHTML = output;
}
//#########################################################





// Beim anklicken eines Eintrages soll der gesammte Eintrag eines Tages mit allen angaben am Bildschirm ausgegeben werden
// Naturlich wieder per dynamischen html-string
//#########################################################
function Vollständiger_Eintrag(id){

  var url = "http://localhost/Abschlussprojekt/abfragen.php?req=eintrag&id="+id;
  var res = Send_Request(url);
  var eintrag = JSON.parse(res);
  var e = eintrag[0]; // Beinhaltet maximal einen Eintrag. Es handelt sich dennoch um ein Array weshalb die Index angabe 0

  var html_string = "<h1 style='background-color:"+e.Farbe+"'>"+e.Tag+" "+Monat_Name[e.Monat]+" "+e.Jahr+"<br>"; // Datum
      html_string+= uhr_null_hinzufügen(e.Stunde)+":"+uhr_null_hinzufügen(e.Minute)+":"+uhr_null_hinzufügen(e.Sekunde)+" Uhr </h1>"; // Uhrzeit
      html_string+="<p>";


      // Bekannte Situation
      if(e.Situation=="JA"){
        html_string += "<b style='color:#b03522'>Diese Situation ist bereits bekannt</b><br><br><br>";
      }
      else if(e.Situation=="NEIN"){
        html_string += "<b style='color:#b03522'>Diese Situation ist neu</b><br><br><br>";
      }


      // Wiederkehrende Gedanken
      if(e.Gedanken!=""){ 
        html_string += "Wiederkehrender Gedanke:<br><b style='color:#b03522'>'"+e.Gedanken+"'</b><br><br><br>"; 
      }


      // Behinderung der Produktivität
      html_string += "Die Produktivität wird ";
      switch (e.Produktivität) {
        case "0": html_string+="<b style='color:#b03522'>GAR NICHT</b>";break;
        case "1": html_string+="<b style='color:#b03522'>EIN WENIG</b>";break;
        case "2": html_string+="<b style='color:#b03522'>STARK</b>";break;
        case "3": html_string+="<b style='color:#b03522'>SEHR STARK</b>";
      };
      html_string += " beeinflusst<br><br><br>";


      // Handeln beeinflusst
      html_string += "Das Handeln wird ";
      switch (e.Handeln) {
        case "0": html_string+="<b style='color:#b03522'>GAR NICHT</b>";break;
        case "1": html_string+="<b style='color:#b03522'>EIN WENIG</b>";break;
        case "2": html_string+="<b style='color:#b03522'>STARK</b>";break;
        case "3": html_string+="<b style='color:#b03522'>SEHR STARK</b>";
      };
      html_string += " beeinflusst<br><br><br>";


      // Bewertung des Gefühls
      html_string += "Das Gefühl wird als ";
      switch (e.Bewertung) {
        case "-3": html_string+="<b style='color:#b03522'>SEHR SCHLECHT</b>";break;
        case "-2": html_string+="<b style='color:#b03522'>SCHLECHT</b>";break;
        case "-1": html_string+="<b style='color:#b03522'>EHER SCHLECHT</b>";break;
        case "0": html_string+="<b style='color:#b03522'>NEUTRAL</b>";break;
        case "1": html_string+="<b style='color:#b03522'>EHER GUT</b>";break;
        case "2": html_string+="<b style='color:#b03522'>GUT</b>";break;
        case "3": html_string+="<b style='color:#b03522'>SEHR GUT</b>";
      };
      html_string += " empfunden<br><br><br>";


      // Essen
      if(e.Essen!=""){
        html_string+="Zu essen gab es <b style='color:#b03522'>"+e.Essen+"</b><br><br>";
      }
      else{
        html_string+="Es wurde noch <b style='color:#b03522'>NICHTS</b> gegessen<br><br><br>";
      }


      // Verträglichkeit des Essens
      if(e.Essen!=""){
      html_string += "Das Essen wurde ";
      switch (e.Verträglichkeit) {
        case "-3": html_string+="<b style='color:#b03522'>SEHR SCHLECHT</b>";break;
        case "-2": html_string+="<b style='color:#b03522'>SCHLECHT</b>";break;
        case "-1": html_string+="<b style='color:#b03522'>EHER SCHLECHT</b>";break;
        case "0": html_string+="<b style='color:#b03522'>NEUTRAL</b>";break;
        case "1": html_string+="<b style='color:#b03522'>EHER GUT</b>";break;
        case "2": html_string+="<b style='color:#b03522'>GUT</b>";break;
        case "3": html_string+="<b style='color:#b03522'>SEHR GUT</b>";
      };
      html_string += " vertragen<br><br><br>";
      }


      // Schlaf
      if(e.Schlaf){
        html_string += "Es wurden <b style='color:#b03522'>~"+e.Schlaf+" Stunden</b> geschlafen<br><br>";
      }


      // Müde/Wach
      html_string += "Ich fühle mich ";
      switch (e.Müde) {
        case "-3": html_string+="<b style='color:#b03522'>SEHR MÜDE</b>";break;
        case "-2": html_string+="<b style='color:#b03522'>MÜDE</b>";break;
        case "-1": html_string+="<b style='color:#b03522'>EHER MÜDE</b>";break;
        case "0": html_string+="<b style='color:#b03522'>NEUTRAL</b>";break;
        case "1": html_string+="<b style='color:#b03522'>EHER WACH</b>";break;
        case "2": html_string+="<b style='color:#b03522'>WACH</b>";break;
        case "3": html_string+="<b style='color:#b03522'>SEHR WACH</b>";
      };
      html_string += "<br><br><br>";
      

      // Wetter
      if(e.Wetter!=""){
        html_string += "Das Wetter zu dem Zeitpunkt: <b style='color:#b03522'>"+e.Wetter+"</b><br><br><br>";
      }
      


      //Warm/Kalt
      html_string += "Mir ist ";
      switch (e.Warm) {
        case "-3": html_string+="<b style='color:#b03522'>ZU HEIß</b>";break;
        case "-2": html_string+="<b style='color:#b03522'>HEIß</b>";break;
        case "-1": html_string+="<b style='color:#b03522'>EHER WARM</b>";break;
        case "0": html_string+="<b style='color:#b03522'>NEUTRAL</b>";break;
        case "1": html_string+="<b style='color:#b03522'>EHER KALT</b>";break;
        case "2": html_string+="<b style='color:#b03522'>KALT</b>";break;
        case "3": html_string+="<b style='color:#b03522'>SEHR KALT</b>";
      };
      html_string += "<br><br><br>";


      // Ereignis
      if(e.Ereignis!=""){
        html_string += "Besonderes Event:<br><b style='color:#b03522'>"+e.Ereignis+"</b><br><br><br>";
      }


      // Ort
      if(e.Ort!=""){
        html_string += "Ich bin derzeit "
        if(e.Ort=="Schule"){html_string+="in der <b style='color:#b03522'>Schule</b><br><br><br>";};
        if(e.Ort=="Arbeit"){html_string+="an der <b style='color:#b03522'>Arbeit</b><br><br><br>";};
        if(e.Ort=="Zuhause"){html_string+="<b style='color:#b03522'>Zuhause</b><br><br><br>";};
      }


      // Kontakt zu Menschen
      if(e.Kontakt=="JA"){
        html_string+="<b style='color:#b03522'>Ich habe Kontakt zu anderen Menschen</b><br><br><br>";
      }
      else if(e.Kontakt=="NEIN"){
        html_string+="<b style='color:#b03522'>Ich bin alleine</b><br><br><br>";
      }


      //Verhältnis
      if(e.Kontakt=="JA"){
        html_string += "Mein Verhältnis zu dieser Person ist ";
        switch (e.Verhältnis) {
          case "-3": html_string+="<b style='color:#b03522'>SEHR SCHLECHT</b>";break;
          case "-2": html_string+="<b style='color:#b03522'>SCHLECHT</b>";break;
          case "-1": html_string+="<b style='color:#b03522'>EHER SCHLECHT</b>";break;
          case "0": html_string+="<b style='color:#b03522'>NEUTRAL</b>";break;
          case "1": html_string+="<b style='color:#b03522'>EHER GUT</b>";break;
          case "2": html_string+="<b style='color:#b03522'>GUT</b>";break;
          case "3": html_string+="<b style='color:#b03522'>SEHR GUT</b>";
        };
        html_string += "<br><br><br>";
      }


      // Lösungsansatz
      if(e.Lösung){
        html_string += "Mein Lösungsansatz:<br><b style='color:#b03522'>'"+e.Lösung+"'</b><br><br><br>";
      }
      
  document.getElementById("eintrag_vollständig").innerHTML = html_string
  document.getElementById("eintrag_vollständig").style.display = "block";

}
//#################
function uhr_null_hinzufügen(x){
  if(x<10){
    x='0'+x;
  }
  return x;
}
//#########################################################



/*
// Dies ist eine kleine eigenständige AJAX-Funktion zum löschen von Einträgen aus der Datenbank
// Hier läuft alles so ab, wie in dem AJAX Script, mit dem Unterschied, 
// dass die Antwort nicht mehr weiter gesendet wird 
// ###############################################
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
*/