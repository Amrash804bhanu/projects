const questions = [
    {
        question:"A problem is given to three students whose chances of solving it are 1/2, 1/3 and 1/4 respectively. What is the probability that the problem will be solved?",
        answers:[
            { text:"1/4 ",correct:false},
            { text:" 1/2 ",correct:false},
            { text:"3/4 ",correct:true},
            { text:"7/12",correct:false},
        ]
    },
    
    {
        question:"Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn has a number which is a multiple of 3 or 5?",
        answers:[
            { text:"1/2 ",correct:false},
            { text:"3/5 ",correct:false},
            { text:"9/20 ",correct:true},
            { text:"8/15",correct:false},
        ]
    },
    {
        question:"A bag contains 6 white and 4 black balls .2 balls are drawn at random. Find the probability that they are of same colour.",
        answers:[
            { text:" 1/2",correct:false},
            { text:" 7/15",correct:true},
            { text:" 8/15.",correct:false},
            { text:"1/9 .",correct:false},
        ]
    },
    {
        question:"Two cards are drawn at random from a pack of 52 cards.what is the probability that either both are black or both are queen?",
        answers:[
            { text:"52/221",correct:false},
            { text:"  55/190.",correct:false},
            { text:" .55/221",correct:true },
            { text:"19/221",correct:false},
        ]
    },
    {
        question:"Three pipes A, B and C can fill a tank from empty to full in 30 minutes, 20 minutes and 10 minutes respectively. When the tank is empty, all the three pipes are opened. A, B and C discharge chemical solutions P, Q and R respectively. What is the proportion of solution R in the liquid in the tank after 3 minutes?",
        answers:[
            { text:"5/11",correct:false},
            { text:"6/11",correct:true},
            { text:"7/11",correct:false},
            { text:"8/11",correct:false},
        ]
    },
    {
        question:"Pipes A and B can fill a tank in 5 and 6 hours respectively. Pipe C can empty it in 12 hours. If all the three pipes are opened together, then the tank will be filled in:",
        answers:[
            { text:"1 13/17 hrs",correct:false},
            { text:"2 8/11 hrs",correct:false },
            { text:"3 9/17 hrs",correct:true},
            { text:" 4 1/2 hrs",correct:false},
        ]
    },
    {
        question:"A pump can fill a tank with water in 2 hours. Because of a leak, it took 2 1/3 hours to fill the tank. The leak can drain all the water of the tank in:",
        answers:[
            { text:" 10 hrs",correct:false},
            { text:"12 hrs",correct:false},
            { text:"14 hrs",correct:true},
            { text:"16 hrs",correct:false},
        ]
    },
    {

        question:"Two pipes A and B can fill a cistern in 37 1/2 minutes and 45 minutes respectively. Both pipes are opened. The cistern will be filled in just half an hour, if the B is turned off after:",
        answers:[
            { text:"6 mins",correct:false},
            { text:"9 mins",correct:true},
            { text:"12 mins",correct:false},
            { text:"15 mins",correct:false},
        ]
    },
    {

        question:"A water tank is two-fifth full.Pipe A can fill a tank in 10 minutes and pipe B can empty it in 6 minutes.If both the pipes are open,how long will it take to empty or fill the tank completely?",
        answers:[
            { text:" 6 min.to empty",correct:true},
            { text:"6 min.to fill",correct:false},
            { text:"9 min.to empty",correct:false},
            { text:"9 min.to fill",correct:false},
        ]
    },
    {
        question:"A tap can fill a tank in 6 hours. After half the tank is filled, three more similar taps are opened. What is the total time taken to fill the tank completely?",
        answers:[
            { text:"3 hrs 15 min",correct:false},
            { text:"4 hrs 15 min",correct:false},
            { text:"3 hrs 45 min",correct:true},
            { text:" 4 hrs 1",correct:false},
        ]
    }
];

const Questionelement=document.getElementById("question-display");
const Answers=document.getElementById("answers-button");
const Next=document.getElementById("next-button");

//store question index and score 
let currentQuestionIndex=0;
let score=0;

function startQuiz() {
    currentQuestionIndex=0;
    score = 0;
    Next.innerHTML ="Next Question";
    showQuestion();  
    timer();
   
           
}

function timer(){

    var timeLeft = 274;
    
    var timeDisplay = document.getElementById("time-display");
    
    var timerInterval = setInterval(function() {
      timeLeft--;
      timeDisplay.innerHTML = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
      }
    
    }, 1000);


  }

function showQuestion (){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];      //question call based on index 
    let questionNo = currentQuestionIndex + 1;
    Questionelement.innerHTML = currentQuestion.question; 
    let questionNumber  = document.getElementById("ques-num");
    questionNumber.innerHTML = questionNo + "/" + 10;

    //to display the answers 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        Answers.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });

}

function  resetState(){
    Next.style.display="none";
    while(Answers.firstChild) {
         Answers.removeChild(Answers.firstChild )
    }

}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score =score+5;
        showScore();
    }else{
        selectedButton.classList.add("incorrect");
        
    }
    //one click of the button and select the answer 
    Array.from(Answers.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    Next.style.display = "block";

}

function result(){
    resetState();
    QuestionELement.innerHTML = `you scored ${score}  out of ${questions.length}`;
    Next.innerHTML = "Play Again" ;
    Next.style.display = "block";

    

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        } else {
           result();
    }
   

}


Next.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
        } else {
        startQuiz();
     }   

    }
)
startQuiz();