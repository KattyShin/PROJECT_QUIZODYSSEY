import {
  app,
  db,
  ref,
  get,
  child,
  getDatabase,
} from "../firebaseCOnnection/firebaseCon.js";

let currentQuestions = [];
let currentQuestionIndex = 0;
// let score = 0;
window.overAllScore = 0;
window.totalQuestionsInDB = 0;
let noOfQuestion = 1;
let currentScore1= 0
let count = 0
// let stage1Score =0;
const questionContainer = document.getElementById("question-container");
const submitButton = document.getElementById("submit-btn");
const feedbackDiv = document.getElementById("feedback");
const validationMessage = document.getElementById("validation-message");
const totalQuestionsElement = document.getElementById("totalQuestions");
const disNoOfQuestion = document.getElementById("noOfQuestion");
const passButton = document.getElementById("pass-btn");
const welcomeText = document.querySelector(".welcome-text");
const quizCon = document.querySelector(".quiz-container");

const username = sessionStorage.getItem("username");
const quiz_id = sessionStorage.getItem("quiz_id");

setTimeout(() => {
  welcomeText.style.animation = "fadeOut 2s forwards";
  welcomeText.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      welcomeText.style.display = "none";
      quizCon.style.display = "block";
      freePassCount = parseInt(sessionStorage.getItem("freePassCount"), 10);
      document.querySelector(".container-quiz2").style.display = "none";
      updatePassButtonState();
      if(count == 0){
        initializeQuiz()
      }
    }
  });
}, 5000);

async function getMaxScore() {
  try {
    const getmaxscore = await get(ref(db, `user/${username}/quizzes/${quiz_id}`));
    if (getmaxscore.exists()) {
      const quizmaxscore = getmaxscore.val();
      window.totalQuestionsInDB = quizmaxscore.maxscore;
    } 
  } catch (error) {
    console.error("Error fetching maxscore:", error);
  }
}


async function initializeQuiz() { 
  count++;
  await getMaxScore();
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(
      child(dbRef, `user/${username}/quizzes/${quiz_id}/quizItems`)
    );
    if (snapshot.exists()) {
      // Get all questions
      const allQuestions = Object.values(snapshot.val());
      const numberOfQuestionsToShow = Math.floor(allQuestions.length / 3);

      // Select and shuffle questions
      currentQuestions = allQuestions.slice(0, numberOfQuestionsToShow);
      shuffleArray(currentQuestions);

      document.getElementById("questionsShown").textContent = numberOfQuestionsToShow;
      document.getElementById("overAllScore").textContent = window.totalQuestionsInDB;
      displayQuestion(currentQuestionIndex);

    }
  } catch (error) {
    console.error("Error fetching quiz items:", error);
  }
}

