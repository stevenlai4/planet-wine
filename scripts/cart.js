var productObj = {};

// Convert json array data into object
const arrToObj = (dataArr) => {
    dataArr.forEach((data) => {
        productObj[data.id] = data;
    });
};

//On page load, load data to local variable
document.addEventListener('DOMContentLoaded', () => {
    const products = new Products();
    products.getProducts().then((data) => {
        arrToObj(data);

        displayCart();
        addPlusInputMinusListener();
    });
});

class Products {
    async getProducts() {
        try {
            let result = await fetch('scripts/products.json');
            let data = await result.json();
            this.products = data.map((product) => {
                return product;
            });
            return this.products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Display Purchashed List
const displayCart = () => {
    const article = document.querySelector('article');
    var str = '';
    const lsLength = localStorage.length;

    // Displahy cart empty when no purchased items
    if (lsLength === 0) {
        str +=
            '<div class="cart-empty" style="text-align: center;"><p>Your Cart Is Empty</p></div>';
        str += '<hr />';
        str += '<div class="container">';
        str += '<div class="row my-4">';
        str += '<div class="col-md-6 text-center d-flex">';
        str += '<div class="p-2 continous-btn">';
        str += '<i class="fas fa-caret-left"></i>';
        str += '</div>';
        str += '<div class="p-2 continous-btn">';
        str += '<a class="cont-shopping" href="shop.html">';
        str += 'Continous Shopping</a>';
        str += '</div>';
        str += '</div>';
        str += '<div class="col-md-6 d-flex flex-column">';
        str += '<div class="p-2 ml-auto">';
        str += `<button type="button" class="btn proceed-btn" style="background-color: grey; color: white;" disabled>Proceed To Checkout</button>`;
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';

        article.innerHTML = str;
    } else {
        // Add Purchased List
        for (let i = 0; i < lsLength; i++) {
            let key = localStorage.key(i);

            str += '<div class="container">';
            str +=
                '<div class="d-flex my-4 flex-column flex-md-row align-items-center justify-content-around">';
            str += '<div class="product-item text-center">';
            str += `<img src="${productObj[key].image}" alt="mall"/>`;
            str += ' </div>';
            str += '<div class="product-item text-center">';
            str += '<p class="item-title my-4">';
            str += productObj[key].name;
            str += '</p>';
            str += '</div>';
            str += '<div class="product-item">';
            str +=
                '<div class="d-flex flex-row align-items-center justify-content-center">';
            str += `<p class="price mx-4">$${productObj[key].price}</p>`;
            str += `<i class="fas fa-plus-circle quantity-btn quantity-plus" data-wine-id="${key}"></i>`;
            str += `<input type="text" class="quantity-box mx-3" name="wine${key}" value="${localStorage.getItem(
                key
            )}"/>`;
            str += `<i class="fas fa-minus-circle quantity-btn quantity-minus" data-wine-id="${key}"></i>`;
            str += '</div>';
            str += '</div>';

            str += '<div class="product-item">';
            str += `<p id="total${key}" class="price my-5 mx-3 item-total">$${
                productObj[key].price * localStorage.getItem(key)
            }</p>`;
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<hr />';
        }

        // Add Return Shop Link, Checkout Button, and Subtotal
        str += '<div class="container">';
        str += '<div class="row my-4">';
        str += '<div class="col-md-6 text-center d-flex">';
        str += '<div class="p-2 continous-btn">';
        str += '<i class="fas fa-caret-left"></i>';
        str += '</div>';
        str += '<div class="p-2 continous-btn">';
        str += '<a class="cont-shopping" href="shop.html">';
        str += 'Continous Shopping</a>';
        str += '</div>';
        str += '</div>';
        str += '<div class="col-md-6 d-flex flex-column">';
        str += '<div class="p-2 ml-auto">';
        str += '<a href="checkout.html">';
        str +=
            '<button type="button" class="btn proceed-btn">Proceed To Checkout</button>';
        str += '</a>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';

        article.innerHTML = str;
    }
};

// Claculate total price of wine when plus/minus buttons clicked
const calcTotalPrice = (id, quantity) => {
    const totalPrice = document.querySelector(`#total${id}`);

    totalPrice.innerHTML = '$' + (productObj[id].price * quantity).toFixed(2);
};

// Change total price when user insert into inputs
const insertInput = (element) => {
    const id = element.name.substring(4);

    // Valid date input then calc total price
    if (element.value === '') {
        element.value = 0;
    } else if (isNaN(element.value)) {
        element.value = localStorage.getItem(id);
    } else if (element.value < 0 || element.value > 100) {
        window.alert('Please enter a quantity number between 0 to 100');
        element.value = localStorage.getItem(id);
    } else if (!Number.isInteger(Number(element.value))) {
        element.value = Math.floor(element.value);
    }
    // Eliminating leading zero when there's one
    element.value = Number(element.value);

    localStorage.setItem(id, element.value);
    calcTotalPrice(id, element.value.trim());
};

// Increase wine quantity when plus button clicked
const increaseQuantity = (element) => {
    const id = element.dataset.wineId;
    const input = document.getElementsByName(`wine${id}`);

    if (input[0].value < 100) {
        input[0].value = parseInt(input[0].value) + 1;
        localStorage.setItem(id, input[0].value);
        calcTotalPrice(id, input[0].value);
    }
};

// Decrease wine quantity when minus button clicked
const decreaseQuantity = (element) => {
    const id = element.dataset.wineId;
    const input = document.getElementsByName(`wine${id}`);

    if (input[0].value > 0) {
        input[0].value = parseInt(input[0].value) - 1;
        localStorage.setItem(id, input[0].value);
        calcTotalPrice(id, input[0].value);
    }
};

// Add EventListeners to plus/minus buttons
const addPlusInputMinusListener = () => {
    const plusButtons = document.querySelectorAll('.quantity-plus');
    const minusButtons = document.querySelectorAll('.quantity-minus');
    const inputQuantity = document.querySelectorAll('.quantity-box');

    for (let i = 0; i < plusButtons.length; i++) {
        plusButtons[i].addEventListener('click', function () {
            increaseQuantity(this);
        });

        inputQuantity[i].addEventListener('change', function () {
            insertInput(this);
        });

        minusButtons[i].addEventListener('click', function () {
            decreaseQuantity(this);
        });
    }
};
