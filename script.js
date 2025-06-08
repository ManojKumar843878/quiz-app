var questions = [
    {
        question: "world's largest country?",
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

var currentQuesIndex = 0;
var score = 0;
var shuffledQuestions = [];

var forms = document.getElementById("form-id");
var questionEl = document.getElementById("questionele");
var submitBtn = document.getElementById("sub-btn");
var nextBtn = document.getElementById("next-btn");
var quesCount = document.getElementById("quescount");

var hprgrsbar = document.getElementById("hprgrs-bar");
var timer = document.getElementById("timer");

var timeInterval;
var interval = 15;


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showTime() {
    clearInterval(timeInterval);
    interval = 15;
    timer.textContent = `Timer Left ${interval}`;

    timeInterval = setInterval(() => {
        interval--;
        timer.textContent = `Timer Left ${interval}`;
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

    questionEl.innerText = quesNum + ". " + currQues.question;

    forms.innerHTML = "";

    currQues.options.forEach((option, i) => {
        const html = `<input type="radio" id="option${i}" name="option" value="${option}">
                      <label for="option${i}">${option}</label><br>`;
        forms.innerHTML += html;
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
        prgrssbaar();
    }

    clearInterval(timeInterval);
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
});

function prgrssbaar() {
    const scrper = (score / shuffledQuestions.length) * 100;
    hprgrsbar.style.width = scrper + "%";
    hprgrsbar.textContent = Math.round(scrper) + "%";
}

nextBtn.addEventListener("click", next);

function next() {
    currentQuesIndex++;
    if (currentQuesIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        alert("Successfully finished");
        hprgrsbar.style.display = "none";
        showScore();
    }
}

function showScore() {
    questionEl.innerHTML = `Your score is ${score} out of ${shuffledQuestions.length}`;

    const pers = (score / shuffledQuestions.length) * 100;

    const prgrscontainer = document.createElement("div");
    const prgrsbar = document.createElement("div");
    prgrsbar.style.width = pers + "%";
    prgrsbar.textContent = Math.round(pers) + "%";

    const percentele = document.createElement("h4");
    percentele.innerHTML = `Your percentage is ${Math.round(pers)}%`;

    const remark = document.createElement("h4");

    if (pers > 70) {
        prgrsbar.style.backgroundColor = "green";
        remark.innerText = "Good work!";
        remark.style.color = "green";
    } else {
        prgrsbar.style.backgroundColor = "red";
        remark.innerText = "Keep practicing!";
        remark.style.color = "red";
    }

    questionEl.appendChild(percentele);
    questionEl.appendChild(remark);
    prgrscontainer.appendChild(prgrsbar);
    questionEl.appendChild(prgrscontainer);

    forms.style.display = "none";
    nextBtn.style.display = "none";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.style.backgroundColor = "pink";
    playAgainBtn.innerText = "Play Again";
    playAgainBtn.style.padding = "5px";
    playAgainBtn.style.marginTop = "10px";
    questionEl.appendChild(playAgainBtn);

    playAgainBtn.addEventListener("click", function () {
        currentQuesIndex = 0;
        score = 0;
        hprgrsbar.style.display = "block";
        forms.style.display = "block";

        // Reset and shuffle again
        shuffledQuestions = [...questions];
        shuffle(shuffledQuestions);

        prgrssbaar();
        showQuestion();
    });
}

window.onload = function () {
    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    showQuestion();
};
