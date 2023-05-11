// Überladen von Funktionen ist nicht möglich in JS
// Deshalb ist dies nun die Ajax Funktion, 
// da es praktischer ist, das Ergebnis auf direktem Weg
// An die Ausgangsfunktion zurück zu schicken
// (GGF: AN MANCHEN STELLEN ANPASSEN)
function Send_Request(url){
    
    // ein neues Ajax Objekt
    var xml = new XMLHttpRequest();
    // Das PHP Dokument wird angesprochen 
    // und die Anfrage versendet
    xml.open("GET",url,false);

    // das Ajax Objekt wird mit einem Event 
    // Listener versehen, welcher bei eingehendem response
    // überprüfen soll, ob die Verbindung ordnungsgemäß 
    // funktioniert hat und ob etwas zurück kam
    // Dieser Abfrage wird eine kurze Wartezeit gegeben, 
    // um zu verhindern, das else vorzeitig ausgeführt wird
    xml.onreadystatechange = setTimeout (function() {
        if(xml.readyState==4 && xml.status==200){
        }
        else{
            alert("Es konnte keine Verbindung zum" 
            +"Server hergestellt werden\nState="
            +xml.readyState+" - Status="+xml.status);
        }

    },100);

    xml.send();

    // Die Antwort wird zurück geschickt
    return xml.responseText;
}
//#########################################################   