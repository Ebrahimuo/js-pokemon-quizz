/*-------------- Constants -------------*/

const questionsQuiz1=[{question: "What was the first Pokémon ever created?",
                 answer: "Rhydon",
                 options: ["Pikachu", "Bulbasaur", "Mew"]
                },{question: "Which Pokémon is known as the “Eon Pokémon”?",
                    answer: " Latios and Latias",
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

const questionsQuiz2=[{question: "What was the first Pokémon ever created?",
                 answer: "Rhydon",
                 options: ["Pikachu", "Bulbasaur", "Mew"]
                },{question: "Which Pokémon is known as the “Eon Pokémon”?",
                    answer: " Latios and Latias",
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


/*---------- Variables (state) ---------*/

let newGame=true;

let questionNumber = 0;

let trackingQuestion= 0; // the question the computer is at;

let score = 0;

/*----- Cached Element References  -----*/

let questionCount = document.getElementById("questionN");

let questionSlot = document.getElementById("questionSlot");

let proceedBtn = document.getElementById("proceedButton");

proceedBtn.addEventListener('click', init)

//radio elements;

let radioBtns = document.querySelectorAll(".form-check-label");


/*-------------- Functions -------------*/


function init(event){

    // if quizz 1
    //update everything
    //make a switch case for question count:

    questionNumber++;
    questionCount.innerText=questionNumber;

    questionSlot.innerText = questionsQuiz1[questionNumber].question;

    console.log(radioBtns);

    j=Math.floor(Math.random() * 3); 
    for(let i=0; i<3;i++){
        radioBtns[j%3].innerText=questionsQuiz1[questionNumber].options[i];
        j++;
    }


}