
        // Diese Funktion wird ausgeführt, sobald der Nutzer den Absenden button gedrückt hat
        // Dem Anwendungsfenster werden die entsprechenden Angaben, welche versendet werden sollen, entnommen un in Variablen gespeichert
        // Außerdem wird das aktuelle Datum und die Uhrzeit generiert und ebenfalls in Variablen gespeichert
        // Die einzelnen Variablen werden zusammengeführt und für das Senden an den Server vorbereitet
        // Das Senden der Angaben findet in einer externen Funktion statt, an die die vorbereiteten Pakete geschickt werden 
        //#########################################################
        function Angaben_Speichern(){

        if(confirm("Möchten Sie ihren Eintrag speichern?")) {



        // Die einzelnen Fragen werden ausgewertet 
        // und die Ergebnisse in Variablen gespeichert
        // 'Input' Angaben BENÖTIGEN einen Wert != null, 
        // weshalb eine if Abfrage darauf prüfen soll . 
        //'Select' und 'Textarea' können hingegen leer sein
        var color = document.getElementById("auswahl_anzeige").style.backgroundColor;
        var emotion = document.getElementById("auswahl_anzeige_text").innerHTML;
        var gedanken = document.querySelector("select[name='gedanken_select']").value;
        if(document.querySelector("input[name='bekannte_situation']:checked"))
        {var situation = document.querySelector("input[name='bekannte_situation']:checked").value;}
        else{var situation = ""};
        if(document.querySelector("input[name='behinderung_produktivität']:checked"))
        {var produk = document.querySelector("input[name='behinderung_produktivität']:checked").value;}   

        if(document.querySelector("input[name='handeln_beeinflusst']:checked"))
        {var handeln = document.querySelector("input[name='handeln_beeinflusst']:checked").value;}
        if(document.querySelector("input[name='bewertung_gefühl']:checked"))
        {var bewertung = document.querySelector("input[name='bewertung_gefühl']:checked").value;}
        var essen = document.querySelector("select[name='essen_select']").value;
  
        if(document.querySelector("input[name='verträglichkeit_essen']:checked"))
        {var verträglichkeit = document.querySelector("input[name='verträglichkeit_essen']:checked").value;}
        var schlaf = document.querySelector("select[name='schlaf_in_stunden']").value;
        if(document.querySelector("input[name='müde/wach']:checked"))
        {var müde = document.querySelector("input[name='müde/wach']:checked").value;}

        var wetter = document.querySelector("select[name='wetter_select']").value;
        if(document.querySelector("input[name='warm/kalt']:checked"))
        {var warm = document.querySelector("input[name='warm/kalt']:checked").value;}
        var event = document.querySelector("select[name='event_select']").value;

        var ort = document.querySelector("select[name='ort_select']").value;
        if(document.querySelector("input[name='kontakt_menschen']:checked"))
        {var kontakt = document.querySelector("input[name='kontakt_menschen']:checked").value;}
        else{var kontakt = ""};
   
        if(document.querySelector("input[name='verhältnis_person']:checked"))
        {var verhältnis = document.querySelector("input[name='verhältnis_person']:checked").value;}
        var lösung = document.querySelector("select[name='lösung_select']").value;
        var notiz = document.querySelector("textarea[name='notizen']").value;
 
        
        // Datum und Uhrzeit des Eintrages
        var date = new Date();

        var tag = date.getDate();
        var monat = date.getMonth();
        var jahr = date.getFullYear();
        var sekunde = date.getSeconds();
        var minute = date.getMinutes();
        var stunde = date.getHours();


        // Die URL wird erzeugt und mit Variablen befüllt
        var url = "http://localhost/Abschlussprojekt/speichern.php?req=speichern&tag="
            +tag+"&monat="+monat+"&jahr="+jahr+"&sekunde="
            +sekunde+"&minute="+minute+"&stunde="+stunde;

            url += "&farbe="+color+"&emotion="+emotion
            +"&gedanken="+gedanken+"&situation="+situation
            +"&produk="+produk+"&handeln="+handeln+"&bewertung="
            +bewertung+"&essen="+essen+"&verträglichkeit="+verträglichkeit;

            url += "&schlaf="+schlaf+"&müde="+müde+"&wetter="
            +wetter+"&warm="+warm+"&event="+event+"&ort="+ort
            +"&kontakt="+kontakt+"&verhältnis="+verhältnis;

            url += "&lösung="+lösung+"&notiz="+notiz;
    
        // Die URL und die Zielfunktion für den Rückgabewert 
        // werden an die dafür vorgesehene Funktion 
        //im AJAX.js Skript geschickt um von dort
        // an den Server versendet zu werden

        var res = Send_Request(url);
        alert(res);

        if(res == "Angaben wurden erfolgreich gespeichert"){
            window.location.reload();
        };
    }

}//########################################################






