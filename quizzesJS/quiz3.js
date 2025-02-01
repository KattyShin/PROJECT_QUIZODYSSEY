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
    const snapshot = await get(child(dbRef, `user/${username}/quizzes/${quiz_id}/quizitems`));

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
      document.getElementById("currentScore").textContent = score3;
      
      displayQuestion3(currentQuestion3Index);
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
  
  let formattedQuestion = question.question;
  
  if (formattedQuestion.includes('a)') || 
      formattedQuestion.includes('b)') || 
      formattedQuestion.includes('c)')) {
      formattedQuestion = formattedQuestion
          .replace(/([abc]\))/g, '<br><br>$1 ')
          .replace(/<br><br>([abc]\))/g, '<br><br>&nbsp;&nbsp;&nbsp;$1');
  }

  let inputHtml = '';
  if (question.answer === "True" || question.answer === "False") {
    inputHtml = `
      <div class="radio-group">
        <div class="radio-option">
          <input type="radio" id="true3" name="truefalse3" value="True">
          <label for="true3">True</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="false3" name="truefalse3" value="False">
          <label for="false3">False</label>
        </div>
      </div>
    `;
  } else {
    inputHtml = `
      <div class="input-container">
        <input type="text" 
               id="answer-input3" 
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
  submitButton.style.display = 'block';
  feedbackDiv.style.display = 'none';
  validationMessage.style.display = 'none';
  
  if (question.answer === "True" || question.answer === "False") {
    const radioInputs = document.querySelectorAll('input[name="truefalse3"]');
    radioInputs.forEach(radio => {
      radio.addEventListener('change', () => {
        validationMessage.style.display = 'none';
        submitButton.disabled = false;
      });
    });
  } else {
    const input = document.getElementById('answer-input3');
    input.addEventListener('input', () => {
      validationMessage.style.display = 'none';
      submitButton.disabled = input.value.trim() === '';
    });
  }
  submitButton.disabled = true;
}

function checkAnswer3() {
  const question = currentQuestion3[currentQuestion3Index];
  let userInput;
  let isCorrect = false;
  
  if (question.answer === "True" || question.answer === "False") {
    const selectedRadio = document.querySelector('input[name="truefalse3"]:checked');
    if (!selectedRadio) {
      validationMessage.textContent = 'Please select an answer';
      validationMessage.style.display = 'block';
      return;
    }
    userInput = selectedRadio.value;
    isCorrect = userInput === question.answer;
    
    const radioInputs = document.querySelectorAll('input[name="truefalse3"]');
    radioInputs.forEach(input => input.disabled = true);
  } else {
    userInput = document.getElementById('answer-input3').value.trim().toLowerCase();
    if (!userInput) {
      validationMessage.textContent = 'Please enter an answer';
      validationMessage.style.display = 'block';
      return;
    }
    isCorrect = userInput === question.answer.toLowerCase();
    
    document.getElementById('answer-input3').disabled = true;
  }
  
  feedbackDiv.textContent = isCorrect ? 
    'Correct!' : 
    `Incorrect. The correct answer is: ${question.answer}`;
  feedbackDiv.style.backgroundColor = isCorrect ? '#4CAF50' : '#f44336';
  feedbackDiv.style.display = 'block';
  
  submitButton.style.display = 'none';
  
  if (isCorrect) {
    currentScore3++;
    incrementScore();
    document.getElementById("score3").textContent = currentScore3;
    document.getElementById("currentScore").textContent = window.overAllScore;
  }
  
  setTimeout(() => {
    nextQuestion3();
  }, 1000);
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