//Funzione per gestione barra di ricerca
function searchBar()
{

    //Lettura del testo nella barra di ricerca
    var response ='topic/'+document.getElementById('qS').value;
    //console.log(response);
    //Reindirizzamento alla pagina corrispondente (pagine inesistenti gestite dal server)
    location = response;
    return false;
}

//Funzione per la gestione dei bottoni per reindirizzamento diretto alle pagine più cercate
function buttonBar()
{
    //Lettura del form dove inserire l'ascoltatore
    var form = document.getElementById('buttons');
    //Ascoltatore che individua il bottone preso
    var listener = function (e)
    {
        //Reindirizzamento alla pagina in base al testo del bottone (pagine inesistenti gestite dal server)
        location = 'topic/'+e.target.value.toLowerCase();
    };
    //Aggiunta ascoltatore
    form.addEventListener('click', listener, false);
    return false;
}

