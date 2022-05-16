import { textSpanContainsPosition } from "typescript";
import json from "./questions.json" assert { type: "json" }; // This import style requires "esModuleInterop"
let myJson: object = json.results;

// window.onload = function() {
//     localStorage.setItem('lastLeave', JSON.stringify(new Date().getTime()));
  
//   let leave =  localStorage.getItem('lastLeave');
// let arrive = localStorage.getItem('lastEnter');

// // console.log("leave ", Date.parse(leave));
// // console.log("arrive ", Date.parse(arrive));


// let timeSpett = +leave  - +arrive;

// localStorage.setItem('there', JSON.stringify(timeSpett))

// }
// les exercices test lmath sec minutes jib data ara data
let timeSpentinlvl = +localStorage.getItem('there');
console.log(timeSpentinlvl);

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  
  let travilis = millisToMinutesAndSeconds(timeSpentinlvl); // "4:59"
console.log(travilis);

// la magie  :
let minutesChyata = Math.floor(timeSpentinlvl / 60000);
let secondsChyata = +((timeSpentinlvl % 60000) / 1000).toFixed(0);


// timer :
function countdown():any {

    var seconds:number = 60 - secondsChyata;
    var mins:number = 5 - minutesChyata;
  
    function topChronos() {
        let counter:HTMLElement = document.getElementById("timer");
        let currentMinutes:number = mins-1
        seconds--;
        //  show counter in html
        counter.innerHTML = currentMinutes.toString() + ":" + (
          seconds < 10 ? 
          "0" : 
          "")
           + String(seconds);
        if( seconds > 0 ) {
            setTimeout(topChronos, 1000);
        } else {
            if(mins > 1){
                countdown();           
            }
        }
    }
    
    topChronos();
  }
  countdown();


  window.onload = function onload() {
    let now = new Date();
    const lastLeave1 = localStorage.getItem('lastLeave');
      localStorage.setItem('lastEnter1', JSON.stringify(now.getTime()));
    
  }
  
  window.onunload = function onunload() {
    localStorage.setItem('lastLeave1', JSON.stringify(new Date().getTime()));
    
    let leave1 =  localStorage.getItem('lastLeave1');
  let arrive1 = localStorage.getItem('lastEnter1');
  
  console.log("leave ", Date.parse(leave1));
  // console.log("arrive ", Date.parse(arrive));
  
  
  let timeSpent = +leave1  - +arrive1;
  
  localStorage.setItem('there1', JSON.stringify(timeSpent))
  
  }
  
  


// console.log(myJson[0].question);
console.log(myJson[1].niv2[1].question);


// Shuflle array values function
function optionsShuffler(array: Array<object>) {
  let currentOptionsShufflerIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle.
  while (currentOptionsShufflerIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentOptionsShufflerIndex);
    currentOptionsShufflerIndex--;

    // And swap it with the current element.
    [array[currentOptionsShufflerIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentOptionsShufflerIndex],
    ];
  }
  return array;
}



let currentIndex = 0;
let score:number = 0;




  const question: HTMLElement = document.getElementById("questionGoesHere");
  const b: HTMLElement = document.createElement("b");
  b.textContent = myJson[1].niv2[currentIndex].question;
  question.appendChild(b);

// Appending the question in Dom from the json

  // Shuffling values that exists in the json 
  let storeIncOptions: object = optionsShuffler(myJson[1].niv2[currentIndex].incorrect_answers);
//   No need to shufle since it's only one value there
  let storeCoOptions: object = (myJson[1].niv2[currentIndex].correct_answer);
//debug
  console.log("this is " , storeIncOptions);

// I store all the options in array named alloptions
  let allOptions: Array<object> = [];
  allOptions.push(storeIncOptions, storeCoOptions);

// I shuffle those options so that it becomes hard to guess the answers pattern
  optionsShuffler(allOptions);
  //debug
  console.log("lol", allOptions);




let options: HTMLElement = document.getElementById("options");


