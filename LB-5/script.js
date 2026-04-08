let lamp = document.getElementById("lamp");

let brightness = 100;
let timer1;

let lampTypes = {
    normal:"images/normal.png",
    eco:"images/eco.png",
    led:"images/led.png"
};

function resetTimer(){
    clearTimeout(timer1);

    timer = setTimeout(()=>{
        lamp.classList.remove("on");
        lamp.classList.add("off");
        alert("Лампочка автоматично вимкнулась");
    },20000);
}

function toggleLamp(){

    if(lamp.classList.contains("off")){
        lamp.classList.remove("off");
        lamp.classList.add("on");
    }
    else{
        lamp.classList.remove("on");
        lamp.classList.add("off");
    }

    resetTimer();
}

function chooseLamp(){

    let type = prompt("Виберіть тип: normal / eco / led");

    if(lampTypes[type]){
        lamp.src = lampTypes[type];
    }

    resetTimer();
}

function changeBrightness(){

    let value = prompt("Введіть яскравість 50-200");

    brightness = value;

    lamp.style.filter = `brightness(${brightness}%)`;

    resetTimer();
}








//////2
let redTime = 5000;
let yellowTime = 3000;
let greenTime = 7000;

let states = ["red","yellow","green"];
let index = 0;

let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");

let text = document.getElementById("stateText");

function clearLights(){
    red.classList.remove("active");
    yellow.classList.remove("active");
    green.classList.remove("active");
}

function changeState(){

    clearLights();

    let state = states[index];

    if(state === "red"){
        red.classList.add("active");
        text.innerText = "Червоний";
        setTimeout(nextState, redTime);
    }

    if(state === "yellow"){
        yellow.classList.add("active");
        text.innerText = "Жовтий";
        setTimeout(nextState, yellowTime);
    }

    if(state === "green"){
        green.classList.add("active");
        text.innerText = "Зелений";
        setTimeout(blinkYellow, greenTime);
    }
}

function nextState(){

    index++;

    if(index >= states.length){
        index = 0;
    }

    changeState();
}

function blinkYellow(){

    let count = 0;

    let interval = setInterval(()=>{

        yellow.classList.toggle("active");

        count++;

        if(count === 6){
            clearInterval(interval);
            index = 0;
            changeState();
        }

    },500);
}

function manualSwitch(){
    nextState();
}

function changeTimes(){

    redTime = prompt("Час червоного (сек)") * 1000;
    yellowTime = prompt("Час жовтого (сек)") * 1000;
    greenTime = prompt("Час зеленого (сек)") * 1000;
}

changeState();



/////1
//////////// 1. Годинник ////////////

function digitalClock(){

    const now = new Date()

    let h = now.getHours().toString().padStart(2,"0")
    let m = now.getMinutes().toString().padStart(2,"0")
    let s = now.getSeconds().toString().padStart(2,"0")

    let colon = s % 2 === 0 ? ":" : " "

    document.getElementById("clock").innerHTML =
    h + colon + m + colon + s

}

setInterval(digitalClock,1000)



//////////// 2. Таймер ////////////

let timer2

function startTimer(){

    const target = new Date(
        document.getElementById("targetTime").value
    )

    clearInterval(timer2)

    timer2 = setInterval(function(){

        const now = new Date()

        const diff = target - now

        if(diff <= 0){
            document.getElementById("countdown").innerHTML =
            "Час вийшов"
            clearInterval(timer2)
            return
        }

        let sec = Math.floor(diff/1000)%60
        let min = Math.floor(diff/60000)%60
        let hour = Math.floor(diff/3600000)%24
        let day = Math.floor(diff/86400000)

        document.getElementById("countdown").innerHTML =
        day+"д "+hour+"г "+min+"хв "+sec+"с"

    },1000)

}



//////////// 3. Календар ////////////

function showCalendar(){

    const value = document.getElementById("monthInput").value

    const date = new Date(value)

    const month = date.toLocaleString("uk-UA",{month:"long"})
    const year = date.getFullYear()

    document.getElementById("calendarResult").innerText =
    "Місяць: " + month + ", Рік: " + year

}

document
.getElementById("monthInput")
.addEventListener("change",showCalendar)



//////////// 4. День народження ////////////

function birthdayTimer(){

    const birth = new Date(
        document.getElementById("birthday").value
    )

    const now = new Date()

    const diff = birth - now

    if(diff < 0){
        document.getElementById("birthdayResult").innerHTML =
        "Ця дата вже пройшла"
        return
    }

    let sec = Math.floor(diff/1000)%60
    let min = Math.floor(diff/60000)%60
    let hour = Math.floor(diff/3600000)%24
    let day = Math.floor(diff/86400000)%30
    let month = Math.floor(diff/(86400000*30))

    document.getElementById("birthdayResult").innerHTML =
    month+" міс "+
    day+" д "+
    hour+" г "+
    min+" хв "+
    sec+" с"

}





/////4
const products = new Map()
const orders = new Set()
const productHistory = new WeakMap()
const activeUsers = new WeakSet()

let idCounter = 1


function addProduct(){

    const name = document.getElementById("name").value
    const price = Number(document.getElementById("price").value)
    const quantity = Number(document.getElementById("quantity").value)

    const product = {
        id: idCounter++,
        name,
        price,
        quantity
    }

    products.set(product.id, product)

    productHistory.set(product, ["Продукт створено"])

    show("Продукт додано. ID: " + product.id)
}


function deleteProduct(){

    const id = Number(document.getElementById("deleteId").value)

    if(products.has(id)){
        products.delete(id)
        show("Продукт видалено")
    }
    else{
        show("Продукт не знайдено")
    }
}


function updateProduct(){

    const id = Number(document.getElementById("updateId").value)
    const newPrice = Number(document.getElementById("newPrice").value)
    const newQuantity = Number(document.getElementById("newQuantity").value)

    const product = products.get(id)

    if(product){

        product.price = newPrice
        product.quantity = newQuantity

        const history = productHistory.get(product)
        history.push("Оновлено інформацію")

        show("Продукт оновлено")
    }
    else{
        show("Продукт не знайдено")
    }
}


function searchProduct(){

    const name = document.getElementById("searchName").value

    for(let product of products.values()){

        if(product.name === name){

            show(
            "ID: "+product.id+
            "<br>Назва: "+product.name+
            "<br>Ціна: "+product.price+
            "<br>Кількість: "+product.quantity
            )

            return
        }
    }

    show("Продукт не знайдено")
}


function makeOrder(){

    const id = Number(document.getElementById("orderId").value)
    const qty = Number(document.getElementById("orderQty").value)

    const product = products.get(id)

    if(product && product.quantity >= qty){

        product.quantity -= qty

        const order = {
            productId: id,
            quantity: qty,
            date: new Date()
        }

        orders.add(order)

        show("Замовлення оформлено")
    }
    else{
        show("Недостатньо товару")
    }
}


function showAllProducts(){

    if(products.size === 0){
        show("Каталог порожній")
        return
    }

    let result = "<b>Каталог продуктів:</b><br><br>"

    for(let product of products.values()){

        result +=
        "ID: " + product.id +
        " | Назва: " + product.name +
        " | Ціна: " + product.price +
        " | Кількість: " + product.quantity +
        "<br>"
    }

    show(result)
}


function show(text){
    document.getElementById("output").innerHTML = text
}

