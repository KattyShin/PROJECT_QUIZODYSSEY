const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillRect(0, 0, canvas.width, canvas.height);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resizeCanvas);

const collisionsMap = [];

//-------GET COLLISION PART------------
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const quiz1Map = [];
for (let i = 0; i < quiz1Data.length; i += 70) {
  quiz1Map.push(quiz1Data.slice(i, 70 + i));
}

const quiz2Map = [];
for (let i = 0; i < quiz2Data.length; i += 70) {
  quiz2Map.push(quiz2Data.slice(i, 70 + i));
}

const quiz3Map = [];
for (let i = 0; i < quiz3Data.length; i += 70) {
  quiz3Map.push(quiz3Data.slice(i, 70 + i));
}

const npcHome1Map = [];
for (let i = 0; i < npcHome1Data.length; i += 70) {
  npcHome1Map.push(npcHome1Data.slice(i, 70 + i));
}

const oceanSceneryMap = [];
for (let i = 0; i < oceanSceneryData.length; i += 70) {
  oceanSceneryMap.push(oceanSceneryData.slice(i, 70 + i));
}

const home3NearbyMap = [];
for (let i = 0; i < home3NearbyData.length; i += 70) {
  home3NearbyMap.push(home3NearbyData.slice(i, 70 + i));
}

const chestNearbyMap = [];
for (let i = 0; i < chestNearbyData.length; i += 70) {
  chestNearbyMap.push(chestNearbyData.slice(i, 70 + i));
}

const chest1Map = [];
for (let i = 0; i < chest1Data.length; i += 70) {
  chest1Map.push(chest1Data.slice(i, 70 + i));
}

const chest2Map = [];
for (let i = 0; i < chest2Data.length; i += 70) {
  chest2Map.push(chest2Data.slice(i, 70 + i));
}

const chest3Map = [];
for (let i = 0; i < chest3Data.length; i += 70) {
  chest3Map.push(chest3Data.slice(i, 70 + i));
}

// CHECK CLASSES.JS FOR CLASS CREATION
//--STOP THE PLAYUER IN COLLISON AREA----------------------------------------------------------------------------------------

const boundaries = [];
const offset = {
  x: 0,
  y: -595,
};
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const quiz1 = [];
quiz1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      quiz1.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const quiz2 = [];
quiz2Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      quiz2.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const quiz3 = [];
quiz3Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      quiz3.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const npcHome1 = [];
npcHome1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      npcHome1.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const oceanScenery = [];
oceanSceneryMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      oceanScenery.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const home3Nearby = [];
home3NearbyMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      home3Nearby.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const chestNearby = [];
chestNearbyMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chestNearby.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const chest1 = [];
chest1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chest1.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
const chest2 = [];
chest2Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chest2.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const chest3 = [];
chest3Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      chest3.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const image = new Image();
image.src = "./img/Pellet Town.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundObjects.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

//------------------------------------------------------------------------------------------

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
function resetMovementKeys() {
  keys.w.pressed = false;
  keys.a.pressed = false;
  keys.s.pressed = false;
  keys.d.pressed = false;
}

// INDICATOR MODAL
const style = document.createElement("style");
style.textContent = `
.collision-indicator {
position: fixed;
background-color: rgba(0, 0, 0, 0.6);
color: white;
padding: 10px 10px;
border-radius: 5px;
font-size: 11px;
pointer-events: none;
animation: float 1s infinite ease-in-out;
z-index: 900;
}

@keyframes float {
0%, 100% { transform: translate(-50%, -100%); }
50% { transform: translate(-50%, -110%); }
}
`;
document.head.appendChild(style);

const collisionIndicators = {
  F: {},
  T: {},
  oceanScene: {},
  home3Nearby: {},
  chestNearby: {},
  chest1: {},
  chest2: {},
  chest3: {},
};

