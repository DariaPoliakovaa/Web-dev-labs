function fibSum() {
    let a = 0;
    let b = 1;
    let count = 1;
    let sum = a;

    while (count < 10) {
        sum += b;
        let next = a + b;
        a = b;
        b = next;
        count++;
    }

    document.getElementById("fibResult").innerText = sum;
}

function primeSum() {
    let sum = 0;

    for (let i = 2; i <= 1000; i++) {
        let isPrime = true;

        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) sum += i;
    }

    document.getElementById("primeResult").innerText = sum;
}

function getDay() {
    let day = parseInt(document.getElementById("dayInput").value);
    let result;

    switch(day) {
        case 1: result = "Понеділок"; break;
        case 2: result = "Вівторок"; break;
        case 3: result = "Середа"; break;
        case 4: result = "Четвер"; break;
        case 5: result = "П’ятниця"; break;
        case 6: result = "Субота"; break;
        case 7: result = "Неділя"; break;
        default: result = "Невірне число";
    }

    document.getElementById("dayResult").innerText = result;
}

function oddStrings() {
    let arr = ["hello", "hi", "world", "JavaScript"];
    let result = arr.filter(str => str.length % 2 !== 0);

    document.getElementById("stringResult").innerText = result;
}

const increaseNumbers = () => {
    let arr = [1,2,3,4,5];
    let result = arr.map(n => n + 1);

    document.getElementById("increaseResult").innerText = result;
}

function checkNumbers() {
    let a = Number(document.getElementById("a").value);
    let b = Number(document.getElementById("b").value);

    let result = (a + b === 10 || a - b === 10 || b - a === 10);

    document.getElementById("checkResult").innerText = result;
}