//#########################################################
function Auswahl_Hinzufügen(frage){

    switch (frage){

        case "gedanken_hinzufügen":{var tabelle = "gedanken_auswahl"; var select_id = "gedanken_select";};break;
        case "essen_hinzufügen":{var tabelle = "essen_auswahl"; var select_id = "essen_select";};break;
        case "wetter_hinzufügen":{var tabelle = "wetter_auswahl"; var select_id = "wetter_select";};break;
        case "event_hinzufügen":{var tabelle = "event_auswahl"; var select_id = "event_select";};break;
        case "ort_hinzufügen":{var tabelle = "ort_auswahl"; var select_id = "ort_select";};break;
        case "lösung_hinzufügen":{var tabelle = "lösungen_auswahl"; var select_id = "lösung_select";};break;

    }

    var eingabe = prompt("Auswahlmöglichkeit hinzufügen");

    if(eingabe != ""){
        var url = "http://localhost/Abschlussprojekt/speichern.php?req=hinzufügen&tabelle="+tabelle+"&eingabe="+eingabe;

        var res = Send_Request(url);
        alert(res);
    
        // Die select Auswahl um den neuen Eintrag erweitern, ohne die Seite neu zu laden oder bereits getätigte eingaben zu verlieren
        if(res == "Antwortmöglichkeit hinzugefügt"){
            var select = document.getElementById(select_id);
            var opt = document.createElement('option'); 
        
            opt.value = eingabe;
            opt.innerHTML = eingabe.substring(0,30);
            opt.title = eingabe;
        
            select.appendChild(opt);
        }
    }
    else{
        alert("Bitte keine leeren Eingaben machen");
    }

}
//#########################################################






// Button um eine Auswahlmöglichkeit sowohl aus dem <select> Element
// als auch aus der Datenbank zu entfernen
//#########################################################
function Auswahl_Löschen(frage){

    // Anhand des Übergabeparameters wird das <select> Element und entsprechende Werte für die Datenbank bestimmt
    switch (frage){
        case "gedanken_löschen":{var tabelle = "gedanken_auswahl"; var spalte = "Gedanken"; var select_id = "gedanken_select";};break;
        case "essen_löschen":{var tabelle = "essen_auswahl"; var spalte = "Essen"; var select_id = "essen_select";};break;
        case "wetter_löschen":{var tabelle = "wetter_auswahl"; var spalte = "Wetter"; var select_id = "wetter_select";};break;
        case "event_löschen":{var tabelle = "event_auswahl"; var spalte = "Ereignis"; var select_id = "event_select";};break;
        case "ort_löschen":{var tabelle = "ort_auswahl"; var spalte = "Ort"; var select_id = "ort_select";};break;
        case "lösung_löschen":{var tabelle = "lösungen_auswahl"; var spalte = "Lösung"; var select_id = "lösung_select";};break;
    }

    // Das <select> Element als ganzes und der Ausgewählte Wert
    var element = document.getElementById(select_id);
    var selected = element.value;
 
    // Für jede <option> innerhalb von <select>
    for(var i=0;i<element.length;i++){
        
        // Die gewählte <option> 
        if(element.options[i].value == selected){

            // Standartfrage mit zu löschender <option>
            var str = "Möchten Sie die Option '"+selected+"' unwideruflich löschen?";

            // Sicherheitsfrage
            if(confirm(str)){

                // Einmal aus der Datenbank löschen ...
                var url = "http://localhost/Abschlussprojekt/löschen.php?req=option&tabelle="+tabelle+"&spalte="+spalte+"&selected="+selected;
                var res = Send_Request(url);
                alert(res);

                // ... und einmal aus dem <select> Element der aktuellen Sitzung
                if(res == "Option gelöscht"){
                    element.remove(i);
                }

            }
        }

    }

    var select = document.getElementById(select_id);
    var opt = document.createElement('option'); 

    opt.value = eingabe;
    opt.innerHTML = eingabe.substring(0,30);
    opt.title = eingabe;

    select.appendChild(opt);
    
}
//#########################################################




