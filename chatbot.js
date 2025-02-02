import {
  app,
  db,
  ref,
  get,
  child,
  getDatabase,
} from "../firebaseCOnnection/firebaseCon.js";

const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = fileUploadWrapper.querySelector("#file-cancel");
const closeChatbot = document.querySelector("#close-chatbot");

// Initialize user message and file data
const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

// Store chat history
let reveal = 0;
const maxReveal = 3;

const initialInputHeight = messageInput.scrollHeight;

async function checkQuestionInDatabase(question) {
  try {
    const username = sessionStorage.getItem("username");
    const quiz_id = sessionStorage.getItem("quiz_id");
    const dbRef = ref(getDatabase());

    const snapshot = await get(child(dbRef, `user/${username}/quizzes/${quiz_id}/quizitems`));

    let answer = null;

    if (snapshot.exists()) {
      const allQuestions = Object.values(snapshot.val());
     

      // Normalize input by removing extra spaces and newlines
      const normalizedInputQuestion = question.toLowerCase().trim().replace(/\s+/g, " ");

      const matchingQuestion = allQuestions.find((questionData) => {
        // Normalize database question
        const dbQuestion = questionData.question.toLowerCase().trim().replace(/\s+/g, " ");
        return normalizedInputQuestion === dbQuestion;
      });
      

      if (matchingQuestion) {
        // Simply return the answer property, no naeed to check types
        answer = matchingQuestion.answer;
        reveal++;
      }
    }

    return answer;
  } catch (error) {
    console.error("Error checking question:", error);
    return null;
  }
}

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Generate bot response based on rules
const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");
  const userMessage = userData.message.toLowerCase();
  
  // Rule-based responses
  if (userMessage === "house") {
    messageElement.innerHTML = `<b>The House of Wisdom (STAGE 1)</b><br>
      - An ancient mansion filled with challenges. It is said that only those with true wisdom can pass through its trials. 
      <br><b>The House of Mystery (STAGE 2)</b> - A mansion shrouded in darkness and mystery. Its rooms are filled with cryptic riddles and secrets waiting to be uncovered.
      <br><b>The House of Strength (STAGE 3)</b><br>- A fortress built for the bravest of adventurers. It is home to fierce trials that test not only your knowledge but your resilience.
      <br>Each house offers different challenges, but only the wise and determined will succeed in their quests!`;
  } 
  else if (userMessage === "chest") {
    messageElement.innerHTML = `📦 About Treasure Chests:<br>
      In Quiz Odyssey, treasure chests can contain various items:<br>
      "Better luck next time!"<br>
      "Oops, no luck today!"<br>
      "Looks like a dud!" <br>
      "No luck, sorry!"<br>
      "Free 1 Pass `;
  }
  else if (userMessage === "help") {
    messageElement.innerHTML = `🎮<b> Quiz Odyssey Guide:</b><br>
                    1. Type 'chest' to know what's inside <br>
                    2. Type 'reveal followed by question (including the choices for multiple choice)' for free reveal (maximum 3)<br>

                    3. Type 'houses' to learn about the different houses<br>`;
                    
  }
  // Handle reveal command
  else if (userMessage.startsWith("reveal")) {
    const question = userData.message.slice(6).trim();
    const answer = await checkQuestionInDatabase(question);

    if (reveal > maxReveal) {
      messageElement.innerText = "You have reached the Maximum free Reveal.";
    } else if (answer) {
      messageElement.innerText = `The answer is: ${answer}`;
      // reveal++;
    } else {
      messageElement.innerText = "I couldn't find this question in your items.";
    }
  }
  else {
    messageElement.innerText = "I don't understand that command. Type 'help' for available commands.";
  }

  userData.file = {};
  incomingMessageDiv.classList.remove("thinking");
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
};

// Handle outgoing user messages
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));
  fileUploadWrapper.classList.remove("file-uploaded");

  const messageContent = `<div class="message-text"></div>
                          ${userData.file.data ? 
                            `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` 
                            : ""}`;

  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  setTimeout(() => {
    const messageContent = `<img class="bot-avatar" src="/img/npc.png" alt="Chatbot Logo" width="50" height="50">
          </img>
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;

    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && !e.shiftKey && userMessage && window.innerWidth > 768) {
    handleOutgoingMessage(e);
  }
});

sendMessage.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());