function Suche_nach_Parameter(x){


    //Die Fragen werden nach der Struktur des html-Aufbaus zusammengefasst und dynamisch erzeugt

/*
    // <select> (Aufwändig aufgrund prozeduraler Erzeugung)
    //###########################################
    var doSql = false; // Ob eine Sql Abfrage gemacht werden soll (nur um Auswahlmöglichkeiten für select zu ziehen!!!)
    switch (x){
        case "Gedanken" :{var table="gedanken_auswahl";var fragenname="Wiederkehrende Gedanken";doSql=true;};break;
        case "Essen" :{var table="essen_auswahl";var fragenname="Essen";doSql=true;};break;
        case "Wetter" :{var table="wetter_auswahl";var fragenname="Wetter";doSql=true;};break;
        case "Event" :{var table="event_auswahl";var fragenname="Events";doSql=true;};break;
        case "Ort" :{var table="ort_auswahl";var fragenname="Wo bin ich";doSql=true;};break;
        case "Lösung" :{var table="lösung_auswahl";var fragenname="Lösungsansätze";doSql=true;};break;
    }
    // Nur dann ein request erstellen, wenn es sich um eine <select> Box handelt
    if(doSql == true){
        var url = "http://localhost/Abschlussprojekt/statistik.php?req=kategorie&table="+table;
        var res = Send_Request(url);
        res = JSON.parse(res);

        html_string="<h2>"+fragenname+"</h2><br>";
        html_string+="<select id='statistik_kategorie'>";
        for(var i=0;i<res.length;i++){ // Für jede Option im Array

            // Der Wert des Feldes wird in einer Variabe gespeichert (kann nicht im String geschehen)
            switch (x){
                case "Gedanken" :{var wert = res[i].Gedanken}; break;
                case "Essen" :{var wert = res[i].Essen}; break;
                case "Wetter" :{var wert = res[i].Wetter}; break;
                case "Event" :{var wert = res[i].Event}; break;
                case "Ort" :{var wert = res[i].Ort}; break;
                case "Lösung" :{var wert = res[i].Lösung}; break;          
            }

            // Der Spaltenname und sein Wert wird zu einem String zusammen gefügt und der <option> als value mitgegeben
            var str = x;

            html_string+="<option value='"+str+"' onclick='Suche_Starten(this.value,"+i+")'>"+wert+"</option>";

        }
        html_string+="</select>";
    }
    //###########################################
    




    // <radio> 0-3 (zwei insgesammt)
    //###########################################
    else if(x=="Produktivität" || x=="Handeln"){
        html_string = "<h2>"+x+"</h2>";
        Suche_Starten(x,1);
    }
    //###########################################




    // <radio> -3 - 3 
    //###########################################
    else if(x=="Bewertung" || x=="Verträglichkeit" || x=="Müde" || x=="Warm" || x=="Verhältnis"){
        html_string = "<h2>"+x+"</h2>";
        html_string += rad
    }
    //###########################################
*/





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


var html_string = "<form action=''>";
html_string += "<h1><u>komplexe Suche</u></h1><br><br>";


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
html_string += "<p style='float: left; width: 40%;'>gar nicht</p><p style='float: left; width: 58%;'>sehr stark</p>";
for(var i=0;i<4;i++){
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
html_string+="<br>";
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
html_string+="<br><br>";
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
html_string+="</select><br>";
//#######################


// Warm/Kalt
html_string += "<h2 class='nich_pfff'><u>Warm / Kalt</u></h2>"
html_string += "<p style='float: left; width: 40%;'>zu heiß</p><p style='float: left; width: 58%; text-align:right;'>viel zu kalt</p>";
for(var i=-3;i<4;i++){
    html_string += "<label for='warm/kalt_"+i+"'> "+i+" </label>"+"<input type='radio' id='warm/kalt_"+i+"' name='warm/kalt' value='"+i+"'>";
}
html_string+="<br><br>";
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
html_string+="</select> <br>";
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
html_string+="</select> <br>";
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
html_string+="</select> <br>";
//#######################



//html_string += "<input type='submit' value='Submit'>"
html_string += "<button id='speichern_button' onclick='Angaben_Speichern()'>Speichern</button>",

html_string += "</form>";

//Der fertige String wird ins Dokument eingefügt 
    document.getElementById("suche_kategorie").innerHTML = html_string;

} 



function Suche_Starten(spalte,wert){

    //alert(spalte+" "+wert);

}