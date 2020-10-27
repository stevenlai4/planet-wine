function updateCartNumber() {
    var cartNumber = document.querySelector(".cartNumber");
    var cartNumberList = document.querySelector(".cartNumberList");

    var total = 0;

    for(var i=0; i<localStorage.length; i++) {
        total += parseInt(localStorage.getItem(localStorage.key(i)));
    }

    if (total > 0 && total < 100) {
        cartNumber.innerHTML = total;
    } else if (total >= 100) {
        cartNumber.innerHTML = "99+";
    } else {
        cartNumber.innerHTML = "";
    }

    if (cartNumberList != null) {
        if (cartNumber.innerHTML != "") {
            cartNumberList.innerHTML = " (" + cartNumber.innerHTML + ")";
        } else {
            cartNumberList.innerHTML = "";
        }
    }
}

document.addEventListener("DOMContentLoaded", updateCartNumber);