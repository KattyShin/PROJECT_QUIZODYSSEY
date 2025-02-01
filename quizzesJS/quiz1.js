// quiz 1

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
let currentScore1 = 0;
let count = 0;
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
      if (count == 0) {
        initializeQuiz();
      }
    }
  });
}, 5000);

async function getMaxScore() {
  try {
    const getmaxscore = await get(
      ref(db, `user/${username}/quizzes/${quiz_id}`)
    );
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
    const snapshot = await get(child(dbRef, `user/${username}/quizzes/${quiz_id}/quizitems`));


    if (snapshot.exists()) {
      // Get all questions
      const allQuestions = Object.values(snapshot.val());
      const numberOfQuestionsToShow = Math.floor(allQuestions.length / 3);

      // Select and shuffle questions
      currentQuestions = allQuestions.slice(0, numberOfQuestionsToShow);
      shuffleArray(currentQuestions);

      document.getElementById("questionsShown").textContent =
        numberOfQuestionsToShow;
      document.getElementById("overAllScore").textContent =
        window.totalQuestionsInDB;
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
  
  // Format the question text by replacing a), b), c) with line breaks
  let formattedQuestion = question.question;
  
  // Check if the question contains multiple choice indicators
  if (formattedQuestion.includes('a)') || 
      formattedQuestion.includes('b)') || 
      formattedQuestion.includes('c)')) {
      
      // Replace the markers with line breaks and maintain proper spacing
      formattedQuestion = formattedQuestion
          .replace(/([abc]\))/g, '<br><br>$1 ')
          // Add extra padding for options to make them stand out
          .replace(/<br><br>([abc]\))/g, '<br><br>&nbsp;&nbsp;&nbsp;$1');
  }

  let inputHtml = '';
  // Check if the question's answer is "True" or "False"
  if (question.answer === "True" || question.answer === "False") {
    inputHtml = `
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
    inputHtml = `
      <div class="input-container">
        <input type="text" 
               id="answer-input" 
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
  
  // Enable/disable submit button based on input type
  if (question.answer === "True" || question.answer === "False") {
    const radioInputs = document.querySelectorAll('input[name="truefalse"]');
    radioInputs.forEach(radio => {
      radio.addEventListener('change', () => {
        validationMessage.style.display = 'none';
        submitButton.disabled = false;
      });
    });
  } else {
    const input = document.getElementById('answer-input');
    input.addEventListener('input', () => {
      validationMessage.style.display = 'none';
      submitButton.disabled = input.value.trim() === '';
    });
  }
  submitButton.disabled = true;
}
function checkAnswer() {
  const question = currentQuestions[currentQuestionIndex];
  let userInput;
  let isCorrect = false;
  
  if (question.answer === "True" || question.answer === "False") {
    const selectedRadio = document.querySelector('input[name="truefalse"]:checked');
    if (!selectedRadio) {
      validationMessage.textContent = 'Please select an answer';
      validationMessage.style.display = 'block';
      return;
    }
    userInput = selectedRadio.value;
    isCorrect = userInput === question.answer;
    
    // Disable radio inputs
    const radioInputs = document.querySelectorAll('input[name="truefalse"]');
    radioInputs.forEach(input => input.disabled = true);
  } else {
    userInput = document.getElementById('answer-input').value.trim().toLowerCase();
    if (!userInput) {
      validationMessage.textContent = 'Please enter an answer';
      validationMessage.style.display = 'block';
      return;
    }
    isCorrect = userInput === question.answer.toLowerCase();
    
    // Disable text input
    document.getElementById('answer-input').disabled = true;
  }
  
  // Show feedback
  feedbackDiv.textContent = isCorrect ? 
    'Correct!' : 
    `Incorrect. The correct answer is: ${question.answer}`;
  feedbackDiv.style.backgroundColor = isCorrect ? '#4CAF50' : '#f44336';
  feedbackDiv.style.display = 'block';
  
  submitButton.style.display = 'none';
  
  if (isCorrect) {
    currentScore1++;
    incrementScore();
    document.getElementById("score").textContent = currentScore1;
    document.getElementById("currentScore").textContent = window.overAllScore;
  }
  
  setTimeout(() => {
    nextQuestion();
  }, 1000);
}


// Event listener for submit button
submitButton.addEventListener('click', checkAnswer);

// Add event listener for Enter key
document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && !submitButton.disabled) {
      checkAnswer();
  }
});

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
initializeQuiz()