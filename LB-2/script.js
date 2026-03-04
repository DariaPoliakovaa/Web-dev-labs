function findMinMax(){
let input = document.getElementById("numbers").value;
let arr = input.split(",").map(Number);
let min = arr[0];
let max = arr[0];

for(let i=1;i<arr.length;i++){
    if(arr[i] < min){
        min = arr[i];
    }
    if(arr[i] > max){
        max = arr[i];
    }
}

document.getElementById("minmaxResult").innerText =
"Мін: " + min + " Макс: " + max;
}

function checkRange(){
let number = Number(document.getElementById("number").value);
let min = Number(document.getElementById("min").value);
let max = Number(document.getElementById("max").value);
let result = number >= min && number <= max;

document.getElementById("rangeResult").innerText =
result ? "Число в діапазоні" : "Число поза діапазоном";
}


function gradeIf(){
let score = Number(document.getElementById("score").value);
let text;
if(score >= 90){
text = "Відмінно";
}
else if(score >= 75){
text = "Добре";
}
else if(score >= 60){
text = "Задовільно";
}
else{
text = "Незадовільно";
}

document.getElementById("gradeResult").innerText = text;
}


function gradeTernary(){
let score = Number(document.getElementById("score").value);
let text =
score >= 90 ? "Відмінно" :
score >= 75 ? "Добре" :
score >= 60 ? "Задовільно" :
"Незадовільно";

document.getElementById("gradeResult").innerText = text;
}


function getSeason(){
let month = Number(document.getElementById("month").value);
let season;
if(month == 12 || month == 1 || month == 2){
season = "Зима";
}
else if(month >=3 && month <=5){
season = "Весна";
}
else if(month >=6 && month <=8){
season = "Літо";
}
else if(month >=9 && month <=11){
season = "Осінь";
}
else{
season = "Неправильний місяць";
}
document.getElementById("seasonResult").innerText = season;
}