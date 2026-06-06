

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language",
            "Hyper Text Machine Language"
        ],
        answer: 0
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which CSS property changes text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: 2
    },

    {
        question: "Which CSS property controls the space outside an element?",
        options: [
            "padding",
            "border",
            "margin",
            "spacing"
        ],
        answer: 2
    },

    {
        question: "Which JavaScript keyword declares a variable?",
        options: [
            "var",
            "define",
            "int",
            "string"
        ],
        answer: 0
    },

    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "/* */",
            "#",
            "//",
            "<!-- -->"
        ],
        answer: 2
    },

    {
        question: "How do you write 'Hello' to the browser console?",
        options: [
            "print('Hello')",
            "console.log('Hello')",
            "echo('Hello')",
            "document.writeConsole('Hello')"
        ],
        answer: 1
    },

    {
        question: "Which method selects an element by its id?",
        options: [
            "queryElement()",
            "getElementByClass()",
            "getElementById()",
            "selectId()"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to insert an image?",
        options: [
            "<picture>",
            "<img>",
            "<image>",
            "<src>"
        ],
        answer: 1
    },

    {
        question: "Which JavaScript event occurs when a button is clicked?",
        options: [
            "onchange",
            "onhover",
            "onclick",
            "onload"
        ],
        answer: 2
    }
];

const timerDisplay = document.getElementById("timer");

let timeLeft = 30;

let timerInterval;

let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

let score = 0;

const questionNumber = document.getElementById("question-number");

const questionText = document.getElementById("question-text");

const optionsContainer = document.getElementById("options-container");

const progressBar = document.getElementById("progress-bar");

const progressText =  document.getElementById("progress-text");

const prevBtn = document.getElementById("prev-btn");

const nextBtn = document.getElementById("next-btn");

const quizContainer =
    document.getElementById("quiz-container");

const resultsDiv =
    document.getElementById("results");

const totalQuestionsText =
    document.getElementById("total-questions");

const correctAnswersText =
    document.getElementById("correct-answers");

const incorrectAnswersText =
    document.getElementById("incorrect-answers");

const unansweredQuestionsText =
    document.getElementById("unanswered-questions");

const finalScoreText =
    document.getElementById("final-score");

const percentageText =
    document.getElementById("percentage");

const resultMessage =
    document.getElementById("result-message");

const restartBtn =
    document.getElementById("restart-btn");

function saveQuiz() {

    localStorage.setItem(
        "currentQuestion",
        currentQuestion
    );

    localStorage.setItem(
        "userAnswers",
        JSON.stringify(userAnswers)
    );

}

function showQuestion() {

    const current = questions[currentQuestion];

    const savedAnswer =
    userAnswers[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent =
        current.question;

    optionsContainer.innerHTML = "";

    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        if (savedAnswer !== null) {

        button.disabled = true;

        const correctAnswer =
            current.answer;

        if (index === correctAnswer) {

            button.classList.add("correct");

        }

        if (
            savedAnswer === index &&
            savedAnswer !== correctAnswer
        ) {

            button.classList.add("incorrect");

        }

    }

        optionsContainer.appendChild(button);

    });

    const answeredQuestions =
        userAnswers.filter(
            answer => answer !== null
        ).length;

    const progress=(answeredQuestions /questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    progressText.textContent =
    `${answeredQuestions} of ${questions.length} answered`;

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {

        nextBtn.textContent = "Finish";

    } else {

        nextBtn.textContent = "Next";

    }

    if (userAnswers[currentQuestion] === null) {

        startTimer();

    } else {

        clearInterval(timerInterval);

        timerDisplay.textContent = "Answered";

    }
}


function selectAnswer(selectedIndex) {

    if (userAnswers[currentQuestion] !== null) {
        return;
    }

    userAnswers[currentQuestion] = selectedIndex;

    saveQuiz();

    showQuestion();
}

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        saveQuiz();

        showQuestion();

    } else {

        showResults();

    }

}

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        saveQuiz();

        showQuestion();

    }

}

nextBtn.addEventListener("click", nextQuestion);

prevBtn.addEventListener("click", previousQuestion);

function showResults() {

    clearInterval(timerInterval);

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {

        const answer = userAnswers[index];

        if (answer === null) {

            unanswered++;

        } else if (answer === question.answer) {

            correct++;

        } else {

            incorrect++;

        }

    });

    const percentage =
        Math.round(
            (correct / questions.length) * 100
        );

    quizContainer.style.display = "none";

    resultsDiv.style.display = "block";

    totalQuestionsText.textContent =
        `Total Questions: ${questions.length}`;

    correctAnswersText.textContent =
        `Correct Answers: ${correct}`;

    incorrectAnswersText.textContent =
        `Incorrect Answers: ${incorrect}`;

    unansweredQuestionsText.textContent =
        `Unanswered Questions: ${unanswered}`;

    finalScoreText.textContent =
        `Score: ${correct}/${questions.length}`;

    percentageText.textContent =
        `Percentage: ${percentage}%`;

    if (percentage <= 40) {

        resultMessage.textContent =
            "Needs Improvement";

    } else if (percentage <= 70) {

        resultMessage.textContent =
            "Good Effort";

    } else if (percentage <= 90) {

        resultMessage.textContent =
            "Great Work";

    } else {

        resultMessage.textContent =
            "Excellent";

    }

    localStorage.setItem(
        "quizCompleted",
        "true"
    );
 
}

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 30;

    timerDisplay.classList.remove("warning");

    timerDisplay.textContent =
        `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent =
            `Time Left: ${timeLeft}s`;

        if (timeLeft <= 10) {
            timerDisplay.classList.add("warning");
        }

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            if (userAnswers[currentQuestion] === null) {

                nextQuestion();

            }

        }

    }, 1000);

}

restartBtn.addEventListener(
    "click",
    restartQuiz
);

function restartQuiz() {

    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("quizCompleted");

    currentQuestion = 0;

    userAnswers = new Array(questions.length).fill(null);

    resultsDiv.style.display = "none";

    quizContainer.style.display = "block";

    showQuestion();

}

function loadQuiz() {

    const savedQuestion =
        localStorage.getItem("currentQuestion");

    const savedAnswers =
        localStorage.getItem("userAnswers");

    if (savedQuestion !== null) {

        currentQuestion =
            Number(savedQuestion);

    }

    if (savedAnswers !== null) {

        userAnswers =
            JSON.parse(savedAnswers);

    }

    const completed =
    localStorage.getItem(
        "quizCompleted"
    );

    if (completed === "true") {

        showResults();

        return;

    }

}

loadQuiz();

showQuestion();
