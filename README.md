# chege-wakiama-trivia-project

# Chege's Trivia Quiz App

## Overview
Chege's Trivia Quiz is a simple web-based quiz application that fetches random trivia questions from the Open Trivia Database API. The app allows users to answer multiple-choice questions, receive immediate feedback, and view their final score along with any questions they missed.

## Features
- Welcome screen with quiz introduction
- Dynamically loaded questions from external API
- Multiple-choice questions with visual feedback
- Score tracking and final results display
- Option to restart the quiz

## Technical Structure

### HTML Structure
The application has a simple HTML structure with four main components:
1. **Start Page** (`#startPage`): Welcome screen with introductory text and start button
2. **Quiz Container** (`#quizContainer`): Contains all quiz questions and answer options
3. **Scoreboard** (`#scoreboard`): Displays final score and missed questions
4. **Restart Button** (`#restartBtn`): Allows users to restart the quiz

### CSS Styling
The CSS provides styling for the quiz with a focus on:
- Centering components using flexbox and positioning
- Vertical arrangement of answer options
- Visual feedback for correct/incorrect answers
- Color-coded elements (blue for question numbers and scores, green for correct answers)
- Responsive design with appropriate spacing and borders

### JavaScript Functionality

#### Core Variables
- `questions`: Array to store quiz questions from the API
- `userScore`: Number to track the user's score
- `userAnswers`: Array to store user's selected answers

#### Main Functions
1. **`startQuiz()`**
   - Hides the start page and shows the quiz container
   - Resets user score and answers
   - Fetches questions from the Open Trivia Database API
   - Calls `showAllQuestions()` when data is received

2. **`decodeHTML(html)`**
   - Utility function to decode HTML entities in the question text
   - Creates a temporary textarea element to decode text properly

3. **`showAllQuestions()`**
   - Clears the quiz container
   - For each question:
     - Combines correct and incorrect answers
     - Creates a question block with question text and answer buttons
     - Adds event handlers for answer selection
   - Adds a "Submit Quiz" button at the end

4. **`checkAnswer(selectedButton, correctAnswerEncoded, selectedAnswerEncoded, questionIndex)`**
   - Processes user's answer selection
   - Disables all answer buttons for that question after selection
   - Highlights the selected answer
   - Provides immediate feedback (correct/incorrect)
   - Updates user score and stores the answer

5. **`endQuiz()`**
   - Hides the quiz container and shows the scoreboard
   - Displays the final score
   - Lists all missed questions with their correct answers
   - Shows the restart button

## Data Flow
1. User clicks "Start Quiz"
2. App fetches questions from the API
3. Questions are displayed to the user
4. User selects answers and receives immediate feedback
5. User submits the quiz when finished
6. Final score and missed questions are displayed
7. User can restart the quiz if desired

## API Integration
The app uses the Open Trivia Database API (`https://opentdb.com/api.php?amount=10`) to fetch 10 random trivia questions. The API returns questions with various difficulty levels and categories.

## User Experience
- Users receive immediate feedback on their answers
- Color-coded interface helps distinguish between correct and incorrect answers
- Clean, centered layout makes the quiz easy to read and navigate
- Responsive design ensures usability on different screen sizes

## How to Use
1. Open the HTML file in a web browser
2. Click "Start Quiz" on the welcome screen
3. Answer each question by clicking on an option
4. Review immediate feedback for each answer
5. Click "Submit Quiz" when all questions are answered
6. View your final score and any missed questions
7. Click "Restart Quiz" to play again

## Development Considerations
- The app handles HTML entity decoding for proper display of special characters
- Answer options are randomized to prevent patterns
- The interface provides clear visual feedback using color and styling
- The modular code structure separates concerns between HTML, CSS, and JavaScript