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

/*-----     CACHE  -----*/

let questionCount = document.getElementById("questionN");
let questionSlot = document.getElementById("questionSlot");




let radioBtns = document.querySelectorAll(".form-check-label");
const formInputs = document.querySelectorAll("form-check-input");




/*-------------- FUNCTIONS -------------*/


function init(event){
    event.preventDefault();
    if(event.submitter.id=="prevButton"){ // RUN ONLY ON PREVIOUS BUTTON
        console.log("Inside prevButton submitter");
        if (previousAnswer==questionsQuiz1[questionNumber].answer){
            score--;
            previousAnswer="";
            console.log("New score after decrementing is: " + score);
        }
        questionNumber--;
        questionCount.innerText=questionNumber+1;
        
         questionSlot.innerText = questionsQuiz1[questionNumber].question;
         for(let i=0; i<4;i++){
        
        if(i!=3){
            radioBtns[j%4].innerText=questionsQuiz1[questionNumber].options[i];
            j++;
            console.log("Branch 1");
            
        } else {
            radioBtns[j%4].innerText=questionsQuiz1[questionNumber].answer;
              console.log("Branch 2");
            j++;
           }
        log.innerText = score;
        console.log(score);
    }
        
    } else {                    //NEXT BUTTON PRESS
        console.log(questionNumber);
        console.log(questionsQuiz1.length);
        if(questionNumber==(questionsQuiz1.length-1)){                          //END
            console.log("NO NEXT?")
            questionCount.innerText="---------";
            questionSlot.innerText="Final score is: " + score;
            questionNumber++;
        } else if( questionNumber<(questionsQuiz1.length-1)){                                                        //OTHERWISE NOT END

        

        //GET THE INDEX OF PRESSED RADIO BUTTON

        const data = new FormData(form);
        let output = "";
        for (const entry of data) {
            console.log(radioBtns[entry[1].match(/(\d+)/)[0]-1].innerText);
            console.log(questionsQuiz1[questionNumber].answer);
        if(radioBtns[entry[1].match(/(\d+)/)[0]-1].innerText==questionsQuiz1[questionNumber].answer){
            previousAnswer=questionsQuiz1[questionNumber].answer;
            score++;
        } else {
            previousAnswer=questionsQuiz1[questionNumber].options[entry[1].match(/(\d+)/)[0]-1];
        }
        

        console.log("inside nonfinale");
        
        
        if (typeof questionsQuiz1[questionNumber+1].question!==undefined){
            console.log("Inside inside");
            questionNumber++;
            questionCount.innerText=questionNumber+1;
            questionSlot.innerText = questionsQuiz1[questionNumber].question;
            j=Math.floor(Math.random() * 4); 
            for(let i=0; i<4;i++){
                
                if(i!=3){
                    radioBtns[j%4].innerText=questionsQuiz1[questionNumber].options[i];
                    j++;
                    console.log("Branch 1");
                    
                } else {
                    radioBtns[j%4].innerText=questionsQuiz1[questionNumber].answer;
                    console.log("Branch 2");
                    j++;
            
                }
        }       
        

        } 

    

    }
    log.innerText = score;

    console.log(score);
    event.preventDefault();
}
else {
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

questionCount.innerText=1;
questionSlot.innerText= questionsQuiz1[questionNumber].question;

j=Math.floor(Math.random() * 4); 
    for(let i=0; i<4;i++){
        
        if(i!=3){
            radioBtns[j%4].innerText=questionsQuiz1[questionNumber].options[i];
            j++;
            console.log("Branch 1");
            
        } else {
            radioBtns[j%4].innerText=questionsQuiz1[questionNumber].answer;
              console.log("Branch 2");
            j++;
           }
    }



//shuffle variables only once at the beginning: saving a state