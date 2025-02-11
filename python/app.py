from flask import Flask, render_template, request, jsonify, make_response
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForCausalLM
import logging
import os
import torch
import pyrebase

# Your web app's Firebase configuration (same as your JavaScript version)
firebaseConfig = {
    "apiKey": "AIzaSyB6k4C7cjGFck7RK7jZhp8gs6bxQeg6Ftw",
    "authDomain": "quizodyssey-38041.firebaseapp.com",
    "databaseURL": "https://quizodyssey-38041-default-rtdb.firebaseio.com",
    "projectId": "quizodyssey-38041",
    "storageBucket": "quizodyssey-38041.firebasestorage.app",
    "messagingSenderId": "841753791601",
    "appId": "1:841753791601:web:99bb91a64958b2eda0dfd0"
}

# Initialize Firebase
firebase = pyrebase.initialize_app(firebaseConfig)

# Get a database reference
db = firebase.database()


# Set up logging for debugging purposes
logging.basicConfig(level=logging.INFO)

# Initialize the Flask app
app = Flask(__name__)


# Configure CORS with all necessary options
CORS(app, resources={r"/*": {
    "origins": "https://quizodyssey.onrender.com",  # Allow this specific origin
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type"],
    "supports_credentials": True
}})

# Add OPTIONS handler for the /get endpoint
@app.route("/get", methods=["OPTIONS"])
def handle_options():
    response = jsonify({"status": "ok"})
    response.headers.add("Access-Control-Allow-Origin", "https://backendquizodyssey.onrender.com")  # Allow this origin
    response.headers.add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 200


# username = None
# quiz_id = None

# @app.route('/api/username', methods=['POST'])
# def receive_username():
#     try:
#         data = request.json
#         username = data.get('username')
#         firstname = data.get('firstname')
#         lastname = data.get('lastname')

#         # Handle the username, firstname, lastname here (e.g., store it in a session or database)
#         print(f"Username: {username}, Firstname: {firstname}, Lastname: {lastname}")

#         return jsonify({"message": "Username received successfully", "username": username, "firstname": firstname, "lastname": lastname})
    
#     except Exception as e:
#         return jsonify({"error": "An error occurred while processing your request", "details": str(e)}), 500


# @app.route('/api/quiz', methods=['POST'])
# def receive_quiz_data():
#     global username  # Use the global keyword to modify the global variable
#     global quiz_id

#     try:
#         # Get data from the request
#         data = request.json
#         quiz_id = data.get('quiz_id')
#         bestscore = data.get('bestscore')
#         username = data.get('username')
#         firstname = data.get('firstname')
#         lastname = data.get('lastname')

#         # Handle the quiz_id and bestscore here (e.g., store it in a session or database)
#         print(f"Quiz ID: {quiz_id}, Best Score: {bestscore}")

#   # Get the quiz items from Firebase
#         quiz_items = db.child("user").child(username).child("quizzes").child(quiz_id).child("quizItems").get()
        
#         if not quiz_items.val():
#             return jsonify({"error": "No quiz items found"}), 404

#         # Process and format the quiz items
#         formatted_items = []
#         for item in quiz_items.each():
#             question_data = item.val()
#             question_type = question_data.get('type')
            
#             formatted_question = {
#                 'question': question_data.get('question'),
#                 'type': question_type,
#             }
            
#             # Handle different question types
#             if question_type == 'identification':
#                 formatted_question['answer'] = question_data.get('answer')
#             elif question_type == 'truefalse':
#                 formatted_question['correct_answer'] = question_data.get('truefalse')
#             else:  # Multiple choice
#                 formatted_question['correct_answer'] = question_data.get('correct')
#                 formatted_question['options'] = question_data.get('options', [])
            
#             formatted_items.append(formatted_question)

#         # Print to console for debugging
#         print("\n=== Quiz Items ===")
#         for index, item in enumerate(formatted_items, 1):
#             print(f"\nQuestion {index}:")
#             print(f"Type: {item['type']}")
#             print(f"Question: {item['question']}")
#             print(f"Correct Answer: {item['correct_answer'] if 'correct_answer' in item else item['answer']}")
#             if 'options' in item:
#                 print("Options:", item['options'])
#             print("-" * 50)

#         return jsonify({
#             "message": "Quiz items retrieved successfully",
#             "quiz_items": formatted_items
#         })

    
    # except Exception as e:
    #     return jsonify({"error": "An error occurred while processing your request", "details": str(e)}), 500


try:
    logging.info("Loading tokenizer and models...")
    device = torch.device('cpu')  # Force CPU usage to reduce memory
    
    # Use smaller models
    tokenizer_flant5 = AutoTokenizer.from_pretrained("google/flan-t5-small")  # Changed to small
    model_flant5 = AutoModelForSeq2SeqLM.from_pretrained(
        "google/flan-t5-small",
        torch_dtype=torch.float32,
        low_cpu_mem_usage=True
    ).to(device)

    tokenizer_dialo = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")  # Changed to small
    model_dialo = AutoModelForCausalLM.from_pretrained(
        "microsoft/DialoGPT-small",
        torch_dtype=torch.float32,
        low_cpu_mem_usage=True
    ).to(device)

    logging.info("Models and tokenizers loaded successfully.")
