document.addEventListener('DOMContentLoaded', () => {
  const userInfoForm = document.getElementById('user-info-form');
  const quizQuestions = document.getElementById('quiz-questions');
  const resultsSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');
  const quizSection = document.getElementById('quiz');

  let userName = '';

  // Show quiz after user put in user info
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the from from reloading the page
    userName = document.getElementById('name').value.trim();
    quizSection.hidden = false;
    quizSection.scrollIntoView({ behavior: 'smooth' });
  });

  //submission
  quizQuestions.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(quizQuestions);
    const answers = Array.from(formData.values());
    const total = answers.length; // Count how many are correct
    const correct = answers.filter(value => value === "correct").length;

    // Create message for the user
    const message = `${userName ? userName + ', ' : ''}you got ${correct} out of ${total} answers correct, ${correct === total
      ? 'you are amazing!'
      : correct >= total / 2
        ? 'you are so close!'
        : 'better luck next time!'
      }`;

    alert(message);
    // Display result
    resultsSection.hidden = false;
    resultsContent.textContent = message;

    // Move focus for accessibility
    resultsSection.setAttribute('tabindex', '-1');
    resultsSection.focus();
  });

});