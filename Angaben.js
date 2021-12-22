function Fragebogen_Erstellen(){
    
    var x = Send_Request("http://localhost/Abschlussprojekt/auswahl.php?req=erstellen");

    x = JSON.parse(x);

    x = x.map(y=>y.Essen);

    var s = "<p>Wiederkehrende Gedanken</p><select name='wiederkehrende_gedanken' id='wiederkehrende_gedanken'>";

    for(var i=0;i<x.length;i++){
        var id = "opt"+i;
        s+="<option value='"+id+"'>"+x[i]+"</option>";
    }

    s+="</select>";

    alert(s);

    document.getElementById("body").innerHTML = s;

    //document.getElementById("body").innerHTML = x[2];
}