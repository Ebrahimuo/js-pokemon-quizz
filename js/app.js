/*-------------- CONS -------------*/

const questionsQuiz1=[{question: "What was the first Pokémon ever created?",
                 answer: "Rhydon",
                 options: ["Pikachu", "Bulbasaur", "Mew"]
                },{question: "Which Pokémon is known as the “Eon Pokémon”?",
                    answer: "Latios and Latias",
                    options: ["Lugia", "Mewtwo", "Rayquaza"]
                },{question: "What type is the Pokémon “Garchomp”?",
                    answer: "Dragon/Ground",
                    options: ["Dragon/Flying", "Ground/Rock", "Dragon/Steel"]
                },{question: "In which generation was the Fairy-type introduced?",
                    answer: "Generation VI",
                    options: ["Generation IV", "Generation V", "Generation VII"]
                },{question: "Which of the following Pokémon is not a Legendary Pokémon?",
                    answer: "Garchomp",
                    options: ["Entei", "Regirock", "Cresselia"]
                },{question: "What is the name of the region in Pokémon Sun and Moon?",
                    answer: "Alola",
                    options: ["Sinnoh", "Hoenn", "Unova"]
                },{question: "Which Pokémon can evolve into multiple different forms depending on certain conditions?",
                    answer: "Eevee",
                    options: ["Pikachu", "Mew", "Ditto"]
                },{question: "What move does the most damage to a Ghost-type Pokémon?",
                    answer: "Crunch",
                    options: ["Psychic", "Shadow Ball", "Hyper Beam"]
                },{question: "Which Pokémon is known for having the signature move “Spacial Rend”?",
                    answer: "Palkia",
                    options: ["Dialga", "Giratina", "Arceus"]
                },{question: "Who is the current champion of the Galar region in Pokémon Sword and Shield?",
                    answer: "Leon",
                    options: ["Hop", "Bea", "Raihan"]
                }];

const questionsQuiz2=[{question: "What is the evolutionary form of Porygon-Z?",
                 answer: "None, Porygon-Z is the final form",
                 options: ["Porygon2", "Porygon", "Porygon-X"]
                },{question: "Which Pokémon’s cry is the longest in the games?",
                    answer: "Kricketune",
                    options: ["Jynx", "Wailord", "Palkia"]
                },{question: "What is the signature move of the Pokémon Aegislash?",
                    answer: "King’s Shield",
                    options: [" Sacred Sword", "Iron Head", "Shadow Claw"]
                },{question: "What is the only Pokémon that can learn the move “Dragon Ascent”?",
                    answer: "Rayquaza",
                    options: ["Garchomp", "Dragonite", "Salamence"]
                },{question: "What are the two types of the Pokémon Giratina in its Altered Forme?",
                    answer: "Ghost/Dragon",
                    options: ["Dragon/Flying", "Ghost/Flying", "Ghost/Dark"]
                },{question: "Which Pokémon has a Gigantamax form that turns into a skyscraper-like structure?",
                    answer: "Duraludon",
                    options: ["Coalossal", "Copperajah", "Corviknight"]
                },{question: "What is the main Legendary Pokémon in Pokémon X?",
                    answer: "Xerneas",
                    options: ["Yveltal", "Zygarde", "Diancie"]
                },{question: "Which Pokémon can Mega Evolve into Mega Garchomp?",
                    answer: "Garchomp",
                    options: ["None, Garchomp cannot Mega Evolve", "Gible", "Gabite"]
                },{question: "Which Pokémon is known as the “Battle Bond” form when it bonds with its Trainer?",
                    answer: "Ash-Greninja",
                    options: ["Charizard", "Lucario", "Pikachu"]
                },{question: "What is the effect of the move “Spore”?",
                    answer: "Puts the target to sleep",
                    options: ["Reduces the target’s Speed", "Poisons the target", "Paralyzes the target"]
                }];


/*---------- VARS ---------*/

let newGame=true;
let questionNumber = 0;
let trackingQuestion= 0;
let score = 0;
let previousAnswer="";
let finished=false;

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


/*-------------- FUNCTIONS -------------*/


