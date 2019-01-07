function Meal() {
    this.price = 0;
    this.calories = 0;
}

function Hamburger(size, stuffing) {
    Meal.call(this);
    this.size = size;
    this.stuffing = stuffing;
}

Hamburger.prototype = Object.create(Meal.prototype);

Hamburger.SIZE_SMALL = {
    name: "Small size",
    price: 50,
    calories: 20
};
Hamburger.SIZE_BIG = {
    name: "Big size",
    price: 100,
    calories: 40
};
Hamburger.STUFFING_CHEESE = {
    name: "Cheese",
    price: 10,
    calories: 20
};
Hamburger.STUFFING_SALAD = {
    name: "Salad",
    price: 20,
    calories: 5
};
Hamburger.STUFFING_POTATO = {
    name: "Potato",
    price: 15,
    calories: 10
};

Hamburger.prototype.getSize = function () {
    return this.size.name;
};
Hamburger.prototype.getStuffing = function () {
    return this.stuffing.name;
};
Hamburger.prototype.calculatePrice = function () {
    return this.size.price + this.stuffing.price;
};
Hamburger.prototype.calculateCalories = function () {
    return this.size.calories + this.stuffing.calories;
};


function Salad(kind, weight) {
    Meal.call(this);
    this.kind = kind;
    this.weight = weight;
}

Salad.prototype = Object.create(Meal.prototype);
Salad.CAESAR = {
    name: "Caesar",
    price: 100,
    calories: 20
};
Salad.OLIVIER = {
    name: "Olivier",
    price: 50,
    calories: 80
};
Salad.prototype.getName = function () {
    return this.kind.name;
};
Salad.prototype.getWeight = function () {
    return this.weight;
};
Salad.prototype.calculatePrice = function () {
    return (this.kind.price / 100 * this.weight);
};
Salad.prototype.calculateCalories = function () {
    return (this.kind.calories / 100 * this.weight);
};

function Drink(kind) {
    Meal.call(this);
    this.kind = kind;
}

Drink.prototype = Object.create(Meal.prototype);
Drink.COLA = {
    name: "Cola",
    price: 50,
    calories: 40
};
Drink.COFFEE = {
    name: "Coffee",
    price: 80,
    calories: 20
};
Drink.prototype.getName = function () {
    return this.kind.name;
};
Drink.prototype.calculatePrice = function () {
    return this.kind.price;
};
Drink.prototype.calculateCalories = function () {
    return this.kind.calories;
};

function Order() {
    this.price = 0;
    this.calories = 0;
    this.list = [];
    this.isPaid = false;
}

Order.prototype.addToOrder = function (item) {
    if (this.isPaid === false){
        this.list.push(item);
    } else {
        alert("The order has already been paid.");
    }
};

Order.prototype.removeFromOrder = function (item) {
    if (this.isPaid === false) {
        if (this.list.indexOf(item) !== -1) {
            this.list.splice(this.list.indexOf(item), 1);
        }
    } else {
        alert("The order has already been paid.");
    }
};
Order.prototype.calculatePrice = function () {
    var total = this.price;
    this.list.forEach(function (item) {
        total += item.calculatePrice();
    });
    return total;
};
Order.prototype.calculateCalories = function () {
    var total = this.calories;
    this.list.forEach(function (item) {
        total += item.calculateCalories();
    });
    return total;
};
Order.prototype.payForTheOrder = function () {
    this.isPaid = true;
};

//Проверка
var bigCheese = new Hamburger(Hamburger.SIZE_BIG, Hamburger.STUFFING_CHEESE);
console.log("This is " + bigCheese.getSize() + " burger with " + bigCheese.getStuffing());
console.log("The price is " + bigCheese.calculatePrice() + ", the amount of calories is " + bigCheese.calculateCalories());

var salad = new Salad(Salad.CAESAR, 180);
console.log("This is " + salad.getName() + ", " + salad.getWeight() + "g.");
console.log("The price is " + salad.calculatePrice() + ", the amount of calories is " + salad.calculateCalories());

var cappuccino = new Drink(Drink.COFFEE);
console.log("This is " + cappuccino.getName());
console.log("The price is " + cappuccino.calculatePrice() + ", the amount of calories is " + cappuccino.calculateCalories());

var first = new Order();

first.addToOrder(bigCheese);
first.addToOrder(cappuccino);
first.addToOrder(cappuccino);

console.log("The total price is " + first.calculatePrice());
first.removeFromOrder(cappuccino);
console.log("The amount of calories is " + first.calculateCalories());
first.payForTheOrder();
first.addToOrder(salad);
console.log("The final price is " + first.calculatePrice());