var color;
var emotion;
// Der Fragebogen wird dynamisch erzeugt 
// Dazu wird ein seeeeehr langer String gebildet
//#########################################################
function Fragebogen_Erstellen(){

    // Der Überlieferte Name muss zerteilt werden, um Farbe von Emotion zu trennen
    /*var pos = x.indexOf("#");
    color = x.substring(0,pos);
    emotion = x.substring(pos+1);*/

    // Es wird eine Anfrage an den Server geschickt und eine Antwort empfangen
    var json_response = Send_Request("http://localhost/Abschlussprojekt/auswahl.php?req=erstellen");
    var auswahlmöglichkeiten = JSON.parse(json_response);

    // Arrays für die Antwortmöglichkeiten der verschiedenen Fragen  
    var essen=[];
    var event=[];
    var gedanken=[];
    var wetter=[];
    var lösung=[];
    var ort=[];

    // Das komplette Antwort-Array wird zerteilt und die Ergebnisse auf
    // spezifische kleine Arrays verteilt
    for(var i=0;i<auswahlmöglichkeiten.length;i++){

        if(auswahlmöglichkeiten[i].Essen){// WENN es zu 'auswahlmöglichkeiten[i]' ein Element 'Essen' gibt
            essen.push(auswahlmöglichkeiten[i].Essen);// DANN Wert des Elementes in entsprechendes Array speichern
        }
        else if(auswahlmöglichkeiten[i].Ereignis){
            event.push(auswahlmöglichkeiten[i].Ereignis);
        }
        else if(auswahlmöglichkeiten[i].Gedanken){
            gedanken.push(auswahlmöglichkeiten[i].Gedanken);
        }
        else if(auswahlmöglichkeiten[i].Wetter){
            wetter.push(auswahlmöglichkeiten[i].Wetter);
        }
        else if(auswahlmöglichkeiten[i].Lösung){
            lösung.push(auswahlmöglichkeiten[i].Lösung);
        }
        else if(auswahlmöglichkeiten[i].Ort){
            ort.push(auswahlmöglichkeiten[i].Ort);
        }

    }
    //##################




    // Ab diesem Punkt wird anhand der Werte in den Arrays ein html-String geschrieben,
    // welches mehrere 'select' Boxen und radio buttons enthält
    // Die jeweiligen Größen der Auswahlmöglichkeiten sind variabel

    // Der Standartmäßige Anfang des html Forms
    // in einem String, der später weiter verlängert wird
    var html_string = "<form action=''>";
    html_string += "<h1><u>Fragebogen</u></h1><br><br>";
    html_string+="<div class='trennung'></div>";

    
    // Wiederkehrende Gedanken
    html_string += "<h2 id='pfff'>Gibt es einen wiederkehrenden Gedanken? Wenn ja, welchen?</h2><select name='gedanken_select' id='gedanken_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<gedanken.length;i++){
        var id = gedanken[i];
        if(id.length>=30){
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,29)+"."+"</option>";
        }
        else{
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,30)+"</option>";
        } 
    }
    html_string+="</select>";
    html_string+="<button type='button' class='option_hinzufügen' name='gedanken_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>";
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button>";
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Bekannte Situation
    html_string += "<h2 class='nich_pfff'>Ist dir die Situation, in der du dich im Moment befindest, bereits bekannt?</h2>"
    +"<div class='one_radio'><label for='bekannte_situation_ja'>JA</label>"+"<input type='radio' id='bekannte_situation_ja' name='bekannte_situation' value='JA'></div><br>"
    +"<div class='one_radio'><label for='bekannte_situation_nein'>NEIN</label>"+"<input type='radio' id='bekannte_situation_nein' name='bekannte_situation' value='NEIN'></div><br>";
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Behinderung der Produktivität
    html_string += "<h2 class='nich_pfff'>Wie stark wird deine Produktivität im Moment behindert?</h2>";
    html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%;'>sehr stark</p>";
    for(var i=0;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='behinderung_produktivität_"+i+"'> "+i+" </label>"+"<input type='radio' id='behinderung_produktivität_"+i+"' name='behinderung_produktivität' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Handeln beeinflusst
    html_string += "<h2 class='nich_pfff'>Wie stark wird dein Handeln/dein Verhalten im Moment beeinflusst?</h2>";
    html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%;'>sehr stark</p>";
    for(var i=0;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='handeln_beeinflusst_"+i+"'> "+i+" </label>"+"<input type='radio' id='handeln_beeinflusst_"+i+"' name='handeln_beeinflusst' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Bewertung des Gefühls
    html_string += "<h2 class='nich_pfff'>Wie würdest du deine momentane Gefühlslage allgemein bewerten?</h2>";
    html_string += "<p style='float: left; width: 40%;'>sehr schlecht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='bewertung_gefühl_"+i+"'> "+i+" </label>"+"<input type='radio' id='bewertung_gefühl_"+i+"' name='bewertung_gefühl' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Essen
    html_string += "<h2 class='nich_pfff'>Falls du heute schon etwas gegessen hast, welches Gericht war es?</h2><select name='essen_select' id='essen_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<essen.length;i++){
        var id = essen[i];
        if(id.length>=30){
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,29)+"."+"</option>";
        }
        else{
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,30)+"</option>";
        } 
    }
    html_string+="</select> <button type='button' class='option_hinzufügen' name='essen_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='essen_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Verträglichkeit Essen
    html_string += "<h2 class='nich_pfff'>Falss du heute schon etwas gegessen hast, wie hast du es vertragen?</h2>";
    html_string += "<p style='float: left; width: 40%;'>sehr schlecht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='verträglichkeit_essen_"+i+"'> "+i+" </label>"+"<input type='radio' id='verträglichkeit_essen_"+i+"' name='verträglichkeit_essen' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Schlaf in Stunden
    html_string += "<h2 class='nich_pfff'>Wie viele Stunden hast du heute Nacht schätzungsweise geschlafen?</h2><select name='schlaf_in_stunden' id='schlaf_in_stunden'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<24;i++){
        var id = i;
        html_string+="<option value='"+id+"'>"+i+"</option>";
    }
    html_string+="</select><br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Müde/Wach
    html_string += "<h2 class='nich_pfff'>Wie müde oder wach fühlst du dich im Moment?</h2>"
    html_string += "<p style='float: left; width: 40%;'>sehr müde</p><p style='float: left; width: 58%; text-align:right;'>sehr wach O_=</p>";
    for(var i=-3;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='müde/wach_"+i+"'> "+i+" </label>"+"<input type='radio' id='müde/wach_"+i+"' name='müde/wach' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="</select><br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Wetter
    html_string += "<h2 class='nich_pfff'>Was für ein Wetter ist im Moment?</h2><select name='wetter_select' id='wetter_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<wetter.length;i++){
        var id = wetter[i];
        if(id.length>=30){
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,29)+"."+"</option>";
        }
        else{
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,30)+"</option>";
        } 
    }
    html_string+="</select> <button type='button' class='option_hinzufügen' name='wetter_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>";
    html_string+="<button type='button' class='lösch_button' name='wetter_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Warm/Kalt
    html_string += "<h2 class='nich_pfff'>Wie empfindest du die momentane Temperatur?</h2>"
    html_string += "<p style='float: left; width: 40%;'>zu heiß</p><p style='float: left; width: 58%; text-align:right;'>viel zu kalt</p>";
    for(var i=-3;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='warm/kalt_"+i+"'> "+i+" </label>"+"<input type='radio' id='warm/kalt_"+i+"' name='warm/kalt' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="</select><br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Event
    html_string += "<h2 class='nich_pfff'>Findet im moment oder fand kürzlich ein besonderes oder außergewöhnliches Ereignis statt? Wenn ja, welches?</h2><select name='event_select' id='event_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<event.length;i++){
        var id = event[i];
        if(id.length>=30){
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,29)+"."+"</option>";
        }
        else{
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,30)+"</option>";
        } 
    }
    html_string+="</select> <button type='button' class='option_hinzufügen' name='event_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='event_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    /*
    // Kontrolle
    html_string += "<h2 class='nich_pfff'><u>Kontrolle des eigenen Handelns</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='kontrolle_handeln_"+i+"'> "+i+" </label>"+"<input type='radio' id='kontrolle_handeln_"+i+"' name='kontrolle_handeln' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################*/


    // Aufenthalt
    html_string += "<h2 class='nich_pfff'>An welchem Ort befindest du dich im Moment?</h2><select name='ort_select' id='ort_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<ort.length;i++){
        var id = ort[i];
        if(id.length>=30){
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,29)+"."+"</option>";
        }
        else{
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,30)+"</option>";
        } 
    }
    html_string+="</select> <button type='button' class='option_hinzufügen' name='ort_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='ort_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Kontakt zu Anderen
    html_string += "<h2 class='nich_pfff'>Hast oder hattest du kürzlich Kontakt zu anderen Personen?</h2>"
    +"<label for='kontakt_menschen_ja'>JA</label><div class='one_radio'>"+"<input type='radio' id='kontakt_menschen_ja' name='kontakt_menschen' value='JA'></div><br>"
    +"<label for='kontakt_menschen_nein'>NEIN</label><div class='one_radio'>"+"<input type='radio' id='kontakt_menschen_nein' name='kontakt_menschen' value='NEIN'></div><br>";
    html_string+="</select><br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Verhältnis zur Person
    html_string += "<h2 class='nich_pfff'>Wie würdest du dein Verhältnis zu dieser Person einschätzen?</h2>";
    html_string += "<p style='float: left; width: 40%;'>sehr schlecht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<div class='one_radio'>"
        html_string += "<label for='verhältnis_person_"+i+"'> "+i+" </label>"+"<input type='radio' id='verhältnis_person_"+i+"' name='verhältnis_person' value='"+i+"'>";
        html_string += "</div>"
    }
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Lösungsansätze
    html_string += "<h2 class='nich_pfff'>Mit welchem Ansatz hast du versucht etwas an deiner momentanen Situation zu verändern?</h2><select name='lösung_select' id='lösung_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<lösung.length;i++){
        var id = lösung[i];
        if(id.length>=30){
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,29)+"."+"</option>";
        }
        else{
            html_string+="<option value='"+id+"' title='"+id+"'>"+id.substring(0,30)+"</option>";
        } 
    }
    html_string+="</select> <button type='button' class='option_hinzufügen' name='lösung_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='lösung_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    // Notizzettel
    html_string+="<h2 class='nich_pfff'>Platz für zusätzliche Notizen</h2>"
    html_string+="<textarea rows='5' cols='33' name='notizen'> </textarea>";
    html_string+="<br><br>";
    html_string+="<div class='trennung'></div>";
    //#######################


    //html_string += "<input type='submit' value='Submit'>"
    //html_string += "<button id='speichern_button' onclick='Angaben_Speichern()'>Speichern</button>",

    html_string += "</form>";

    //Der fertige String wird ins Dokument eingefügt 
    document.getElementById("fragebogen").innerHTML = html_string;

}//#########################################################




