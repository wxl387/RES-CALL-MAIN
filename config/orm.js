// Import MySQL connection.
var connection = require("../config/connection.js");

// Object for all our SQL statement functions.
var orm = {
  
    addPatient: function(table, patientInfo, cb) {
        var queryString = "INSERT INTO " + table;

        var columnNames = Object.getOwnPropertyNames(patientInfo);
        var columnValues = [];
        
        for (x in patientInfo) {
            columnValues.push('"'+patientInfo[x]+'"')
        };

        queryString += (" ("+columnNames.toString()+") ");
        queryString += ("VALUES ("+columnValues.toString()+") ");

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    getAllInjuries: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            };
            var injuries = [];
            for (var i = 0; i < result.length; i++) {
                injuries.push(result[i])
            };
            cb(injuries)
        });
    },

    viewPatients: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            };
            var patients = [];
            for (var i = 0; i < result.length; i++) {
                patients.push(result[i])
            };
            cb(patients)
        });
    },

    viewOnePatient: function(table, PID, cb) {
        var queryString = "SELECT * FROM " + table + " WHERE id=" +"'"+PID+"';";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            };
            var patientInfo = [];
            for (var i = 0; i < result.length; i++) {
                patientInfo.push(result[i])
            };
            cb(patientInfo)
        });
    },

    updatePatient: function(table, updatedPatientInfo, cb) {
        var queryString = "UPDATE " + table;

        var PID = updatedPatientInfo["id"]
        columnValues = []
        for (x in updatedPatientInfo) {
            columnValues.push(x+'='+'"'+updatedPatientInfo[x]+'"')
        };

        queryString += (" SET "+columnValues.toString());
        queryString += (" WHERE id = "+'"'+PID+'"');

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },

    deletePatient: function(table, PID, cb) {
        var queryString = "DELETE FROM " + table;

        queryString += (" WHERE id = "+'"'+PID["id"]+'"');
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },
};

// Export the orm object for the model (cat.js).
module.exports = orm;