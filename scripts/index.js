function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
    ) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const RuturnCode = {
    //assinging values to constants
    ERROR: 'Function return error',
    SUCCESS: 'Function return success',
};

const CustomersFile = './customers.json';

class Wine {
    constructor(name, picture, brand, price, descrption, quantity) {
        this.name = name;
        this.picture = picture;
        this.brand = brand;
        this.price = price;
        this.descrption = descrption;
        this.quantity = quantity;
    }
}

class Wines {
    constructor() {
        this.wines = new Map([]);
    }

    // add(wine) {
    //     this.wines.push(wine);
    // }
}

class CustomerInventory extends Wines {
    constructor() {
        super();
    }

    // the customer wine only contains wine name and quantity
    addWine(name, quantity) {
        // add a number of wine into the database: check the quantities against the inventory
        var ret = RuturnCode.ERROR;
        var quantities = gInventory.get(name, quantity);
        if (typeof quantities !== 'undefined' && quantity < quantities) {
            var customerQuantities = this.wines.get(name);
            if (typeof customerQuantities !== 'undefined') {
                this.wines.set(name, quantities + quantity);
            }
        }
        return ret;
    }
}

class Inventory extends Wines {
    constructor() {
        super();
        this.wines.set(
            'Russia Wine 1',
            new Wine(
                'Russia Wine 1',
                '/images/russia/1.png',
                22.22,
                'Drunk Russia Man',
                100
            )
        );
        this.wines.set(
            'China Wine 1',
            new Wine(
                'China Wine 1',
                '/images/china/1.png',
                22.22,
                'Drunk China Man',
                100
            )
        );
    }

    getQuantities(name) {
        var quantities = 0;
        quantiies = this.wines.get(name);
        return quantities;
    }
}

class Customer {
    constructor(name, birthday, email, phone, address, password) {
        this.name = name;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.address = password;
        this.wines = new Map(); // wine list but the quantity is the purchased wine quantities
    }

    addWine(name, quantity) {
        return addWine(name, quantity);
    }

    removeWine(wineName, quantity) {}
}

class Customers {
    constructor() {
        this.customers = new Map();
    }

    add(customer) {
        this.customers.set(customer.name, customer);
    }

    saveJSONFile() {
        // convert Map to JSON string
        // const jsonStr = JSON.stringify(Array.from(gCustomers.customers.entries()));
        // // save JSON to file
        // const fs = require("fs");
        // fs.writeFile(CustomersFile, jsonStr, err => { console.log("Error happens while saving customers.json") })
    }

    readJSONFile() {
        // // Read JSON file
        // const fs = require("fs");
        // fs.readFile(CustomersFile, (err, data) => {
        //     if (err) throw err;
        //     // convert JSON string to Map
        //     var obj = JSON.parse(jsonStr, (key, value) => {
        //         return value;
        //     });
        // });
    }
}

let gCustomers = new Customers();
let gInventory = new Inventory();

function test() {
    gCustomers.add(new Customer('Karen Mok', '1900', '', '', '', ''));
    gCustomers.saveJSONFile();
}

test();

var wineData = [
    {
        id: '1',
        image: '/img/shop-img.png',
        name: 'TestWine1',
        price: '$100.00',
    },
    {
        id: '2',
        image: '/img/shop-img.png',
        name: 'TestWine2',
        price: '$30.00',
    },
    {
        id: '3',
        image: '/img/shop-img.png',
        name: 'TestWine3',
        price: '$10.00',
    },
    {
        id: '4',
        image: '/img/shop-img.png',
        name: 'TestWine4',
        price: '$100.00',
    },
    {
        id: '5',
        image: '/img/shop-img.png',
        name: 'TestWine5',
        price: '$30.00',
    },
    {
        id: '6',
        image: '/img/shop-img.png',
        name: 'TestWine6',
        price: '$10.00',
    },
];

displayWine();

function displayWine() {
    var out = '';
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
            "' min='1' max='100'>";
        out += "<button id='wineButton" + wine.id + "'>Add</button>";
        out += '</div>';
        document.querySelector('#wineDisplay').innerHTML += out;
        out = '';
    });
}
