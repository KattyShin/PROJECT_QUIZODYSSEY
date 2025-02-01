// quiz 2

import {
  app,
  db,
  ref,
  get,
  child,
  getDatabase,
} from "../firebaseCOnnection/firebaseCon.js";

let currentQuestion2 = [];
let currentQuestion2Index = 0;
let totalQuestionsInDB = 0;
let noOfQuestion2 = 1;
let currentScore2 = 0;
let score2 = parseInt(sessionStorage.getItem("score")) || 0;
let count = 0;

const questionContainer = document.getElementById("question-container2");
const submitButton = document.getElementById("submit-btn2");
const feedbackDiv = document.getElementById("feedback2");
const validationMessage = document.getElementById("validation-message2");
const totalQuestionsElement = document.getElementById("totalQuestions2");
const disnoOfQuestion2 = document.getElementById("noOfQuestion2");
const welcomeText = document.querySelector(".welcome-text2");
const quizCon = document.querySelector(".quiz-container2");
const passButton = document.getElementById("pass-btn2");

// Start animation sequence
setTimeout(() => {
  welcomeText.style.animation = "fadeOut 2s forwards";
  welcomeText.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      welcomeText.style.display = "none";
      quizCon.style.display = "block";
      freePassCount = parseInt(sessionStorage.getItem("freePassCount"), 10);
      document.querySelector(".container-quiz1").style.display = "none";
      if (count == 0) {
        initializeQuiz2();
      }
      updateStateButton2();
    }
  });
}, 5000);

async function initializeQuiz2() {
  count++;
  const username = sessionStorage.getItem("username");
  const quiz_id = sessionStorage.getItem("quiz_id");
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(
      child(dbRef, `user/${username}/quizzes/${quiz_id}/quizitems`)
    );

    if (snapshot.exists()) {
      const allQuestions2 = Object.values(snapshot.val());
      totalQuestionsInDB = allQuestions2.length;

      const thirdSize = Math.floor(totalQuestionsInDB / 3);
      const startIndex = thirdSize;
      const endIndex = startIndex + thirdSize;

      currentQuestion2 = allQuestions2.slice(startIndex, endIndex);
      shuffleArray2(currentQuestion2);
      console.log(currentQuestion2);

      document.getElementById("questionsShown2").textContent =
        currentQuestion2.length;

      displayQuestion2(currentQuestion2Index);
    }
  } catch (error) {
    console.error("Error fetching quiz items:", error);
  }
}

function shuffleArray2(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion2(index) {
  const question = currentQuestion2[index];

  let formattedQuestion = question.question;

  if (
    formattedQuestion.includes("a)") ||
    formattedQuestion.includes("b)") ||
    formattedQuestion.includes("c)")
  ) {
    formattedQuestion = formattedQuestion
      .replace(/([abc]\))/g, "<br><br>$1 ")
      .replace(/<br><br>([abc]\))/g, "<br><br>&nbsp;&nbsp;&nbsp;$1");
  }

  let inputHtml = "";
  if (question.answer === "True" || question.answer === "False") {
    inputHtml = `
      <div class="radio-group">
        <div class="radio-option">
          <input type="radio" id="true2" name="truefalse2" value="True">
          <label for="true2">True</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="false2" name="truefalse2" value="False">
          <label for="false2">False</label>
        </div>
      </div>
    `;
  } else {
    inputHtml = `
      <div class="input-container">
        <input type="text" 
               id="answer-input2" 
               class="answer-input" 
               placeholder="Enter your answer"
               autocomplete="off">
      </div>
    `;
  }

  let html = `
    <div class="question">
      <h2>${formattedQuestion}</h2>
      ${inputHtml}
    </div>
  `;

  questionContainer.innerHTML = html;
  submitButton.style.display = "block";
  feedbackDiv.style.display = "none";
  validationMessage.style.display = "none";

  if (question.answer === "True" || question.answer === "False") {
    const radioInputs = document.querySelectorAll('input[name="truefalse2"]');
    radioInputs.forEach((radio) => {
      radio.addEventListener("change", () => {
        validationMessage.style.display = "none";
        submitButton.disabled = false;
      });
    });
  } else {
    const input = document.getElementById("answer-input2");
    input.addEventListener("input", () => {
      validationMessage.style.display = "none";
      submitButton.disabled = input.value.trim() === "";
    });
  }
  submitButton.disabled = true;
}

