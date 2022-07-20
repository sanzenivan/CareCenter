const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");

let sqlDb;

function initSqlDB() {
    sqlDb = sqlDbFactory({
        client: "sqlite3",
        debug: true,
        connection: {
            filename: "./other/db.sqlite"
        },
        useNullAsDefault: true
    });
}

const _ = require("lodash");

let serverPort = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.use('/other', express.static(__dirname + '/other'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*******************STRUCTURES*******************/
app.get("/structures", function (req, res) {
    let structureID = parseInt(_.get(req, "query.structureID", 0));
    let tempQuery = sqlDb
        .select('*')
        .from('structure')
    if (structureID != 0) {
        tempQuery
            .whereNotIn('structureID', structureID)
    }
    tempQuery
        .then(result => {
            res.send(JSON.stringify(result));
        });
});


app.get("/structures/:id", function (req, res) {
    let structureId = parseInt(req.params.id);
    sqlDb
        .select('*')
        .from('structure')
        .where('structureID', structureId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/structures/:id/services", function (req, res) {
    let structureId = parseInt(req.params.id);
    sqlDb
        .select('structure.structureID', 'service.*')
        .from('providedService')
        .join('service', 'service.serviceID', 'providedService.serviceID')
        .join('structure', 'structure.structureID', 'providedService.structureID')
        .where('structure.structureID', structureId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/structures/:id/structureTimetables/:table", function (req, res) {
    let structureID = parseInt(req.params.id);
    let tableID = parseInt(req.params.table);
    sqlDb
        .select('dayColumn.*', 'tableID')
        .from('structureTimetable')
        .join('structure', 'structure.structureID', 'structureTimetable.structureID')
        .join('dayColumn', 'dayColumn.dayID', 'structureTimetable.dayID')
        .where('structureTimetable.structureID', structureID)
        .andWhere('structureTimetable.tableID', tableID)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

/*******************SERVICES*******************/
app.get("/services", function (req, res) {
    let doctorID = parseInt(_.get(req, "query.id", 0));
    let category = _.toString(_.get(req, "query.category", ""));
    let tempQuery;
    if (category != "") {
        tempQuery = sqlDb
            .select('*')
            .from('service')
            .where('category', category)
    } else if (doctorID != 0) {
        tempQuery = sqlDb
            .select('service.*')
            .from('service')
            .join('doctor', 'doctor.doctorID', 'service.headOfServiceID')
            .where('service.headOfServiceID', doctorID)
    } else {
        tempQuery = sqlDb
            .select('*')
            .from('service')
            .groupBy('category')

    }
    tempQuery
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/services/:id", function (req, res) {
    let serviceId = parseInt(req.params.id);
    sqlDb
        .select('*')
        .from('service')
        .where('service.serviceID', serviceId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/services/:id/doctors", function (req, res) {
    let serviceId = parseInt(req.params.id);
    sqlDb
        .select('doctor.*')
        .from('assistant')
        .join('service', 'service.serviceID', 'assistant.serviceID')
        .join('doctor', 'doctor.doctorID', 'assistant.doctorID')
        .where('service.serviceID', serviceId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/services/:id/structures", function (req, res) {
    let serviceId = parseInt(req.params.id);
    sqlDb
        .select('structure.*')
        .from('providedService')
        .join('service', 'service.serviceID', 'providedService.serviceID')
        .join('structure', 'structure.structureID', 'providedService.structureID')
        .where('service.serviceID', serviceId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

/*******************DOCTORS*******************/
app.get("/doctors", function (req, res) {
    let category = _.toString(_.get(req, "query.category", ""));
    let tempQuery;
    if (category != "") {
        tempQuery = sqlDb
            .select('*')
            .from('doctor')
            .where('category', category)
    } else {
        tempQuery = sqlDb
            .select('*')
            .from('doctor')
            .groupBy('category')
    }
    tempQuery
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/doctors/:id", function (req, res) {
    let id = parseInt(req.params.id);
    sqlDb
        .select('*')
        .from('doctor')
        .where('doctorID', id)
        .groupBy('fullName')
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/doctors/:id/doctorTimetable", function (req, res) {
    let doctorID = parseInt(req.params.id);
    sqlDb
        .select('dayColumn.*')
        .from('doctorTimetable')
        .join('doctor', 'doctor.doctorID', 'doctorTimetable.doctorID')
        .join('dayColumn', 'dayColumn.dayID', 'doctorTimetable.dayID')
        .where('doctorTimetable.doctorID', doctorID)
        .groupBy('doctorTimetable.dayID')
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/doctors/:id/services", function (req, res) {
    let doctorID = parseInt(req.params.id);
    sqlDb
        .select('service.*', 'assistant.serviceID')
        .from('assistant')
        .join('doctor', 'doctor.doctorID', 'assistant.doctorID')
        .join('service', 'service.serviceID', 'assistant.serviceID')
        .where('assistant.doctorID', doctorID)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.set("port", serverPort);

initSqlDB();

/* Start the server on port 5000 */
app.listen(serverPort, function () {
    console.log(`Your app is ready at port ${serverPort}`);
});
