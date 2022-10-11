 
// Arrays für die Antwortmöglichkeiten der verschiedenen Fragen  
var essen=[];
var event=[];
var gedanken=[];
var wetter=[];
var lösung=[];
var ort=[];
var emotionen=[];
var farben=[];


//#########################################################
function Suche_Vollständig(){

    // Die Parameter Auswahl für die Suchfunktion wird erzeugt wie beim Fragebogen selbst mit leichten Veränderungen
    var json_response = Send_Request("http://localhost/Abschlussprojekt/auswahl.php?req=erstellen");
    var auswahlmöglichkeiten = JSON.parse(json_response);


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
        else if(auswahlmöglichkeiten[i].Emotion){
            emotionen.push(auswahlmöglichkeiten[i].Emotion);
            farben.push(auswahlmöglichkeiten[i].Farbe);
        }

    }
 
 
    //var html_string = "<form action=''>";
    var html_string = "<h1><u>Komplexe Suche</u></h1><br><br>";


    // Emotionen
    html_string += "<h2 id='pfff' style='width:100%'><u>Emotionen</u></h2><select name='emotionen_select' id='emotion_select' style='background-color: #a6a6a6'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<emotionen.length;i++){
        var id = emotionen[i];

        html_string+="<option value='"+id+"' title='"+id+"' style='background-color: "+farben[i]+"' onclick='dieemotionenselectboxfärben(this.value)'>"+id+"</option>";
          
    }
    html_string+="</select>";
    html_string+="<br><br>";
    //#######################
 
 
    // Wiederkehrende Gedanken
    html_string += "<h2 id='pfff' style='width:100%'><u>Wiederkehrende Gedanken</u></h2><select name='gedanken_select' id='gedanken_select'>";
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
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Behinderung der Produktivität</u></h2>"

        +"<input type='radio' id='behinderung_produktivität_ja' name='behinderung_produktivität' value='1' onclick='Radio_Uncheck()'>" + "<label class='suche_radio' for='behinderung_produktivität_ja'>JA</label><br>"
        +"<input type='radio' id='behinderung_produktivität_nein' name='behinderung_produktivität' value='0'>" + "<label class='suche_radio' for='behinderung_produktivität_nein'>NEIN</label><br>";

    html_string+="<br><br>";
    //#######################
 
 
    // Handeln beeinflusst
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Handeln beeinflusst</u></h2>"

        +"<input type='radio' id='handeln_beeinflusst_ja' name='handeln_beeinflusst' value='1'>" + "<label class='suche_radio' for='handeln_beeinflusst__ja'>JA</label><br>"
        +"<input type='radio' id='handeln_beeinflusst_nein' name='handeln_beeinflusst' value='0'>" + "<label class='suche_radio' for='handeln_beeinflusst__nein'>NEIN</label><br>";

    html_string+="<br><br>";
    //#######################
    
    
    // Bewertung des Gefühls
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Bewertung des Gefühls</u></h2>";

        html_string += "<input type='radio' id='bewertung_gefühl_negativ' name='bewertung_gefühl' value='-'><label class='suche_radio' for='bewertung_gefühl_negativ'> Negativ </label>";
        html_string += "<input type='radio' id='bewertung_gefühl_neutral' name='bewertung_gefühl' value='o'><label class='suche_radio' for='bewertung_gefühl_neutral'> Neutral </label>";
        html_string += "<input type='radio' id='bewertung_gefühl_positiv' name='bewertung_gefühl' value='+'><label class='suche_radio' for='bewertung_gefühl_positiv'> Positiv </label>";

    html_string+="<br><br>";
    //#######################
    
    
    // Essen
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Essen</u></h2><select name='essen_select' id='essen_select'>";
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
    html_string+="</select><br>";
    //#######################
    
    
    // Verträglichkeit Essen
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Verträglichkeit des Essens</u></h2>";

        html_string += "<input type='radio' id='verträglichkeit_essen_negativ' name='verträglichkeit_essen' value='-'><label class='suche_radio' for='verträglichkeit_essen_negativ'> Negativ </label>";
        html_string += "<input type='radio' id='verträglichkeit_essen_neutral' name='verträglichkeit_essen' value='o'><label class='suche_radio' for='verträglichkeit_essen_neutral'> Neutral </label>";
        html_string += "<input type='radio' id='verträglichkeit_essen_positiv' name='verträglichkeit_essen' value='+'><label class='suche_radio' for='verträglichkeit_essen_positiv'> Positiv </label>";

    html_string+="<br><br>";
    //#######################
    
    
    // Schlaf in Stunden
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Schlaf in Stunden</u></h2><select name='schlaf_in_stunden' id='schlaf_in_stunden'>";
    html_string += "<option selected value=''></option>";
    for(var i=0;i<24;i++){
        var id = i;
        html_string+="<option value='"+id+"'>"+i+"</option>";
    }
    html_string+="</select><br><br>";
    //#######################
    
    
    // Müde/Wach
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Müde / Wach</u></h2>"

        html_string += "<input type='radio' id='müde/wach_negativ' name='müde/wach' value='-'><label class='suche_radio' for='müde/wach_negativ'> Müde </label>";
        html_string += "<input type='radio' id='müde/wach_neutral' name='müde/wach' value='o'><label class='suche_radio' for='müde/wach_neutral'> Neutral </label>";
        html_string += "<input type='radio' id='müde/wach_positiv' name='müde/wach' value='+'><label class='suche_radio' for='müde/wach_positiv'> Wach </label>";

    html_string+="<br><br>";
    //#######################
    
    
    // Wetter
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Wetter</u></h2><select name='wetter_select' id='wetter_select'>";
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
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Warm / Kalt</u></h2>"

        html_string += "<input type='radio' id='warm/kalt_negativ' name='warm/kalt' value='-'><label class='suche_radio' for='warm/kalt_negativ'> Heiß </label>";
        html_string += "<input type='radio' id='warm/kalt_neutral' name='warm/kalt' value='o'><label class='suche_radio' for='warm/kalt_neutral'> Neutral </label>";
        html_string += "<input type='radio' id='warm/kalt_positiv' name='warm/kalt' value='+'><label class='suche_radio' for='warm/kalt_positiv'> Kalt </label>";

    html_string+="<br><br>";
    //#######################
    
    
    // Event
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Events</u></h2><select name='event_select' id='event_select'>";
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
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Wo bin ich</u></h2><select name='ort_select' id='ort_select'>";
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
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Kontakt zu Menschen</u></h2>"

    +"<input type='radio' id='kontakt_menschen_ja' name='kontakt_menschen' value='1'>" + "<label class='suche_radio' for='kontakt_menschen_ja'>JA</label><br>"
    +"<input type='radio' id='kontakt_menschen_nein' name='kontakt_menschen' value='0'>" + "<label class='suche_radio' for='kontakt_menschen_nein'>NEIN</label><br>";

    html_string+="</select><br><br>";
    //#######################
    
    
    // Verhältnis zur Person
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Verhältnis zu dieser Person</u></h2>";

        html_string += "<input type='radio' id='verhältnis_person_negativ' name='verhältnis_person' value='-'><label class='suche_radio' for='verhältnis_person_negativ'> Schlecht </label>";
        html_string += "<input type='radio' id='verhältnis_person_neutral' name='verhältnis_person' value='o'><label class='suche_radio' for='verhältnis_person_neutral'> Neutral </label>";
        html_string += "<input type='radio' id='verhältnis_person_positiv' name='verhältnis_person' value='+'><label class='suche_radio' for='verhältnis_person_positiv'> Gut </label>";

    html_string+="<br><br>";
    //#######################
    
    
    // Lösungsansätze
    html_string += "<h2 class='nich_pfff' style='width:100%'><u>Lösungsansätze</u></h2><select name='lösung_select' id='lösung_select'>";
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
    html_string+="</select><br><br><p style='width:100%;color:green'>.</p>";
    //#######################
    
    document.getElementById("suche_kategorie").innerHTML = html_string;
}
//#########################################################




