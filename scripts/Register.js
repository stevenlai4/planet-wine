// alert("Hello! I am an alert box!!");
const RegForm = document.getElementById('RegForm');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const question = document.getElementById('question');
var alphaOnly = /^[a-zA-Z]*$/;
RegForm.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();
});
function checkInputs(){
    // get the values from the inputs
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const questionValue = question.value.trim();
    if(lastNameValue === ' '){
        //show error and add error class
        setErrorFor(lastName,"Last Name cannot be blank");
    }  else {
        //add success class
        setSuccessFor(lastName);
    }
    // if(emailValue === ''){
    //     //show error and add error class
    //     setErrorFor(email,"Email cannot be blank");
    // } else if(!isEmail(emailValue)){
    //     setErrorFor(email,'Email is not valid')
    // } else {
    //     //add success class
    //     setSuccessFor(email);
    // }
    // if(questionValue === ''){
    //     //show error and add error class
    //     setErrorFor(question,"Please leave your questions");
    // } else if(questionValue.length<10){
    //     setErrorFor(question,'Must be at least 10 characters')
    // } else {
    //     //add success class
    //     setSuccessFor(question);
    // }
    // if (name.parentElement.className == 'contactForm success' && email.parentElement.className == 'contactForm success' && question.parentElement.className == 'contactForm success'){
    //      // pop-up after successful submittion/reset form
    //     swal("Thank you for getting in touch!", "We will get back in touch with you soon.");
    //     document.getElementById("form").reset();
    // }
}  
function setErrorFor(input,message){
    const formgroup = input.parentElement;
    const small = formgroup.querySelector('small');
    //add error message 
    small.innerText = message;
    //add error class
    formgroup.className = 'formgroup error';
}
function setSuccessFor(input) {
    const formgroup = input.parentElement;
    //add success class
    formgroup.className = 'formgroup success';
}
//make sure the email is valid
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}