function updateCartNumber() {
    var cartNumber = document.querySelector(".cartNumber");
    var cartNumberList = document.querySelector(".cartNumberList");

    if (localStorage.length > 0 && localStorage.length < 10) {
        cartNumber.innerHTML = localStorage.length;
    } else if (localStorage.length >= 10) {
        cartNumber.innerHTML = "9+";
    } else {
        cartNumber.innerHTML = "";
    }

    if (cartNumber.innerHTML != "") {
        cartNumberList.innerHTML = " (" + cartNumber.innerHTML + ")";
    } else {
        cartNumberList.innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", updateCartNumber);