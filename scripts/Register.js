function validate() {
    var x = document.forms["Regform"]["firstName"].value;

    if (x == " " || x == null) {
        alert("First name must be filled out!");
        return false;
    }
}