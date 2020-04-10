function f_connection()
{
    if(validation_email(0) && validation_password(0))
    {
        $.post('/jsonConnection', {
            data: {
                email: $('#ConnectionEmail').val(),
                motPass: $('#ConnectionMotDePass').val()
            }
        }, (response) => {
                if(response!=="false")
                {
                    f_session(0);
                    window.location.href = '/reservation';
                }
                else
                {
                    alert("email ou mot de passe est incorrect");
                }
        });
    }
}
function f_inscription()
{
    if(validation_email(1) && validation_nom(1) && date_naissance() && validation_password(1))
    {
        $.post('/jsonSaveClient', {
            data: {
                email: $('#inscriptionEmail').val(),
                nom: $('#inscriptionNom').val(),
                dateN: $('#date_naissance').val(),
                motPass: $('#inscriptionMotDePass').val()
            }
        }, (response) => {
            if (response == "true") {
                f_session(1);
                document.location.href = '/reservation';
            }
        });
    }
}
function f_connection_1()
{
    if(validation_email(0) && validation_password(0))
    {
        $.post('/jsonConnection', {
            data: {
                email: $('#ConnectionEmail').val(),
                motPass: $('#ConnectionMotDePass').val()
            }
        }, (response) => {
                if(response!=="false")
                {
                    f_session(0);
                    Hidden_connection();
                }
                else
                {
                    alert("email ou mot de passe est incorrect");
                }
        });
    }
}
function f_inscription_1()
{
    if(validation_email(1) && validation_nom(1) && date_naissance() && validation_password(1))
    {
        $.post('/jsonSaveClient', {
            class: "Client",
            data: {
                email: $('#inscriptionEmail').val(),
                nom: $('#inscriptionNom').val(),
                dateN: $('#date_naissance').val(),
                motPass: $('#inscriptionMotDePass').val()
            }
        }, (response) => {
            if (response == "true") {
                f_session(1);
                Hidden_inscription();
            }
        });
    }
}


function reservation()
{
    if(date_naissance() && date_debut_location() && date_fin_location()){
        validation_inscription();
    }
}
function validation_email(i)
{
    var email=document.getElementsByClassName("Email")[i];
    var valid;
    var reg=new RegExp("^[a-zA-Z0-9._-]{5,}\@[a-z]{5,7}\.[a-z]{2,3}$");
    if(!reg.test(email.value))
    {
        valid=false;
        email.style.borderBottomColor="red";
    }
    else
    {
        valid=true;
        email.style.borderBottomColor="black";
    }
    return valid;
}
function date_naissance()
{
    var valid=false;
    var element = document.getElementById("date_naissance");
    if(element.value !== "")
    {
        var date=new Date(element.value).getFullYear();
        var d = new Date().getFullYear();
        if((d-date)>21)
        {
            valid=true;
            element.style.borderColor="black";
        }
        else
         {
            element.style.borderColor="red";
            alert("l'age doit etre supérieur ou bien égale 21");
         }
    }
    else
    {
        element.style.borderColor="red";
    }
    return valid;
}
function validation_nom()
{
    var nom=document.getElementsByClassName("nom")[0];
    nom.value= nom.value.toUpperCase();
    var valid;
    var reg=/^[A-Z]{3,}$/;
    if(!reg.test(nom.value))
    {
        valid=false;
        nom.style.borderBottomColor="red";
    }
    else
    {
        valid=true;
        nom.style.borderBottomColor="black";
    }
    return valid;
}
function validation_password(i)
{
    var pass=document.getElementsByClassName("password")[i];
    var valid;
    if(pass.value.length<8)
    {
        valid=false;
        pass.style.borderBottomColor="red";
    }
    else
    {
        valid=true;
        pass.style.borderBottomColor="black";
    }
    return valid;
}

function afficher_connextion()
{
    document.getElementById("bg_connexion").style.visibility="visible";
}
function afficher_inscription()
{
    document.getElementById("bg_inscription").style.visibility="visible";
}
function Hidden_connection()
{
    document.getElementById("bg_connexion").style.visibility="hidden";
}
function Hidden_inscription()
{
    document.getElementById("bg_inscription").style.visibility="hidden";
}
function connection_to_inscription()
{
    Hidden_connection();
    afficher_inscription()
}
function inscription_to_connection()
{
    Hidden_inscription();
    afficher_connextion()
}
function f_session(i)
{
    sessionStorage.setItem("email", document.getElementsByClassName("email")[i].value);
}
function f_check_session()
{
    if (!sessionStorage.getItem("email")) {
        document.getElementById("bg_connexion").style.visibility="visible";
    }
}
var pos=1;
function Slides(i)
{
    pos+=i;
    if(pos==0)
    {
        pos=6;
    }
    if(pos==7)
    {
        pos=1;
    }
    document.getElementById("section_galerie").style.backgroundImage=`url('../media/a${pos}.png')`;
}
if(document.getElementById("section_galerie"))
{
    setInterval(() => {
        pos+=1;
        if(pos==7)
        {
            pos=1;
        }
        document.getElementById("section_galerie").style.backgroundImage=`url('../media/a${pos}.png')`;
    }, 5000);
}
function deconnection()
{
    if (confirm('Voulez-vous vraiment quitter cette page?')) {
        sessionStorage.removeItem("email");
        window.location.href= '/';
    }
}

//console.log(sessionStorage.getItem("nom"));