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
let count = 0

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
      if(count == 0){
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
      child(dbRef, `user/${username}/quizzes/${quiz_id}/quizItems`)
    );
    if (snapshot.exists()) {
      const allQuestions2 = Object.values(snapshot.val());
      totalQuestionsInDB = allQuestions2.length;

      const thirdSize = Math.floor(totalQuestionsInDB / 3);
      const startIndex = thirdSize;
      const endIndex = startIndex + thirdSize;

      currentQuestion2 = allQuestions2.slice(startIndex, endIndex);
      shuffleArray2(currentQuestion2);

      document.getElementById("questionsShown2").textContent =
        currentQuestion2.length;

      console.log("Quiz2 starting with score:", score2);
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
  let html = `<h2>${question.question}</h2>`;
  html += '<div class="options-container2">';
  submitButton.style.display = "block";
  passButton.style.display = "block";
  feedbackDiv.style.display = "none";

  updateStateButton2();

  if (question.type === "identification") {
    html += `<input type="text" class="option-button2" id="answer-input2" placeholder="Enter your answer">`;
  } else if (question.type === "truefalse") {
    html += `
      <div class="radio-group2">
        <div class="radio-option2">
          <input type="radio" id="true2" name="truefalse" value="True">
          <label for="true2">True</label>
        </div>
        <div class="radio-option2">
          <input type="radio" id="false2" name="truefalse" value="False">
          <label for="false2">False</label>
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
      html += `<button class="option-button2" data-correct="${option.correct}">${option.text}</button>`;
    });
  }

  html += "</div>";
  questionContainer.innerHTML = html;
  validationMessage.style.display = "none";

  if (question.type === "identification") {
    const input = document.getElementById("answer-input2");
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
    const options = document.querySelectorAll(".option-button2");
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

function checkAnswer2() {
  const question = currentQuestion2[currentQuestion2Index];

  if (!hasAnswer2(question)) {
    validationMessage.style.display = "block";
    return;
  }

  let isCorrect = false;
  let selectedAnswer;

  if (question.type === "identification") {
    const userInput = document
      .getElementById("answer-input2")
      .value.trim()
      .toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    isCorrect = userInput === correctAnswer;
    selectedAnswer = userInput;
  } else if (question.type === "truefalse") {
    const selectedRadio = document.querySelector(
      'input[name="truefalse"]:checked'
    );
    if (selectedRadio) {
      isCorrect = selectedRadio.value === question.truefalse;
      selectedAnswer = selectedRadio.value;
    }
  } else {
    const selectedOption = document.querySelector(".option-button2.selected");
    if (selectedOption) {
      isCorrect = selectedOption.dataset.correct === "true";
      selectedAnswer = selectedOption.textContent;
    }
  }

  validationMessage.style.display = "none";

  if (isCorrect) {
    currentScore2++;
    // console.log('prev:', window.overAllScore)
    incrementScore()
    // console.log('next:', window.overAllScore)
    document.getElementById("score2").textContent = currentScore2;
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
    nextQuestion2();
  }, 1000);

  disableOptions2(question, selectedAnswer);
}

function disableOptions2(question, selectedAnswer) {
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
    const options = document.querySelectorAll(".option-button2");
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

function hasAnswer2(question) {
  if (question.type === "identification") {
    const input = document.getElementById("answer-input2");
    return input && input.value.trim() !== "";
  } else if (question.type === "truefalse") {
    return document.querySelector('input[name="truefalse"]:checked') !== null;
  } else {
    return document.querySelector(".option-button2.selected") !== null;
  }
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
    sessionStorage.setItem("score", 0)

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
