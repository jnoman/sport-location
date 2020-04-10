function afficherAllReservation()
{
    $.post('/jsonGetAllByEmail', {
        email: sessionStorage.getItem("email"),
    }, (response) => {
        response=JSON.parse(response);
        $.post("/jsonGetReservationAllById", {
            id:response.id
        }, (response1) => {
            const reservation = JSON.parse(response1);
            reservation.forEach(element => {
                $.post('/jsonGetImageById', {
                    id: Number(element.ID_produit),
                }, (response2) => {
                    createCard(element, response2);
                });
            });
        });
    });
    
}
function createCard(resrvation,image)
{
    let cont = makeEelement('div', 'b-card');
    cont.id = `cardBox-${resrvation.index}`;
    let img = makeEelement('img', 'b-card-img');
    img.src=image;
    let txt_id=makeEelement('p', 'b-card-txt');
    txt_id.innerText = resrvation.id;
    let select=makeEelement('select', 'b-card-select');

    var z = document.createElement("option");
    z.setAttribute("value", "1");
    var t = document.createTextNode("1");
    z.appendChild(t);
    select.appendChild(z);

    var z2 = document.createElement("option");
    z2.setAttribute("value", "2");
    var t = document.createTextNode("2");
    z2.appendChild(t);
    select.appendChild(z2);

    var z3 = document.createElement("option");
    z3.setAttribute("value", "3");
    var t = document.createTextNode("3");
    z3.appendChild(t);
    select.appendChild(z3);

    var z4 = document.createElement("option");
    z4.setAttribute("value", "4");
    var t = document.createTextNode("4");
    z4.appendChild(t);
    select.appendChild(z4);

    var z5 = document.createElement("option");
    z5.setAttribute("value", "5");
    var t = document.createTextNode("5");
    z5.appendChild(t);
    select.appendChild(z5);

    var z6 = document.createElement("option");
    z6.setAttribute("value", "6");
    var t = document.createTextNode("6");
    z6.appendChild(t);
    select.appendChild(z6);

    var z7 = document.createElement("option");
    z7.setAttribute("value", "7");
    var t = document.createTextNode("7");
    z7.appendChild(t);
    select.appendChild(z7);

    var z8 = document.createElement("option");
    z8.setAttribute("value", "8");
    var t = document.createTextNode("8");
    z8.appendChild(t);
    select.appendChild(z8);

    var z9 = document.createElement("option");
    z9.setAttribute("value", "9");
    var t = document.createTextNode("9");
    z9.appendChild(t);
    select.appendChild(z9);

    var z10 = document.createElement("option");
    z10.setAttribute("value", "10");
    var t = document.createTextNode("10");
    z10.appendChild(t);
    select.appendChild(z10);

    let button_modifier = makeEelement('button', 'b-card-button_modifier');
    button_modifier.innerHTML = "Modifier";
    button_modifier.addEventListener('click', () => {
        modifierDuree(resrvation.id,select.value);
    });

    let button_supprimer = makeEelement('button', 'b-card-button_supprimer');
    button_supprimer.innerHTML = "Supprimer";
    button_supprimer.addEventListener('click', () => {
        supprimerDuree(resrvation.id);
    });
    select.value=resrvation.duree;
    cont.appendChild(img);
    cont.appendChild(txt_id);
    cont.appendChild(select);
    cont.appendChild(button_modifier);
    cont.appendChild(button_supprimer);
    document.getElementById('b-content').appendChild(cont);
}
function makeEelement(elem, elemClass) {
    let item = document.createElement(elem);
    item.setAttribute('class', elemClass);
    return item;
}
function modifierDuree(id,duree)
{
    $.post('/jsonUpdateDuree', {
        data:{
            id:id,
            duree:duree
        }
    }, (response) => {
        if(response=="true")
        {
            alert("Votre modification et bien exécuter");
        }
        else{
            alert("Erreur sur la modification");
        }
    });
}
function supprimerDuree(id)
{
    if (confirm('Voulez-vous vraiment supprimer cette réservation?')) {
        $.post('/jsonDeleteReservation', {
            id:id,
        }, (response) => {
            if(response=="true")
            {
                alert("Votre suppression et bien exécuter");
            }
            else{
                alert("Erreur sur la suppression");
            }
        });
        var list = document.getElementById("b-content");
        while (list.hasChildNodes()) {  
            list.removeChild(list.firstChild);
        } 
        afficherAllReservation();
    }
}