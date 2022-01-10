function Fragebogen_Erstellen(){

    // Es wird eine Anfrage an den Server geschickt und eine Antwort empfangen
    var json_response = Send_Request("http://localhost/Abschlussprojekt/auswahl.php?req=erstellen");
    var auswahlmöglichkeiten = JSON.parse(json_response);

    // Arrays für die Antwortmöglichkeiten der verschiedenen Fragen  
    var essen=[];
    var event=[];
    var gedanken=[];
    var wetter=[];
    var lösung=[];

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

    }
    //###########################################




    // Ab diesem Punkt wird anhand der Werte in den Arrays ein html-String geschrieben,
    // welches mehrere 'select' Boxen und radio buttons enthält
    // Die jeweiligen Größen der Auswahlmöglichkeiten sind variabel

    // Der Standartmäßige Anfang des html Forms
    // in einem String, der später weiter verlängert wird
    var html_string = "<form action=''>";
    html_string += "<h1>Fragebogen</h1><br><br>";

    
    // Wiederkehrende Gedanken
    html_string += "<h2>Wiederkehrende Gedanken</h2><select name='wiederkehrende_gedanken_select' id='wiederkehrende_gedanken_select'>";
    for(var i=0;i<gedanken.length;i++){
        var id = gedanken[i];
        html_string+="<option value='"+id+"'>"+gedanken[i]+"</option>";
    }
    html_string+="</select><br><br>";
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
    for(var i=0;i<essen.length;i++){
        var id = essen[i];
        html_string+="<option value='"+id+"'>"+essen[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Schlaf in Stunden
    html_string += "<h2>Schlaf in Stunden</h2><select name='schlaf_in_stunden' id='schlaf_in_stunden'>";
    for(var i=0;i<24;i++){
        var id = i;
        html_string+="<option value='"+id+"'>"+i+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Müde/Wach
    html_string += "<h2>Müde / Wach</h2>"
    +"<input type='radio' id='müde_wach_müde' name='müde_wach' value='müde'>" + "<label for='müde_wach_ja'>Müde</label><br>"
    +"<input type='radio' id='müde_wach_wach' name='müde_wach' value='wach'>" + "<label for='müde_wach_nein'>Wach</label><br>";
    html_string+="</select><br><br>";
    //#######################


    // Wetter
    html_string += "<h2>Wetter</h2><select name='wetter_select' id='wetter_select'>";
    for(var i=0;i<wetter.length;i++){
        var id = wetter[i];
        html_string+="<option value='"+id+"'>"+wetter[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Warm/Kalt
    html_string += "<h2>Warm / Kalt</h2>"
    +"<input type='radio' id='warm_kalt_warm' name='warm_kalt' value='warm'>" + "<label for='warm_kalt_warm'>Warm</label><br>"
    +"<input type='radio' id='warm_kalt_kalt' name='warm_kalt' value='kalt'>" + "<label for='warm_kalt_kalt'>Kalt</label><br>";
    html_string+="</select><br><br>";
    //#######################


    // Event
    html_string += "<h2>Events</h2><select name='events_select' id='events_select'>";
    for(var i=0;i<event.length;i++){
        var id = event[i];
        html_string+="<option value='"+id+"'>"+event[i]+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################


    // Kontrolle
    html_string += "<h2>Kontrolle des eigenen Handelns</h2>";
    for(var i=0;i<4;i++){
        html_string += "<label for='kontrolle_handeln"+i+"'> "+i+" </label>"+"<input type='radio' id='kontrolle_handeln_"+i+"' name='kontrolle_handeln' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Aufenthalt
    html_string += "<h2>Wo bin ich</h2>"
    + "<label for='aufenthalt_schule'> Schule </label>"+"<input type='radio' id='aufenthalt_schule' name='aufenthalt' value='schule'>"
    + "<label for='aufenthalt_arbeit'> Arbeit </label>"+"<input type='radio' id='aufenthalt_arbeit' name='aufenthalt' value='arbeit'>"
    + "<label for='aufenthalt_zuhause'> Zuhause </label>"+"<input type='radio' id='aufenthalt_zuhause' name='aufenthalt' value='zuhause'>"
    //html_string += "<label for='aufenthalt_schule'> Schule </label>"+"<input type='radio' id='aufenthalt_schule' name='aufenthalt' value='schule'>";
    +"<br><br>";
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
        html_string += "<label for='verhältnis_person"+i+"'> "+i+" </label>"+"<input type='radio' id='verhältnis_person_"+i+"' name='verhältnis_person' value='"+i+"'>";
    }
    html_string+="<br><br>";
    //#######################


    // Lösungsansätze
    html_string += "<h2>Lösungsansätze</h2><select name='lösung_select' id='lösung_select'>";
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
    html_string += "<button id='test' onclick='Angaben_Speichern()'>Farbe zurücksetzen</button>",

    html_string += "</form>";

    //Der fertige String wird ins Dokument eingefügt 
    document.getElementById("body").innerHTML = html_string;
}




function Angaben_Speichern(){

    var out = "";

    var gedanken = document.querySelector("select[name='wiederkehrende_gedanken_select']").value;
    var situation = document.querySelector("input[name='bekannte_situation']:checked").value;
    var produk = document.querySelector("input[name='behinderung_produktivität']:checked").value;

    var handeln = document.querySelector("input[name='handeln_beeinflusst']:checked").value;
    var bewertung = document.querySelector("input[name='bewertung_gefühl']:checked").value;
    var essen = document.querySelector("select[name='essen_select']").value;

    var schlaf = document.querySelector("select[name='schlaf_in_stunden']").value;
    var müde = document.querySelector("input[name='müde_wach']:checked").value;
    var wetter = document.querySelector("select[name='wetter_select']").value;

    var warm = document.querySelector("input[name='warm_kalt']:checked").value;
    var event = document.querySelector("select[name='events_select']").value;
    var kontrolle = document.querySelector("input[name='kontrolle_handeln']:checked").value;

    var ort = document.querySelector("input[name='aufenthalt']:checked").value;
    var kontakt = document.querySelector("input[name='kontakt_menschen']:checked").value;
    var verhältnis = document.querySelector("input[name='verhältnis_person']:checked").value;

    var lösung = document.querySelector("select[name='lösung_select']").value;
    var notiz = document.querySelector("textarea[name='notizen']").value;



    out += gedanken+" "+situation+" "+produk+" "+handeln+" "+bewertung+" "+essen+" "+schlaf+" "+müde+" "+wetter+" "+warm+" "+event+" "+kontrolle+" "+ort+" "+kontakt+" "+verhältnis+" "+lösung+" "+notiz;


    alert(out);
}