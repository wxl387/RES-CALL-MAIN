$(document).ready(function() {
	$("#add-patient").on("click", function(event) {
		$.get("/getAllInjuries", function(data) {
			console.log("Injuries retrieved successfully!")
		});
	});

	$("#view-patients").on("click", function(event) {
		$.get("/viewPatients", function(data) {
			console.log("patients displayed successfully!")
		});
	});

	console.log(document.querySelector('.patient-button'));

	$(document).find(".patient-button").on("click", function(event) {
		console.log(event);
		var PID = event.target.id
		$.get("/viewPatients/"+PID, function(data) {
			data = data.patientInfo["0"]
			$("#table-name").val(data["patient_name"]);
			$("#table-MRN").val(data["MRN"]); 
			$("#table-HPI").val(data["HPI"]); 
		});
		var updateButton = $("<button>")
		updateButton.attr({"type": "button", "class": "btn btn-default update-patient-info", "id": "update_"+PID})
		updateButton.append("Update")

		var deleteButton = $("<button>")
		deleteButton.attr({"type": "button", "class": "btn btn-default delete-patient-info", "id": "delete_"+PID})
		deleteButton.append("Delete")

		$("#update-patient-button-div").empty();
		$("#update-patient-button-div").append(updateButton);	
		$("#update-patient-button-div").append(deleteButton);		
	});

	$("#submit-patient").on("click", function() {				
	  	var newPatient = {
	  		"patient_name": $("#patient-name").val(),
	  		"MRN": $("#patient-MRN").val(),
	  		"HPI": $("#patient-HPI").val(),
	  	};

	  	$.post("/addPatient/submitPatient", newPatient, function(data){
	  		console.log("patient added successfully!")
	  	});
	});

	$("#update-patient-button-div").on("click", function(event) {
		
		var selectedButtonType = event.target.id.split("_")[0];
		var PID = event.target.id.split("_")[1];
		
		if (selectedButtonType === "update") {
			var updatePatient = {
				"id": PID,
		  		"patient_name": $("#table-name").val(),
		  		"MRN": $("#table-MRN").val(),
		  		"HPI": $("#table-HPI").val(),
		  	};

		  	$.post("/viewPatients/updatePatient", updatePatient, function(data) {
		  		console.log("Patient updated successfully!")
		  	});
		};

		if (selectedButtonType === "delete") {

		  	$.post("/viewPatients/deletePatient", {"id": PID}, function(data) {
		  		console.log("Patient deleted successfully!")
		  	});
		};		

	});

});