let opt: keyof typeof allOptions;
let list: string[] = []

for (let opt in allOptions) {


    if(typeof allOptions[opt] === 'string'){
      list.push(allOptions[opt].toString())
    } else if(Array.isArray(allOptions[opt])){
      list.push(...allOptions[opt] as string[])
    }

    }

    list.forEach(element => {


      let label = document.createElement('label') as HTMLElement
      label.setAttribute('id',"option-"+element)
      label.classList.add("options")
      let input = document.createElement('input') as HTMLInputElement
      input.setAttribute("type","radio")
      input.setAttribute("name","radio")
      input.value = element;
// HTML RENDERING
      let b: HTMLElement = document.createElement("b");
      b.textContent = element;
      label.append(b)
      label.append(input)
     options.append(label);
    })


console.log('list',list)  


let answers: string[] = []; 


// changing question on next click



console.log(myJson[1].niv2[currentIndex].correct_answer);

console.log('my scooooore ' + score )

let next: HTMLElement = document.getElementById("next");
next.addEventListener(
  "click",
  function () {
    // const answer = document.getElementById('input').value as HTMLInputElement | null;
    let answer = (<HTMLInputElement>document.querySelector('input[type=radio]:checked')).value
    // let answer = (<HTMLInputElement>document.getElementById('inputRadio')).value;
    console.log(answer);
    answers.push(answer);
    
    console.log('heeeeeeeeeeeeeeeeeeeeeeeeere ' + answers);

    if(currentIndex < 4) {

      if(answers[0] === myJson[1].niv2[currentIndex].correct_answer){
        // il faut que j'incrémente le score ici
        console.log('gg') 
        score+= 20;
        console.log('my scooooore ' + score )
        answers = [];

      } 
      currentIndex++;

      // La question :
      const question: HTMLElement = document.getElementById("questionGoesHere");
      const b: HTMLElement = document.createElement("b");
      b.textContent = myJson[1].niv2[currentIndex].question;
      question.innerHTML = ''
      question.appendChild(b);

      // Les options : 


  // Shuffling values that exists in the json 
  let storeIncOptions: object = optionsShuffler(myJson[1].niv2[currentIndex].incorrect_answers);
//   No need to shufle since it's only one value there
  let storeCoOptions: object = (myJson[1].niv2[currentIndex].correct_answer);
//debug
  console.log("this is " , storeIncOptions);

// I store all the options in array named alloptions
  let allOptions: Array<object> = [];
  allOptions.push(storeIncOptions, storeCoOptions);

// I shuffle those options so that it becomes hard to guess the answers pattern
  optionsShuffler(allOptions);
  //debug
  console.log("lol", allOptions);



      let opt: keyof typeof allOptions;
      list = []

      for (let opt in allOptions) {


        if(typeof allOptions[opt] === 'string'){
          list.push(allOptions[opt].toString())
        } else if(Array.isArray(allOptions[opt])){
          list.push(...allOptions[opt] as string[])
        }
    
        }

        options.innerHTML =  '';

      list.forEach(element => {
        console.log('heraaaaaaaaaaaaaaaaaa ' +list );
        const label = document.createElement('label') as HTMLElement
        label.setAttribute('id',"option-"+element)
        label.classList.add("options")
        const input = document.createElement('input') as HTMLInputElement
        input.setAttribute("type","radio")
        input.setAttribute("name","radio")
        input.value = element;
  
        const b: HTMLElement = document.createElement("b");
        b.textContent = element;
        label.append(b)
        label.append(input)
       options.append(label);
      })

    } else if(currentIndex === 4 && score < 60) {

      alert('Désolé, votre score est en-dessous de la moyenne (60/100). Veuillez retentez la chance S.V.P ! ');
      location.href = 'niv1.html';

    } else {
      // if(score <= 100 && score >= 60){
        alert('Bravo !');
        location.href = 'niv3.html';

      } 
    // }




  })
