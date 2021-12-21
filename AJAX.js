    //Diese Funktion wird dann aufgerufen, wenn eine andere funktion sammt Ajax Funktionalität ausgeführt werden soll
    //Dies hat den Grund, dass so immer genau bestimmt werden kann wohin das Response geschickt/genutzt werden soll
    function Send_Request(url, thefunction){

        //ein neues Ajax Objekt
        var xml = new XMLHttpRequest();

        //Das PHP Dokument wird angesprochen und die Anfrage versendet
        xml.open("GET",url,false);

        //das Ajax Objekt wird mit einem Event Listener versehen, welcher bei eingehendem response
        //überprüfen soll, ob die Verbindung ordnungsgemäß funktioniert hat und ob etwas zurück kam
        // Dieser Abfrage wird eine kurze Wartezeit gegeben, 
        //um zu verhindern, das else vorzeitig ausgeführt wird
        xml.onreadystatechange = setTimeout (function() {
            if(xml.readyState==4 && xml.status==200){
                //Die Antwort wird an die entsprechende Funktion weiter geleitet       
                thefunction(xml.responseText);    
            }
            else{
                alert("Es konnte keine Verbindung zum Server hergestellt werden\nState="+xml.readyState+" - Status="+xml.status);
            }
        },100);// Die Wartezeit


        xml.send();
    };


    // Eine Überladung der Ajax Funktion, bei der die Antwort an die anfragende Funktion returned wird
    function Send_Request(url){

        var xml = new XMLHttpRequest();

        xml.open("GET",url,false);

        xml.onreadystatechange = setTimeout (function() {
            if(xml.readyState==4 && xml.status==200){
            }
            else{
                alert("Es konnte keine Verbindung zum Server hergestellt werden\nState="+xml.readyState+" - Status="+xml.status);
            }
 
        },100);

        xml.send();

        // Die Antwort wird zurück geschickt
        return xml.responseText;
    }
