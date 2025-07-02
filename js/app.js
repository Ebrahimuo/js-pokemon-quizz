// import 'animate.css';

//I don't know how to add animations... failed task


/*-------------- CONS -------------*/

import {questionsQuiz1,  questionsQuiz2} from "/js/dataFile.js";



/*---------- VARS ---------*/

let newGame=true;
let questionNumber = 0;
let trackingQuestion= 0;
let score = 0;
let previousAnswer="";
let finished=false;
let j;
var questionsArr = [];
var tryQuiz=0;

const nextAudio = document.getElementById("nextAudio");
const prevAudio = document.getElementById("prevAudio");
const failAudio = document.getElementById("failAudio");
const successAudio = document.getElementById("successAudio");
const mediumAudio = document.getElementById("mediumAudio");

/*-----     CACHE  -----*/

let questionCount = document.getElementById("questionN");
let questionSlot = document.getElementById("questionSlot");


let radioWrap = document.getElementById("radioWrap");

let radioBtns = document.querySelectorAll(".form-check-label");
const formInputs = document.querySelectorAll("form-check-input");

let prevButton = document.getElementById("prevButton");
let proceedButton = document.getElementById("proceedButton");


let answerText = document.getElementById("answerText");

let quizLayout = document.getElementById("quizLayout");

/*-------------- FUNCTIONS -------------*/


function init(event){
    event.preventDefault(); //allows the final page

    if(finished&& event.submitter.id=="prevButton"){           //RESTART IS PRESSED
        //no audio to play here
        console.log("At first if");

        newGame=true;
        questionNumber = 0;
        trackingQuestion= 0;
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
        j=Math.floor(Math.random() * 4); 
            for(let i=0; i<4;i++){
                
                if(i!=3){

                    //animate
                    

                    radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];
                    
                    j++;
                    
                } else {
                    //animate
                                    
                    
                    radioBtns[j%4].innerText=questionsArr[questionNumber].answer;

                    j++;
           }
      } 
            questionNumber++;
            radioWrap.style.display="block";
            prevButton.innerText="Previous!";
            finished=false;
            proceedButton.innerText="Next";
    }
    if(event.submitter.id=="prevButton"){ // RUN ONLY ON PREVIOUS BUTTON
        console.log("At previous");
        if (previousAnswer==questionsArr[questionNumber].answer){
            score--;
            previousAnswer="";
        }
        questionNumber--;
        //animate
        questionCount.innerText="#"+ (questionNumber+1) ;
        //animate
         questionSlot.innerText = questionsArr[questionNumber].question;
         for(let i=0; i<4;i++){
        j=Math.floor(Math.random() * 4); 
        fadeInRadio();
        fadeinQuiz();
        if(i!=3){
            //animate

            radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];

            j++;
            
        } else {
            //animate

            radioBtns[j%4].innerText=questionsArr[questionNumber].answer;

            j++;
           }
        // log.innerText = score;
    }
        
    } 
    
    else if(finished && event.submitter.id=="proceedButton") {
        //redirect page  
        window.location.href = `quiz${tryQuiz}.html`;

    } else {//NEXT BUTTON PRESS
       

            
        if(event.submitter.id=="proceedButton" &&!finished){
            nextAudio.play();
        } else if(!finished) {
            prevAudio.play();
        }
        fadeInRadio();
        fadeinQuiz();
        animateTitle();
        

        if(questionNumber==(questionsArr.length-1)){                          //END END END
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
            //not quite the
            finished=true;
            proceedButton.innerText=`Try Quizz${tryQuiz}?`;
            
        } else if( questionNumber<(questionsArr.length-1)){                                                        //OTHERWISE NOT END
            
        
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
        }
        }
        else {
            console.log("Error Area.");
        }

    }
}


const form = document.querySelector("form");
const log = document.querySelector("#log");

if(window.location.pathname !== "/index.html") {
form.addEventListener("submit", init,  false);
}

// ON LOAD INITIALIZATION

