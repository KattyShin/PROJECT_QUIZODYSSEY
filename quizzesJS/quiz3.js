import {
  app,
  db,
  ref,
  get,
  child,
  getDatabase,
} from "../firebaseCOnnection/firebaseCon.js";

// Get the previous score from quiz2
const score3 = parseInt(sessionStorage.getItem("score2")) || 0;
let currentScore3 = 0;
console.log('Retrieved score from quiz2:', score3);

let currentQuestion3 = [];
let currentQuestion3Index = 0;
let totalQuestionsInDB = 0;
let noOfQuestion3 = 1;
let count = 0


const questionContainer = document.getElementById("question-container3");
const submitButton = document.getElementById("submit-btn3");
const feedbackDiv = document.getElementById("feedback3");
const validationMessage = document.getElementById("validation-message3");
const totalQuestionsElement = document.getElementById("totalQuestions3");
const disnoOfQuestion3 = document.getElementById("noOfQuestion3");
const welcomeText2 = document.querySelector(".welcome-text3");
const quizCon2 = document.querySelector(".quiz-container3");
const passButton = document.getElementById("pass-btn3");

// Start animation sequence
setTimeout(() => {
  welcomeText2.style.animation = "fadeOut 3s forwards";
  welcomeText2.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      welcomeText2.style.display = "none";
      quizCon2.style.display = "block";
      freePassCount = parseInt(sessionStorage.getItem("freePassCount"), 10);
      document.querySelector(".container-quiz1").style.display = "none";
      document.querySelector(".container-quiz2").style.display = "none";
      if(count == 0){
        initializeQuiz3()
      }
      updateStateButton3();
    }
  });
}, 5000);

async function initializeQuiz3() {
  count++;
  const username = sessionStorage.getItem("username");
  const quiz_id = sessionStorage.getItem("quiz_id");
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(
      child(dbRef, `user/${username}/quizzes/${quiz_id}/quizItems`)
    );
    if (snapshot.exists()) {
      const allQuestions3 = Object.values(snapshot.val());
      totalQuestionsInDB = allQuestions3.length;

      const thirdSize = Math.floor(totalQuestionsInDB / 3);
      const startIndex = thirdSize * 2;
      const endIndex = totalQuestionsInDB;

      currentQuestion3 = allQuestions3.slice(startIndex, endIndex);
      shuffleArray3(currentQuestion3);

      document.getElementById("questionsShown3").textContent =
        currentQuestion3.length;

      console.log('Quiz3 starting with previous score:', score3);
      displayQuestion3(currentQuestion3Index);
      
      // Update initial score display
      document.getElementById("currentScore").textContent = score3;
    }
  } catch (error) {
    console.error("Error fetching quiz items:", error);
  }
}

function shuffleArray3(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion3(index) {

  const question = currentQuestion3[index];
  let html = `<h2>${question.question}</h2>`;
  html += '<div class="options-container3">';
  
  submitButton.style.display = "block";
  passButton.style.display = "block";
  feedbackDiv.style.display = "none";

  updateStateButton3();

  if (question.type === "identification") {
    html += `<input type="text" class="option-button3" id="answer-input3" placeholder="Enter your answer">`;
  } else if (question.type === "truefalse") {
    html += `
      <div class="radio-group3">
        <div class="radio-option3">
          <input type="radio" id="true3" name="truefalse" value="True">
          <label for="true3">True</label>
        </div>
        <div class="radio-option3">
          <input type="radio" id="false3" name="truefalse" value="False">
          <label for="false3">False</label>
        </div>
      </div>
    `;
  } else {
    const options = [
      { text: question.wrong1, correct: false },
      { text: question.wrong2, correct: false },
      { text: question.correct, correct: true },
    ].sort(() => Math.random() - 0.5);

    options.forEach((option) => {
      html += `<button class="option-button3" data-correct="${option.correct}">${option.text}</button>`;
    });
  }

  html += "</div>";
  questionContainer.innerHTML = html;
  validationMessage.style.display = "none";

  setupInputHandlers3(question);
}

function setupInputHandlers3(question) {
  if (question.type === "identification") {
    const input = document.getElementById("answer-input3");
    input.addEventListener("input", () => {
      validationMessage.style.display = "none";
      submitButton.disabled = input.value.trim() === "";
    });
    submitButton.disabled = true;
  } else if (question.type === "truefalse") {
    const radioInputs = document.querySelectorAll('input[name="truefalse"]');
    radioInputs.forEach((radio) => {
      radio.addEventListener("change", () => {
        validationMessage.style.display = "none";
        submitButton.disabled = false;
      });
    });
    submitButton.disabled = true;
  } else {
    const options = document.querySelectorAll(".option-button3");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        validationMessage.style.display = "none";
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        submitButton.disabled = false;
      });
    });
    submitButton.disabled = true;
  }
}

