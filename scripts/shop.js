var localData;

//On page load, load data to local variable
document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    products.getProducts().then(data => {
        localData = data;
        showProducts();
    });
});

//Fetch data from json
class Products {
    async getProducts() {
        try {
            let result = await fetch("scripts/products.json");
            let data = await result.json();
            this.products = data.map(product => {
                return product;
            });
            return this.products;
        } catch (error) {
            console.log(error);
        }
    }
}

//Rearrange product before displaying
function showProducts() {
    var tempData = [];
    //Filter by type
    if (document.querySelector("#redWine:checked") != null) {
        tempData = localData.filter(function (a) {
            return a.type == "Red Wine";
        });
    }

    if (document.querySelector("#whiteWine:checked") != null) {
        tempData = tempData.concat(
            localData.filter(function (a) {
                return a.type == "White Wine";
            })
        );
    }
    //Order by price
    if (document.querySelector("[name=listOrder]:checked").value == 1) {
        tempData.sort(function (a, b) {
            return b.price - a.price;
        });
    } else {
        tempData.sort(function (a, b) {
            return a.price - b.price;
        });
    }

    displayWine(tempData);
}

//Display wine in filtered order to shop page
function displayWine(wineData) {
    //For displaying the wine on page
    var out = "";
    document.querySelector("#wineDisplay").innerHTML = "";
    wineData.forEach(wine => {
        out += "<div>";
        out += "<img src='" + wine.image + "'>";
        out += "<h2>" + wine.name + "</h2>";
        out += "<p>" + wine.price + "</p>";
        out +=
            "<input type='number' id='wine" +
            wine.id +
            "' name='wine" +
            wine.id +
            "' min='0' max='100' value='0'>";
        out +=
            "<button id='wineButton" +
            wine.id +
            "' class='addButton'>Add</button>";
        out += "</div>";
        document.querySelector("#wineDisplay").innerHTML += out;
        out = "";
    });

    //Fill in value that have already been saved
    for (var i = 0; i < localStorage.length; i++) {
        var btnId = localStorage.key(i);
        var input = document.querySelector("#wine" + btnId);
        if (input != null) {
            input.value = localStorage.getItem(btnId);
        }
    }

    //Add click listener to button
    const addBtns = document.querySelectorAll(".addButton");
    addBtns.forEach(btn => {
        var btnId = btn.id.match(/(\d+)/)[0];
        var input = document.querySelector("#wine" + btnId);
        btn.addEventListener("click", function () {
            // Eliminating leading zero when there's one
            input.value = Number(input.value);
            //Validation
            if (isNaN(input.value)) {
                window.alert(
                    "Please enter an integer number for the quantity and add it again!"
                );
            } else if (input.value < 0 || input.value > 100) {
                window.alert(
                    "Please enter a quantity number between 0 to 100 and add it again!"
                );
                if (input.value < 0) {
                    input.value = 0;
                } else {
                    input.value = 100;
                }
            } else if (!Number.isInteger(Number(input.value))) {
                window.alert(
                    "Please enter an integer number for the quantity and add it again!"
                );
                input.value = Math.floor(input.value);
            } else {
                //Add item
                if (input.value == 0) {
                    localStorage.removeItem(btnId);
                } else if (input.value > 0 && input.value <= 100) {
                    localStorage.setItem(btnId, input.value);
                }
            }
        });
    });
}

//Rewrite page each time filter is activated
var filter = document.querySelectorAll(".filter");
filter.forEach(order =>
    order.addEventListener("change", function () {
        showProducts();
    })
);
