//Globals
const Monat_Name = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
var save_tag;// Datum Speichern
var save_monat;// NACHTRAG: Voraussichtlich überflüssig, da das Datum im JSON-Objekt gespeichert ist 
var save_jahr;
// Damit nach einem Reload durch Löschen oder Ändern von Einträgen das selbe Diagramm erzeugt werden kann
// Wird dann an späterer Stelle geprüft, um zu entscheiden, ob Tagesstatistik_ oder Monatsstatistik_Abrufen() ausgeführt werden soll
var tagesstatistik = true; 
var daten;


// Von der Funktion, die den Kalender erstellt, wird das aktuelle Datum hierher gespeichert
function Datum_Überliefern_Tagesstatistik(x,y,z){
save_tag = x; save_monat = y; save_jahr = z;
}


//Diese Funktion wird über einen Klick auf einen Kalendertag ausgeführt
//Sie ruft die Daten des entsprechenden Tages aus der Datenbank ab
//###############################################
function Tagesstatistik_Abrufen(tag,monat,jahr){

// True für Tagesstatistik
tagesstatistik = true;

// Damit das angezeigte Datum für spätere Nutzung erhalten bleibt
save_tag = tag;
save_monat = monat;
save_jahr = jahr;

document.getElementById("tagesstatistik_datum").innerHTML = tag+" "+Monat_Name[monat]+" "+jahr;

//Die URL wird erzeugt und mit Variablen befüllt
var url = "http://localhost/Abschlussprojekt/abfragen.php?req=tagesstatistik&tag="+tag+"&monat="+monat+"&jahr="+jahr;

//Die URL und die Zielfunktion für den Rückgabewert werden an die dafür vorgesehene Funktion im AJAX.js Skript geschickt um von dort
//an den Server versendet zu werden
Send_Request(url, Statistik_Darstellen);
}
//######


function Monatsstatistik_Abrufen(){
  // False für Monatsstatistik
  tagesstatistik = false;
  document.getElementById("tagesstatistik_datum").innerHTML = Monat_Name[save_monat]+" "+save_jahr;
  var url = "http://localhost/Abschlussprojekt/abfragen.php?req=monatsstatistik&monat="+save_monat+"&jahr="+save_jahr;
  Send_Request(url, Statistik_Darstellen);
}
//###############################################





