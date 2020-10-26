const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const question = document.getElementById('question');

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs(){
    // get the values from the inputs
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const questionValue = question.value.trim();

    if(nameValue === ''){
        //show error and add error class
        setErrorFor(name,"Name cannot be blank");
    } else {
        //add success class
        setSuccessFor(name);
    }

    if(emailValue === ''){
        //show error and add error class
        setErrorFor(email,"Email cannot be blank");
    } else if(!isEmail(emailValue)){
        setErrorFor(email,'Email is not valid')
    } else {
        //add success class
        setSuccessFor(email);
    }

    if(questionValue === ''){
        //show error and add error class
        setErrorFor(question,"Please leave your questions");
    } else if(questionValue.length<10){
        setErrorFor(question,'Must be at least 10 characters')
    } else {
        //add success class
        setSuccessFor(question);
    }
}  

function setErrorFor(input,message){
    const contactForm = input.parentElement;
    const small = contactForm.querySelector('small');
    //add error message 
    small.innerText = message;
    //add error class
    contactForm.className = 'contactForm error';
}

function setSuccessFor(input) {
    const contactForm = input.parentElement;
    //add success class
    contactForm.className = 'contactForm success';
}

//make sure the email is valid
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}