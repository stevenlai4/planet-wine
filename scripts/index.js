let quantityInputsDOM = [];
let cart = [{ "id": "1", "quantity": "1" },
{ "id": "2", "quantity": "1" },
{ "id": "3", "quantity": "1" },
{ "id": "4", "quantity": "1" },
{ "id": "5", "quantity": "1" },
{ "id": "6", "quantity": "1" },
{ "id": "7", "quantity": "1" },
{ "id": "8", "quantity": "1" },
{ "id": "9", "quantity": "1" },
{ "id": "10", "quantity": "1" },
];

const RuturnCode = {
    //assinging values to constants
    ERROR: 'Function return error',
    SUCCESS: 'Function return success',
};

class Customers {
    // get Product from product.json file
    async getCustomers() {

        try {
            let result = await fetch('customers.json');
            let data = await result.json();
            this.customers = data.map(customer => {
                return customer;
            });

            return this.customers;
        } catch (error) {
            console.log(error);

        }
    }

    // set Products to localStorage
    static saveLoaclCustomers(customers) {
        localStorage.setItem("customers", JSON.stringify(customers));
        localStorage.setItem("cart", JSON.stringify(customers));
    }

    // get Products from localStorage
    static getLoaclCustomers() {
        var carts = [...localStorage.getItem("cart")]
    }

    //display Products in the browser
    static displayCustomers(customers) {

    }
}

class Products {

    // get Product from product.json file
    async getProducts() {

        try {
            let result = await fetch('products.json');
            let data = await result.json();
            this.products = data.map(product => {
                return product;
            });

            return this.products;
        } catch (error) {
            console.log(error);

        }
    }

    // set Products to localStorage
    static saveLoaclProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("cart", JSON.stringify(products));
    }

    // get Products from localStorage
    static getLocalProducts() {
        var carts = [...localStorage.getItem("cart")]
    }

    //display Products in the browser
    static displayProducts(products) {

        let result = '';
        products.forEach(product => {
            result += `
                <div>
                    <img src=${product.image} alt="product" class="product-img">
                    <input class="quantity-box"  data-name=${product.name} data-id=${product.id} type="number"  value="1" />
                    <h3>${product.type}</h3>
                    <h4>${product.price}</h4>
                    <h4>${product.description}</h4>
                </div>         
            `;

            var outputDOM = document.querySelector('#output');
            outputDOM.innerHTML = result;
        });
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem(products));
        return products.find(product => product.id === id);
    }

    static getCarts() {

        // const quantityInputs = [...document.querySelectorAll('.quantity')];
        // quantityInputsDOM = quantityInputs;
        // quantityInputs.forEach(input => {
        //     button.addEventListener('click', (event => {
        //         event.target.innerText = "In Cart";
        //     }));
        // }
        // })
    }
}

const products = new Products();
products.getProducts().then(products => {
    Products.saveLoaclProducts(products);
    Products.displayProducts(products);
}).then(() => {

});

document.addEventListener("DOMContentLoaded", () => {

    var url = window.location.href;
    if (url.search("index.html")) {

        const products = new Products();
        const customers = new Customers();
        products.getProducts().then(products => {
            Products.saveLoaclProducts(products);
            Products.displayProducts(products);
        }).then(() => {
            let values = 0;
            var submitBtn = document.querySelector('.proceed-btn');
            submitBtn.addEventListener('click', event => {
                const quantityInputs = [...document.querySelectorAll('.quantity-box')];
                quantityInputs.map(input => {
                    values += parseFloat(input.value);
                })
            });
        })

    }
});