// Diese Funktion beschäftigt sich mit dem kompletten Vorgang der Interpretation der Serverantwort (JSON)
//und der Anfertigung eines Kreisdiagrammes anhand der im JSOn-Objekt enthaltenen Farbwerte
//###############################################
//Standart Width und Height eines Canvas-Layer
// Konstanter Wert muss außerhalb der Funktion gesichert werden
const CANVAS_WIDTH = 300; 
const CANVAS_HEIGHT = 150; 
//######
function Statistik_Darstellen(json){

  //Arrays
  var farben = ['white','yellow','orangered','greenyellow','blueviolet','green','cyan','red','royalblue','crimson','grey'];
  var emotionen = ['Neutral','Freude','Interesse','Überraschung','Liebe','Hoffnung','Abneigung','Wut','Trauer','Verletzung','Angst'];
  // Ein Zähler für jede Farbe (Reihenfolge des Farbe Arrays)
  var anteil_farben = [0,0,0,0,0,0,0,0,0,0,0]; 
  // Ähnlich wie der Zähler, nur das hier der Prozentuale Anteil der Farbe vom Ganzen gespeichert wird
  var proz_anteil_farben = new Array(10); 

  //Das JSON Objekt wird bevor es verändert wird an ein anderes Skript verschickt
  daten = json;       

  //Die Antwort, welche als JSON String zurück kam
  //wird in ein JavaScript Objekt umgewandelt
  var json_response = JSON.parse(json);
     

  //Diese schöne Funktion durchläuft das gesamte JSON Objekt
  //und durchsucht es nach bestimmten Werten, welche sie 
  //in einem Array speichert
  var farben_array = json_response.map(x=>x.Farbe);

 
  // Das Array, in dem nun alle Farben gefiltert gespeichert sind, wird nun durchlaufen 
  // und es wird jedes Vorkommnis einer Farbe gezählt und in einem entsprechenden Array (anteil_farben) gespeichert
  for(var i=0;i<farben_array.length;i++){ // Jeden Eintrag ...
    for(var j=0;j<farben.length;j++){ // ... auf jede Farbe prüfen

      if(farben_array[i]==farben[j]){
        anteil_farben[j]+=1;
        break;
      }

    }
  }    

  // Die Farben sollen anhand der Häufigkeit sortiert werden
  // wichtig ist zu beachten, dass das Array, in dem die Namen der Farben stehen (farben)
  // ebenfalls sortiert wird, um die Reihenfolge einzuhalten
  for(var i=0;i<anteil_farben.length;i++){
    for(var j=0;j<anteil_farben.length-1;j++){

      if(anteil_farben[j]<anteil_farben[j+1]){
        var tempA = anteil_farben[j]; //Sicherungsvariablen
        var tempF = farben[j];
        var tempE = emotionen[j];

        anteil_farben[j] = anteil_farben[j+1]; //1. Wechsel
        farben[j] = farben[j+1];
        emotionen[j] = emotionen[j+1];

        anteil_farben[j+1] = tempA; //2. Wechsel 
        farben[j+1] = tempF;
        emotionen[j+1] = tempE;
      }

    }
  }    

  // Das Zielfenster, in welchem das Kreisdiagramm dargestellt werden soll
  var canvas = document.getElementById("tagesstatistik_darstellung");
  // Vor jeder neuen Darstellung wird die standart Width und Height wieder hergestellt
  canvas.width = CANVAS_WIDTH; 
  canvas.height = CANVAS_HEIGHT;


  // Das Canvas-Layer muss Skaliert werden, um sich an die Größe des Parent Objektes anzupassen
  // .clientWidth gibt die Width sammt padding eines Elementes zurück
  var parent_width = document.getElementById("tagesstatistik").clientWidth; 
  // Der Skale parameter soll dynamisch anhand der umliegenden DIV bestimmt werden.
  var scale = parent_width / canvas.width; 
  // Sowohl das Canvas Layer als auch die Zeichnung (etwas weiter unten) müssen skaliert werden um scharf dargestellt werden zu können
  canvas.width *= scale;  
  canvas.height *= scale;

  
  // Im folgenden CodeAbschnitt beginnt nun die Zeichnung des Kreisdiagramms
  if (canvas.getContext) {

    // Malwerkzeug erzeugen
    var ctx = canvas.getContext('2d'); 
    // Die Fläche zum Malen bereinigen, damit es bei mehrmaligem Gebrauch nicht übermalt wird
    ctx.clearRect(0,0,canvas.width,canvas.height); 

    //Der Startpunkt das Kreises in RAD
    //Ändert sich mit jedem Durchlauf
    var startpunkt=0; 

    // Eine for-Schleife, die für jede Farbe einmal durchläuft (10x)
    for(var i=0;i<anteil_farben.length;i++){

      //Der prozentuale Anteil einer Farbe am gesammten
      var proz = (anteil_farben[i]/farben_array.length);
      proz_anteil_farben[i]=proz*100;

      // Die Variablen, die die Dimensionen des Kreises bestimmen
      // wichtig ist, das auch hier skaliert werden muss um ein scharfes Bild zu erhalten
      var x = 150 *scale; // x koordinate vom Mittelpunkt des Kreises
      var y = 75 *scale; // y koordinate vom Mittelpunkt des Kreises
      var radius = 70 *scale; // Der Radius vom Kreis bestimmt die Größe
      var startAngle = startpunkt; // Der Punkt, an dem der Kreis beginnt (rechts (3 Uhr))
      var endAngle = ((proz *2) *Math.PI) +startpunkt; // Der Winkel (2*PI ist der komplette Kreis)
      var anticlockwise = false; // Links drehen oder rechts           
      ctx.fillStyle = farben[i]; // Die Farbe zum Ausfüllen des Kreises auswählen
      ctx.strokeStyle = "black"; // Umrandung

      // Das Malwerkzeug "zur Hand nehmen"
      ctx.beginPath(); 
      // Der "Stift" wird am Mittelpunkt angesetzt
      ctx.moveTo(x,y); 
      // Anhand der oben definierten Parameter wird ein Winkel gezeichnet
      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise); 
      // Vom Endpunkt des Kreises wird wieder eine Linie zum Mittelpunkt gezogen, um Lücken in der Darstellung zu schließen
      ctx.lineTo(x,y); 

      // Der Kreis, von dem nur die Umrandung existiert, wird ausgefüllt
      ctx.fill(); 
      // Umrandung
      ctx.stroke();

      // Der Endpunkt dieses Winkel ist gleich dem Startpunkt des nächsten Winkels
      // damit es einen Lückenhaften Übergang zwischen den verschiedenfarbigen winkeln gibt
      startpunkt = endAngle; 

    }

  }
     
  // Unterhalb des Kreisdiagrammes befindet sich eine kleine Infobox,
  // in welcher die prozentualen Anteile der Farben aufgelistet werden
  var detail_box = document.getElementById("detail_box");           

  var info_string = "";
  // Für jeden Eintrag im Array für die prozentualen Anteile
  for(var i=0;i<proz_anteil_farben.length;i++){
    // Wenn ein Eintrag vorhanden ist (!=0)
    if(proz_anteil_farben[i]>0){

      // Um einen gleichmäßigen Abstand zu gewährleisten, wird die Länge der Prozentzahl abgefragt
      // ist die Zahl >10% wird ein Unterstrich weniger in die Füll-Variable getan
      var füll;
      if(proz_anteil_farben[i]>=10){füll="___";}
      else{füll="____";};

      // Der String wird per Loop immer weiter vergrößert
      info_string+="<p>"+proz_anteil_farben[i].toFixed(2)+"%:"+füll+""+emotionen[i]+"</p>";
    }
  }
      
  // Die Ziel-DIV einblenden und den fertigen String hinein setzen
  document.getElementById("einträge_anschauen").style.display = "block";
  document.getElementById("monatsstatistik_anschauen").style.display = "block";
  detail_box.innerHTML = info_string; 
}
//###############################################





