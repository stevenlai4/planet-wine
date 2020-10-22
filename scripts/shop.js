//On page load
document.addEventListener("DOMContentLoaded", () => {
    showProducts();
});

function showProducts() {
    const products = new Products();
    //Get from json before doing anything
    products.getProducts().then(data => {
        var tempData = [];
        //Filter by type
        if (document.querySelector("#redWine:checked") != null) {
            tempData = data.filter(function(a) {
                return a.type == "Red Wine";
            });
        }
        
        if (document.querySelector("#whiteWine:checked") != null) {
            tempData = tempData.concat(data.filter(function(a) {
                return a.type == "White Wine";
            }));
        }
        data = tempData;
        //Order by price
        if (document.querySelector("[name=listOrder]:checked").value == 1) {
            data.sort(function(a,b) {
                return b.price - a.price;
            });
        } else {
            data.sort(function(a,b) {
                return a.price - b.price;
            });
        }
        
        displayWine(data);
    });
}

//Fetch data from json
class Products {
    async getProducts() {
        try {
            let result = await fetch('scripts/products.json');
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

function displayWine(wineData) {
    //For displaying the wine on page
    var out = '';
    document.querySelector('#wineDisplay').innerHTML = '';
    wineData.forEach((wine) => {
        out += '<div>';
        out += "<img src='" + wine.image + "'>";
        out += '<h2>' + wine.name + '</h2>';
        out += '<p>' + wine.price + '</p>';
        out +=
            "<input type='number' id='wine" +
            wine.id +
            "' name='wine" +
            wine.id +
            "' min='1' max='100' value='1'>";
        out += "<button id='wineButton" + wine.id + "' class='addButton'>Add</button>";
        out += '</div>';
        document.querySelector('#wineDisplay').innerHTML += out;
        out = '';
    });

    //Add click listener to button
    const addBtns = document.querySelectorAll('.addButton');
    addBtns.forEach(btn => {
        var btnId = btn.id.match(/(\d+)/)[0];
        var input = document.querySelector("#wine" + btnId);
        btn.addEventListener("click", function() {
            var quantity;
            if (localStorage.getItem(btnId) == null) {
                quantity = input.value;
            } else {
                quantity = localStorage.getItem(btnId).amount + parseInt(input.value);
            }
            localStorage.setItem(btnId, quantity);
        });
    });
}

var filter = document.querySelectorAll(".filter");
filter.forEach(order => order.addEventListener("change", function() {
    showProducts();
}));