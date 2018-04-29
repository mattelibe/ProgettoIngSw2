//Funzione per gestione barra di ricerca
function searchBar()
{
    //Variabile che gestisce il path
    var response;
    //Verifico che la pagina da cui effettuo la ricerca sia la home
    if(document.body.contains(document.getElementById('homeSearch')))
    {
        //Cerco il file accedendo alla cartella topic
        response ='topic/'+document.getElementById('qS').value;
    }
    else
    {
        //Cerco il file senza accesso (ricerca effettuata da pag_non_trovata)
        response = document.getElementById('qS').value;
    }

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

