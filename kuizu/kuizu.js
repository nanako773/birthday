const questions = [
    {
        question: "私たちが初めてデートした場所はどこ？",
        answers: [
            { text: "映画館", correct: false },
            { text: "遊園地", correct: false },
            { text: "水族館", correct: true },
            { text: "ショッピングモール", correct: false }
        ]
    },
    {
        question: "僕が初めてプレゼントしたものは何？",
        answers: [
            { text: "ネックレス", correct: false },
            { text: "花束", correct: true },
            { text: "手紙", correct: false },
            { text: "マフラー", correct: false }
        ]
    },
    {
        question: "僕の好きな食べ物は何？",
        answers: [
            { text: "カレーライス", correct: false },
            { text: "ラーメン", correct: false },
            { text: "ハンバーグ", correct: true },
            { text: "お寿司", correct: false }
        ]
    }
];

const quizElement = document.getElementById("quiz");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizElement.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="answer-buttons">
            ${currentQuestion.answers.map(answer => `<button class="btn">${answer.text}</button>`).join('')}
        </div>
    `;

    const answerButtons = quizElement.querySelectorAll(".btn");
    answerButtons.forEach((button, index) => {
        button.addEventListener("click", () => selectAnswer(questions[currentQuestionIndex].answers[index]));
    });

    nextButton.style.display = "none";
    resultElement.textContent = "";
}

function selectAnswer(answer) {
    const answerButtons = quizElement.querySelectorAll(".btn");
    answerButtons.forEach(button => {
        const correspondingAnswer = questions[currentQuestionIndex].answers.find(a => a.text === button.textContent);
        if (correspondingAnswer.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    if (answer.correct) {
        resultElement.textContent = "正解！🎉";
    } else {
        resultElement.textContent = "残念、不正解...😢";
    }

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.textContent = "次の問題";
        nextButton.style.display = "block";
        nextButton.onclick = handleNextButton;
    } else {
        nextButton.textContent = "おわり";
        nextButton.style.display = "block";
        nextButton.onclick = () => {
            alert("クイズは終了です！");
            startQuiz(); // 最初からやり直す
        };
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
}

startQuiz();