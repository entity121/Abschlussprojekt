// Arrays sind global
var k_array;
var belegt;
var sortiert;
var mischen = true;

function Puzzle_Felder_Erstellen(){

    // Die Länge des Array
    k_array = [5];
    belegt = [25];

    // Das Array wird mit negativen Werten gefüllt (später echte Werte)
    for(var i=0;i<5;i++){
        k_array[i] = [-1,-1,-1,-1,-1];
        //belegt[i] = -1;
    }

    // Das 2-dimensionale Array wird durchlaufen
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            // der Index wird durch i und j gebildet
            var index = ((i*5)+j);
            // das 25 Feld ist leer
            if (index == 24){k_array[i][j] = -1;break;}

            r = ((i*5)+j)+1;
        
            belegt[index] = r;
            k_array[i][j] = r;
        }
    }

    sortiert = belegt;
    Mischen();
    Darstellen();
    Einfärben();
}



function Mischen(){

    for(var i=0 ; i<1000 ; i++){

        var leerA;
        var leerB;
        var leerI;
    
        for(var j=0;j<5;j++){
            for(var k=0;k<5;k++){
                if(k_array[j][k] == -1){
                    leerA = j;
                    leerB = k;
                    leerI = ((j*5)+k)
                }
            }
        }


        var prüf = false;

        do{
            var dir = Math.floor(Math.random() *4);

            switch(dir){
                case 0:{
                    if((leerA-1)>=0){
                        Bewegen(leerI-5);
                        prüf = true;
                    }
                }break;
                case 1:{
                    if((leerB+1)<=4){
                        Bewegen(leerI+1);
                        prüf = true;
                    }
                }break;
                case 2:{
                    if((leerA+1)<=4){
                        Bewegen(leerI+5);
                        prüf = true;
                    }
                }break;
                case 3:{
                    if((leerB-1)>=0){
                        Bewegen(leerI-1);
                        prüf = true;
                    }
                }break;
            }
        }
        while(prüf == false);
    }

    mischen = false;
}




function Darstellen(){
    var sp = document.getElementById("puzzle_spielfeld");
    sp.innerHTML = '';

    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            var div = document.createElement("DIV");
            div.className = "kachel";
        
            div.onmousedown = function(){
                Bewegen(this.id);
            }
            div.onmouseover = function(){

                var leerA;
                var leerB;
            
                for(var i=0;i<5;i++){
                    for(var j=0;j<5;j++){
                        if(k_array[i][j] == -1){
                            leerA = i;
                            leerB = j;
                        }
                    }
                }

                if((leerA*5)+leerB != this.id){
                    this.style.backgroundColor = "#8be6ff";
                }

            }
            div.onmouseout = function(){
                Einfärben();
            }

            var index = ((i*5)+j);
            
            div.setAttribute("id", index);
            if(k_array[i][j] != -1){
                div.innerHTML = k_array[i][j];
            }
            
            sp.appendChild(div);
        }
    }


}

// Färbt alle Felder außer dem Leeren Blau ein
function Einfärben(){
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            var index = ((i*5)+j);

            // Wenn der Inhalt des Array ungleich -1 ist, 
            // wird der index gebildet und das Feld, mit der ID gleich dem Index, gefärbt
            if(k_array[i][j] == -1){
                document.getElementById(index).style.backgroundColor = "#dcd579";
            }
            else if(k_array[i][j] == sortiert[index]){
                document.getElementById(index).style.backgroundColor = "#b03522";
            }
            else{
                document.getElementById(index).style.backgroundColor = "#dcd579";
            }

        }
    }
}


function Bewegen(index){

    // Beim Klicken auf eine Kachel werden seine Koordinaten im 2d_Array ermittelt
    var wahlB = index%5;
    var wahlA = (index-wahlB) /5;
    

    // Ebenfalls werden die Koordinaten des leeren Feldes ermittelt
    var leerA;
    var leerB;

    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){
            if(k_array[i][j] == -1){
                leerA = i;
                leerB = j;
            }
        }
    }
    


    // Für die angeklickte Kachel wird nun in alle vier Himmelsrichtungen geprüft,
    // ob sich dort das leere Feld befindet.
    // Ist dies der Fall soll die Kachel mit dem leeren Feld den Platz im Array tauschen
    if(wahlB>0){
        if(k_array[wahlB-1][wahlA] == k_array[leerB][leerA]){
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
        }
    }
    if(wahlB<4){
        if(k_array[wahlB+1][wahlA] == k_array[leerB][leerA]){    
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
        }
    }
    if(wahlA>0){
        if(k_array[wahlB][wahlA-1] == k_array[leerB][leerA]){
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
        }
    }
    if(wahlA<4){
        if(k_array[wahlB][wahlA+1] == k_array[leerB][leerA]){
            k_array[leerA][leerB] = k_array[wahlA][wahlB];
            k_array[wahlA][wahlB] = -1;
        }
    }


    if(mischen == false){
        Darstellen();
        Einfärben();
        Reihenfolge_Überprüfen();
    }
}


// Hier wird das Kachel Array mit dem sortierten Array verglichen
// Wenn eine Zahl an seiner richtigen Position ist, wird das Feld Grün gefärbt
function Reihenfolge_Überprüfen(){

    var index;
    var zähler = 0;

    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){

            index = ((i*5)+j);

            if(k_array[i][j] == sortiert[index]){
                zähler++;
            }

        }
    }

    if(zähler == 24){
        alert("Gewonnen");
    }
}