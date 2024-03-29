//Create a quiz

//--------------------------------------------------

// varia  les 
//Grabs start screen
var startScreen = document.getElementById("start-screen");
//grabs questions
var queEL = document.getElementById("questions");
//grabs choices
var choicesEl = document.getElementById("choices");
//grabs start button
var startButton = document.getElementById("start");
//grabs timer
var timerEl = document.getElementById("time");
//grabs submit
var subButton = document.getElementById("submit");
//grabs feedback
var fbEl = document.getElementById("feedback");
//grabs initials
var initEl = document.getElementById("initials");
//quiz instructions
var quizinst = document.getElementById("quiz-instructions");
//highscore
var highscore = document.getElementById("high");
// restart button
let restartbtn = document.querySelector(".restartbtn");

//---------------------------------------------------


//starting
function play() {
  startScreen.setAttribute("class", "start hide");
  
  
  timerEl.textContent = time;
  timer = setInterval(function(){
    clock();
  }, 1000);
  
  
  questionGet();

  queEL.removeAttribute("style", "display: none;");
  
}

//start time
var time = questions.length * 12;
var timer;
var currentque = 0;

//checks when start is clicked
startButton.addEventListener("click", play)

//---------------------------------------------------

function clock() {
  // update time
  timerEl.textContent = time;
  
  time--;
  


  if(time <= 0) {

    endQuiz();

  }
}

//---------------------------------------------------

//questionGet question
function questionGet() {
  var current = questions[currentque];
  
  queEL.children[0].textContent = current.title;
  

  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  

  for(var i = 0; i < current.choices.length; i++){

    // create button for choices
    var choiceButton = document.createElement("button");
    choiceButton.textContent = current.choices[i];
    
    
    choicesEl.appendChild(choiceButton);
  }
  
 

  //choice 1 event listener
  choicesEl.children[0].addEventListener("click", function(event){
    //prevent default
    event.preventDefault
    choiceClick(choicesEl.children[0]);
  });

  //choice 2 event listener
  choicesEl.children[1].addEventListener("click", function(event){
    //prevent default
    event.preventDefault

    choiceClick(choicesEl.children[1]);
  });

  //choice 3 event listener
  choicesEl.children[2].addEventListener("click", function(event){
    //prevent default
    event.preventDefault

    choiceClick(choicesEl.children[2]);
  });

  //choice 4 event listener
  choicesEl.children[3].addEventListener("click", function(event){
    //prevent default
    event.preventDefault

    choiceClick(choicesEl.children[3]);
  });


  
}

//---------------------------------------------------

function choiceClick(answerChoice) {
  // check answer 
  if(answerChoice.textContent != questions[currentque].answer){
    // penalize time
    time -= 10;
   
    fbEl.textContent = "Incorrect";
    fbEl.style.color = "red";
    
    
  }  else{
    
    fbEl.textContent = "Correct";
    fbEl.style.color = "green";
    
  }

  
  fbEl.setAttribute("class", "feedback");

  setInterval(function(){

    fbEl.setAttribute("class", "hide");

  }, 1000);


  // next question
  currentque++;

  // check question amount
  if(currentque === questions.length) {
    
    endQuiz();

  } else {
    
    questionGet();

  }
}


//--------------------Restart game-------------------------------

function restart() {
  time = 0;
  timerEl.textContent = time;

  startScreen.removeAttribute("class", "start hide");

  var endScreen = document.getElementById("end-screen");
  endScreen.setAttribute("class", "hide");

  time = questions.length * 12;
  timer;
  currentque = 0;
  
 
}

restartbtn.addEventListener("click", restart)


//---------------------------------------------------

function checkEnter(event) {
    
  if (event.keyCode === 13) {
      saveScore();

  }

}

//checks when enter is clicked
initEl.addEventListener("click", checkEnter)

//------------------Save score---------------------------------

function saveScore() {
  var initials = initEl.value.toUpperCase();
  
  // check if initial is empty
  if (initials === "") { 

    alert("Initials cannot be left blank.");

    return;

  }else if (initials.length > 3) {

    alert("Initials cannot exceed 3 characters");

    return;

  }else {

    var highscores;

    if (JSON.parse(localStorage.getItem("highscores")) != null) {

      highscores = JSON.parse(window.localStorage.getItem("highscores"));

    }else {

      highscores = [];

    }

    var updatedScore = {

      initials: initials,

      score: time
    };

    highscores.push(updatedScore);

    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));

   
    location.href = "highscores.html"; //links back to highscore html
  }
}

// ---------------------------quiz end-----------------------------

function endQuiz() {

  // stop timer
  clearInterval(timer);
  timerEl.textContent = time;

  // final score
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;

  //end screen
  var endScreen = document.getElementById("end-screen");
  endScreen.setAttribute("class", " ");

  // hide questions 
  queEL.setAttribute("style", "display: none;");
}



subButton.addEventListener("click", saveScore)

//---------------------the end------------------------------

