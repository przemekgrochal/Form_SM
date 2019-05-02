document.addEventListener("DOMContentLoaded", function() {

  var ModalNewsletter = {
  	divError: document.querySelectorAll('.info-error-notActive'),
  	modal: document.getElementById('modal-newsletter'),
  	input:document.getElementsByTagName("input"),
  	form:document.getElementById("contact-form"),
  	sendRadio1: null,
  	sendRadio2: null,
  	sendNumber: null,
  	sendEmail: null,
  	sendText: null,
  	errors: [],

  	validationRadio: function() {
  		var radio = document.querySelectorAll(".radio");
  		if(!radio[0].checked){
  			radio[0].parentNode.style.color = "#e90027";
  			this.errors.push("Proszę zaznaczyć zgody");
  			this.sendRadio1 = false;
  		} else {
  			radio[0].parentNode.style.color = "#fff";
  			this.sendRadio1 = true;
  		}

  		if(!radio[1].checked){
  			radio[1].parentNode.style.color = "#e90027";
  			this.errors.push("Proszę zaznaczyć zgody");
  			this.sendRadio2 = false;
  		} else {
  			radio[1].parentNode.style.color = "#fff";
  			this.sendRadio2 = true;
  		}
  	},

  	validationNumber: function(input) {
  		if(input.value.length > 6 ){
  			this.success(input);
  			 this.sendNumber = true;
  		} else {
  			this.error(input);
  			this.errors.push("Proszę wypełnić pole");
  			this.sendNumber = false;
  		}
  	},

  	validationText: function(input) {
  		if(input.name === "email"){
  			if(((input.value.indexOf("@") !== -1) && (input.value.indexOf(".") !== -1))){

  				this.success(input);
  			  	this.sendEmail = true;
  			} else {
  				this.error(input);
  				this.errors.push("Proszę wpisać poprawny adres e-mail");
  				this.sendEmail = false;
  			}
  		} else {
  			if(input.value === ""){
  				if(document.getElementById(".info-error-active")){
  					var name = document.getElementById("firstName");
	  				name.innerHTML = "Proszę wypełnić to pole";
	  				name.classList.toggle("info-error-active");	
  				}
  				

  				this.error(input);
  				this.errors.push("Proszę wypełnić pole");
  				this.sendText = false;
	  		} else {
	  			this.success(input);
	  			this.sendText = true;
	  		}
  		}
  	},

  	success: function(input) {
  		input.style.border = "none";
  	},

  	error: function(input) {
  		input.style.border = "2px solid #e90027";
  	},

  	formValidation: function(e) {
  		var self = ModalNewsletter;
  		e.preventDefault();

  		for(var i=0; i<self.input.length; i++){
           var inputs = self.input[i];

           if(inputs.type === "text"){
           		self.validationText(inputs);
           }
           if( (inputs.type === "number") || (inputs.name === "tel") ){
           		self.validationNumber(inputs);
           }
           if(inputs.type === "radio"){
           		self.validationRadio();
           }
		   self.sendForm();
        }
  	},

  	sendForm: function() {
		if((this.sendRadio1 === true) && (this.sendRadio2 === true) && 
		   (this.sendNumber === true) && (this.sendEmail === true) &&
		   (this.sendText === true)) {
			  this.form.submit();
		}
  	},

  	showModal: function() {
  		this.modal.style.display = "block";
  		this.form.addEventListener('submit', this.formValidation, false);
  		//this.form.addEventListener('change', this.formValidation, false);
  	}
  }

  ModalNewsletter.showModal();
});