import json from "./questions.json" assert { type: "json" }; // This import style requires "esModuleInterop"
var myJson = json.results;
// console.log(myJson[0].question);
console.log(myJson[0].niv1[1].question);
window.onload = function onload() {
    var now = new Date();
    var lastLeave = localStorage.getItem('lastLeave');
    localStorage.setItem('lastEnter', JSON.stringify(now.getTime()));
};
window.onunload = function onunload() {
    localStorage.setItem('lastLeave', JSON.stringify(new Date().getTime()));
    var leave = localStorage.getItem('lastLeave');
    var arrive = localStorage.getItem('lastEnter');
    console.log("leave ", Date.parse(leave));
    // console.log("arrive ", Date.parse(arrive));
    var timeSpett = +leave - +arrive;
    localStorage.setItem('there', JSON.stringify(timeSpett));
};
// function getTimeSpend() {
//   return +(new Date()) - +(localStorage.getItem('lastEnter'));
// }
// timer :
function countdown() {
    var seconds = 60;
    var mins = 5;
    function topChronos() {
        var counter = document.getElementById("timer");
        var currentMinutes = mins - 1;
        seconds--;
        //  show counter in html
        counter.innerHTML = currentMinutes.toString() + ":" + (seconds < 10 ?
            "0" :
            "")
            + String(seconds);
        if (seconds > 0) {
            setTimeout(topChronos, 1000);
        }
        else {
            if (mins > 1) {
                countdown();
            }
        }
    }
    topChronos();
}
countdown();
// Shuflle array values function
function optionsShuffler(array) {
    var _a;
    var currentOptionsShufflerIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentOptionsShufflerIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentOptionsShufflerIndex);
        currentOptionsShufflerIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex],
            array[currentOptionsShufflerIndex],
        ], array[currentOptionsShufflerIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
// let qst: keyof typeof myJson;
// for (let qst in myJson) {
//   console.log("the question is  " + myJson[qst].question);
//   const question: HTMLElement = document.getElementById("questionGoesHere");
//   const b: HTMLElement = document.createElement("b");
//   b.textContent = myJson[qst].question;
//   question.appendChild(b);
//   }
var currentIndex = 0;
var score = 0;
var question = document.getElementById("questionGoesHere");
var b = document.createElement("b");
b.textContent = myJson[currentIndex].niv1[currentIndex].question;
question.appendChild(b);
// Appending the question in Dom from the json
// Shuffling values that exists in the json 
var storeIncOptions = optionsShuffler(myJson[0].niv1[currentIndex].incorrect_answers);
//   No need to shufle since it's only one value there
var storeCoOptions = (myJson[0].niv1[currentIndex].correct_answer);
//debug
console.log("this is ", storeIncOptions);
// I store all the options in array named alloptions
var allOptions = [];
allOptions.push(storeIncOptions, storeCoOptions);
// I shuffle those options so that it becomes hard to guess the answers pattern
optionsShuffler(allOptions);
//debug
console.log("lol", allOptions);
var options = document.getElementById("options");
var opt;
var list = [];
for (var opt_1 in allOptions) {
    if (typeof allOptions[opt_1] === 'string') {
        list.push(allOptions[opt_1].toString());
    }
    else if (Array.isArray(allOptions[opt_1])) {
        list.push.apply(list, allOptions[opt_1]);
    }
}
list.forEach(function (element) {
    var label = document.createElement('label');
    label.setAttribute('id', "option-" + element);
    label.classList.add("options");
    var input = document.createElement('input');
    input.setAttribute("type", "radio");
    input.setAttribute("name", "radio");
    input.value = element;
    // HTML RENDERING
    var b = document.createElement("b");
    b.textContent = element;
    label.append(b);
    label.append(input);
    options.append(label);
});
console.log('list', list);
var answers = [];
// changing question on next click
console.log(myJson[0].niv1[currentIndex].correct_answer);
console.log('my scooooore ' + score);
var next = document.getElementById("next");
next.addEventListener("click", function () {
    // const answer = document.getElementById('input').value as HTMLInputElement | null;
    var answer = document.querySelector('input[type=radio]:checked').value;
    // let answer = (<HTMLInputElement>document.getElementById('inputRadio')).value;
    console.log(answer);
    answers.push(answer);
    console.log('heeeeeeeeeeeeeeeeeeeeeeeeere ' + answers);
    if (currentIndex < 4) {
        if (answers[0] === myJson[0].niv1[currentIndex].correct_answer) {
            // il faut que j'incrémente le score ici
            console.log('gg');
            score += 20;
            console.log('my scooooore ' + score);
            answers = [];
        }
        currentIndex++;
        // La question :
        var question_1 = document.getElementById("questionGoesHere");
        var b_1 = document.createElement("b");
        b_1.textContent = myJson[0].niv1[currentIndex].question;
        question_1.innerHTML = '';
        question_1.appendChild(b_1);
        // Les options : 
        // Shuffling values that exists in the json 
        var storeIncOptions_1 = optionsShuffler(myJson[0].niv1[currentIndex].incorrect_answers);
        //   No need to shufle since it's only one value there
        var storeCoOptions_1 = (myJson[0].niv1[currentIndex].correct_answer);
        //debug
        console.log("this is ", storeIncOptions_1);
        // I store all the options in array named alloptions
        var allOptions_1 = [];
        allOptions_1.push(storeIncOptions_1, storeCoOptions_1);
        // I shuffle those options so that it becomes hard to guess the answers pattern
        optionsShuffler(allOptions_1);
        //debug
        console.log("lol", allOptions_1);
        var opt_2;
        list = [];
        for (var opt_3 in allOptions_1) {
            if (typeof allOptions_1[opt_3] === 'string') {
                list.push(allOptions_1[opt_3].toString());
            }
            else if (Array.isArray(allOptions_1[opt_3])) {
                list.push.apply(list, allOptions_1[opt_3]);
            }
        }
        options.innerHTML = '';
        list.forEach(function (element) {
            console.log('heraaaaaaaaaaaaaaaaaa ' + list);
            var label = document.createElement('label');
            label.setAttribute('id', "option-" + element);
            label.classList.add("options");
            var input = document.createElement('input');
            input.setAttribute("type", "radio");
            input.setAttribute("name", "radio");
            input.value = element;
            var b = document.createElement("b");
            b.textContent = element;
            label.append(b);
            label.append(input);
            options.append(label);
        });
    }
    else if (currentIndex === 4 && score < 40) {
        alert('Désolé, votre score est en-dessous de la moyenne (40/100). Veuillez retentez la chance S.V.P ! ');
        location.href = 'niv1.html';
    }
    else {
        // if(score <= 100 && score >= 40){
        alert('Bravo !');
        location.href = 'niv2.html';
    }
    // }
});