// initializeQuiz();
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion(index) {
  const question = currentQuestions[index];
  let html = `<h2>${question.question}</h2>`;
  html += '<div class="options-container">';
  submitButton.style.display = "block";
  passButton.style.display = "block";
  feedbackDiv.style.display = "none";
  if (question.type === "identification") {
    html += `<input type="text" class="option-button" id="answer-input" placeholder="Enter your answer">`;
  } else if (question.type === "truefalse") {
    html += `
                  <div class="radio-group">
                      <div class="radio-option">
                          <input type="radio" id="true" name="truefalse" value="True">
                          <label for="true">True</label>
                      </div>
                      <div class="radio-option">
                          <input type="radio" id="false" name="truefalse" value="False">
                          <label for="false">False</label>
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
      html += `<button class="option-button" data-correct="${option.correct}">${option.text}</button>`;
    });
  }

  html += "</div>";
  questionContainer.innerHTML = html;

  validationMessage.style.display = "none";

  if (question.type === "identification") {
    const input = document.getElementById("answer-input");
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
    const options = document.querySelectorAll(".option-button");
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

  submitButton.style.display = "block";
  feedbackDiv.style.display = "none";
}

function checkAnswer() {
  const question = currentQuestions[currentQuestionIndex];

  if (!hasAnswer(question)) {
    validationMessage.style.display = "block";
    return;
  }

  let isCorrect = false;
  let selectedAnswer;

  if (question.type === "identification") {
    const userInput = document
      .getElementById("answer-input")
      .value.trim()
      .toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    if (userInput == correctAnswer) {
      isCorrect = true;
    }
    selectedAnswer = userInput;
  } else if (question.type === "truefalse") {
    const selectedRadio = document.querySelector(
      'input[name="truefalse"]:checked'
    );
    if (selectedRadio) {
      // isCorrect = selectedRadio.value === question.truefalse;
      if (selectedRadio.value == question.truefalse) {
        isCorrect = true;
      }
      selectedAnswer = selectedRadio.value;
    }
  } else {
    const selectedOption = document.querySelector(".option-button.selected");
    if (selectedOption) {
      if (selectedOption.dataset.correct === "true") {
        isCorrect = true;
      }
      selectedAnswer = selectedOption.textContent;
    }
  }

  validationMessage.style.display = "none";

  if (isCorrect == true) {
    currentScore1++
    incrementScore()
    document.getElementById("score").textContent = currentScore1;
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
  // Set timer for auto-progression
  setTimeout(() => {
    nextQuestion();
  }, 1000);

  if (question.type === "truefalse") {
    const radioInputs = document.querySelectorAll('input[name="truefalse"]');
    radioInputs.forEach((input) => {
      input.disabled = true;
    });
    const correctRadio = document.querySelector(
      `input[value="${question.truefalse}"]`
    );
    if (correctRadio) {
      correctRadio.parentElement.classList.add("correct");
    }
    if (selectedAnswer !== question.truefalse) {
      const incorrectRadio = document.querySelector(
        `input[value="${selectedAnswer}"]`
      );
      if (incorrectRadio) {
        incorrectRadio.parentElement.classList.add("incorrect");
      }
    }
  } else if (question.type !== "identification") {
    const options = document.querySelectorAll(".option-button");
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

function hasAnswer(question) {
  if (question.type === "identification") {
    const input = document.getElementById("answer-input");
    return input && input.value.trim() !== "";
  } else if (question.type === "truefalse") {
    return document.querySelector('input[name="truefalse"]:checked') !== null;
  } else {
    return document.querySelector(".option-button.selected") !== null;
  }
}

function updateFreePassDisplay() {
  const freePassElements = document.getElementsByClassName("freePassDisplay");
  for (let element of freePassElements) {
    element.textContent = freePassCount;
  }
  // Save to sessionStorage whenever the display is updated
  sessionStorage.setItem("freePassCount", freePassCount);
}

function updatePassButtonState() {
  // Enable the pass button if there are free passes available
  if (freePassCount > 0) {
    passButton.disabled = false;
    passButton.classList.remove("disabled");
  } else {
    passButton.disabled = true;
    passButton.classList.add("disabled");
  }
}

// Add pass question functionality
function passQuestion() {
  if (freePassCount > 0) {
    const question = currentQuestions[currentQuestionIndex];
    freePassCount--;
    // Update storage and display
    sessionStorage.setItem("freePassCount", freePassCount);
    updateFreePassDisplay();

    // Show correct answer
    feedbackDiv.textContent = `Skipped. The correct answer is: ${
      question.answer || question.truefalse || question.correct
    }`;
    feedbackDiv.style.backgroundColor = "#808080"; // Gray color for skipped questions
    feedbackDiv.style.display = "block";

    // Disable interaction
    if (question.type === "truefalse") {
      const radioInputs = document.querySelectorAll('input[name="truefalse"]');
      radioInputs.forEach((input) => {
        input.disabled = true;
      });
    } else if (question.type !== "identification") {
      const options = document.querySelectorAll(".option-button");
      options.forEach((option) => {
        option.disabled = true;
        if (option.dataset.correct === "true") {
          option.classList.add("correct");
        }
      });
    }

    setTimeout(() => {
      feedbackDiv.style.display = "none"; // Hide feedback
      nextQuestion();
      updatePassButtonState();
    }, 2000);
  }
}

sessionStorage.setItem("quiz1completed", "false");
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    displayQuestion(currentQuestionIndex);
    noOfQuestion++;
    disNoOfQuestion.textContent = noOfQuestion;
  } else {
    sessionStorage.setItem("quiz1completed", "true");

    // Hide all unnecessary elements
    passButton.style.display = "none"; // Hide pass button on quiz completion
    submitButton.style.display = "none";
    feedbackDiv.style.display = "none";
    validationMessage.style.display = "none";
    questionContainer.style.display = "none";
    document.querySelector(".scoreCon").style.display = "none";
    document.getElementById("finalScore").textContent = currentScore1;
    document.getElementById("overScore").textContent = noOfQuestion;
    document.getElementById("quiz-completion").style.display = "block";
    document.getElementById("quiz1Score").textContent = currentScore1;
    document.getElementById("quiz1Overscore").textContent = noOfQuestion;
    
  }
}

submitButton.addEventListener("click", checkAnswer);
passButton.addEventListener("click", passQuestion);

let backtozero = 0;
window.onload = function () {
  if (performance.navigation.type === 1) {
    // Redirect to 'home.html'
    sessionStorage.setItem("score2", backtozero);
    sessionStorage.setItem("score3", backtozero);
    sessionStorage.setItem("score", backtozero);
    sessionStorage.setItem("currentScore", backtozero);
    window.location.href = "home.html";
    freePassCount = 0;
    sessionStorage.setItem("freePassCount", freePassCount); // Reset stored value
    return;
  }
};
