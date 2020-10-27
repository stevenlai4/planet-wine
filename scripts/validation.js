const validationFields = [
    "firstName",
    "lastName",
    "address",
    "cityId",
    "stateId",
    "countryId",
    "postCode",
    "phone",
    "expirationDate",
    "creditCardNumber",
    "CVW",
];

//clear local storage on submitting the form and validation
function validation(form) {
    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        formControl.classList.add("error");
        formControl.classList.remove("success");
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.classList.remove("error");
        formControl.classList.add("success");
    }

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

    function isCVW(cvw) {
        if (/\d{3}$/.test(cvw)) return true;
        else return false;
    }

    function isCreditCartNumber(number) {
        if (/^\d{12}$/.test(number)) return true;
        else return false;
    }

    function isExpireDate(expiryDate) {
        var today = new Date(); // gets the current date
        var today_mm = today.getMonth() + 1; // extracts the month portion
        var today_yy = today.getFullYear() % 100; // extracts the year portion and changes it from yyyy to yy format

        if (today_mm < 10) {
            // if today's month is less than 10
            today_mm = "0" + today_mm; // prefix it with a '0' to make it 2 digits
        }

        var mm = expiryDate.substring(0, 2); // get the mm portion of the expiryDate (first two characters)
        var yy = expiryDate.substring(3, 5); // get the yy portion of the expiryDate (from index 3 to end)

        if (yy > today_yy || (yy == today_yy && mm >= today_mm)) {
            return true;
        } else {
            return false;
        }
    }

    let isError = false;

    validationFields.forEach(field => {
        const isRequired =
            [
                "firstName",
                "lastName",
                "address",
                "cityId",
                "stateId",
                "countryId",
                "postCode",
                "phone",
                "expirationDate",
                "creditCardNumber",
                "CVW",
            ].indexOf(field) != -1;

        if (isRequired) {
            const item = document.querySelector("#" + field);

            if (item) {
                const value = item.value.trim();
                if (value === "") {
                    setErrorFor(item, field + " cannot be blank");
                    isError = true;
                } else if (field === "email" && !isEmail(value)) {
                    setErrorFor(item, field + " is an invalid email");
                    isError = true;
                } else if (field === "postCode" && !isPostCode(value)) {
                    setErrorFor(item, field + " is an invalid post code");
                    isError = true;
                } else if (field === "phone" && !isPhone(value)) {
                    setErrorFor(item, field + " is an invalid phone number");
                    isError = true;
                } else if (
                    field === "creditCardNumber" &&
                    !isCreditCartNumber(value)
                ) {
                    setErrorFor(item, field + " is an invalid credit number");
                    isError = true;
                } else if (field === "CVW" && !isCVW(value)) {
                    setErrorFor(item, field + " is an invalid CVW");
                    isError = true;
                } else if (field === "expirationDate" && !isExpireDate(value)) {
                    setErrorFor(item, field + " is an invalid expired date");
                    isError = true;
                } else {
                    setSuccessFor(item);
                }
            }
        }
    });

    return isError === false;
}

function addSubmitListener() {
    var form = document.querySelector("form");
    form.addEventListener(
        "submit",
        event => {
            var submit = document.querySelector("#Submit");
            var result = document.querySelector(".result");

            if (result) {
                result.remove();
            }

            if (validation(this)) {
                // clear all the key/value pairs in localStorage
                localStorage.clear();
                if (submit) {
                    submit.outerHTML =
                        `<div class='result success'><h1>Thank you for your purchase!</h1></div>` +
                        submit.outerHTML;
                }
            } else {
                if (submit) {
                    submit.outerHTML =
                        `<div class='result fail'><h1>Please try it again.<h1></div>` +
                        submit.outerHTML;
                }
            }

            // avoid refresh the page after submitting the form
            event.preventDefault();
        },
        true
    );
}
