
//#########################################################
function Angaben_Speichern(){

    if(confirm("Möchten Sie ihren Eintrag speichern?")) {

        // Die einzelnen Fragen werden ausgewertet und die Ergebnisse in Variablen gespeichert
        // 'Input' angaben BENÖTIGEN eine Auswahl, deshalb die if-Abfrage . 'Select' und 'Textarea' dürfen leer sein
        var gedanken = document.querySelector("select[name='gedanken_select']").value;
        if(document.querySelector("input[name='bekannte_situation']:checked")){var situation = document.querySelector("input[name='bekannte_situation']:checked").value;}else{var situation = ""};
        if(document.querySelector("input[name='behinderung_produktivität']:checked")){var produk = document.querySelector("input[name='behinderung_produktivität']:checked").value;}   

        if(document.querySelector("input[name='handeln_beeinflusst']:checked")){var handeln = document.querySelector("input[name='handeln_beeinflusst']:checked").value;}
        if(document.querySelector("input[name='bewertung_gefühl']:checked")){var bewertung = document.querySelector("input[name='bewertung_gefühl']:checked").value;}
        var essen = document.querySelector("select[name='essen_select']").value;
  
        if(document.querySelector("input[name='verträglichkeit_essen']:checked")){var verträglichkeit = document.querySelector("input[name='verträglichkeit_essen']:checked").value;}
        var schlaf = document.querySelector("select[name='schlaf_in_stunden']").value;
        if(document.querySelector("input[name='müde/wach']:checked")){var müde = document.querySelector("input[name='müde/wach']:checked").value;}

        var wetter = document.querySelector("select[name='wetter_select']").value;
        if(document.querySelector("input[name='warm/kalt']:checked")){var warm = document.querySelector("input[name='warm/kalt']:checked").value;}
        var event = document.querySelector("select[name='event_select']").value;

        if(document.querySelector("input[name='kontrolle_handeln']:checked")){var kontrolle = document.querySelector("input[name='kontrolle_handeln']:checked").value;}
        var ort = document.querySelector("select[name='ort_select']").value;
        if(document.querySelector("input[name='kontakt_menschen']:checked")){var kontakt = document.querySelector("input[name='kontakt_menschen']:checked").value;}else{var kontakt = ""};
   
        if(document.querySelector("input[name='verhältnis_person']:checked")){var verhältnis = document.querySelector("input[name='verhältnis_person']:checked").value;}
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
        var url = "http://localhost/Abschlussprojekt/speichern.php?req=speichern&tag="+tag+"&monat="+monat+"&jahr="+jahr+"&sekunde="+sekunde+"&minute="+minute+"&stunde="+stunde;
            url += "&farbe="+color+"&emotion="+emotion+"&gedanken="+gedanken+"&situation="+situation+"&produk="+produk+"&handeln="+handeln+"&bewertung="+bewertung+"&essen="+essen+"&verträglichkeit="+verträglichkeit;
            url += "&schlaf="+schlaf+"&müde="+müde+"&wetter="+wetter+"&warm="+warm+"&event="+event+"&kontrolle="+kontrolle+"&ort="+ort+"&kontakt="+kontakt+"&verhältnis="+verhältnis;
            url += "&lösung="+lösung+"&notiz="+notiz;
    
        // Die URL und die Zielfunktion für den Rückgabewert werden an die dafür vorgesehene Funktion im AJAX.js Skript geschickt um von dort
        // an den Server versendet zu werden
        var res = Send_Request(url);
        alert(res);

        if(res == "Angaben wurden erfolgreich gespeichert"){
            window.close();
        };
    }

}//########################################################