window.onload = function() {
    
    if (window.location.pathname === "/quiz1.html") {
        questionsArr = questionsQuiz1;
        tryQuiz=2;
    } else if (window.location.pathname === "/quiz2.html") {
        questionsArr = questionsQuiz2;
        tryQuiz=1;
    }
        questionCount.innerText="#1";
        questionSlot.innerText= questionsArr[questionNumber].question;
            
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
        fadeInRadio();
            
        fadeinQuiz();
       
        

        console.log(radioBtns);

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


let rubberBand= document.getElementById("rubberBand");

function animateTitle(){
    setTimeout(() => {
        rubberBand.classList.toggle('animate__rubberBand');
        rubberBand.classList.toggle('aanimate__animated');
        }, 1); // Slight delay to trigger transition
    }


let toggleBtn= document.getElementById("toggleButton");

toggleBtn.addEventListener('click', toggleD);

function toggleD() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  if(document.getElementsByClassName("navbar")[0].style.backgroundColor=="white"){
    console.log("inside if");
    document.getElementsByClassName("navbar")[0].style.setProperty('background-color', 'black', 'important');
    document.getElementsByTagName("a")[0].style.setProperty('color', 'white', 'important');
    document.getElementsByTagName("a")[1].style.setProperty('color', 'white', 'important');
    document.getElementsByTagName("a")[2].style.setProperty('color', 'white', 'important');
    document.getElementsByTagName("a")[3].style.setProperty('color', 'white', 'important');
    document.getElementsByClassName("card-body")[0].style.setProperty('background-color', 'grey', 'important');
    // document.getElementsByClassName("card-body")[1].style.setProperty('background-color', 'grey', 'important');

    document.getElementById("proceedButton").style.setProperty('color', 'white', 'important');
    document.getElementById("proceedButton").style.setProperty('background-color', "grey", 'important');
    document.getElementById("proceedButton").style.setProperty('border', "1px black solid", 'important');

    document.getElementById("prevButton").style.setProperty('color', 'white', 'important');
    document.getElementById("prevButton").style.setProperty('background-color', "grey", 'important');
    document.getElementById("prevButton").style.setProperty('border', "1px black solid", 'important');
  } else {
    document.getElementsByClassName("navbar")[0].style.setProperty('background-color', 'black', 'important');
    document.getElementsByTagName("a")[0].style.setProperty('color', 'black', 'important');
    document.getElementsByTagName("a")[1].style.setProperty('color', 'black', 'important');
    document.getElementsByTagName("a")[2].style.setProperty('color', 'black', 'important');
    document.getElementsByTagName("a")[3].style.setProperty('color', 'black', 'important');
    document.getElementsByClassName("card-body")[0].style.setProperty('background-color', 'white', 'important');
    // document.getElementsByClassName("card-body")[1].style.setProperty('background-color', 'grey', 'important');

    document.getElementById("proceedButton").style.setProperty('color', 'black', 'important');
    document.getElementById("proceedButton").style.setProperty('background-color', "white", 'important');
    document.getElementById("proceedButton").style.setProperty('border', "1px black solid", 'important');

    document.getElementById("prevButton").style.setProperty('color', 'black', 'important');
    document.getElementById("prevButton").style.setProperty('background-color', "white", 'important');
    document.getElementById("prevButton").style.setProperty('border', "1px black solid", 'important');
  }
}

// document.getElementById("theme_change").onclick = function () {
// if (document.body.style.backgroundColor == "#000") {
//         document.body.style.backgroundColor = "#f5deb3";
//         document.getElementsByTagName("a")[0].style.color = "#000";
//         document.getElementsByTagName("a")[0].style.borderColor = "#000";
//         document.getElementsByTagName("a")[1].style.color = "#000";
//         document.getElementsByTagName("a")[1].style.borderColor = "#000";
//         document.getElementById("theme_change").innerText = "Light Theme";
//     } else if (document.body.style.backgroundColor = "#f5deb3") {
//         document.body.style.backgroundColor == "#000";
//         document.getElementsByTagName("a")[0].style.color = "#f5deb3";
//         document.getElementsByTagName("a")[0].style.borderColor = "#f5deb3";
//         document.getElementsByTagName("a")[1].style.color = "#f5deb3";
//         document.getElementsByTagName("a")[1].style.borderColor = "#f5deb3";
//         document.getElementById("theme_change").innerText = "Dark Theme";

// }
