const _EXPRESS = require('express');
// const _SESSION = require('express-session');
const _APP = _EXPRESS();
const _BODY_PARSER = require('body-parser')
const _PATH = require('path');
const _PORT = 8080;
const _FUNCS = require('./app/model/dataStorage');
// 
// BODY-PARSER MIDDLEWARE
_APP.use(_BODY_PARSER.json()); // to support JSON-encoded bodies
_APP.use(_BODY_PARSER.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
// SESSIONS MANAGMENT
// _APP.use(_SESSION({ }));

// SEND AN HTML FILE WHEN THE REQUESTED URL IS CALLED
_APP.get('/', (req, res) => {
    res.sendFile(_PATH.join(__dirname, 'app/html/gallerie.html'));
});
_APP.get('/reservation', (req, res) => {
    res.sendFile(_PATH.join(__dirname, 'app/html/reservation.html'));
});
_APP.get('/mareservation', (req, res) => {
    res.sendFile(_PATH.join(__dirname, 'app/html/ma_reservation.html'));
});
// LISTEN FOR REQUESTES FROM THE CLIENT
// REQUEST TO SAVE THE GIVEN DATA INTO THE JSON FILE
_APP.post('/jsonSaveClient', async function (req, res) {
    let result = await _FUNCS.addToClient(req.body.data);
    res.end(result.toString());
});
_APP.post('/jsonSaveReservation', async function (req, res) {
    let result = await _FUNCS.addToReservation(req.body.data);
    res.end(result.toString());
});
// REQUEST TO CONNECYION WITH THE GIVEN DATA
_APP.post('/jsonConnection', async function (req, res) {
    let result = await _FUNCS.searchByEmailAndPass(req.body.data);
    res.end(result.toString());
});
_APP.post('/jsonSlide', async function (req, res) {
    let result = await _FUNCS.slideProduit(req.body.data);
    res.end(JSON.stringify(result));
});
_APP.post('/jsonGetIdByImage', async function (req, res) {
    let result = await _FUNCS.searchByImage(req.body.image);
    res.end(result.toString());
});
_APP.post('/jsonGetAllByEmail', async function (req, res) {
    let result = await _FUNCS.searchByEmail(req.body.email);
    res.end(JSON.stringify(result));
});
_APP.post('/jsonGetReservationAllById', async function (req, res) {
    let result = await _FUNCS.getAllReservationByIdClient(req.body.id);
    res.end(JSON.stringify(result));
});
_APP.post('/jsonGetImageById', async function (req, res) {
    let result = await _FUNCS.getImageById(req.body.id);
    res.end(result.toString());
});
_APP.post('/jsonUpdateDuree', async function (req, res) {
    let result = await _FUNCS.updateDuree(req.body.data);
    res.end(result.toString());
});
_APP.post('/jsonDeleteReservation', async function (req, res) {
    let result = await _FUNCS.deleteReservation(req.body.id);
    res.end(result.toString());
});


//REQUEST TO GET ALL DATA OF A CLASS
_APP.post('/jsonGetAll', async function (req, res) {
    let result = await _FUNCS.jsonGetAll(req.body.class);
    res.end(JSON.stringify(result));
});
// REQUEST TO GET A SPECIFIC ENTRY FROM A CLASS BY ID
_APP.post('/jsonGetById', async function (req, res) {
    let result = await _FUNCS.searchBy(req.body.class, req.body.id);
    res.end(JSON.stringify(result));
});
// REQUEST TO DELETE A SPECIFIC ENTRY FROM A CLASS BY ID
_APP.post('/jsonRemoveById', async function (req, res) {
    let result = await _FUNCS.removeFromJson(req.body.class, req.body.id);
    res.end(result.toString());
});
// GET QUESTIONS WITH THE LINKED DATA
_APP.post('/getQuestions', async function (req, res) {
    let questions = await _FUNCS.jsonGetAll("Question");
    // 
    // console.log(questions);
    let results = [];
    // 
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i].getAll();
        // ONLY RETURN UNANSWERED QUESTIONS
        if (!question.resolved) {
            let client = await _FUNCS.searchBy("Client", question.clientId);
            let service = await _FUNCS.searchBy("Service", question.serviceId);
            // console.log(service);
            // 
            results.push({
                index: i,
                sId: service.id,
                txt: question.text,
                client: `${client.nom} ${client.prenom}`,
                service: service.nom,
                date: question.dateQuestion
            });
        }
    }
    // console.log(results);
    // 
    res.end(JSON.stringify(results));
});
// 
_APP.post('/submitResponse', async function (req, res) {
    let questions = await _FUNCS.jsonGetAll("Question");
    let question = questions[req.body.index];
    // 
    let result = await _FUNCS.addToJson("Reponse", {
        reponse: req.body.reponseText,
        clientId: question.clientId,
        serviceId: question.serviceId
    });
    // IF THE RESPONSE WAS SUBMITED SUCCESSFULLY CHANGE THE RESPONSE STATE TO SOLVED
    if (result)
        result = await _FUNCS.updateQuestionStatus(req.body.index);
    // 
    res.end(result.toString());
});
// GIVE THE LOCAL SERER TO ACCESS /APP FOLDER
_APP.use('/', _EXPRESS.static(_PATH.join(__dirname, 'app')));
// START THE SERVER
_APP.listen(_PORT, () => {
    console.log(`Listening on port ${_PORT}\nPlease refere to : localhost:${_PORT}`);
});