
const _FS = require('fs-extra');
const _PATH = require('path');
const dataObjects = require('./dataObjects');

async function jsonGetAll(className) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `${className}.json`);
    if (await pathExists(FILE_PATH)) {
        let jsonDataObject = JSON.parse(await _FS.readFile(FILE_PATH));
        let classArray = [];
        jsonDataObject.forEach(element => {
            classArray.push(jsonToClass(element, className));
        });
        return classArray;
    } else
        return null;
}
async function searchByEmail(email) {
    const _DATA = await jsonGetAll("Client");
    let retValue = null;
    _DATA.forEach(data => {
        if (data.getemail() == email)
        {
            retValue = data.getAll();
        } 
    });
    return retValue;
}
async function addToClient(data) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `Client.json`);
    if (!await _FS.pathExists(FILE_PATH))
        await _FS.createFile(FILE_PATH);
    let fileContent = await _FS.readFile(FILE_PATH, 'utf8');
    if (fileContent.length == 0)
        await _FS.writeFile(FILE_PATH, '[]');
    let succes = true;
    try {
        let jsonDataObject = await _FS.readJSON(FILE_PATH);
        data.id = `cli-${jsonDataObject.length + 1}`;
        data = jsonToClass(data, "Client");
        jsonDataObject.push(data.getAll());
        await _FS.writeJSON(FILE_PATH, jsonDataObject);
    } catch (err) {
        succes = false;
    }
    return succes;
}
async function addToReservation(data) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `Reservation.json`);
    if (!await _FS.pathExists(FILE_PATH))
        await _FS.createFile(FILE_PATH);
    let fileContent = await _FS.readFile(FILE_PATH, 'utf8');
    if (fileContent.length == 0)
        await _FS.writeFile(FILE_PATH, '[]');
    let succes = true;
    try {
        let jsonDataObject = await _FS.readJSON(FILE_PATH);
        id=jsonDataObject[jsonDataObject.length-1].id;
        data.id = `res-${Number(id.substring(4, id.length)) + 1}`;
        data = jsonToClass(data, "Reservation");
        jsonDataObject.push(data.getAll());
        await _FS.writeJSON(FILE_PATH, jsonDataObject);
    } catch (err) {
        succes = false;
    }
    return succes;
}
function jsonToClass(objectData, className) {
    let retClass = null;
    switch (className) {
        case 'Client':
            retClass = new dataObjects.Client(objectData.id, objectData.email, objectData.nom, objectData.dateN, objectData.motPass);
            break;
        case 'Reservation':
            retClass = new dataObjects.Reservation(objectData.id, objectData.ID_produit, objectData.ID_client, objectData.duree, objectData.nbrPersonnes);
            break;
        case 'Produit':
            retClass = new dataObjects.Produit(objectData.id, objectData.nom, objectData.prix, objectData.image);
            break;
        default:
            retClass = null;
    }
    return retClass;
}
async function pathExists(path) {
    return await _FS.pathExists(path);
}
async function searchByEmailAndPass(data) {
    const _DATA = await jsonGetAll("Client");
    let retValue=false;
    _DATA.forEach(data_objet => {
        if(retValue == false)
        {
            if (data_objet.getCred().email==data.email && data_objet.getCred().motPass==data.motPass){
                retValue = true;
            }
        }
    });
    return retValue;
}
async function searchByImage(image) {
    const _DATA = await jsonGetAll("Produit");
    let retValue = -1;
    _DATA.forEach(data_objet => {
            if (data_objet.getImage() == image)
                retValue = data_objet.getId();
            }
    );
    return retValue;
}
async function slideProduit(data) {
    const _DATA = await jsonGetAll("Produit");
    let id= await searchByImage(data.image);
    let retValues=id;
    if(id != -1)
    {
        if(id%6==0)
        {
            if(data.number==-1)
            {
                id=id+5;
            }
            else
            {
                id=id+1;
            }
        }
        else
        {
            if(id%6==5)
            {
                if(data.number==1)
                {
                    id=id-5;
                }
                else
                {
                    id=id-1;
                }
            }
            else
            {
                if(data.number==1)
                {
                    id=id+1;
                }
                else
                {
                    id=id-1;
                }
            }
        }
        _DATA.forEach(data_objet => {
            if (data_objet.getId()==id){
                retValues = data_objet.getAll();
            }
        });
    }
    return retValues;
}
async function getAllReservationByIdClient(id) {
    const _DATA = await jsonGetAll("Reservation");
    let retValue = [];
    _DATA.forEach(data => {
        if (data.getIdClient() == id)
        {
            retValue.push(data.getAll());
        } 
    });
    return retValue;
}
async function getImageById(id) {
    const _DATA = await jsonGetAll("Produit");
    let retValue = -1;
    _DATA.forEach(data_objet => {
            if (data_objet.getId() == id)
                retValue = data_objet.getImage();
            }
    );
    return retValue;
}
async function updateNomberPersonne(data) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `Reservation.json`);
    let retValue = true;
    var Reservations = await jsonGetAll("Reservation");
    if (Reservations != null) {
        let dataObject = [];
        for (let i = 0; i < Reservations.length; i++) {
            dataObject.push(Reservations[i].getAll());
            if (Reservations[i].getId() == data.id)
            {
                dataObject[i].nbrPersonnes=data.nomber;
            }
        }
        await _FS.writeJSON(FILE_PATH, dataObject);
    } else retValue = false;
    // 
    return retValue;
}
async function deleteReservation(id) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `Reservation.json`);
    let retValue = true;
    var Reservations = await jsonGetAll("Reservation");
    if (Reservations != null) {
        let dataObject = [];
        for (let i = 0; i < Reservations.length; i++) {
            if (Reservations[i].getId() !== id)
            {
                dataObject.push(Reservations[i].getAll());
            }
        }
        await _FS.writeJSON(FILE_PATH, dataObject);
    } else retValue = false;
    // 
    return retValue;
}
module.exports = {
    jsonGetAll,
    searchByEmail,
    addToClient,
    addToReservation,
    searchByEmailAndPass,
    slideProduit,
    searchByImage,
    getAllReservationByIdClient,
    getImageById,
    updateNomberPersonne,
    deleteReservation
}


