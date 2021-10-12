
// Das JSON Objekt wird von der Kreisdiagramm Funktion hierher witergegeben,
// damit es hier gespeichert und ebenfalls existieren und verwendet werden kann
// Eine zusätzliche Server Kommunikation wird dadurch eingespart
//###############################################
var daten; // Darf niemals verändert werden
function Einträge_Empfangen(json){
  daten=JSON.parse(json);
}
//###############################################





//Jeder Eintrag des gewählten Tages soll einsehbar sein
//###############################################
function Einträge_Anschauen(bool){

  if(bool == 0){
    var E = daten.map(x=>x); // E = Alle Einträge

    var output = "";
    for(var i=0;i<E.length;i++){
      var f1="";var f2="";var f3="";
      if(E[i].Stunde<10){f1="0";}
      if(E[i].Minute<10){f2="0";}
      if(E[i].Sekunde<10){f3="0";}
  
      output += "<h1 style='background-color: "+E[i].Farbe+"'>"+f1+E[i].Stunde+":"+f2+E[i].Minute+":"+f3+E[i].Sekunde+" Uhr - "+E[i].Emotion+"</h1>";
      output += "<p>"+E[i].Was+"</p><br><p>"+E[i].Warum+"</p><br>";
    }
    
    var feld = document.getElementById("alle_einträge");
  
    output = "<h2>Einträge</h2>"+output;
  
    feld.innerHTML = output;
    feld.style.display = "block";
    document.getElementById("einträge_ausblenden").style.display = "block";
    document.getElementById("einträge_anschauen").style.display = "none";
  }
  else{
    var feld = document.getElementById("alle_einträge");
  
    feld.innerHTML = "";
    feld.style.display = "none";
    document.getElementById("einträge_ausblenden").style.display = "none";
    document.getElementById("einträge_anschauen").style.display = "block";
  }

}
//###############################################