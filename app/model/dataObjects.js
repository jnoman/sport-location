//
class Client {
    constructor(id, email, nom, dateNaissance, motDePass) {
        this.id = id;
        this.email=email;
        this.nom = nom;
        this.dateN = dateNaissance;
        this.motPass = motDePass;
    }
    // 
    // RETURN ATTRIBUTES DATA AS AN ARRAY
    getAll(type = 'object') {
        let returnData = {
            id: this.id,
            email:this.email,
            nom: this.nom,
            dateN: this.dateN,
            motPass: this.motPass
        }
        if (type != 'object')
            returnData = [this.id, this.email, this.nom, this.dateN, this.motPass];
        // 
        return returnData;
    }
    //RETUEN CREDENTIELS DATA
    getCred(type = 'object') {
        let returnData = {
            email: this.email,
            motPass: this.motPass
        }
        // 
        if (type != 'object')
            returnData = [this.email, this.motPass];
        // 
        return returnData;
    }
    // RETURN THE CLASSES UNIQUE IDENTIFIER
    getId() {
        return this.id;
    }
    getemail(){
        return this.email;
    }
    setId(id) {
        this.id = id;
    }
}
//
class Produit {
    constructor( id,nomProduit , prixProduit, imageProduit) {
        this.id = id;
        this.nom = nomProduit;
        this.prix = prixProduit;
        this.image = imageProduit;
    }
    // GET ALL DATA
    getAll(type = 'object') {
        let returnData = {
            id: this.id,
            nom: this.nom,
            prix: this.prix,
            image: this.image
        }
        if (type != 'object')
            returnData = [this.id, this.nom, this.prix, this.image];
        // 
        return returnData;
    }
    // RETURN THE CLASSES UNIQUE IDENTIFIER
    getId() {
        return this.id;
    }
    getImage() {
        return this.image;
    }
}
//
class Reservation {
    constructor(id, ID_produit , ID_client, duree, nbrPersonnes) {
        this.id = id;
        this.ID_produit = ID_produit;
        this.ID_client = ID_client;
        this.duree = duree;
        this.nbrPersonnes = nbrPersonnes;
    }
    // 
    setDateQuestion(date) {
        this.dateQuestion = date;
    }
    // 
    getAll(type = 'object') {
        let returnData = {
            id: this.id,
            ID_produit: this.ID_produit,
            ID_client: this.ID_client,
            duree: this.duree,
            nbrPersonnes: this.nbrPersonnes
        }
        if (type != 'object')
            returnData = [this.id, this.ID_produit, this.ID_client, this.duree, this.nbrPersonnes];
        // 
        return returnData;
    }
    getId() {
        return  this.id;
    }
    getIdClient() {
        return this.ID_client;
    }
    setId(id) {
        this.id = id;
    }
}
// EXPORT CLASSES FOR LATER USE
module.exports = {
    Client,
    Produit,
    Reservation
}