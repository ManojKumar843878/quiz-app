const questions = [
    {
        question: "World's largest country?",
        options: ["Africa", "America", "Asia", "Russia"],
        correct: "Russia"
    },
    {
        question: "How many colors in traffic signal lights?",
        options: ["3", "1", "6", "4"],
        correct: "3"
    },
    {
        question: "World's largest river?",
        options: ["Ganga", "Brahmaputra", "Kaveri", "Nile"],
        correct: "Nile"
    },
    {
        question: "Which is the largest number?",
        options: ["98", "4", "23", "65"],
        correct: "98"
    },
    {
        question: "India's national bird?",
        options: ["Peacock", "Swan", "Parrot", "Hen"],
        correct: "Peacock"
    }
];

let currentQuesIndex = 0;
let score = 0;
let shuffledQuestions = [];

const forms = document.getElementById("form-id");
const questionEl = document.getElementById("questionele");
const submitBtn = document.getElementById("sub-btn");
const nextBtn = document.getElementById("next-btn");
const quesCount = document.getElementById("quescount");

const hprgrsbar = document.getElementById("hprgrs-bar");
const timer = document.getElementById("timer");

let timeInterval;
let interval = 15;

// Shuffle questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Timer function
function showTime() {
    clearInterval(timeInterval);
    interval = 15;
    timer.textContent = `Timer Left: ${interval}s`;

    timeInterval = setInterval(() => {
        interval--;
        timer.textContent = `Timer Left: ${interval}s`;

        if (interval <= 0) {
            clearInterval(timeInterval);
            autonext();
        }
    }, 1000);
}


function autonext() {
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
}

function showQuestion() {
    clearInterval(timeInterval);
    showTime();

    const currQues = shuffledQuestions[currentQuesIndex];
    const quesNum = currentQuesIndex + 1;

    quesCount.innerHTML = `${quesNum} of ${shuffledQuestions.length} Questions`;
    questionEl.innerText = `${quesNum}. ${currQues.question}`;

    forms.innerHTML = ""; 

    currQues.options.forEach((option, i) => {
        const optionHTML = `
            <div>
                <input type="radio" id="option${i}" name="option" value="${option}">
                <label for="option${i}">${option}</label>
            </div>`;
        forms.innerHTML += optionHTML;
    });

    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
}


submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const selected = document.querySelector('input[name="option"]:checked');

    if (!selected) {
        alert("Please select your answer");
        return;
    }

    const answer = selected.value;
    const correctAnswer = shuffledQuestions[currentQuesIndex].correct;

    if (answer === correctAnswer) {
        score++;
        updateProgressBar();
    }

    clearInterval(timeInterval);
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
});


function updateProgressBar() {
    const percent = (score / shuffledQuestions.length) * 100;
    hprgrsbar.style.width = percent + "%";
    hprgrsbar.textContent = Math.round(percent) + "%";
}

nextBtn.addEventListener("click", function () {
    currentQuesIndex++;
    if (currentQuesIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
});


function showScore() {
    questionEl.innerHTML = `Your score is ${score} out of ${shuffledQuestions.length}`;
    forms.style.display = "none";
    nextBtn.style.display = "none";
    clearInterval(timeInterval);

    const percent = (score / shuffledQuestions.length) * 100;

    
    const prgrsContainer = document.createElement("div");
    prgrsContainer.style.backgroundColor = "#ccc";
    prgrsContainer.style.borderRadius = "10px";
    prgrsContainer.style.marginTop = "10px";
    prgrsContainer.style.overflow = "hidden";

    const prgrsBar = document.createElement("div");
    prgrsBar.style.height = "20px";
    prgrsBar.style.width = percent + "%";
    prgrsBar.textContent = Math.round(percent) + "%";
    prgrsBar.style.color = "white";
    prgrsBar.style.textAlign = "center";
    prgrsBar.style.backgroundColor = percent >= 70 ? "green" : "red";

    prgrsContainer.appendChild(prgrsBar);
    questionEl.appendChild(prgrsContainer);

    const percentEl = document.createElement("h4");
    percentEl.innerText = `Your percentage is ${Math.round(percent)}%`;
    questionEl.appendChild(percentEl);

    const remark = document.createElement("h4");
    remark.innerText = percent >= 70 ? "Good work!" : "Keep practicing!";
    remark.style.color = percent >= 70 ? "green" : "red";
    questionEl.appendChild(remark);


    const playAgainBtn = document.createElement("button");
    playAgainBtn.innerText = "Play Again";
    playAgainBtn.style.padding = "10px";
    playAgainBtn.style.marginTop = "20px";
    playAgainBtn.style.backgroundColor = "#00BCD4";
    playAgainBtn.style.color = "white";
    playAgainBtn.style.border = "none";
    playAgainBtn.style.borderRadius = "6px";
    playAgainBtn.style.cursor = "pointer";
    questionEl.appendChild(playAgainBtn);

    playAgainBtn.addEventListener("click", function () {
        currentQuesIndex = 0;
        score = 0;
        forms.style.display = "block";
        hprgrsbar.style.display = "block";
        hprgrsbar.style.width = "0%";
        hprgrsbar.textContent = "";

        shuffledQuestions = [...questions];
        shuffle(shuffledQuestions);
        showQuestion();
    });
}


window.onload = function () {
    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    showQuestion();
};
