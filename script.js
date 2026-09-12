/* =========================================
   SKILL LENS
========================================= */

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: 1
    },

    {
        question: "Which HTML tag is used to display an image?",
        answers: [
            "<image>",
            "<picture>",
            "<img>",
            "<src>"
        ],
        correct: 2
    }
];


/* =========================================
   ELEMENTS
========================================= */

const startPracticeBtn =
    document.getElementById("startPracticeBtn");

const viewDashboardBtn =
    document.getElementById("viewDashboardBtn");

const dashboardBtn =
    document.getElementById("dashboardBtn");

const practiceButtons =
    document.querySelectorAll(".practice-btn");

const questionSection =
    document.getElementById("questionSection");

const questionText =
    document.getElementById("questionText");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("score");

const nextQuestionBtn =
    document.getElementById("nextQuestionBtn");

const answerButtons =
    document.querySelectorAll(".answer-btn");

const questionProgressBar =
    document.getElementById("questionProgressBar");

const resultSection =
    document.getElementById("resultSection");

const finalScore =
    document.getElementById("finalScore");

const resultBar =
    document.getElementById("resultBar");

const resultMessage =
    document.getElementById("resultMessage");

const restartQuizBtn =
    document.getElementById("restartQuizBtn");

const backToPracticeBtn =
    document.getElementById("backToPracticeBtn");


/* Dashboard */

const questionsCompleted =
    document.getElementById("questionsCompleted");

const totalScore =
    document.getElementById("totalScore");

const accuracy =
    document.getElementById("accuracy");

const streak =
    document.getElementById("streak");

const heroProgress =
    document.getElementById("heroProgress");

const htmlProgress =
    document.getElementById("htmlProgress");

const htmlAccuracy =
    document.getElementById("htmlAccuracy");

const htmlAccuracyBar =
    document.getElementById("htmlAccuracyBar");

const weaknessTitle =
    document.getElementById("weaknessTitle");

const weaknessText =
    document.getElementById("weaknessText");


/* =========================================
   QUIZ VARIABLES
========================================= */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =========================================
   SAVED DATA
========================================= */

let stats =
    JSON.parse(localStorage.getItem("skillLensStats")) || {
        questions: 0,
        correct: 0,
        sessions: 0
    };


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    questionsCompleted.textContent =
        stats.questions;

    totalScore.textContent =
        stats.correct;

    let currentAccuracy = 0;

    if (stats.questions > 0) {

        currentAccuracy =
            Math.round(
                (stats.correct / stats.questions) * 100
            );
    }

    accuracy.textContent =
        currentAccuracy + "%";

    streak.textContent =
        stats.sessions;

    heroProgress.textContent =
        currentAccuracy + "%";

    htmlProgress.textContent =
        stats.questions + " questions";

    htmlAccuracy.textContent =
        currentAccuracy + "%";

    htmlAccuracyBar.style.width =
        currentAccuracy + "%";


    if (stats.questions === 0) {

        weaknessTitle.textContent =
            "No data yet";

        weaknessText.textContent =
            "Complete a practice quiz to receive personalized feedback.";

    } else if (currentAccuracy < 50) {

        weaknessTitle.textContent =
            "HTML fundamentals need practice";

        weaknessText.textContent =
            "Focus on HTML elements and their purpose.";

    } else if (currentAccuracy < 80) {

        weaknessTitle.textContent =
            "You're making progress";

        weaknessText.textContent =
            "Review the questions you missed and practice again.";

    } else {

        weaknessTitle.textContent =
            "HTML is looking strong! 🔥";

        weaknessText.textContent =
            "Your performance is strong. Try CSS and JavaScript next.";
    }


    localStorage.setItem(
        "skillLensStats",
        JSON.stringify(stats)
    );
}


/* =========================================
   SCROLL
========================================= */

function scrollToSection(section) {

    section.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================
   HERO BUTTONS
========================================= */

startPracticeBtn.addEventListener(
    "click",
    function () {

        scrollToSection(
            document.getElementById("practice")
        );

    }
);


viewDashboardBtn.addEventListener(
    "click",
    function () {

        scrollToSection(
            document.getElementById("dashboard")
        );

    }
);


dashboardBtn.addEventListener(
    "click",
    function () {

        scrollToSection(
            document.getElementById("dashboard")
        );

    }
);


/* =========================================
   PRACTICE BUTTONS
========================================= */

practiceButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const skill =
                    button.dataset.skill;

                if (skill === "html") {

                    startHTMLQuiz();

                } else {

                    alert(
                        skill.toUpperCase() +
                        " practice is coming soon!"
                    );

                }
            }
        );
    }
);


/* =========================================
   START QUIZ
========================================= */

function startHTMLQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    questionSection.style.display =
        "block";

    resultSection.style.display =
        "none";

    scoreDisplay.textContent =
        "0";

    loadQuestion();

    scrollToSection(
        questionSection
    );
}


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];

    answered = false;

    questionText.textContent =
        question.question;

    questionNumber.textContent =
        currentQuestion + 1;

    scoreDisplay.textContent =
        score;


    questionProgressBar.style.width =
        ((currentQuestion + 1) /
        questions.length * 100) + "%";


    nextQuestionBtn.disabled =
        true;


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextQuestionBtn.textContent =
            "Finish Quiz";

    } else {

        nextQuestionBtn.textContent =
            "Next Question →";
    }


    answerButtons.forEach(
        function (button, index) {

            button.textContent =
                question.answers[index];

            button.classList.remove(
                "correct",
                "wrong"
            );

            button.disabled =
                false;
        }
    );
}


