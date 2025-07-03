// import 'animate.css';

//I don't know how to add animations... failed task

// ---------------------------------------------------------------------

// ^ Need to work on this

/*-------------- CONS -------------*/

import {questionsQuiz1,  questionsQuiz2} from "/js/dataFile.js";

/*---------- VARS ---------*/

let newGame=true;
let questionNumber = 0;
let score = 0;
let previousAnswer="";
let finished=false;
let j;
var questionsArr = [];
var tryQuiz=0;

var elementBdy = document.body;    //FOR TOGGLING DARK-MODE


//                 AUDIO ELEMENTS

const nextAudio = document.getElementById("nextAudio");
const prevAudio = document.getElementById("prevAudio");
const failAudio = document.getElementById("failAudio");             // ALL AUDIO ^ and <
const successAudio = document.getElementById("successAudio");
const mediumAudio = document.getElementById("mediumAudio");

/*-----     CACHE  -----*/


let radioBtns = document.querySelectorAll(".form-check-label");     
const formInputs = document.querySelectorAll("form-check-input");

let answerText = document.getElementById("answerText");   // ANSWER LOCATION
let questionCount = document.getElementById("questionN");  // QUESTION COUNT AMOUNT
let questionSlot = document.getElementById("questionSlot"); // QUESTION LOCATION
let quizLayout = document.getElementById("quizLayout");   // QUIZ CARD

let quizzPlayBtns = document.getElementsByClassName("quizzPlayBtns") ;  // PLAY BUTTONS FOR QUIZZ
let prevButton = document.getElementById("prevButton");               // PREVIOUS BUTTON
let proceedButton = document.getElementById("proceedButton");         // NEXT BUTTON   
let toggleBtn= document.getElementById("toggleButton");  //LIGHT AND DARK MODE BUTTON
let rubberBand= document.getElementById("rubberBand");   //TITLE


let radioWrap = document.getElementById("radioWrap");      //RADIO DIV CONTAINER     


const form = document.querySelector("form");
const log = document.querySelector("#log");

if(form ) {
form.addEventListener("submit", init,  false);
}

/*-------------- FUNCTIONS -------------*/


