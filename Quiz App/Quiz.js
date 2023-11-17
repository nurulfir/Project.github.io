const questions = [
    {
        question: "Siapakah nama Sekertaris kelas TI.23.A.5?",
        answer: [
            { text: "Wioreta", correct: true},
            { text: "Ihsan", correct: false},
            { text: "Raditya", correct: false},
            { text: "Andika", correct: false},
            { text: "Delfyn o", correct: false},
        ]
    },
    {
        question: "Siapakah nama ketua kelas TI.23.A.5?",
        answer: [
            { text: "Nurul", correct: false},
            { text: "Alvin", correct: false},
            { text: "Arul", correct: true},
            { text: "Nanda", correct: false},
            { text: "Samuel", correct: false},
        ]
    },
    {
        question: "Siapakah nama bendahara kelas TI.23.A.5?",
        answer: [
            { text: "Daffa", correct: false},
            { text: "Lulu", correct: true},
            { text: "Abidzar", correct: false},
            { text: "Lutfi", correct: false},
            { text: "Wahyu", correct: false},
        ]
    },
    {
        question: "Siapakah nama wakil ketua kelas TI.23.A.5?",
        answer: [
            { text: "Carlos", correct: false},
            { text: "Raditra", correct: false},
            { text: "Muizah", correct: false},
            { text: "Ihsan", correct: true},
            { text: "Gladis", correct: false},
        ]
    },
    {
        question: "Siapakah nama seksi kebersihan kelas TI.23.A.5?",
        answer: [
            { text: "Carlos", correct: false},
            { text: "Raditra", correct: false},
            { text: "Muizah", correct: false},
            { text: "Ihsan", correct: false},
            { text: "Gladis", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Nilai kamu ${score} dari ${questions.length}`;
    nextButton.innerHTML = "Mulai lagi";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();