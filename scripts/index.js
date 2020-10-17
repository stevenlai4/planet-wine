
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const RuturnCode = {
    //assinging values to constants
    ERROR: 'Function return error',
    SUCCESS: 'Function return success',
};

const CustomersFile = "./customers.json";

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
        this.wines.set("Russia Wine 1", new Wine("Russia Wine 1", "/images/russia/1.png", 22.22, "Drunk Russia Man", 100));
        this.wines.set("China Wine 1", new Wine("China Wine 1", "/images/china/1.png", 22.22, "Drunk China Man", 100));
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
        this.wines = new Map();         // wine list but the quantity is the purchased wine quantities
    }

    addWine(name, quantity) {
        return addWine(name, quantity);
    }

    removeWine(wineName, quantity) {

    }

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
        const jsonStr = JSON.stringify(Array.from(gCustomers.customers.entries()));
        // save JSON to file
        const fs = require("fs");
        fs.writeFile(CustomersFile, jsonStr, err => { console.log("Error happens while saving customers.json") })
    }

    readJSONFile() {
        // Read JSON file 
        const fs = require("fs");
        fs.readFile(CustomersFile, (err, data) => {
            if (err) throw err;

            // convert JSON string to Map
            var obj = JSON.parse(jsonStr, (key, value) => {

                return value;
            });
        });
    }
}

let gCustomers = new Customers();
let gInventory = new Inventory();

function test() {
    gCustomers.add(new Customer("Karen Mok", "1900", "", "", "", ""));
    gCustomers.saveJSONFile();
};

test();

/*
// Base Menu Class
class Item {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
  }
}

// Submenu Class
class SubMenu {
  constructor(name, cost) {
    this.name = name;
    this.items = [];
  }

  addMenuItem(name, cost) {
    this.items.push(new Item(name, cost));
  }

  // Function   - getPrice
  // Parameter  - selection number
  // Return     - the selected item's description and cost
  getPrice(selection) {
    return [this.items[selection - 1].name, this.items[selection - 1].cost];
  }

  getLength() {
    return this.items.length;
  }
}

// Menu Manager
class Manager {
  static APPETIZER = 0;
  static ENTREE = 1;
  static DESSERT = 2;
  static BEVERAGE = 3;

  constructor() {
    this.subMenus = [];
    // Menu Objects and initialization

    let appetizer = new SubMenu("Appetizer Menu");
    let entree = new SubMenu("Entree Menu");
    let dessert = new SubMenu("Dessert Menu");
    let beverage = new SubMenu("Beverage Menu");

    this.subMenus.push(appetizer);
    this.subMenus.push(entree);
    this.subMenus.push(dessert);
    this.subMenus.push(beverage);

    appetizer.addMenuItem("** No Selection **", "0.00");
    appetizer.addMenuItem("Deep Fried Calamari", "7.50");
    appetizer.addMenuItem("Soup du Jour", "4.99");
    appetizer.addMenuItem("Garden Salad", "3.99");
    appetizer.addMenuItem("Garlic Bread", "4.50");

    entree.addMenuItem("** No Selection **", "0.00");
    entree.addMenuItem("Rib-Steak", "15.95");
    entree.addMenuItem("Fettuccini", "11.25");
    entree.addMenuItem("Pan-Fried Sole", "17.95");
    entree.addMenuItem("Meiterranean Patter", "13.50");
    entree.addMenuItem("Vegetarian Lasagna", "9.00");

    dessert.addMenuItem("** No Selection **", "0.00");
    dessert.addMenuItem("Ice Cream Sundae", "2.95");
    dessert.addMenuItem("Cheesecake", "5.00");
    dessert.addMenuItem("Chocolate Truffle Cake", "6.00");
    dessert.addMenuItem("Raspberry Mousse", "4.50");

    beverage.addMenuItem("** No Selection **", "0.00");
    beverage.addMenuItem("Water", "0.00");
    beverage.addMenuItem("Juice", "2.00");
    beverage.addMenuItem("Pop", "2.00");
    beverage.addMenuItem("Milk", "2.00");
    beverage.addMenuItem("Coffee", "1.75");
    beverage.addMenuItem("Tea", "1.75");
  }

  getMenu(subMenuID) {
    return this.subMenus[subMenuID];
  }

  getMenuName(subMenuID) {
    return this.subMenus[subMenuID].name;
  }
  getLength(subMenuID) {
    return this.subMenus[subMenuID].getLength();
  }

  getPrice(subMenuID, selection) {
    return this.subMenus[subMenuID].getPrice(selection);
  }

  getMax() {
    return this.subMenus.length;
  }
}

let manager = new Manager();
*/