function init(event){
    event.preventDefault(); //ALLOWS the final page to work.

    log.innerText="Inside init at the begnning";

    if(finished && event.submitter.id=="proceedButton") {            //FINISHED AND PROCEED ARE PRESSED
        //redirect page  
        window.location.href = `.\\quiz${tryQuiz}.html`;

    } else if(finished&& event.submitter.id=="prevButton"){           //RESTART IS PRESSED
        newGame=true;
        questionNumber = 0;;
        score = 0;
        previousAnswer="";
        finished=false;

        questionCount.innerText="#1";
        questionSlot.innerText= questionsArr[questionNumber].question;
        radioBtns.forEach(element => {
            element.classList.add("hidden");
            setTimeout(() => {
                element.classList.add('visible');
                }, 1); // Slight delay to trigger transition
            });
        displayRadio();                                 //DISPLAYS RANDOM CHECK RADIO ELEMENTS
   
            questionNumber++;
            radioWrap.style.display="block";
            prevButton.innerText="Previous!";
            finished=false;
            proceedButton.innerText="Next";
            rubberBand.innerText="Welcome to Pokémon Quiz!";

    } else if(event.submitter.id=="prevButton"){            //PREVIOUS BUTTON IS PRESSED AND NOT FINISHED
        if (previousAnswer==questionsArr[questionNumber].answer){
            score--;
            previousAnswer="";
        }
        questionNumber--;
        questionCount.innerText="#"+ (questionNumber+1) ;
         questionSlot.innerText = questionsArr[questionNumber].question;
         displayRadio();

    }  else {                                                //NEXT BUTTON PRESS OR FORM COMPLETION
       
        if(event.submitter.id=="proceedButton" &&!finished){
            nextAudio.play();
        } else if(!finished) {
            prevAudio.play();
        }
        fadeInRadio();
        fadeinQuiz();
        animateTitle();

        if(questionNumber==(questionsArr.length-1)){                          //FORM COMPLETION
            questionCount.innerText="----E N D-----";
            if(score>7){
                successAudio.play();
            } else if (score >3) {
                mediumAudio.play();
            } else {
                failAudio.play();
            }
            questionSlot.innerText="Your final score is: " + score + " out of 10";
            questionNumber++;
            answerText.innerText="";
            radioWrap.style.display="none";
            prevButton.innerText="Restart!";
            finished=true;
            proceedButton.innerText=`Try Quizz ${tryQuiz}?`;
            rubberBand.innerText="Quizz Completed";
            
        } else if( questionNumber<(questionsArr.length-1)){   //NORMAL NEXT PROCEEDURE

            //GET THE INDEX OF PRESSED RADIO BUTTON
            const data = new FormData(form);
            let output = "";
            for (const entry of data) {
            if(radioBtns[entry[1].match(/(\d+)/)[0]-1].innerText==questionsArr[questionNumber].answer){
                previousAnswer=questionsArr[questionNumber].answer;
                score++;
            } else {
                previousAnswer=questionsArr[questionNumber].options[entry[1].match(/(\d+)/)[0]-1];
            }
            
            if (typeof questionsArr[questionNumber+1].question!==undefined){
                questionNumber++;
                questionCount.innerText="#" + (questionNumber+1) ;
                questionSlot.innerText = questionsArr[questionNumber].question;
                j=Math.floor(Math.random() * 4); 
                fadeInRadio();
                fadeinQuiz();
                animateTitle();
                displayRadio();    
            } 
            }
        }
        else {                                  //SHOULD NEVER BE HERE.
            console.log("Error Area.");
        }
    }
}

function fadeInRadio(){
    radioBtns.forEach(element => {
            element.classList.remove("visible");
            element.classList.toggle("hidden");
            setTimeout(() => {
                element.classList.add('visible');
                }, 1); // Slight delay to trigger transition
            });
}

function fadeinQuiz(){
    quizLayout.classList.remove("visible");
    quizLayout.classList.toggle("hidden");
    setTimeout(() => {
        quizLayout.classList.add('visible');
        }, 1); // Slight delay to trigger transition
    }


function animateTitle(){
    setTimeout(() => {
        rubberBand.classList.toggle('animate__rubberBand');
        rubberBand.classList.toggle('aanimate__animated');
        }, 1); // Slight delay to trigger transition
    }




toggleBtn.addEventListener('click', toggleD);