// Ein externes Fenster zur Anzeige der Einträge des gewählten Tages
//###############################################
function Einträge_Anschauen(){
  // Das Json Objekt, welches in der obigen Variable "daten" gespeichert wurde
  // kann einfach als "name" übergeben werden.
  // In der Ziel HTML kann es dann ganz normal verwendet werden
  var win = window.open("Einträge.html",daten,"menubar=no,toolbar=no,titlebar=no,status=no,resizeable=no,location=no,"
+"height="+(window.innerHeight *0.8)+","
+"width="+(window.innerWidth *0.3)+","
+"left="+(window.screenX+(window.innerWidth *0.4))+","
+"top="+(window.screenY+(window.innerHeight *0.15)));
  
// Ein Intervall prüft alle 200ms ob die Seite geschlossen wurde
// Wenn Ja wird das Tages oder Monatsdiagramm (boolen) neu erstellt un ebenfalls der Kalender
var timer = setInterval(function() {   
  if(win.closed) {  
  clearInterval(timer);  
  
  if(tagesstatistik == true){
    Tagesstatistik_Abrufen(save_tag,save_monat,save_jahr);
    Kalender(save_monat,save_jahr);
  }
  else{
    Monatsstatistik_Abrufen(save_monat,save_jahr);
    Kalender(save_monat,save_jahr);
  } 
}  
}, 200);                     

}
//###############################################





