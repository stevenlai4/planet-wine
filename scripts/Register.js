var alphaOnly = /^[a-zA-Z]*$/;
document.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validation(this)) {
        swal(
            'Thank you for your registration!',
            'You will receive an email confirmation shortly.'
        );
    }
});

const validationFields = [
    'firstName',
    'LastName',
    'email',
    'address',
    'postalCode',
    'password',
    'conPassword',
];

//clear local storage on submitting the form and validation
function validation(form) {
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }

    function isPostCode(postal) {
        if (
            /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(
                postal
            ) ||
            /^\d{5}$|^\d{5}-\d{4}$/.test(postal)
        )
            return true;
        else return false;
    }

    function isPhone(phone) {
        if (/^\d{10}$/.test(phone)) return true;
        else return false;
    }

    function isPassword(password) {
        // Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter]</h2
        if (/^[A-Za-z]\w{7,14}$/.test(password)) {
            return true;
        } else {
            return false;
        }
    }

    let isError = false;
    let password = '';

    validationFields.forEach((field) => {
        const isRequired =
            [
                'firstName',
                'LastName',
                'email',
                'address',
                'postalCode',
                'password',
                'conPassword',
            ].indexOf(field) != -1;

        if (isRequired) {
            const item = document.querySelector('#' + field);

            if (item) {
                const value = item.value.trim();
                if (value === '') {
                    setErrorFor(item, field + ' cannot be blank!');
                    isError = true;
                } else if (field === 'email' && !isEmail(value)) {
                    setErrorFor(item, 'Invalid Email Address!');
                    isError = true;
                } else if (field === 'postalCode' && !isPostCode(value)) {
                    setErrorFor(item, 'Invalid Postal Code!');
                    isError = true;
                } else if (field === 'phone' && !isPhone(value)) {
                    setErrorFor(item, 'Invalid Phone Number!');
                    isError = true;
                } else if (field === 'password' && isPassword(value)) {
                    setSuccessFor(item);
                    password = value;
                } else if (field === 'password' && !isPassword(value)) {
                    setErrorFor(
                        item,
                        ' Minimum 7 and Maximum 15 characters, numeric digits, underscore and first character must be a letter!'
                    );
                    isError = true;
                    password = '';
                } else if (field === 'conPassword' && password !== value) {
                    setErrorFor(item, 'Confirmation Password Not Match!');
                    isError = true;
                } else {
                    setSuccessFor(item);
                }
            }
        }
    });

    return isError === false;
}

function setErrorFor(input, message) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector('small');
    //add error message
    small.innerText = message;
    //add error class
    formgroup.classList.remove('success');
    formgroup.classList.add('error');
}
function setSuccessFor(input) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector('small');
    //add success class
    small.innerText = '';
    formgroup.classList.remove('error');
    formgroup.classList.add('success');
}