function toggleD() {
  var elementBdy = document.body;
  elementBdy.classList.toggle("dark-mode");
  
//   let currentBGC= document.getElementsByClassName("navbar")[0].style.backgroundColor
//   console.log("Background color is: " + currentBGC);

  const darkMode = localStorage.getItem("darkMode");
  
  if(darkMode=="false"){
    document.getElementsByClassName("navbar")[0].style.setProperty('background-color', '#262626', 'important');
    document.getElementsByTagName("a")[0].style.setProperty('color', 'white', 'important');
    document.getElementsByTagName("a")[1].style.setProperty('color', 'white', 'important');
    document.getElementsByTagName("a")[2].style.setProperty('color', 'white', 'important');
    document.getElementsByTagName("a")[3].style.setProperty('color', 'white', 'important');
    document.getElementsByClassName("card-body")[0].style.setProperty('background-color', 'grey', 'important');
    document.getElementsByClassName("card-body")[0].style.setProperty('color', 'white', 'important');   
    if(document.getElementsByClassName("card-body")[1]){
        document.getElementsByClassName("card-body")[1].style.setProperty('background-color', 'grey', 'important');
        document.getElementsByClassName("card-body")[1].style.setProperty('color', 'white', 'important');  
    }
    if(proceedButton){
        proceedButton.style.setProperty('color', 'white', 'important');
        proceedButton.style.setProperty('background-color', "#9e9e9e", 'important');
        proceedButton.style.setProperty('border', "1px black solid", 'important');
    }
    if (quizzPlayBtns[0]) {
        quizzPlayBtns[0].style.setProperty('background-color', "#9e9e9e", 'important');
         quizzPlayBtns[0].style.setProperty('border', "1px black solid", 'important');
        quizzPlayBtns[1].style.setProperty('background-color', "#9e9e9e", 'important');
         quizzPlayBtns[1].style.setProperty('border', "1px black solid", 'important');
    }
    if(prevButton) {
        prevButton.style.setProperty('color', 'white', 'important');
        prevButton.style.setProperty('background-color', "#9e9e9e", 'important');
        prevButton.style.setProperty('border', "1px black solid", 'important');
    }
    localStorage.setItem("darkMode", true);

  } else {

    document.getElementsByClassName("navbar")[0].style.setProperty('background-color', 'white', 'important');
    document.getElementsByTagName("a")[0].style.setProperty('color', 'black', 'important');
    document.getElementsByTagName("a")[1].style.setProperty('color', 'black', 'important');
    document.getElementsByTagName("a")[2].style.setProperty('color', 'black', 'important');
    document.getElementsByTagName("a")[3].style.setProperty('color', 'black', 'important');
    document.getElementsByClassName("card-body")[0].style.setProperty('background-color', 'white', 'important'); 
    document.getElementsByClassName("card-body")[0].style.setProperty('color', 'black', 'important');   
    if(document.getElementsByClassName("card-body")[1]){
        document.getElementsByClassName("card-body")[1].style.setProperty('background-color', 'white', 'important');
        document.getElementsByClassName("card-body")[1].style.setProperty('color', 'black', 'important'); 
    }
    if (quizzPlayBtns[0]) {
        quizzPlayBtns[0].style.setProperty('background-color', "blue", 'important');
         quizzPlayBtns[0].style.setProperty('border', "1px black solid", 'important');
        quizzPlayBtns[1].style.setProperty('background-color', "blue", 'important');
         quizzPlayBtns[1].style.setProperty('border', "1px black solid", 'important');
    }
    if(proceedButton){
            proceedButton.style.setProperty('color', 'white', 'important');
            proceedButton.style.setProperty('background-color', "blue", 'important');
            proceedButton.style.setProperty('border', "1px black solid", 'important');
        }
        if(prevButton){
            prevButton.style.setProperty('color', 'white', 'important');
            prevButton.style.setProperty('background-color', "blue", 'important');
            prevButton.style.setProperty('border', "1px black solid", 'important');
        }
    localStorage.setItem("darkMode", false);
  }
}

function displayRadio(){
    j=Math.floor(Math.random() * 4);
    for(let i=0; i<4;i++){   
                if(i!=3){
                    radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];
                    j++;   
                } else {
                    radioBtns[j%4].innerText=questionsArr[questionNumber].answer;
                    j++;
           }
    }
}


//ON PAGE LOAD

