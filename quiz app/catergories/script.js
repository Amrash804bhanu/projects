const questions = [
    {
        question:"Two taps can separately fill a cistern 10 minutes and 15 minutes respectively and when the waste pipe is open, they can together fill it in 18 minutes. The waste pipe can empty the full cistern in?",
        answers:[
            { text:"7 mins",correct:false},
            { text:"9 mins",correct:true},
            { text:"13 mins",correct:false},
            { text:"23 mins",correct:false},
        ]
    },
    
    {
        question:"A cistern is normally filled in 8 hours but takes two hours longer to fill because of a leak in its bottom. If the cistern is full, the leak will empty it in?",
        answers:[
            { text:"16 hrs",correct:false},
            { text:"20 hrs",correct:false},
            { text:"25 hrs",correct:false},
            { text:"40 hrs",correct:true},
        ]
    },
    {
        question:"Two pipes can fill a tank in 18 minutes and 15 minutes. An outlet pipe can empty the tank in 45 minutes. If all the pipes are opened when the tank is empty, then how many minutes will it take to fill the tank?",
        answers:[
            { text:"9 mins.",correct:false},
            { text:"10 mins.",correct:true},
            { text:"11 mins.",correct:false},
            { text:"12 mins.",correct:false},
        ]
    },
    {
        question:"Pipe A can fill a tank in 16 minutes and pipe B cam empty it in 24 minutes. If both the pipes are opened together after how many minutes should pipe B be closed, so that the tank is filled in 30 minutes?",
        answers:[
            { text:"19 mins.",correct:false},
            { text:"20 mins.",correct:false},
            { text:"21 mins.",correct:true },
            { text:"22 mins.",correct:false},
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
    let   question = document.getElementById("result-main");
    question.innerHTML = "welcome you scored ${score}  out of ${questions.length}";
    Next.innerHTML = "Play Again" ;
    Next.style.display = "block";

    

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        }
    if(currentQuestionIndex === questions.length){
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