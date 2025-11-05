document.addEventListener('DOMContentLoaded', () => {
  const userInfoForm = document.getElementById('user-info-form');
  const userInfoSection = document.querySelector('.user-info');
  const quizQuestions = document.getElementById('quiz-questions');
  const resultsSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');
  const quizSection = document.getElementById('quiz');
  const retakeButton = document.getElementById('retake-quiz');
  const closeResultsButton = document.getElementById('close-results');
  
  //Input and error
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const nameError = document.getElementById('name-error')
  const emailError = document.getElementById('email-error')
  
  let userName = '';


  // Progress bar 
  /* 
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  let answeredQuestions = new Set();


  //Aria-live announcer
  /*const announcer = document.getElementById('announcer');*/


 
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

 /* function announce(message) {
    announcer.textContent = '';
    
    setTimeout(() => {
    announcer.textContent = message;
    }, 100); 
  }*/

  /*function updateProgress() {
    const totalQuestions = 4;
    const answeredCount = answeredQuestions.size;
    const percentage = (answeredCount / totalQuestions) * 100;

    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${answeredCount} of ${totalQuestions} questions answered`;
  }
    announce(progressText.textContent);
    
    // Track answers and move focus to next question
    document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      answeredQuestions.add(input.name);
      updateProgress();

    // Move focus to next fieldset
      const currentFieldset = input.closest('fieldset');
      const nextFieldset = currentFieldset.nextElementSibling;

      if (nextFieldset && nextFieldset.querySelector('input')) {
        nextFieldset.querySelector('input').focus();
      }
    });
  });*/
  
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

    // Validate email
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

    // Set focus to results
    resultsSection.setAttribute('tabindex', '-1');
    resultsSection.focus();
  });

  closeResultsButton.addEventListener('click', () => {
    resultsSection.hidden = true;
    userInfoSection.hidden = false;
    userInfoSection.style.display = '';  
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