function checkAnswer3() {
  const question = currentQuestion3[currentQuestion3Index];

  if (!hasAnswer3(question)) {
    validationMessage.style.display = "block";
    return;
  }

  let isCorrect = false;
  let selectedAnswer;

  if (question.type === "identification") {
    const userInput = document.getElementById("answer-input3").value.trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    isCorrect = userInput === correctAnswer;
    selectedAnswer = userInput;
  } else if (question.type === "truefalse") {
    const selectedRadio = document.querySelector('input[name="truefalse"]:checked');
    if (selectedRadio) {
      isCorrect = selectedRadio.value === question.truefalse;
      selectedAnswer = selectedRadio.value;
    }
  } else {
    const selectedOption = document.querySelector(".option-button3.selected");
    if (selectedOption) {
      isCorrect = selectedOption.dataset.correct === "true";
      selectedAnswer = selectedOption.textContent;
    }
  }

  validationMessage.style.display = "none";

  if (isCorrect) {
    currentScore3++;
    incrementScore()
    document.getElementById("score3").textContent = currentScore3;
    document.getElementById("currentScore").textContent = window.overAllScore;
    feedbackDiv.textContent = "Correct!";
    feedbackDiv.style.backgroundColor = "#4CAF50";
  } else {
    feedbackDiv.textContent = `Incorrect. The correct answer is: ${
      question.answer || question.truefalse || question.correct
    }`;
    feedbackDiv.style.backgroundColor = "#f44336";
    document.getElementById("currentScore").textContent = window.overAllScore;
  }

  feedbackDiv.style.display = "block";
  submitButton.style.display = "none";

  setTimeout(() => {
    nextQuestion3();
  }, 1000);

  disableOptions3(question, selectedAnswer);
}

function disableOptions3(question, selectedAnswer) {
  if (question.type === "truefalse") {
    const radioInputs = document.querySelectorAll('input[name="truefalse"]');
    radioInputs.forEach((input) => {
      input.disabled = true;
    });
    const correctRadio = document.querySelector(`input[value="${question.truefalse}"]`);
    if (correctRadio) {
      correctRadio.parentElement.classList.add("correct");
    }
    if (selectedAnswer !== question.truefalse) {
      const incorrectRadio = document.querySelector(`input[value="${selectedAnswer}"]`);
      if (incorrectRadio) {
        incorrectRadio.parentElement.classList.add("incorrect");
      }
    }
  } else if (question.type !== "identification") {
    const options = document.querySelectorAll(".option-button3");
    options.forEach((option) => {
      option.disabled = true;
      if (option.dataset.correct === "true") {
        option.classList.add("correct");
      } else if (option === document.querySelector(".selected")) {
        option.classList.add("incorrect");
      }
    });
  }
}

function hasAnswer3(question) {
  if (question.type === "identification") {
    const input = document.getElementById("answer-input3");
    return input && input.value.trim() !== "";
  } else if (question.type === "truefalse") {
    return document.querySelector('input[name="truefalse"]:checked') !== null;
  } else {
    return document.querySelector(".option-button3.selected") !== null;
  }
}

function updateFreePassDisplay3() {
  const freePassElements = document.getElementsByClassName("freePassDisplay");
  for (let element of freePassElements) {
    element.textContent = freePassCount;
  }
  sessionStorage.setItem("freePassCount", freePassCount);
}

function updateStateButton3() {
  if (freePassCount > 0) {
    passButton.disabled = false;
    passButton.classList.remove("disabled");
  } else {
    passButton.disabled = true;
    passButton.classList.add("disabled");
  }
}

function passQuestion3() {
  if (freePassCount > 0) {
    const question = currentQuestion3[currentQuestion3Index];
    freePassCount--;
    sessionStorage.setItem("freePassCount", freePassCount);
    updateFreePassDisplay3();

    feedbackDiv.textContent = `Skipped. The correct answer is: ${
      question.answer || question.truefalse || question.correct
    }`;
    feedbackDiv.style.backgroundColor = "#808080";
    feedbackDiv.style.display = "block";

    disableOptions3(question, null);

    setTimeout(() => {
      feedbackDiv.style.display = "none";
      updateStateButton3();
      nextQuestion3();
    }, 2000);
  }
}

sessionStorage.setItem("quiz3completed", "false");

function nextQuestion3() {
  currentQuestion3Index++;
  if (currentQuestion3Index < currentQuestion3.length) {
    displayQuestion3(currentQuestion3Index);
    noOfQuestion3++;
    disnoOfQuestion3.textContent = noOfQuestion3;
  } else {
    sessionStorage.setItem("quiz3completed", "true");
    
    // Store final score
    console.log('Final quiz3 score:', score3);
    sessionStorage.setItem("currentScore", score3);

    // Hide elements
    passButton.style.display = "none";
    submitButton.style.display = "none";
    feedbackDiv.style.display = "none";
    validationMessage.style.display = "none";
    questionContainer.style.display = "none";
    document.querySelector(".scoreCon3").style.display = "none";

    // Update score displays
    document.getElementById("finalScore3").textContent = currentScore3;
    document.getElementById("overScore3").textContent = noOfQuestion3;
    document.getElementById("quiz-completion3").style.display = "block";
    document.getElementById("quiz3Score").textContent = currentScore3;
    document.getElementById("quiz3Overscore").textContent = noOfQuestion3;
  }
}

submitButton.addEventListener("click", checkAnswer3);
passButton.addEventListener("click", passQuestion3);

window.onload = function () {
  if (performance.navigation.type === 1) {
    window.location.href = "home.html";
    freePassCount = 0;
    sessionStorage.setItem("freePassCount", freePassCount);
    return;
  }
};