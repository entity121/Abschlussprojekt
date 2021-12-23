function Fragebogen_Erstellen(){

    alert(0);

    // Der Standartmäßige Anfang des html Forms
    // in einem String, der später weiter verlängert wird
    var html_string = "<form action=''>";

    alert(1);

    var auswahlmöglichkeiten = Send_Request("http://localhost/Abschlussprojekt/auswahl.php?req=erstellen");
    auswahlmöglichkeiten = JSON.parse(auswahlmöglichkeiten);

    alert(2);

    var essen = x.map(y=>y.Essen);
    var event = x.map(y=>y.Events);

    alert(3);

    html_string += "<p>Wiederkehrende Gedanken</p><select name='wiederkehrende_gedanken_select' id='wiederkehrende_gedanken_select'>";
    for(var i=0;i<essen.length;i++){
        var id = "essen_auswahl_"+i;
        html_string+="<option value='"+id+"'>"+essen[i]+"</option>";
    }
    html_string+="</select><br>";

    alert(4);

    html_string += "<p>Events</p><select name='events_select' id='events_select'>";
    for(var i=0;i<event.length;i++){
        var id = "event_auswahl_"+i;
        html_string+="<option value='"+id+"'>"+event[i]+"</option>";
    }
    html_string+="</select><br>";

    alert(5);

    html_string+="</form>";

    alert(6);

    alert(html_string);

    alert(7);

    document.getElementById("body").innerHTML = html_string;

}