/* =========================================
   ANSWER
========================================= */

answerButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
            function () {

                if (answered) {
                    return;
                }

                answered = true;

                const question =
                    questions[currentQuestion];


                stats.questions++;


                if (
                    index ===
                    question.correct
                ) {

                    score++;

                    stats.correct++;

                    button.classList.add(
                        "correct"
                    );

                } else {

                    button.classList.add(
                        "wrong"
                    );

                    answerButtons[
                        question.correct
                    ].classList.add(
                        "correct"
                    );
                }


                scoreDisplay.textContent =
                    score;

                nextQuestionBtn.disabled =
                    false;


                answerButtons.forEach(
                    function (btn) {

                        btn.disabled =
                            true;

                    }
                );


                updateDashboard();
            }
        );
    }
);


/* =========================================
   NEXT QUESTION / FINISH
========================================= */

nextQuestionBtn.addEventListener(
    "click",
    function () {

        if (!answered) {
            return;
        }


        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            loadQuestion();

        } else {

            finishQuiz();
        }
    }
);


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

    finalScore.textContent =
        score;


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    resultBar.style.width =
        percentage + "%";


    if (score === 3) {

        resultMessage.textContent =
            "Excellent! You mastered this quiz! 🔥";

    } else if (score === 2) {

        resultMessage.textContent =
            "Good job! Just a little more practice. 💪";

    } else if (score === 1) {

        resultMessage.textContent =
            "Keep practicing — you can improve! 🚀";

    } else {

        resultMessage.textContent =
            "Don't give up. Practice makes progress! 💡";
    }


    stats.sessions++;

    updateDashboard();


    resultSection.style.display =
        "block";


    scrollToSection(
        resultSection
    );
}


/* =========================================
   RESTART
========================================= */

restartQuizBtn.addEventListener(
    "click",
    function () {

        startHTMLQuiz();

    }
);


/* =========================================
   BACK TO PRACTICE
========================================= */

backToPracticeBtn.addEventListener(
    "click",
    function () {

        resultSection.style.display =
            "none";

        scrollToSection(
            document.getElementById("practice")
        );

    }
);


/* =========================================
   CODING CHALLENGE
========================================= */

const codeInput =
    document.getElementById("codeInput");

const runCodeBtn =
    document.getElementById("runCodeBtn");

const codeResult =
    document.getElementById("codeResult");


runCodeBtn.addEventListener(
    "click",
    function () {

        const code =
            codeInput.value.trim();


        if (code === "") {

            codeResult.textContent =
                "Please write some code first.";

            return;
        }


        const normalized =
            code
                .replace(/\s+/g, "")
                .toLowerCase();


        if (
            normalized.includes(
                "<button>clickme</button>"
            )
        ) {

            codeResult.textContent =
                "✅ Correct! Your button was created successfully.";

        } else {

            codeResult.innerHTML =
                "❌ Not quite. Try: " +
                "<code>&lt;button&gt;Click Me&lt;/button&gt;</code>";
        }
    }
);


/* =========================================
   INTERVIEW MODE
========================================= */

const interviewBtn =
    document.getElementById("interviewBtn");

const interviewModal =
    document.getElementById("interviewModal");

const closeInterview =
    document.getElementById("closeInterview");

const submitInterview =
    document.getElementById("submitInterview");

const interviewAnswer =
    document.getElementById("interviewAnswer");

const interviewFeedback =
    document.getElementById("interviewFeedback");

const timerElement =
    document.getElementById("timer");


let timerInterval;

let timeLeft = 60;


interviewBtn.addEventListener(
    "click",
    function () {

        interviewModal.classList.add(
            "active"
        );

        interviewAnswer.value = "";

        interviewFeedback.textContent =
            "";

        startTimer();
    }
);


closeInterview.addEventListener(
    "click",
    function () {

        closeInterviewModal();

    }
);


interviewModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            interviewModal
        ) {

            closeInterviewModal();

        }
    }
);


/* =========================================
   TIMER
========================================= */

function startTimer() {

    clearInterval(
        timerInterval
    );

    timeLeft = 60;

    timerElement.textContent =
        timeLeft;


    timerInterval =
        setInterval(
            function () {

                timeLeft--;

                timerElement.textContent =
                    timeLeft;


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    interviewFeedback.textContent =
                        "Time is up! Submit your answer to receive feedback.";
                }

            },
            1000
        );
}


/* =========================================
   CLOSE INTERVIEW
========================================= */

function closeInterviewModal() {

    clearInterval(
        timerInterval
    );

    interviewModal.classList.remove(
        "active"
    );
}


/* =========================================
   SUBMIT INTERVIEW
========================================= */

submitInterview.addEventListener(
    "click",
    function () {

        const answer =
            interviewAnswer.value.trim();


        if (answer.length < 20) {

            interviewFeedback.textContent =
                "Your answer is a little short. Explain what HTML does and give an example.";

            return;
        }


        interviewFeedback.textContent =
            "Good answer! Try adding a practical example in a real interview. 👍";


        clearInterval(
            timerInterval
        );
    }
);


/* =========================================
   INITIALIZE
========================================= */

questionSection.style.display =
    "none";

resultSection.style.display =
    "none";

updateDashboard();