window.onload = function() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode==undefined){
        localStorage.setItem("darkMode", false);
    }

    if(darkMode=="true"){                         // DARKMODE IS ENABLED
        //below is dark mode
        elementBdy.classList.add("dark-mode");   //IN TOGGLE INSTANCE IT'S JUST.., TOGGLE.
        document.getElementsByClassName("navbar")[0].style.setProperty('background-color', '#262626', 'important');
        document.getElementsByTagName("a")[0].style.setProperty('color', 'white', 'important');
        document.getElementsByTagName("a")[1].style.setProperty('color', 'white', 'important');
        document.getElementsByTagName("a")[2].style.setProperty('color', 'white', 'important');
        document.getElementsByTagName("a")[3].style.setProperty('color', 'white', 'important');
        document.getElementsByClassName("card-body")[0].style.setProperty('background-color', 'grey', 'important');
        document.getElementsByClassName("card-body")[0].style.setProperty('color', 'white', 'important');   
        if(document.getElementsByClassName("card-body")[1]){
            document.getElementsByClassName("card-body")[1].style.setProperty('background-color', 'grey', 'important');
            document.getElementsByClassName("card-body")[1].style.setProperty('color', 'white', 'important');  
        }
        if(proceedButton){
            proceedButton.style.setProperty('color', 'white', 'important');
            proceedButton.style.setProperty('background-color', "#9e9e9e", 'important');
            proceedButton.style.setProperty('border', "1px black solid", 'important');
        } 
        
        if(prevButton){
            prevButton.style.setProperty('color', 'white', 'important');
            prevButton.style.setProperty('background-color', "#9e9e9e", 'important');
            prevButton.style.setProperty('border', "1px black solid", 'important');
        }

        if (quizzPlayBtns[0]) {
        quizzPlayBtns[0].style.setProperty('background-color', "#9e9e9e", 'important');
         quizzPlayBtns[0].style.setProperty('border', "1px black solid", 'important');
        quizzPlayBtns[1].style.setProperty('background-color', "#9e9e9e", 'important');
         quizzPlayBtns[1].style.setProperty('border', "1px black solid", 'important');
    }

        
    } else {                                                //DARKMODE IS DISABLED
        elementBdy.classList.remove("dark-mode");
        document.getElementsByClassName("navbar")[0].style.setProperty('background-color', 'white', 'important');
        document.getElementsByTagName("a")[0].style.setProperty('color', 'black', 'important');
        document.getElementsByTagName("a")[1].style.setProperty('color', 'black', 'important');
        document.getElementsByTagName("a")[2].style.setProperty('color', 'black', 'important');
        document.getElementsByTagName("a")[3].style.setProperty('color', 'black', 'important');
        document.getElementsByClassName("card-body")[0].style.setProperty('background-color', 'white', 'important'); 
        document.getElementsByClassName("card-body")[0].style.setProperty('color', 'black', 'important');   
        if(document.getElementsByClassName("card-body")[1]){
            document.getElementsByClassName("card-body")[1].style.setProperty('background-color', 'white', 'important');
            document.getElementsByClassName("card-body")[1].style.setProperty('color', 'black', 'important'); 
        }
        
        if(proceedButton){
            proceedButton.style.setProperty('color', 'white', 'important');
            proceedButton.style.setProperty('background-color', "blue", 'important');
            proceedButton.style.setProperty('border', "1px black solid", 'important');
        }

        if(prevButton){
            prevButton.style.setProperty('color', 'white', 'important');
            prevButton.style.setProperty('background-color', "blue", 'important');
            prevButton.style.setProperty('border', "1px black solid", 'important');

        }

        if (quizzPlayBtns[0]) {
        quizzPlayBtns[0].style.setProperty('background-color', "blue", 'important');
         quizzPlayBtns[0].style.setProperty('border', "1px black solid", 'important');
        quizzPlayBtns[1].style.setProperty('background-color', "blue", 'important');
         quizzPlayBtns[1].style.setProperty('border', "1px black solid", 'important');
    }
        
  }


  // INITIALIZE AND REPLACE HTML ON FIRST LOADING.

  log.innerText="Inside onload";

    if (window.location.pathname === "/quiz1.html" || window.location.pathname === "/quiz2.html"){
        if (window.location.pathname === "/quiz1.html") {
            questionsArr = questionsQuiz1;
            tryQuiz=2;
        } else if (window.location.pathname === "/quiz2.html") {
            questionsArr = questionsQuiz2;
            tryQuiz=1;
        }
            questionCount.innerText="#1";
            questionSlot.innerText= questionsArr[questionNumber].question;
            displayRadio();
            fadeInRadio();
            fadeinQuiz();;
    }
    
}



window.addEventListener("load", function (event) {
  console.log("Page is fully loaded");
});