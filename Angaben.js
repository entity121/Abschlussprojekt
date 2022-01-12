var color;

//#########################################################
function Fragebogen_Erstellen(x){

    color = x;

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
        else if(auswahlmöglichkeiten[i].Events){
            event.push(auswahlmöglichkeiten[i].Events);
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
    html_string += "<h1>Fragebogen</h1><br><br>";

    
    // Wiederkehrende Gedanken
    html_string += "<h2>Wiederkehrende Gedanken</h2><select name='gedanken_select' id='gedanken_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<gedanken.length;i++){
        var id = gedanken[i];
        html_string+="<option value='"+id+"'>"+gedanken[i]+"</option>";
    }
    html_string+="</select>  <button type='button' name='gedanken_hinzufügen' onclick='Auswahl_Hinzufügen()'>Speichern</button>  <br><br>";
    //#######################


    // Bekannte Situation
    html_string += "<h2>Bekannte Situation</h2>"
    +"<input type='radio' id='bekannte_situation_ja' name='bekannte_situation' value='JA'>" + "<label for='bekannte_situation_ja'>JA</label><br>"
    +"<input type='radio' id='bekannte_situation_nein' name='bekannte_situation' value='NEIN'>" + "<label for='bekannte_situation_nein'>NEIN</label><br>";
    html_string+="</select><br><br>";
    //#######################


    // Behinderung der Produktivität
    html_string += "<h2>Behinderung der Produktivität</h2>";
    for(var i=0;i<4;i++){
        html_string += "<label for='behinderung_produktivität_"+i+"'> "+i+" </label>"+"<input type='radio' id='behinderung_produktivität_"+i+"' name='behinderung_produktivität' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Handeln beeinflusst
    html_string += "<h2>Handeln beeinflusst</h2>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='handeln_beeinflusst_"+i+"'> "+i+" </label>"+"<input type='radio' id='handeln_beeinflusst_"+i+"' name='handeln_beeinflusst' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Bewertung des Gefühls
    html_string += "<h2>Bewertung des Gefühls</h2>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='bewertung_gefühl_"+i+"'> "+i+" </label>"+"<input type='radio' id='bewertung_gefühl_"+i+"' name='bewertung_gefühl' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Essen
    html_string += "<h2>Essen</h2><select name='essen_select' id='essen_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<essen.length;i++){
        var id = essen[i];
        html_string+="<option value='"+id+"'>"+essen[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Verträglichkeit Essen
    html_string += "<h2>Verträglichkeit des Essens</h2>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='verträglichkeit_essen_"+i+"'> "+i+" </label>"+"<input type='radio' id='verträglichkeit_essen_"+i+"' name='verträglichkeit_essen' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Schlaf in Stunden
    html_string += "<h2>Schlaf in Stunden</h2><select name='schlaf_in_stunden' id='schlaf_in_stunden'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<24;i++){
        var id = i;
        html_string+="<option value='"+id+"'>"+i+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Müde/Wach
    html_string += "<h2>Müde / Wach</h2>"
    for(var i=-3;i<4;i++){
        html_string += "<label for='müde/wach_"+i+"'> "+i+" </label>"+"<input type='radio' id='müde/wach_"+i+"' name='müde/wach' value='"+i+"'>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Wetter
    html_string += "<h2>Wetter</h2><select name='wetter_select' id='wetter_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<wetter.length;i++){
        var id = wetter[i];
        html_string+="<option value='"+id+"'>"+wetter[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Warm/Kalt
    html_string += "<h2>Warm / Kalt</h2>"
    for(var i=-3;i<4;i++){
        html_string += "<label for='warm/kalt_"+i+"'> "+i+" </label>"+"<input type='radio' id='warm/kalt_"+i+"' name='warm/kalt' value='"+i+"'>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Event
    html_string += "<h2>Events</h2><select name='events_select' id='events_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<event.length;i++){
        var id = event[i];
        html_string+="<option value='"+id+"'>"+event[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Kontrolle
    html_string += "<h2>Kontrolle des eigenen Handelns</h2>";
    for(var i=0;i<4;i++){
        html_string += "<label for='kontrolle_handeln_"+i+"'> "+i+" </label>"+"<input type='radio' id='kontrolle_handeln_"+i+"' name='kontrolle_handeln' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Aufenthalt
    html_string += "<h2>Wo bin ich</h2><select name='aufenthalt' id='aufenthalt'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<ort.length;i++){
        var id = ort[i];
        html_string+="<option value='"+id+"'>"+ort[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Kontakt zu Anderen
    html_string += "<h2>Kontakt zu Menschen</h2>"
    +"<input type='radio' id='kontakt_menschen_ja' name='kontakt_menschen' value='JA'>" + "<label for='kontakt_menschen_ja'>JA</label><br>"
    +"<input type='radio' id='kontakt_menschen_nein' name='kontakt_menschen' value='NEIN'>" + "<label for='kontakt_menschen_nein'>NEIN</label><br>";
    html_string+="</select><br><br>";
    //#######################


    // Verhältnis zur Person
    html_string += "<h2>Verhältnis zu dieser Person</h2>";
    for(var i=-3;i<4;i++){
        html_string += "<label for='verhältnis_person_"+i+"'> "+i+" </label>"+"<input type='radio' id='verhältnis_person_"+i+"' name='verhältnis_person' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Lösungsansätze
    html_string += "<h2>Lösungsansätze</h2><select name='lösung_select' id='lösung_select'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<lösung.length;i++){
        var id = lösung[i];
        html_string+="<option value='"+id+"'>"+lösung[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Notizzettel
    html_string+="<h2>Zusätzliche Notizen</h2>"
    html_string+="<textarea rows='4' cols='50' name='notizen'> </textarea>";
    html_string+="<br><br>";
    //#######################


    //html_string += "<input type='submit' value='Submit'>"
    html_string += "<button id='test' onclick='Angaben_Speichern()'>Speichern</button>",

    html_string += "</form>";

    //Der fertige String wird ins Dokument eingefügt 
    document.getElementById("body").innerHTML = html_string;

}//#########################################################




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
        var event = document.querySelector("select[name='events_select']").value;

        if(document.querySelector("input[name='kontrolle_handeln']:checked")){var kontrolle = document.querySelector("input[name='kontrolle_handeln']:checked").value;}
        var ort = document.querySelector("select[name='aufenthalt']").value;
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
            url += "&farbe="+color+"&gedanken="+gedanken+"&situation="+situation+"&produk="+produk+"&handeln="+handeln+"&bewertung="+bewertung+"&essen="+essen+"&verträglichkeit="+verträglichkeit;
            url += "&schlaf="+schlaf+"&müde="+müde+"&wetter="+wetter+"&warm="+warm+"&event="+event+"&kontrolle="+kontrolle+"&ort="+ort+"&kontakt="+kontakt+"&verhältnis="+verhältnis;
            url += "&lösung="+lösung+"&notiz="+notiz;
    
        // Die URL und die Zielfunktion für den Rückgabewert werden an die dafür vorgesehene Funktion im AJAX.js Skript geschickt um von dort
        // an den Server versendet zu werden
        var res = Send_Request(url);
        alert(res);
    }

}//#########################################################