document.addEventListener('DOMContentLoaded', () => {
  const userInfoForm = document.getElementById('user-info-form');
  const userInfoSection = document.querySelector('.user-info');
  const quizQuestions = document.getElementById('quiz-questions');
  const resultsSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');
  const quizSection = document.getElementById('quiz');
  const retakeButton = document.getElementById('retake-quiz');
  //Input and error
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const nameError = document.getElementById('name-error')
  const emailError = document.getElementById('email-error')

  let userName = '';
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //has to be a real email
  }

  function showError(input, errorElement, message) {
    input.setAttribute('aria-invalid', 'true')
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function clearError(input, errorElement) {
    input.removeAttribute('aria-invalid')
    errorElement.textContent = '';
    errorElement.hidden = true;
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    }
  });

  // Show quiz after user put in user info
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the from from reloading the page

    let isValid = true;

    //Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your name')
      isValid = false;
      nameInput.focus();
    } else {
      clearError(nameInput, nameError)
    }

    // Valid email
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'please enter you email address')
      isValid = false;
      if (!nameError.textContent) {
        emailInput.focus();
      }
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, emailError, 'Please enter a valid email address')
      isValid = false;
      if (!nameError.textContent) {
        emailInput.focus();
      }
    } else {
      clearError(emailInput, emailError)
    }

    if (isValid) {
      userName = document.getElementById('name').value.trim();
      userInfoSection.hidden = true; // Hide user info box
      userInfoSection.style.display = 'none';
      quizSection.hidden = false; //display quiz
      quizSection.scrollIntoView({ behavior: 'smooth' });
    }
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

    // Display result
    quizSection.hidden = true; // Hide quiz section after submit
    resultsSection.hidden = false; // display results
    resultsContent.textContent = message;

    // set focus to results
    resultsSection.setAttribute('tabindex', '-1');
    resultsSection.focus();
  });
  //retake quiz button
  retakeButton.addEventListener('click', () => {
    resultsSection.hidden = true;
    quizSection.hidden = false;
    quizSection.scrollIntoView({ behavior: 'smooth' });
    // reset quiz
    quizQuestions.reset();
  });
});