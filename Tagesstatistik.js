//Diese Funktion wird über einen Klick auf einen Kalendertag ausgeführt
//Sie ruft die Daten des entsprechenden Tages aus der Datenbank ab
//###############################################
function Tagesstatistik_Abrufen(tag,monat,jahr){

//Die URL wird erzeugt und mit Variablen befüllt
var url = "http://localhost/php/stimmungen/abfragen.php?req=tagesstatistik&tag="+tag+"&monat="+monat+"&jahr="+jahr;

//Die URL und die Zielfunktion für den Rückgabewert werden an die dafür vorgesehene Funktion im AJAX.js Skript geschickt um von dort
//an den Server versendet zu werden
Send_Request(url, Tagesstatistik_Darstellen);
}
//###############################################




//###############################################
function Tagesstatistik_Darstellen(json){

  //Die Antwort, welche als JSON String zurück kam
  //wird in ein JavaScript Objekt umgewandelt
  var obj = JSON.parse(json);
  
  document.getElementById("tagesstatistik_darstellung").style.backgroundColor = obj.Farbe;


/*
    //Arrays
    var Monat_Name = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    
    //Variable für das anzeigefenster
    var feld = document.getElementById("tagesstatistik_darstellung");
    var datum = document.getElementById("tagesstatistik_datum");

    var canvas = document.getElementById("tagesstatistik_darstellung");
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      //bereinigt das Mal Fenster
      ctx.clearRect(0,0,canvas.width,canvas.height);
  
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
          ctx.beginPath();
          var x = 25 + j * 50; // x coordinate
          var y = 25 + i * 50; // y coordinate
          var radius = 20; // Arc radius
          var startAngle = 0; // Starting point on circle
          var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
          var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise
  
          ctx.strokeStyle = "red";
          ctx.fillStyle = "green";
          ctx.moveTo(x,y);
          ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
          ctx.lineTo(x,y);
  
          if (i > 1) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      }
    }

    datum.innerHTML = tag+" "+Monat_Name[monat]+" "+jahr;
*/
}
//###############################################