//#########################################################
function Auswahl_Hinzufügen(frage){

    switch (frage){

        case "gedanken_hinzufügen":{var tabelle = "gedanken_auswahl"; var spalte = "Gedanken"; var select_id = "gedanken_select";};break;
        case "essen_hinzufügen":{var tabelle = "essen_auswahl"; var spalte = "Essen"; var select_id = "essen_select";};break;
        case "wetter_hinzufügen":{var tabelle = "wetter_auswahl"; var spalte = "Wetter"; var select_id = "wetter_select";};break;
        case "event_hinzufügen":{var tabelle = "event_auswahl"; var spalte = "Event"; var select_id = "event_select";};break;
        case "ort_hinzufügen":{var tabelle = "ort_auswahl"; var spalte = "Ort"; var select_id = "ort_select";};break;
        case "lösung_hinzufügen":{var tabelle = "lösungen_auswahl"; var spalte = "Lösung"; var select_id = "lösung_select";};break;

    }

    var eingabe = prompt("Auswahlmöglichkeit hinzufügen");

    if(eingabe != ""){
        var url = "http://localhost/Abschlussprojekt/speichern.php?req=hinzufügen&tabelle="+tabelle+"&spalte="+spalte+"&eingabe="+eingabe;

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
        case "event_löschen":{var tabelle = "event_auswahl"; var spalte = "Event"; var select_id = "event_select";};break;
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
    
}
//#########################################################




var color;
var emotion;
// Der Fragebogen wird dynamisch erzeugt 
// Dazu wird ein seeeeehr langer String gebildet
//#########################################################
function Fragebogen_Erstellen(x){

    // Der Überlieferte Name muss zerteilt werden, um Farbe von Emotion zu trennen
    var pos = x.indexOf("#");
    color = x.substring(0,pos);
    emotion = x.substring(pos+1);


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
        else if(auswahlmöglichkeiten[i].Event){
            event.push(auswahlmöglichkeiten[i].Event);
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

    
    // Wiederkehrende Gedanken
    html_string += "<h2 id='pfff'><u>Wiederkehrende Gedanken</u></h2><select name='gedanken_select' id='gedanken_select'>";
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
    html_string+="<button type='button' name='gedanken_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>";
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button>";
    html_string+="<br><br>";
    //#######################


    // Bekannte Situation
    html_string += "<h2 class='nich_pfff'><u>Bekannte Situation</u></h2>"
    +"<input type='radio' id='bekannte_situation_ja' name='bekannte_situation' value='JA'>" + "<label for='bekannte_situation_ja'>JA</label><br>"
    +"<input type='radio' id='bekannte_situation_nein' name='bekannte_situation' value='NEIN'>" + "<label for='bekannte_situation_nein'>NEIN</label><br>";
    html_string+="<br><br>";
    //#######################


    // Behinderung der Produktivität
    html_string += "<h2 class='nich_pfff'><u>Behinderung der Produktivität</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%;'>sehr stark</p>";
    for(var i=0;i<4;i++){
        html_string += "<label for='behinderung_produktivität_"+i+"'> "+i+" </label>"+"<input type='radio' id='behinderung_produktivität_"+i+"' name='behinderung_produktivität' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Handeln beeinflusst
    html_string += "<h2 class='nich_pfff'><u>Handeln beeinflusst</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%; text-align:right;'>sehr stark</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='handeln_beeinflusst_"+i+"'> "+i+" </label>"+"<input type='radio' id='handeln_beeinflusst_"+i+"' name='handeln_beeinflusst' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Bewertung des Gefühls
    html_string += "<h2 class='nich_pfff'><u>Bewertung des Gefühls</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>sehr schlecht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='bewertung_gefühl_"+i+"'> "+i+" </label>"+"<input type='radio' id='bewertung_gefühl_"+i+"' name='bewertung_gefühl' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Essen
    html_string += "<h2 class='nich_pfff'><u>Essen</u></h2><select name='essen_select' id='essen_select'>";
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
    html_string+="</select> <button type='button' name='essen_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    //#######################


    // Verträglichkeit Essen
    html_string += "<h2 class='nich_pfff'><u>Verträglichkeit des Essens</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>sehr schlecht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='verträglichkeit_essen_"+i+"'> "+i+" </label>"+"<input type='radio' id='verträglichkeit_essen_"+i+"' name='verträglichkeit_essen' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Schlaf in Stunden
    html_string += "<h2 class='nich_pfff'><u>Schlaf in Stunden</u></h2><select name='schlaf_in_stunden' id='schlaf_in_stunden'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<24;i++){
        var id = i;
        html_string+="<option value='"+id+"'>"+i+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Müde/Wach
    html_string += "<h2 class='nich_pfff'><u>Müde / Wach</u></h2>"
    html_string += "<p style='float: left; width: 40%;'>sehr müde</p><p style='float: left; width: 58%; text-align:right;'>sehr wach O_=</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='müde/wach_"+i+"'> "+i+" </label>"+"<input type='radio' id='müde/wach_"+i+"' name='müde/wach' value='"+i+"'>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Wetter
    html_string += "<h2 class='nich_pfff'><u>Wetter</u></h2><select name='wetter_select' id='wetter_select'>";
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
    html_string+="</select> <button type='button' name='wetter_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>";
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    //#######################


    // Warm/Kalt
    html_string += "<h2 class='nich_pfff'><u>Warm / Kalt</u></h2>"
    html_string += "<p style='float: left; width: 40%;'>zu heiß</p><p style='float: left; width: 58%; text-align:right;'>viel zu kalt</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='warm/kalt_"+i+"'> "+i+" </label>"+"<input type='radio' id='warm/kalt_"+i+"' name='warm/kalt' value='"+i+"'>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Event
    html_string += "<h2 class='nich_pfff'><u>Events</u></h2><select name='event_select' id='event_select'>";
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
    html_string+="</select> <button type='button' name='event_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    //#######################


    // Kontrolle
    html_string += "<h2 class='nich_pfff'><u>Kontrolle des eigenen Handelns</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='kontrolle_handeln_"+i+"'> "+i+" </label>"+"<input type='radio' id='kontrolle_handeln_"+i+"' name='kontrolle_handeln' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Aufenthalt
    html_string += "<h2 class='nich_pfff'><u>Wo bin ich</u></h2><select name='ort_select' id='ort_select'>";
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
    html_string+="</select> <button type='button' name='ort_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    //#######################


    // Kontakt zu Anderen
    html_string += "<h2 class='nich_pfff'><u>Kontakt zu Menschen</u></h2>"
    +"<input type='radio' id='kontakt_menschen_ja' name='kontakt_menschen' value='JA'>" + "<label for='kontakt_menschen_ja'>JA</label><br>"
    +"<input type='radio' id='kontakt_menschen_nein' name='kontakt_menschen' value='NEIN'>" + "<label for='kontakt_menschen_nein'>NEIN</label><br>";
    html_string+="</select><br><br>";
    //#######################


    // Verhältnis zur Person
    html_string += "<h2 class='nich_pfff'><u>Verhältnis zu dieser Person</u></h2>";
    html_string += "<p style='float: left; width: 40%;'>sehr schlecht</p><p style='float: left; width: 58%; text-align:right;'>sehr gut</p>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='verhältnis_person_"+i+"'> "+i+" </label>"+"<input type='radio' id='verhältnis_person_"+i+"' name='verhältnis_person' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Lösungsansätze
    html_string += "<h2 class='nich_pfff'><u>Lösungsansätze</u></h2><select name='lösung_select' id='lösung_select'>";
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
    html_string+="</select> <button type='button' name='lösung_hinzufügen' onclick='Auswahl_Hinzufügen(this.name)'><b>+</b></button><br>"; 
    html_string+="<button type='button' class='lösch_button' name='gedanken_löschen' onclick='Auswahl_Löschen(this.name)'><b>Auswahl entfernen</b></button> <br><br>";
    //#######################


    // Notizzettel
    html_string+="<h2 class='nich_pfff'><u>Zusätzliche Notizen</u></h2>"
    html_string+="<textarea rows='5' cols='33' name='notizen'> </textarea>";
    html_string+="<br><br>";
    //#######################


    //html_string += "<input type='submit' value='Submit'>"
    html_string += "<button id='speichern_button' onclick='Angaben_Speichern()'>Speichern</button>",

    html_string += "</form>";

    //Der fertige String wird ins Dokument eingefügt 
    document.getElementById("body").innerHTML = html_string;

}//#########################################################




