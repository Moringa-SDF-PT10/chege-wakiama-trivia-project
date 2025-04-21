let questions = [];
let userScore = 0;
let userAnswers = [];

const quizContainer = document.getElementById('quizContainer');
const scoreBoard = document.getElementById('scoreboard');
const restartButton = document.getElementById('restartBtn');
const startPage = document.getElementById('startPage');

function decodeHTML(html) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
}

function startQuiz() {
  startPage.style.display = 'none';
  quizContainer.style.display = 'block';
  scoreBoard.style.display = 'none';
  restartButton.style.display = 'none';
  quizContainer.innerHTML = '<p>Loading questions...</p>';
  userScore = 0;
  userAnswers = [];
  fetch("https://opentdb.com/api.php?amount=10")
    .then(response => response.json())
    .then(data => {
      questions = data.results;
      showAllQuestions();
    });
}

function showAllQuestions() {
  quizContainer.innerHTML = '';
  questions.forEach((questionItem, questionIndex) => {
    const allAnswers = [...questionItem.incorrect_answers, questionItem.correct_answer]
      .sort();

    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';

    questionBlock.innerHTML = `
      <div class="question">
        <h3>Question ${questionIndex + 1}:</h3>
        <p>${decodeHTML(questionItem.question)}</p>
      </div>
      <div class="answers" id="answers-${questionIndex}">
        ${allAnswers.map(answerOption => `
          <button onclick="checkAnswer(this, '${encodeURIComponent(questionItem.correct_answer)}', '${encodeURIComponent(answerOption)}', ${questionIndex})">
            ${decodeHTML(answerOption)}
          </button>
        `).join('')}
      </div>
      <div id="feedback-${questionIndex}" class="feedback"></div>
    `;

    quizContainer.appendChild(questionBlock);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Quiz';
  submitButton.onclick = endQuiz;
  quizContainer.appendChild(submitButton);
}

function checkAnswer(selectedButton, correctAnswerEncoded, selectedAnswerEncoded, questionIndex) {
  const correctAnswer = decodeURIComponent(correctAnswerEncoded);
  const selectedAnswer = decodeURIComponent(selectedAnswerEncoded);

  const allAnswerButtons = document.querySelectorAll(`#answers-${questionIndex} button`);
  allAnswerButtons.forEach(button => {
    button.disabled = true;
  });

  selectedButton.classList.add('selected');

  const feedbackElement = document.getElementById(`feedback-${questionIndex}`);
  if (selectedAnswer === correctAnswer) {
    feedbackElement.textContent = 'Correct!';
    feedbackElement.style.color = 'green';
    userScore++;
  } else {
    feedbackElement.textContent = `Wrong! Correct answer: ${decodeHTML(correctAnswer)}`;
    feedbackElement.style.color = 'red';
  }

  userAnswers[questionIndex] = {
    correctAnswer: correctAnswer,
    selectedAnswer: selectedAnswer
  };
}

function endQuiz() {
  quizContainer.style.display = 'none';
  scoreBoard.style.display = 'block';
  restartButton.style.display = 'inline-block';

  scoreBoard.innerHTML = `<h2>Your Score: ${userScore}/${questions.length}</h2>`;

  const missedQuestions = questions.map((questionItem, index) => {
    const userAnswerData = userAnswers[index];
    if (!userAnswerData || userAnswerData.selectedAnswer !== userAnswerData.correctAnswer) {
      return `
        <div class="question-block">
          <p><strong>Question ${index + 1}:</strong> ${decodeHTML(questionItem.question)}</p>
          <p><strong>Correct Answer:</strong> ${decodeHTML(questionItem.correct_answer)}</p>
        </div>
      `;
    } else {
      return '';
    }
  }).join('');

  scoreBoard.innerHTML += missedQuestions;
}