//#########################################################
function Suche_Starten(){

    // Die einzelnen Fragen werden ausgewertet und die Ergebnisse in Variablen gespeichert
    // 'Input' angaben BENÖTIGEN eine Auswahl, deshalb die if-Abfrage . 'Select' und 'Textarea' dürfen leer sein
    var emotion = document.querySelector("select[name='emotionen_select']").value;
    var gedanken = document.querySelector("select[name='gedanken_select']").value;
    if(document.querySelector("input[name='behinderung_produktivität']:checked")){var produk = document.querySelector("input[name='behinderung_produktivität']:checked").value;}else{var produk = ""};   

    if(document.querySelector("input[name='handeln_beeinflusst']:checked")){var handeln = document.querySelector("input[name='handeln_beeinflusst']:checked").value;}else{var handeln = ""};
    if(document.querySelector("input[name='bewertung_gefühl']:checked")){var bewertung = document.querySelector("input[name='bewertung_gefühl']:checked").value;}else{var bewertung = ""};
    var essen = document.querySelector("select[name='essen_select']").value;

    if(document.querySelector("input[name='verträglichkeit_essen']:checked")){var verträglichkeit = document.querySelector("input[name='verträglichkeit_essen']:checked").value;}else{var verträglichkeit = ""};
    var schlaf = document.querySelector("select[name='schlaf_in_stunden']").value;
    if(document.querySelector("input[name='müde/wach']:checked")){var müde = document.querySelector("input[name='müde/wach']:checked").value;}else{var müde = ""};

    var wetter = document.querySelector("select[name='wetter_select']").value;
    if(document.querySelector("input[name='warm/kalt']:checked")){var warm = document.querySelector("input[name='warm/kalt']:checked").value;}else{var warm = ""};
    var event = document.querySelector("select[name='event_select']").value;

    var ort = document.querySelector("select[name='ort_select']").value;
    if(document.querySelector("input[name='kontakt_menschen']:checked")){var kontakt = document.querySelector("input[name='kontakt_menschen']:checked").value;}else{var kontakt = ""};
    if(document.querySelector("input[name='verhältnis_person']:checked")){var verhältnis = document.querySelector("input[name='verhältnis_person']:checked").value;}else{var verhältnis = ""};

    var lösung = document.querySelector("select[name='lösung_select']").value;


    var url = "http://localhost/Abschlussprojekt/statistik.php?req=suchen";
    url += "&emotion="+emotion+"&gedanken="+gedanken+"&produk="+produk+"&handeln="+handeln+"&bewertung="+bewertung+"&essen="+essen+"&verträglichkeit="+verträglichkeit;
    url += "&schlaf="+schlaf+"&müde="+müde+"&wetter="+wetter+"&warm="+warm+"&event="+event+"&ort="+ort+"&kontakt="+kontakt+"&verhältnis="+verhältnis+"&lösung="+lösung;

    var erg = Send_Request(url);


    if(erg!="Bitte Parameter für die Suche angeben!"){
        if(erg!="[]"){
            var win = window.open("Einträge.html",erg,"menubar=no,toolbar=no,titlebar=no,status=no,resizeable=no,location=no,"
            +"height="+(window.innerHeight *0.82)+","
            +"width="+(window.innerWidth *0.522)+","
            +"left="+(window.screenX+(window.innerWidth *0.42))+","
            +"top="+(window.screenY+(window.innerHeight *0.145)));
        }
        else{
            alert("Die Suche ergab keinen Treffer!");
        }
    }
    else{
        alert(erg);
    }






}
//#########################################################






//#########################################################
function dieemotionenselectboxfärben(x){
    
    for(var i=0;i<emotionen.length;i++){
        if(x==emotionen[i]){
            document.getElementById("emotion_select").style.backgroundColor = farben[i];
            break;
        }
    }

}
//#########################################################








/*
//#########################################################
function Suche_nach_Parameter(x){

    //Die Fragen werden nach der Struktur des html-Aufbaus zusammengefasst und dynamisch erzeugt
    // ALTERNATIVE VERSION

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
        html_string += //radio
    }
    //###########################################


}*/
//#########################################################
