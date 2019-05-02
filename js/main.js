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

  	validationRadio: function() {
  		var radio = document.querySelectorAll(".radio");
  		if(!radio[0].checked){
  			var radio1 = document.getElementById("radio1");
			radio1.innerHTML = "Proszę wyrazić zgodę";
			radio1.classList.add("info-error-active");
  			radio[0].parentNode.style.color = "#e90027";
  			this.sendRadio1 = false;
  		} else {
  			var radio1 = document.getElementById("radio1");
			radio1.classList.remove("info-error-active");
  			radio[0].parentNode.style.color = "#fff";
  			this.sendRadio1 = true;
  		}

  		if(!radio[1].checked){
  			var radio2 = document.getElementById("radio2");
			radio2.innerHTML = "Proszę wyrazić zgodę";
			radio2.classList.add("info-error-active");
  			radio[1].parentNode.style.color = "#e90027";
  			this.sendRadio2 = false;
  		} else {
  			var radio2 = document.getElementById("radio2");
			radio2.classList.remove("info-error-active");
  			radio[1].parentNode.style.color = "#fff";
  			this.sendRadio2 = true;
  		}
  	},

  	validationNumber: function(input) {
  		if(input.value.length > 6 ){
			var number = document.getElementById("number");
			number.classList.remove("info-error-active");
  			this.success(input);
  			 this.sendNumber = true;
  		} else {
  			var number = document.getElementById("number");
  			number.innerHTML = "Proszę wypełnić to pole";
			number.classList.add("info-error-active");
  			this.error(input);
  			this.sendNumber = false;
  		}
  	},

  	validationText: function(input) {
  		if(input.name === "email"){
  			if(((input.value.indexOf("@") !== -1) && (input.value.indexOf(".") !== -1))){
  				var email = document.getElementById("email");
  				email.innerHTML = "Proszę wypełnić to pole";
  				email.classList.remove("info-error-active");
  				this.success(input);
  			  	this.sendEmail = true;
  			} else {
  				var email = document.getElementById("email");
  				email.innerHTML = "Proszę wypełnić to pole";
  				email.classList.add("info-error-active");	
  				this.error(input);
  				this.sendEmail = false;
  			}
  		} else {
  			if(input.value === ""){
				var name = document.getElementById("firstName");
  				name.innerHTML = "Proszę wypełnić to pole";
  				name.classList.add("info-error-active");									
  				this.error(input);
  				this.sendText = false;
	  		} else {
	  			var name = document.getElementById("firstName");
	  			name.classList.remove("info-error-active");
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
  		var btn = document.getElementById("btn-form");
  		btn.removeEventListener("change", self.formValidation, false);

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
  	}
  }

  ModalNewsletter.showModal();
});