function checkAnswer2() {
  const question = currentQuestion2[currentQuestion2Index];
  let userInput;
  let isCorrect = false;

  if (question.answer === "True" || question.answer === "False") {
    const selectedRadio = document.querySelector(
      'input[name="truefalse2"]:checked'
    );
    if (!selectedRadio) {
      validationMessage.textContent = "Please select an answer";
      validationMessage.style.display = "block";
      return;
    }
    userInput = selectedRadio.value;
    isCorrect = userInput === question.answer;

    const radioInputs = document.querySelectorAll('input[name="truefalse2"]');
    radioInputs.forEach((input) => (input.disabled = true));
  } else {
    userInput = document
      .getElementById("answer-input2")
      .value.trim()
      .toLowerCase();
    if (!userInput) {
      validationMessage.textContent = "Please enter an answer";
      validationMessage.style.display = "block";
      return;
    }
    isCorrect = userInput === question.answer.toLowerCase();

    document.getElementById("answer-input2").disabled = true;
  }

  feedbackDiv.textContent = isCorrect
    ? "Correct!"
    : `Incorrect. The correct answer is: ${question.answer}`;
  feedbackDiv.style.backgroundColor = isCorrect ? "#4CAF50" : "#f44336";
  feedbackDiv.style.display = "block";

  submitButton.style.display = "none";

  if (isCorrect) {
    currentScore2++;
    incrementScore();
    document.getElementById("score2").textContent = currentScore2;
    document.getElementById("currentScore").textContent = window.overAllScore;
  }

  setTimeout(() => {
    nextQuestion2();
  }, 1000);
}

function updateFreePassDisplay2() {
  const freePassElements = document.getElementsByClassName("freePassDisplay");
  for (let element of freePassElements) {
    element.textContent = freePassCount;
  }
  sessionStorage.setItem("freePassCount", freePassCount);
}

function updateStateButton2() {
  if (freePassCount > 0) {
    passButton.disabled = false;
    passButton.classList.remove("disabled");
  } else {
    passButton.disabled = true;
    passButton.classList.add("disabled");
  }
}

function passQuestion2() {
  if (freePassCount > 0) {
    const question = currentQuestion2[currentQuestion2Index];
    freePassCount--;
    sessionStorage.setItem("freePassCount", freePassCount);
    updateFreePassDisplay2();


    feedbackDiv.textContent = `Skipped. The correct answer is: ${
      question.answer || question.truefalse || question.correct
    }`;
    feedbackDiv.style.backgroundColor = "#808080";
    feedbackDiv.style.display = "block";

    if (question.type === "truefalse") {
      const radioInputs = document.querySelectorAll('input[name="truefalse"]');
      radioInputs.forEach((input) => {
        input.disabled = true;
      });
    } else if (question.type !== "identification") {
      const options = document.querySelectorAll(".option-button2");
      options.forEach((option) => {
        option.disabled = true;
        if (option.dataset.correct === "true") {
          option.classList.add("correct");
        }
      });
    }

    setTimeout(() => {
      feedbackDiv.style.display = "none";
      nextQuestion2();
      updateStateButton2();
    }, 2000);
  }
}

sessionStorage.setItem("quiz2completed", "false");

function nextQuestion2() {
  currentQuestion2Index++;
  if (currentQuestion2Index < currentQuestion2.length) {
    displayQuestion2(currentQuestion2Index);
    noOfQuestion2++;
    disnoOfQuestion2.textContent = noOfQuestion2;
  } else {
    sessionStorage.setItem("quiz2completed", "true");

    // Store the final score for quiz3
    console.log("Storing final quiz2 score:", score2);
    sessionStorage.setItem("score2", score2);

    // Hide elements
    sessionStorage.setItem("score", 0);

    passButton.style.display = "none";
    submitButton.style.display = "none";
    feedbackDiv.style.display = "none";
    validationMessage.style.display = "none";
    questionContainer.style.display = "none";
    document.querySelector(".scoreCon2").style.display = "none";

    sessionStorage.setItem("score2", score2);
    // sessionStorage.setItem("score", score2.toString());
    // Update score displays
    document.getElementById("overScore2").textContent = noOfQuestion2;
    document.getElementById("finalScore2").textContent = currentScore2;
    document.getElementById("quiz-completion2").style.display = "block";
    document.getElementById("quiz2Score").textContent = currentScore2;
    document.getElementById("quiz2Overscore").textContent = noOfQuestion2;
  }
}

submitButton.addEventListener("click", checkAnswer2);
passButton.addEventListener("click", passQuestion2);
let backtozero = 0;
window.onload = function () {
  if (performance.navigation.type === 1) {
    sessionStorage.setItem("score2", backtozero);
    sessionStorage.setItem("score3", backtozero);
    sessionStorage.setItem("score", backtozero);
    sessionStorage.setItem("currentScore", backtozero);

    window.location.href = "home.html";
    freePassCount = 0;
    sessionStorage.setItem("freePassCount", freePassCount);
    return;
  }
};

initializeQuiz2();