function init(event){
    event.preventDefault(); //allows the final page

    // if window.location.pathname is quizz1 get from questionQuiz1,

    // if(window.location.pathname=== "/quiz1.html"){
    //     let questionsArr = que
    // }

    if(finished&& event.submitter.id=="prevButton"){           //RESTART IS PRESSED
        //no audio to play here
        newGame=true;
        questionNumber = 0;
        trackingQuestion= 0;
        score = 0;
        previousAnswer="";
        finished=false;

        questionCount.innerText="#1";
        questionSlot.innerText= questionsArr[questionNumber].question;

        j=Math.floor(Math.random() * 4); 
            for(let i=0; i<4;i++){
                
                if(i!=3){
                    radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];
                    j++;
                    console.log("Branch 1");
                    
                } else {
                    radioBtns[j%4].innerText=questionsArr[questionNumber].answer;
                    console.log("Branch 2");
                    j++;
           }
      } 
            questionNumber++;
            radioWrap.style.display="block";
            prevButton.innerText="Previous!";
            finished=false;
            proceedButton.innerText="Next";

    if(event.submitter.id=="prevButton"){ // RUN ONLY ON PREVIOUS BUTTON
        prevAudio.play();
        console.log("Inside prevButton submitter");
        if (previousAnswer==questionsArr[questionNumber].answer){
            score--;
            previousAnswer="";
            console.log("New score after decrementing is: " + score);
        }
        questionNumber--;
        questionCount.innerText="#"+ (questionNumber+1) ;
        
         questionSlot.innerText = questionsArr[questionNumber].question;
         for(let i=0; i<4;i++){
        
        if(i!=3){
            radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];
            j++;
            console.log("Branch 1");
            
        } else {
            radioBtns[j%4].innerText=questionsArr[questionNumber].answer;
              console.log("Branch 2");
            j++;
           }
        // log.innerText = score;
        console.log(score);
    }
        
    } }
    
    else if(finished && event.submitter.id=="proceedButton") {
        //redirect page  
        window.location.href = `quiz${tryQuiz}.html`;

    } else {//NEXT BUTTON PRESS
        

        console.log(questionNumber);
        console.log(questionsArr.length);
        if(questionNumber==(questionsArr.length-1)){                          //END END END
            console.log("NO NEXT?")
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
            console.log(prevButton);
            console.log("HERE");
            proceedButton.innerText=`Try Quizz${tryQuiz}?`;
            console.log(`/quiz${tryQuiz}.html`);
            
        } else if( questionNumber<(questionsArr.length-1)){                                                        //OTHERWISE NOT END
            nextAudio.play();
        

        //GET THE INDEX OF PRESSED RADIO BUTTON

        const data = new FormData(form);
        let output = "";
        for (const entry of data) {
            console.log(radioBtns[entry[1].match(/(\d+)/)[0]-1].innerText);
            console.log(questionsArr[questionNumber].answer);
        if(radioBtns[entry[1].match(/(\d+)/)[0]-1].innerText==questionsArr[questionNumber].answer){
            previousAnswer=questionsArr[questionNumber].answer;
            score++;
        } else {
            previousAnswer=questionsArr[questionNumber].options[entry[1].match(/(\d+)/)[0]-1];
        }
        

        console.log("inside nonfinale");
        
        
        if (typeof questionsArr[questionNumber+1].question!==undefined){
            console.log("Inside inside");
            questionNumber++;
            questionCount.innerText="#" + (questionNumber+1) ;
            questionSlot.innerText = questionsArr[questionNumber].question;
            j=Math.floor(Math.random() * 4); 
            for(let i=0; i<4;i++){
                
                if(i!=3){
                    radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];
                    j++;
                    console.log("Branch 1");
                    
                } else {
                    radioBtns[j%4].innerText=questionsArr[questionNumber].answer;
                    console.log("Branch 2");
                    j++;
            
                }
        }       
        

        } 

    

            }
            // log.innerText = score;

            console.log(score);
            // event.preventDefault();
        }
        else {
                console.log("For some reason here?");
            //what to do if done?
            radioBtns[j%4].innerText=questionsQuiz1[questionNumber].answer;

        }

    }
}







const form = document.querySelector("form");
const log = document.querySelector("#log");

form.addEventListener(
  "submit", init, /*

  (event) => {
    
    const data = new FormData(form);
    let output = "";
    for (const entry of data) {
      output = `${output}${entry[0]}=${entry[1]}\r`;
    }
    log.innerText = output;

    
    event.preventDefault(); 
  }*/
  false,
);

//initializes the default values:

//

window.onload = function() {
    
    if (window.location.pathname === "/quiz1.html") {
        questionsArr = questionsQuiz1;
        tryQuiz=2;
    } else if (window.location.pathname === "/quiz2.html") {
        questionsArr = questionsQuiz2;
        tryQuiz=1;
    }
        console.log(questionsArr);
        // Your JavaScript code to execute on this specific page
        questionCount.innerText="#1";
        questionSlot.innerText= questionsArr[questionNumber].question;

        j=Math.floor(Math.random() * 4); 
            for(let i=0; i<4;i++){
                
                if(i!=3){
                    radioBtns[j%4].innerText=questionsArr[questionNumber].options[i];
                    j++;
                    console.log("Branch 1");
                    
                } else {
                    radioBtns[j%4].innerText=questionsArr[questionNumber].answer;
                    console.log("Branch 2");
                    j++;
                }
            }
        console.log("This code runs only on /your-specific-page.html");

        
};



