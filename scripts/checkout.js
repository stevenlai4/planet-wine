localStorage.setItem(1, 11);
localStorage.setItem(3, 33);
localStorage.setItem(5, 55);
localStorage.setItem(7, 77);

let products = [];

class Cart {
    // get Products from localStorage
    static getLocal() {
        var cart = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            cart.push({ "id": key, "amount": value });
        }

        return cart;
    }

    static showCart(cart) {
        //display Cart in the browser
        let result = '';
        cart.forEach(cartItem => {
            let product = products.find(product => product.id === cartItem.id);
            result += `
                    <div>
                        <img src=${product.image} alt="product" class="product-img">
                        <input class="quantity-box"  data-name=${product.name} data-id=${product.id} type="number"  value="1" />
                        <h3>${product.type}</h3>
                        <h4>${product.price}</h4>
                        <h4>Amount:  ${cartItem.amount} </h4>
                        <h4>${product.description}</h4>
                    </div>         
                `;
        });

        var outputDOM = document.querySelector('#output');
        outputDOM.innerHTML = result;
    }
}

class Customers {
    // get Product from product.json file
    async get() {

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
    static saveLocal(customers) {
        localStorage.setItem("customers", JSON.stringify(customers));
        localStorage.setItem("cart", JSON.stringify(customers));
    }

    // get Products from localStorage
    static getLocal() {
        var carts = [...localStorage.getItem("cart")]
    }

    //display Products in the browser
    static display(customers) {

    }
}

class Products {

    // get Product from product.json file
    async get() {

        try {
            var loc = window.location.pathname;
            let result = await fetch('./scripts/products.json');
            return await result.json();
        } catch (error) {
            console.log(error);
        }
    }

    static get(id) {
        let products = JSON.parse(localStorage.getItem(products));
        return products.find(product => product.id === id);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    (new Products()).get().then(tempProducts => {
        products = tempProducts;
        Cart.showCart(Cart.getLocal());
    })
});
