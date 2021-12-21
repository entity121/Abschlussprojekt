function Fragebogen_Erstellen(){
    
    var x = Send_Request("http://localhost/Abschlussprojekt/auswahl.php?req=erstellen");

    alert(x);

    /*var s = "<p>Wiederkehrende Gedanken</p><select name='wiederkehrende_gedanken' id='wiederkehrende_gedanken'>";
    s+="<option value='a'>A</option><option value='b'>B</option><option value='c'>C</option></select>";*/

    document.getElementById("body").innerHTML = x;
}