var express = require("express");
var router = express.Router();
var resCallDB = require("../models/patients.js");

router.get("/", function(req, res) {
   res.render("addOrView");
});

router.get("/addPatient", function(req, res) {
  resCallDB.getAllInjuries(function(data) {

    var allInjuries = {
      injury: data
    }

    console.log("This is my data")
    res.render("addPatient", allInjuries);
  });
});

router.get("/viewPatients", function(req, res) {    
  resCallDB.viewPatients(function(data) {

    var patientList = {
      patient: data
    }
    
    res.render("viewPatients", patientList);
  });
});

router.get("/viewPatients/:MRN", function(req, res) {    

  resCallDB.viewOnePatient(req.params.MRN, function(data) {

    var patientInfo = {
      patientInfo: data
    }

    res.send(patientInfo);
  });
});

router.post("/addPatient/submitPatient", function(req, res) {
  
  resCallDB.addPatient(req.body, function() {
    res.redirect("/");
  });
});

router.post("/viewPatients/updatePatient", function(req, res) {

  resCallDB.updatePatient(req.body, function() {
    res.redirect("/");
  });
});

router.post("/viewPatients/deletePatient", function(req, res) {
  
  console.log("I'm at router")
  console.log(req.body)
  resCallDB.deletePatient(req.body, function() {
    res.redirect("/");
  });
});


module.exports = router;