//----IF COLIDE SHOW INDICATOR--------------------------------------------------------------------------------------
function updateCollisionIndicator(show, playerPosition, id, type) {
  if (show) {
    if (!collisionIndicators[type][id] && type == "F") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = ` Press  "${type}" to Enter`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
      return;
    }

    if (!collisionIndicators[type][id] && type == "T") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = ` Press "${type}" to talk`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "oceanScene") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Wow, the ocean's beauty is absolutely breathtaking`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "home3Nearby") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `On, Look....There's a House Nearby`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "chestNearby") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `halah naay chest`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "chest1") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Press E`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }
    if (!collisionIndicators[type][id] && type == "chest2") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Press E`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (!collisionIndicators[type][id] && type == "chest3") {
      const indicator = document.createElement("div");
      indicator.className = "collision-indicator";
      indicator.textContent = `Press E`;
      indicator.id = `collision-indicator-${id}-${type}`;
      document.body.appendChild(indicator);
      collisionIndicators[type][id] = indicator;
    }

    if (collisionIndicators[type][id]) {
      const canvasRect = canvas.getBoundingClientRect();
      const indicator = collisionIndicators[type][id];
      indicator.style.left = `${
        canvasRect.left + playerPosition.x + player.width / 2
      }px`;
      indicator.style.top = `${canvasRect.top + playerPosition.y - 20}px`;
      indicator.style.display = "block";
    }
  } else {
    if (collisionIndicators[type][id]) {
      collisionIndicators[type][id].remove();
      delete collisionIndicators[type][id];
    }
  }
}

let playerLastPosition = {
  x: offset.x,
  y: offset.y,
};

const activeListeners = {
  quiz1: null,
  quiz2: null,
  quiz3: null,
  npcHome1: null,
  oceanScenery: null,
  home3Nearby: null,
  chestNearby: null,
  chest1: null,
  chest2: null,
  chest3: null,
};

var freePassCount = 0;
let isDialogOpen = false;
const chestOpened = {
  chest1Div: false,
  chest2Div: false,
  chest3Div: false,
};

const chestClaimed = {};
function addKeyPressListenerForNpC(id, divId) {
  if (activeListeners[id]) {
    document.removeEventListener("keydown", activeListeners[id]);
    activeListeners[id] = null;
  }

  const listener = (e) => {
    if (e.key === "t" || e.key === "T") {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      handleNPCDialog(id, divId);
      resetMovementKeys();
      return;
    }
  };

  document.addEventListener("keydown", listener);
  activeListeners[id] = listener;
}

function addKeyPressListenerChest(id, divId) {
  if (activeListeners[id]) {
    document.removeEventListener("keydown", activeListeners[id]);
    activeListeners[id] = null;
  }
  const listener = (e) => {
    if ((e.key === "e" || e.key === "E") && divId.startsWith("chest")) {
      e.preventDefault();
      handleChestInteraction(id, divId);
      resetMovementKeys();
      return;
    }
  };

  document.addEventListener("keydown", listener);
  activeListeners[id] = listener;
}

function isAnyChestOpen() {
  return Object.keys(chestOpened).some((chestId) => {
    const chest = document.getElementById(chestId);
    return chest && chest.style.display === "block";
  });
}

function handleChestInteraction(id, divId) {
  const chestDiv = document.getElementById(divId);
  if (!chestDiv) return;

  const isChestCurrentlyOpen = chestDiv.style.display === "block";

  if (!chestOpened[divId]) {
    const chestContent = getRandomChestContent(divId);
    chestDiv.querySelector(".chest-content").innerHTML = chestContent;
    chestOpened[divId] = true;
    chestDiv.style.display = "block";
    resetMovementKeys();
  } else if (isChestCurrentlyOpen) {
    chestDiv.style.display = "none";
  } else {
    chestDiv.style.display = "block";
    resetMovementKeys();
  }
}
function handleNPCDialog(id, divId) {
  const npcDialog = document.getElementById(divId);

  if (npcDialog) {
    // Use getComputedStyle to handle visibility correctly
    const currentDisplayState = window.getComputedStyle(npcDialog).display;

    const newDisplayState = currentDisplayState === "none" ? "flex" : "none";
    npcDialog.style.display = newDisplayState;

    // Track whether the dialog is open
    isDialogOpen = newDisplayState === "flex";

    if (isDialogOpen) {
      resetMovementKeys();
    }

    // Clear input fields when dialog closes
    const inputElements = npcDialog.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.value = "";
    });
  }
}

function getRandomChestContent(chestId) {
  const contentOptions = [
    "You got a two Free Pass! Use it to skip a question.",
    // "Oops, no luck today!",
    // "Looks like a dud!",
    "You got a two Free Pass! Use it to skip a question.",
    // "No luck, sorry!",
  ];

  const randomContent =
    contentOptions[Math.floor(Math.random() * contentOptions.length)];

  if (randomContent.includes("Free Pass")) {
    if (chestClaimed[chestId]) {
      return `
          <h5>You have successfuly redeemed the Free Pass!</h5>
          <p>You can't claim it again.</p>
        `;
    } else {
      return `
          <div class="reward-container">
              <h5>Congratulations! You have earned 1 Free Pass!</h5>
              <p style="font-size: 10px;">Use this pass to skip a question and move to the next one.</p>
              <div class="claim-pass-con" style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                  <img class="chest-claim-img" src="img/chest.png" alt="" style="width: 100px; height: auto;">
                  <button class="claim-pass" 
                          onclick="handleClaim('${chestId}')"
                          style="padding: 10px 30px; 
                                 background-color: #4CAF50; 
                                 color: white; 
                                 border: none; 
                                 border-radius: 5px; 
                                 cursor: pointer;">
                      Claim
                  </button>
              </div>
          </div>
        `;
    }
  } else {
    return `
      <h5>${randomContent}</h5>
    `;
  }
}

function handleClaim(chestId) {
  const chestDiv = document.getElementById(chestId);
  if (!chestDiv) {
    console.error("Chest div not found for id:", chestId);
    return;
  }

  if (chestClaimed[chestId]) {
    alert("You've already claimed this Free Pass!");
    return;
  }

  chestClaimed[chestId] = true;
  chestDiv.querySelector(".chest-content").innerHTML = `
 <h5>You have successfuly redeemed the Free Pass!</h5>
          <p>You can't claim it again.</p>     
    `;

  // Increment the Free Pass count
  freePassCount++;

  // Store the Free Pass count in localStorage
  sessionStorage.setItem("freePassCount", freePassCount);

  updateFreePassDisplay();
  // Optionally, you can update the UI here if you want to show the current Free Pass count to the player
}

function updateFreePassDisplay() {
  const freePassElements = document.getElementsByClassName("freePassDisplay");
  for (let element of freePassElements) {
    element.textContent = `${freePassCount}`;
  }
}

let collisionDetected = {
  quiz1: false,
  quiz2: false,
  quiz3: false,
  npcHome1: false,
  oceanScenery: false,
  home3Nearby: false,
  chestNearby: false,
  chest1: false,
  chest2: false,
  chest3: false,
};

const movables = [
  background,
  ...boundaries,
  foreground,
  ...quiz1,
  ...quiz2,
  ...quiz3,
  ...npcHome1,
  ...oceanScenery,
  ...home3Nearby,
  ...chestNearby,
  ...chest1,
  ...chest2,
  ...chest3,
];

// GET POSITION SA TILE------------------------------------------
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// -------------------no-collision handlers----------------------------------
function updateNoCollisionHandlers() {
  if (!collisionDetected.quiz1) {
    updateCollisionIndicator(false, null, "quiz1", "F");
    if (activeListeners.quiz1) {
      document.removeEventListener("keydown", activeListeners.quiz1);
      activeListeners.quiz1 = null;
    }
  }

  if (!collisionDetected.quiz2) {
    updateCollisionIndicator(false, null, "quiz2", "F");
    if (activeListeners.quiz2) {
      document.removeEventListener("keydown", activeListeners.quiz2);
      activeListeners.quiz2 = null;
    }
  }

  if (!collisionDetected.quiz3) {
    updateCollisionIndicator(false, null, "quiz3", "F");
    if (activeListeners.quiz3) {
      document.removeEventListener("keydown", activeListeners.quiz3);
      activeListeners.quiz3 = null;
    }
  }

  if (!collisionDetected.npcHome1) {
    updateCollisionIndicator(false, null, "npcHome1", "T");
    if (activeListeners.npcHome1) {
      document.removeEventListener("keydown", activeListeners.npcHome1);
      activeListeners.npcHome1 = null;
    }
  }

  if (!collisionDetected.oceanScenery) {
    updateCollisionIndicator(false, null, "oceanScenery", "oceanScene");
    if (activeListeners.oceanScenery) {
      document.removeEventListener("keydown", activeListeners.oceanScenery);
      activeListeners.oceanScenery = null;
    }
  }
  if (!collisionDetected.home3Nearby) {
    updateCollisionIndicator(false, null, "home3Nearby", "home3Nearby");
    if (activeListeners.home3Nearby) {
      document.removeEventListener("keydown", activeListeners.home3Nearby);
      activeListeners.home3Nearby = null;
    }
  }
  if (!collisionDetected.chestNearby) {
    updateCollisionIndicator(false, null, "chestNearby", "chestNearby");
    if (activeListeners.chestNearby) {
      document.removeEventListener("keydown", activeListeners.chestNearby);
      activeListeners.chestNearby = null;
    }
  }
  if (!collisionDetected.chest1) {
    updateCollisionIndicator(false, null, "chest1", "chest1");
    if (activeListeners.chest1) {
      document.removeEventListener("keydown", activeListeners.chest1);
      activeListeners.chest1 = null;
    }
  }
  if (!collisionDetected.chest2) {
    updateCollisionIndicator(false, null, "chest2", "chest2");
    if (activeListeners.chest2) {
      document.removeEventListener("keydown", activeListeners.chest2);
      activeListeners.chest2 = null;
    }
  }
  if (!collisionDetected.chest3) {
    updateCollisionIndicator(false, null, "chest3", "chest3");
    if (activeListeners.chest3) {
      document.removeEventListener("keydown", activeListeners.chest3);
      activeListeners.chest3 = null;
    }
  }
}

//-----ANIMATE-------------------------------------------------------------------------------------

let isQuizOPen = false;
let isnotFinish = false;
function displayQuiz1() {}

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  quiz1.forEach((quiz) => {
    quiz.draw();
  });
  quiz2.forEach((quiz) => {
    quiz.draw();
  });
  quiz3.forEach((quiz) => {
    quiz.draw();
  });
  npcHome1.forEach((npc1) => {
    npc1.draw();
  });
  oceanScenery.forEach((oceanScene) => {
    oceanScene.draw();
  });
  home3Nearby.forEach((home3Near) => {
    home3Near.draw();
  });
  chestNearby.forEach((chestNear) => {
    chestNear.draw();
  });
  chest1.forEach((chest) => {
    chest.draw();
  });
  chest2.forEach((chest) => {
    chest.draw();
  });

  chest3.forEach((chest) => {
    chest.draw();
  });

  // dragle.draw();

  player.draw();
  foreground.draw();

  Object.keys(collisionDetected).forEach(
    (key) => (collisionDetected[key] = false)
  );

  quiz1.forEach((quiz) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...quiz,
          position: {
            x: quiz.position.x,
            y: quiz.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.quiz1 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "quiz1",
        "F"
      );
    
      const listener = (e) => {
        if (e.key === "f" || e.key === "F") {
         
          if (!collisionDetected.quiz1) return;

          isQuizOPen = true;
          if (isQuizOPen) {
            resetMovementKeys();
          }

          // Check if quiz1 is already completed
          const isQuiz1Completed =
            sessionStorage.getItem("quiz1completed") === "true";

          if (isQuiz1Completed) {
            document.querySelector(".quiz-completed-message").style.display =
              "flex";
            document.removeEventListener("keydown", listener);
            return;
          }

          // Direct style manipulation without conditions
          document.getElementById("canvaCon").style.display = "none";
          document.querySelector(".quiz-completed-message2").style.display =
            "none";
          document.querySelector(".container-quiz2").style.display = "none";
          document.querySelector(".quiz-completed-message3").style.display =
            "none";
          document.querySelector(".container-quiz3").style.display = "none";

          document.querySelector(".container-quiz1").style.display = "flex";
          document.querySelector(".welcome-text").style.display = "block";
          document.querySelector(".quiz-container").style.display = "none";
          document.querySelector(".container-quiz2").style.display = "none";

          if (isQuizOPen) {
            resetMovementKeys();
            sessionStorage.setItem("freePassCount", freePassCount);
          }

          document.removeEventListener("keydown", listener);
        }
      };
      document.addEventListener("keydown", listener);
     
    }
  });

  // Updated JavaScript for quiz2
  quiz2.forEach((quiz) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...quiz,
          position: {
            x: quiz.position.x,
            y: quiz.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.quiz2 = true;

      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "quiz2",
        "F"
      );

      const listener = (e) => {
        if (e.key === "f" || e.key === "F") {
          if (!collisionDetected.quiz2) return;

          isQuizOPen = true;

          if (isQuizOPen) {
            resetMovementKeys();
          }

          // Check quiz2 completion
          const isQuiz2Completed =
            sessionStorage.getItem("quiz2completed") === "true";
          if (isQuiz2Completed) {
            document.querySelector(".quiz-completed-message2").style.display =
              "flex";
            document.removeEventListener("keydown", listener);
            return;
          }

          // Check quiz1 completion
          const isQuiz1Completed =
            sessionStorage.getItem("quiz1completed") === "false";
          if (isQuiz1Completed) {
            document.querySelector(
              ".quiz1-notcompleted-message2"
            ).style.display = "flex";
            document.removeEventListener("keydown", listener);
            return;
          }

          document.getElementById("canvaCon").style.display = "none";
          document.querySelector(".quiz-completed-message").style.display =
            "none";
          document.querySelector(".container-quiz1").style.display = "none";
          document.querySelector(".quiz-completed-message3").style.display =
            "none";
          document.querySelector(".container-quiz3").style.display = "none";

          document.querySelector(".container-quiz2").style.display = "flex";
          document.querySelector(".welcome-text2").style.display = "block";
          document.querySelector(".quiz-container2").style.display = "none";

          sessionStorage.setItem("freePassCount", freePassCount);

          document.removeEventListener("keydown", listener);
        }
      };

      document.addEventListener("keydown", listener);
    }
  });

  // QUIZ 3
  quiz3.forEach((quiz) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...quiz,
          position: {
            x: quiz.position.x,
            y: quiz.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.quiz3 = true;

      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "quiz3",
        "F"
      );

      const listener = (e) => {
        if (e.key === "f" || e.key === "F") {
          if (!collisionDetected.quiz3) return;

          isQuizOPen = true;

          if (isQuizOPen) {
            resetMovementKeys();
          }

          // Check quiz3 completion
          const isQuiz3Completed =
            sessionStorage.getItem("quiz3completed") === "true";
          if (isQuiz3Completed) {
            document.querySelector(".quiz-completed-message3").style.display =
              "flex";
            document.removeEventListener("keydown", listener);
            return;
          }

          // Check quiz1 completion
          const isQuiz1Completed =
            sessionStorage.getItem("quiz1completed") === "false";
          const isQuiz2Completed =
            sessionStorage.getItem("quiz2completed") === "false";

          if (isQuiz1Completed) {
            document.querySelector(
              ".quiz12-notcompleted-message3"
            ).style.display = "flex";
            document.removeEventListener("keydown", listener);
            return;
          }

          if (isQuiz2Completed) {
            document.querySelector(
              ".quiz12-notcompleted-message3"
            ).style.display = "flex";
            document.removeEventListener("keydown", listener);
            return;
          }

          // Hide quiz1 completion message and canvas
          document.getElementById("canvaCon").style.display = "none";
          document.querySelector(".quiz-completed-message").style.display =
            "none";
          document.querySelector(".quiz-completed-message2").style.display =
            "none";
          document.querySelector(".container-quiz1").style.display = "none";
          document.querySelector(".container-quiz2").style.display = "none";

          // Show quiz2 container and welcome text
          document.querySelector(".container-quiz3").style.display = "flex";
          document.querySelector(".welcome-text3").style.display = "block";
          document.querySelector(".quiz-container3").style.display = "none";
          // Set up free pass count
          sessionStorage.setItem("freePassCount", freePassCount);

          document.removeEventListener("keydown", listener);
        }
      };

      document.addEventListener("keydown", listener);
    }
  });

  npcHome1.forEach((npc) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...npc,
          position: {
            x: npc.position.x,
            y: npc.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.npcHome1 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "npcHome1",
        "T" // Add this parameter to show "Press T"
      );

      addKeyPressListenerForNpC("npcHome1", "npcHome1Bot");
    }
  });

  oceanScenery.forEach((ocean) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...ocean,
          position: {
            x: ocean.position.x,
            y: ocean.position.y + 3,
          },
        },
      })
    ) {
      const isQuiz3Completed =
        sessionStorage.getItem("quiz3completed") === "true";
      isnotFinish = true;

      if (isnotFinish) {
        resetMovementKeys();
      }
      // resetMovementKeys();
      // if (player.position.x > 0) {
      //   player.position.x -= 10;
      // }

      if (isQuiz3Completed) {
        // Multiple feedback messages for each category
        resetMovementKeys();

        if (player.position.x > 0) {
          player.position.x -= 10;
        }

        const feedbackMessages = {
          excellent: [
            "Amazing! You're a legend! 🌟 Keep challenging yourself by exploring advanced topics!",
            "Outstanding performance! You're unstoppable! 🏆 Time to tackle even more complex problems!",
            "Brilliant work! You're a quiz master! 👑 Why not help others learn while mastering new topics?",
            "Exceptional! You've mastered this! ⭐ Challenge yourself with more advanced material!",
            "Incredible score! You're truly gifted! 🎯 Set new goals and push your boundaries further!",
          ],
          great: [
            "Great effort! Keep pushing forward! 💪 Review those few tricky questions to reach perfection!",
            "Impressive work! You're getting better! 🚀 Focus on those challenging questions to level up!",
            "Solid performance! Keep up the momentum! 📈 A bit more practice on difficult topics and you'll be amazing!",
            "Well done! You're making great progress! 🌟 Keep practicing those tougher concepts!",
            "Excellent effort! You're on the right track! 🎯 Just a bit more focus on the challenging parts!",
          ],
          average: [
            "Not bad! Keep practicing! 📚 Focus on understanding the core concepts and you'll improve quickly!",
            "You're getting there! Keep going! 💡 Try reviewing the basics and practice regularly!",
            "Good try! A bit more practice will help! 🎯 Focus on the topics you found most challenging!",
            "Making progress! Don't give up! 💪 Take time to review and understand each topic thoroughly!",
            "Keep at it! Practice makes perfect! ⭐ Regular study sessions will help you master this!",
          ],
          poor: [
            "Don't give up! Try again! 💪 Start with the basics and build your knowledge step by step!",
            "Everyone starts somewhere! Keep going! 🌱 Take your time to understand each concept fully!",
            "Practice will help you improve! 📚 Review the study materials and try again - you've got this!",
            "Stay determined! You can do better! 🎯 Break down the topics and tackle them one at a time!",
            "Keep trying! Success takes time! ⭐ Focus on understanding the fundamentals first!",
          ],
        };

        // Set up the UI elements
        document.getElementById("finishCon").style.display = "flex";
        document.getElementById("endGameScore").textContent =
          window.overAllScore;
        document.getElementById("finalOverScore").textContent =
          window.totalQuestionsInDB;
        const feedback = document.getElementById("feedbackRec");
        const percentageScore = Math.round(
          (window.overAllScore / window.totalQuestionsInDB) * 100
        );
        const trophyImage = document.getElementById("trophyImage");
        const restartButton = document.getElementById("restart");
        restartButton.style.display = "none";

        // Helper function to get random message
        const getRandomMessage = (messages) => {
          const randomIndex = Math.floor(Math.random() * messages.length);
          return messages[randomIndex];
        };

        let category;
        if (percentageScore >= 90) {
          trophyImage.src = "/img/star3.png";
          category = "excellent";
        } else if (percentageScore >= 60) {
          trophyImage.src = "/img/star2.png";
          category = "great";
        } else if (percentageScore >= 40) {
          trophyImage.src = "/img/star1.png";
          category = "average";
          restartButton.style.display = "block";
        } else {
          trophyImage.src = "/img/star0.png";
          category = "poor";
          restartButton.style.display = "block";
        }

        feedback.textContent = getRandomMessage(feedbackMessages[category]);
      } else {
        resetMovementKeys();
        document.getElementById("notfinishCon").style.display = "flex";
        document.getElementById("notFinishCon2").style.display = "flex";

        if (player.position.x > 0) {
          player.position.x -= 10;
        }
        return;
      }
    }
  });

  home3Nearby.forEach((home) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...home,
          position: {
            x: home.position.x,
            y: home.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.home3Nearby = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "home3Nearby",
        "home3Nearby"
      );
    }
  });

  chestNearby.forEach((chestNear) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chestNear,
          position: {
            x: chestNear.position.x,
            y: chestNear.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chestNearby = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chestNearby",
        "chestNearby"
      );
    }
  });

  chest1.forEach((chest) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chest,
          position: {
            x: chest.position.x,
            y: chest.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chest1 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chest1",
        "chest1" // Add this parameter to show "Press T"
      );

      addKeyPressListenerChest("chest1", "chest1Div");
    }
  });

  chest2.forEach((chest) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chest,
          position: {
            x: chest.position.x,
            y: chest.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chest2 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chest2",
        "chest2" // Add this parameter to show "Press T"
      );

      addKeyPressListenerChest("chest2", "chest2Div");
    }
  });

  chest3.forEach((chest) => {
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...chest,
          position: {
            x: chest.position.x,
            y: chest.position.y + 3,
          },
        },
      })
    ) {
      collisionDetected.chest3 = true;
      updateCollisionIndicator(
        true,
        {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        "chest3",
        "chest3" // Add this parameter to show "Press T"
      );
      // alert("Sdadds")
      addKeyPressListenerChest("chest3", "chest3Div");
    }
  });
  updateNoCollisionHandlers();

  let moving = true;
  player.moving = false;
  // BOUNDARY
  if (keys.w.pressed && lastKey === "w") {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
animate();

//-----MOVEMENTS-------------------------------------------------------------------------------------

let lastKey = "";
// Modify the window keydown event listener
window.addEventListener("keydown", (e) => {
  const activeElement = document.activeElement;
  if (
    activeElement.tagName === "TEXTAREA" ||
    activeElement.tagName === "INPUT"
  ) {
    return;
  }
  // Prevent movement if any chest is open or dialog is open
  if (!isDialogOpen && !isAnyChestOpen() && !isQuizOPen && !isnotFinish) {
    switch (e.key) {
      case "w":
      case "W":
        keys.w.pressed = true;
        lastKey = "w";
        break;
      case "a":
      case "A":
        keys.a.pressed = true;
        lastKey = "a";
        break;
      case "s":
      case "S":
        keys.s.pressed = true;
        lastKey = "s";
        break;
      case "d":
      case "D":
        keys.d.pressed = true;
        lastKey = "d";
        break;
    }
  } else {
    // Prevent movement entirely if chest or dialog is open
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
    case "W":
      keys.w.pressed = false;
      break;
    case "a":
    case "A":
      keys.a.pressed = false;
      break;
    case "s":
    case "S":
      keys.s.pressed = false;
      break;
    case "d":
    case "D":
      keys.d.pressed = false;
      break;
  }
});

// Add this function to handle returning to the game
function returnToGame() {
  // Get the elements
  const quiz1Con = document.querySelector(".container-quiz1");
  const canvaCon = document.getElementById("canvaCon");
  const welcomeText = document.querySelector(".welcome-text");
  const quizCon = document.querySelector(".quiz-container");
  document.querySelector(".quiz-completed-message").style.display = "none";
  document.querySelector(".quiz1-notcompleted-message2").style.display = "none";

  // Hide quiz elements
  if (quiz1Con) quiz1Con.style.display = "none";
  if (welcomeText) welcomeText.style.display = "none";
  if (quizCon) quizCon.style.display = "none";
  if (canvaCon) canvaCon.style.display = "block";

  document.getElementById("returnGameModal").style.display = "none";

  isQuizOPen = false;
}

// Add this function to handle returning to the game
function returnToGame2() {
  // Get the elements
  const canvaCon = document.getElementById("canvaCon");
  const quiz1Con2 = document.querySelector(".container-quiz2");
  const welcomeText2 = document.querySelector(".welcome-text2");
  const quizCon2 = document.querySelector(".quiz-container2");
  document.getElementById("returnGameModal").style.display = "none";
  document.getElementById("returnGameModal2").style.display = "none";
  document.querySelector(".quiz-completed-message2").style.display = "none";
  document.querySelector(".quiz1-notcompleted-message2").style.display = "none";

  if (canvaCon) canvaCon.style.display = "block";
  if (quiz1Con2) quiz1Con2.style.display = "none";
  if (welcomeText2) welcomeText2.style.display = "none";
  if (quizCon2) quizCon2.style.display = "none";

  isQuizOPen = false;
}

// Add this function to handle returning to the game
function returnToGame3() {
  // Get the elements
  const canvaCon = document.getElementById("canvaCon");
  const quiz1Con3 = document.querySelector(".container-quiz3");
  const welcomeText3 = document.querySelector(".welcome-text3");
  const quizCon3 = document.querySelector(".quiz-container3");
  document.getElementById("returnGameModal2").style.display = "none";
  document.getElementById("returnGameModal3").style.display = "none";
  document.querySelector(".quiz-completed-message3").style.display = "none";
  document.querySelector(".quiz12-notcompleted-message3").style.display =
    "none";

  if (canvaCon) canvaCon.style.display = "block";
  if (quiz1Con3) quiz1Con3.style.display = "none";
  if (welcomeText3) welcomeText3.style.display = "none";
  if (quizCon3) quizCon3.style.display = "none";

  isQuizOPen = false;
}

function cancelQuiz() {
  document.getElementById("returnGameModal").style.display = "none";
}

function cancelQuiz2() {
  document.getElementById("returnGameModal2").style.display = "none";
}

function cancelQuiz3() {
  document.getElementById("returnGameModal3").style.display = "none";
}

function openReturnGameModal() {
  document.getElementById("returnGameModal").style.display = "flex";
}

function openReturnGameModal2() {
  document.getElementById("returnGameModal2").style.display = "flex";
}

function openReturnGameModal3() {
  document.getElementById("returnGameModal3").style.display = "flex";
}

let backtozero = 0;
window.onload = function () {
  if (performance.navigation.type === 1) {
    // Redirect to 'home.html'
    // sessionStorage.setItem("score2", backtozero);
    // sessionStorage.setItem("score3", backtozero);
    // sessionStorage.setItem("score", backtozero);
    // sessionStorage.setItem("currentScore", backtozero);
    window.location.href = "home.html";
    freePassCount = 0;
    sessionStorage.setItem("freePassCount", freePassCount); // Reset stored value
    return;
  }
};

// function finishExit() {
//   window.location.href = "home.html";
// }

// async function finishExit() {
//   let bestcore = sessionStorage.getItem('bestscore')
//   let username = sessionStorage.getItem('username')
//   let quiz_id = sessionStorage.getItem('quiz_id')
//   // console.lof(Bestscore: ${bestcore})
//   // console.lof(Current: ${currentScore})

//   // Update bestscore in ddb
//   if(parseInt(currentScore) > parseInt(bestcore)){
//     const dbref = ref(db, `user/${username}/quizzes/${quiz_id}`);
//       await update(dbref, { bestcore: currentScore });
//   }
//   window.location.href = "home.html";
// }

function notFinish() {
  document.getElementById("notfinishCon").style.display = "none";
  document.getElementById("notFinishCon2").style.display = "none";
  isnotFinish = false;
}

function restartGame() {
  window.location.href = "game.html";
}
