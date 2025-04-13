const quizContainer = document.getElementById('quizContainer');
const scoreboard = document.getElementById('scoreboard');
const restartBtn = document.getElementById('restartBtn');
const startPage = document.getElementById('startPage');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = [];

function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function startQuiz() {
  startPage.style.display = 'none';
  scoreboard.style.display = 'none';
  restartBtn.style.display = 'none';
  quizContainer.style.display = 'block';
  quizContainer.innerHTML = 'Loading questions...';

  fetch('https://opentdb.com/api.php?amount=10')
    .then(res => res.json())
    .then(data => {
      questions = data.results;
      currentQuestionIndex = 0;
      score = 0;
      wrongAnswers = [];
      showQuestion();
    });
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
  quizContainer.innerHTML = `
    <div class="question">
      <h3>Question ${currentQuestionIndex + 1}:</h3>
      <p>${decodeHTML(q.question)}</p>
    </div>
    <div class="answers">
      ${answers.map(ans => `<button onclick="checkAnswer(this, '${encodeURIComponent(q.correct_answer)}', '${encodeURIComponent(ans)}')">${decodeHTML(ans)}</button>`).join('')}
    </div>
    <div id="feedback" class="feedback"></div>
  `;
}

function checkAnswer(btn, correct, selected) {
  const feedback = document.getElementById('feedback');
  correct = decodeURIComponent(correct);
  selected = decodeURIComponent(selected);

  const isCorrect = correct === selected;
  feedback.textContent = isCorrect ? 'Correct!' : `Wrong! Correct answer: ${decodeHTML(correct)}`;

  if (isCorrect) score++;
  else wrongAnswers.push({
    question: decodeHTML(questions[currentQuestionIndex].question),
    correct: decodeHTML(correct)
  });

  const buttons = document.querySelectorAll('.answers button');
  buttons.forEach(b => b.disabled = true);

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
}

function endQuiz() {
  quizContainer.style.display = 'none';
  restartBtn.style.display = 'block';
  scoreboard.style.display = 'block';

  let result = `<h2>Quiz Completed</h2><p>Your score: ${score} / ${questions.length}</p>`;
  if (wrongAnswers.length > 0) {
    result += '<h3>Correct Answers to Questions You Missed:</h3><ul>';
    wrongAnswers.forEach(w => {
      result += `<li><strong>${w.question}</strong><br>Correct Answer: ${w.correct}</li>`;
    });
    result += '</ul>';
  } else {
    result += '<p>You got all questions correct. Well done!</p>';
  }

  scoreboard.innerHTML = result;
}
