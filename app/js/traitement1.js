var noms=["KAWASAKI | ULTRA LX","YAMAHA | YZ250","KAYAC | MALIBU","YAMAHA | GRIZZLY 600","JEEP | MOPAR","SKI-DOO | GSX"];
var prix=[2000,300,100,400,700,900,];
var iii;
function Slides_produit(j,i)
{
    var div_produit=document.getElementsByClassName("slide_produit")[j].style.backgroundImage;
    $.post('/jsonSlide', {
        data:{
            image: div_produit.substring(5, 20),
            number:i
        }
    }, (response) => {
        response=JSON.parse(response);
        if (response!=="-1") {
            document.getElementsByClassName("slide_produit")[j].style.backgroundImage=`url('${response.image}')`;
            document.getElementsByClassName("produi_nom")[j].innerHTML=response.nom;
            document.getElementsByClassName("produi_prix")[j].innerHTML=" A partire de "+response.prix+" DH";
        }
        else {
            console.log("bbb");
        }
    });
}
function get_dom()
{
    var cate=['b','c','d','e','f','g'];
    for(var j=0;j<6;j++)
    {
        document.getElementsByClassName("slide_produit")[j].style.backgroundImage=`url('../media/${cate[j]}1.png')`;
    }
    for(var j=0;j<6;j++)
    {
        document.getElementsByClassName("produi_nom")[j].innerHTML=noms[j];
    }
    for(var j=0;j<6;j++)
    {
        document.getElementsByClassName("produi_prix")[j].innerHTML=" A partire de "+prix[j]+" DH";
    }
}
function date_debut_location()
{
    var valid=false;
    var element = document.getElementById("date_debut_location");
    if(element.value !== "")
    {
        var date=new Date(element.value);
        var d = new Date();
        if(date>d)
        {
            valid=true;
            element.style.borderColor="black";
        }
        else
         {
            element.style.borderColor="red";
            alert("date debut de location doit etre supérieur la date d'aujourdhui");
         }
    }
    else
    {
        element.style.borderColor="red";
    }
    return valid;
}
function date_fin_location()
{
    var valid=false;
    var element = document.getElementById("date_fin_location");
    var element1 = document.getElementById("date_debut_location");
    if(element.value !== "")
    {
        var date=new Date(element.value);
        var d = new Date(element1.value);
        if(date>=d)
        {
            valid=true;
            element.style.borderColor="black";
        }
        else
         {
            element.style.borderColor="red";
            alert("date fin de location doit etre supérieur la date date debut de location");
         }
    }
    else
    {
        element.style.borderColor="red";
    }
    return valid;
}
var k=0;
 function validation_inscription()
{
    var ele=document.getElementsByClassName('slide_produit')[k];
    var element=document.getElementById("validation_inscription1");
    var element1=element.children;
    var img=`../media/${ele.style.backgroundImage.substring(14, 16)}.png`;
    element1[1].src=img;
    var fin = document.getElementById("date_fin_location");
    var debut = document.getElementById("date_debut_location");
    var nbr_jour=(new Date(fin.value)- new Date(debut.value))/(1000 * 60 * 60 * 24)+1 ;
    var jour;
    if(nbr_jour==1)
    {
        jour="jour"
    }
    else
    {
        jour="jours"
    }
    var nbr_personne=document.getElementById("nbr_personne").value;
    var personne;
    if(nbr_personne==1)
    {
        personne="seul personne"
    }
    else
    {
        personne="personnes"
    }
    $.post('/jsonGetIdByImage', {
        image: img,
    }, (response) => {
        $.post('/jsonGetAllByEmail', {
            email: sessionStorage.getItem("email"),
        }, (response1) => {
            response1=JSON.parse(response1);
            $.post('/jsonSaveReservation', {
                data: {
                    ID_produit: Number(response),
                    ID_client: response1.id,
                    duree: nbr_jour,
                    nbrPersonnes: nbr_personne
                }
            }, (response2) => {
                if (response2 == "true") {
                    var age=((new Date().getFullYear())-(new Date(response1.dateN).getFullYear()));
                    element1[2].innerHTML="Bonjour "+response1.nom+" vous avez  "+age+" ans<br>vous avez réservé "+ele.children[2].innerHTML+" de la période de "+nbr_jour+" "+jour+" pour "+nbr_personne+" "+personne;
                    document.getElementById("validation_inscription").style.visibility="visible";
                }
                else
                {
                    console.log("aaaa");
                }
            });
        });
    });
}

function Hidden_validation_inscription()
{
    document.getElementById("validation_inscription").style.visibility="hidden";
    annuler(iii);
}

function c1(i) {
    iii=i;
    var htmlString=`<table>
        <tr>
            <td><p>Nombre personne :</p></td>
        </tr>
        <tr>
            <td>
                <select name="nbr_personne" id="nbr_personne">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><p>Date debut location</p></td>
            <td><p>Date fin location</p></td>
        </tr>
        <tr>
            <td><input type="date" id="date_debut_location" onchange="date_debut_location()"></td>
            <td><input type="date" id="date_fin_location" onchange="date_fin_location()"></td>
        </tr>
        <tr>
            <td colspan="2"><button onclick="reservation()">réservation</button></td>
        </tr>
    </table>`;
    var div = document.createElement('div');
    div.setAttribute("class", "form_reservation");
    div.innerHTML = htmlString;
    document.getElementsByClassName("slide_produit")[i].after(div);
    var btn_reserve=document.getElementsByClassName("btn_reserve");
    var slid1=document.getElementsByClassName("slid-1");
    var slid_1=document.getElementsByClassName("slid_1");
    btn_reserve[i].style="display: none";
    for(j=0;j<6;j++)
    {
        btn_reserve[j].disabled=true;
    }
    document.getElementsByClassName("btn_annuler")[i].style="display: inline";
    k=i;
  }
  
  function annuler(i)
  {
    var btn_reserve=document.getElementsByClassName("btn_reserve");
    document.getElementsByClassName("btn_annuler")[i].style="display: none";
    btn_reserve[i].style="display: inline";
    for(j=0;j<6;j++)
    {
        btn_reserve[j].disabled=false;
    }
    var list = document.getElementById("section");
    list.removeChild(list.childNodes[(i+1)*4]);
  }