except Exception as e:
    logging.error(f"Error loading models or tokenizers: {e}")
    tokenizer_flant5, model_flant5, tokenizer_dialo, model_dialo = None, None, None, None
    

@app.route("/")
def index():
    """Serve the chat interface HTML."""
    return render_template("chat.html")

@app.route("/get", methods=["POST"])
def chat():
    """Handle chat messages and generate responses."""
    try:
        data = request.get_json()
        if not data or "msg" not in data:
            return jsonify({"response": "Please enter a valid message."}), 400
            
        msg = data["msg"].strip()
        if not msg:
            return jsonify({"response": "Please enter a valid message."}), 400
            
        response = generate_response(msg)  # Your existing generate_response function
        return jsonify({"response": response})
    except Exception as e:
        logging.error(f"Error in chat endpoint: {e}")
        return jsonify({"response": "An error occurred while processing your request."}), 500


def generate_response(text):
    """
    Generate a conversational or factual response based on the input.
    Args:
        text (str): The input text.
    Returns:
        str: The response.
    """
    lower_text = text.lower()

    # Handle conversational responses using predefined responses
    conversational_responses = {
       "chest": "📦 About Treasure Chests:\n\nIn Quiz Odyssey, treasure chests can contain various items:\n🎟️ Pass Tokens - Special items that let you skip challenging questions\n❌ Bokya - Empty chests with no rewards\n\nKeep exploring different areas to find these chests!",
        "houses": "1. **The House of Wisdom (STAGE 1)**\n   - An ancient mansion filled with challenges. It is said that only those with true wisdom can pass through its trials.\n\n2. **The House of Mystery (STAGE 2)**\n   - A mansion shrouded in darkness and mystery. Its rooms are filled with cryptic riddles and secrets waiting to be uncovered.\n\n3. **The House of Strength (STAGE 3)**\n   - A fortress built for the bravest of adventurers. It is home to fierce trials that test not only your knowledge but your resilience.\n\nEach house offers different challenges, but only the wise and determined will succeed in their quests!",
        "help": "🎮 Quiz Odyssey Guide:\n\n1. Answer questions to progress\n2. Explore chests for rewards\n3. Type 'status' to view progress\n4. Type 'houses' to learn about the different houses\n5. Type 'stage' to see your current stage\n\n"
    }

    if lower_text in conversational_responses:
        return conversational_responses[lower_text]

    # Use FLAN-T5 for factual responses to avoid repetition
    if "?" in lower_text or lower_text.startswith(("who", "what", "where", "why", "how")):
        response = get_factual_response_flant5(text)

        # Check if the generated response is too similar to the input (avoid repetition)
        if response.strip().lower() == text.lower():
            response = "I am not sure how to answer that. Could you clarify?"
        return response

    # If it's a casual or conversational query, use DialoGPT
    return get_conversational_response_dialo(text)


def get_factual_response_flant5(text):
    """
    Generate a factual response using the FLAN-T5 model.

    Args:
        text (str): The input text/question.

    Returns:
        str: The model's response.
    """
    input_text = f"Provide a conversational yet factual response: {text}"

    # Tokenize the input
    input_ids = tokenizer_flant5.encode(input_text, return_tensors="pt")

    # Generate a response
    outputs = model_flant5.generate(input_ids, max_length=200, num_beams=3, early_stopping=True)

    # Decode and return the response
    response = tokenizer_flant5.decode(outputs[0], skip_special_tokens=True)

    # Check for repetition of the input and handle it
    if response.strip().lower() == text.lower():
        response = "I couldn't quite understand that. Could you ask in a different way?"
        
    return response


def get_conversational_response_dialo(text):
    """
    Generate a conversational response using DialoGPT and remove the input text from the response.

    Args:
        text (str): The input text/question.

    Returns:
        str: The model's response without the input text.
    """
    # Tokenize the input
    input_ids = tokenizer_dialo.encode(text + tokenizer_dialo.eos_token, return_tensors="pt")

    # Generate a response
    outputs = model_dialo.generate(input_ids, max_length=200, pad_token_id=tokenizer_dialo.eos_token_id)

    # Decode the response
    response = tokenizer_dialo.decode(outputs[0], skip_special_tokens=True)

    # Remove the input text from the response (basic filtering)
    if response.lower().startswith(text.lower()):
        response = response[len(text):].strip()

    # Check if the response still starts with the input text after stripping
    if response.strip().lower() == text.lower():
        response = "I didn't quite get that. Could you say it in a different way?"

    return response


# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(debug=True, host='127.0.0.1', port=port)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the port defined in the environment variable, or default to 5000
    app.run(debug=False, host='0.0.0.0', port=port)  # Disable debugging and bind to 0.0.0.0 to accept external traffic
