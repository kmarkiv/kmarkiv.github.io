(function () {
  "use strict";

  var TOTAL_QUESTIONS = 40;
  var STORAGE_KEY = "capitalAlphabetPracticeV1";
  var letters = [
    { letter: "A", reading: "ಏ" },
    { letter: "B", reading: "ಬೀ" },
    { letter: "C", reading: "ಸೀ" },
    { letter: "D", reading: "ಡೀ" },
    { letter: "E", reading: "ಈ" },
    { letter: "F", reading: "ಎಫ್" },
    { letter: "G", reading: "ಜೀ" },
    { letter: "H", reading: "ಏಚ್" },
    { letter: "I", reading: "ಐ" },
    { letter: "J", reading: "ಜೇ" },
    { letter: "K", reading: "ಕೇ" },
    { letter: "L", reading: "ಎಲ್" },
    { letter: "M", reading: "ಎಮ್" },
    { letter: "N", reading: "ಎನ್" },
    { letter: "O", reading: "ಓ" },
    { letter: "P", reading: "ಪೀ" },
    { letter: "Q", reading: "ಕ್ಯೂ" },
    { letter: "R", reading: "ಆರ್" },
    { letter: "S", reading: "ಎಸ್" },
    { letter: "T", reading: "ಟೀ" },
    { letter: "U", reading: "ಯೂ" },
    { letter: "V", reading: "ವೀ" },
    { letter: "W", reading: "ಡಬ್ಲ್ಯೂ" },
    { letter: "X", reading: "ಎಕ್ಸ್" },
    { letter: "Y", reading: "ವೈ" },
    { letter: "Z", reading: "ಝೆಡ್" }
  ];

  var questionCount = document.getElementById("question-count");
  var scoreCount = document.getElementById("score-count");
  var progressFill = document.getElementById("progress-fill");
  var quizLetter = document.getElementById("quiz-letter");
  var answerGrid = document.getElementById("answer-grid");
  var feedback = document.getElementById("answer-feedback");
  var feedbackText = document.getElementById("feedback-text");
  var feedbackLetter = document.getElementById("feedback-letter");
  var feedbackReading = document.getElementById("feedback-reading");
  var feedbackListen = document.getElementById("feedback-listen");
  var secondsLeft = document.getElementById("seconds-left");
  var nextQuestion = document.getElementById("next-question");
  var quizPanel = document.getElementById("quiz-panel");
  var results = document.getElementById("results");
  var resultScore = document.getElementById("result-score");
  var reviewMessage = document.getElementById("review-message");
  var reviewList = document.getElementById("review-list");
  var restartTest = document.getElementById("restart-test");

  var remembered = loadRememberedAnswers();
  var session = createSession();
  var currentLetter;
  var lastLetter = "";
  var advanceTimer;
  var countdownTimer;

  function createSession() {
    var sessionLetters = {};
    letters.forEach(function (item) {
      sessionLetters[item.letter] = { attempts: 0, correct: 0, wrong: 0 };
    });

    return {
      answered: 0,
      correct: 0,
      letters: sessionLetters
    };
  }

  function loadRememberedAnswers() {
    var saved = {};

    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      saved = {};
    }

    letters.forEach(function (item) {
      if (!saved[item.letter]) {
        saved[item.letter] = { correct: 0, wrong: 0 };
      }
    });

    return saved;
  }

  function saveRememberedAnswers() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remembered));
    } catch (error) {
      return;
    }
  }

  // A Beta(1, 1) prior estimates likely error rate and increases review weight.
  function letterWeight(item) {
    var history = remembered[item.letter];
    var now = session.letters[item.letter];
    var estimatedError = (history.wrong + 1) /
      (history.correct + history.wrong + 2);
    var newLetterBoost = now.attempts === 0 ? 1.6 : 0;
    var mistakeBoost = now.wrong * 1.35;

    return 0.4 + estimatedError * 2.8 + newLetterBoost + mistakeBoost;
  }

  function chooseLetter() {
    var candidates = letters.filter(function (item) {
      return item.letter !== lastLetter || letters.length === 1;
    });
    var totalWeight = candidates.reduce(function (sum, item) {
      return sum + letterWeight(item);
    }, 0);
    var pick = Math.random() * totalWeight;

    for (var i = 0; i < candidates.length; i += 1) {
      pick -= letterWeight(candidates[i]);
      if (pick <= 0) {
        return candidates[i];
      }
    }

    return candidates[candidates.length - 1];
  }

  function shuffle(items) {
    for (var i = items.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = items[i];
      items[i] = items[j];
      items[j] = swap;
    }
    return items;
  }

  function makeChoices(item) {
    var distractors = letters.filter(function (other) {
      return other.letter !== item.letter;
    });
    shuffle(distractors);
    return shuffle([item].concat(distractors.slice(0, 3)));
  }

  function speakLetter(letter) {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    var spokenLetter = new SpeechSynthesisUtterance(letter);
    spokenLetter.lang = "en-IN";
    spokenLetter.rate = 0.8;
    window.speechSynthesis.speak(spokenLetter);
  }

  function updateHeader() {
    questionCount.textContent = "ಪ್ರಶ್ನೆ " + (session.answered + 1) +
      " / " + TOTAL_QUESTIONS;
    scoreCount.textContent = "ಸರಿಯಾದ ಉತ್ತರ: " + session.correct;
    progressFill.style.width = (session.answered / TOTAL_QUESTIONS * 100) + "%";
  }

  function clearAdvanceTimers() {
    window.clearTimeout(advanceTimer);
    window.clearInterval(countdownTimer);
  }

  function advanceFromFeedback() {
    clearAdvanceTimers();

    if (session.answered === TOTAL_QUESTIONS) {
      displayResults();
      return;
    }

    displayQuestion();
  }

  function beginAutomaticAdvance() {
    var remaining = 10;

    clearAdvanceTimers();
    secondsLeft.textContent = remaining;
    countdownTimer = window.setInterval(function () {
      remaining -= 1;
      secondsLeft.textContent = remaining;
      if (remaining <= 0) {
        window.clearInterval(countdownTimer);
      }
    }, 1000);
    advanceTimer = window.setTimeout(advanceFromFeedback, 10000);
  }

  function displayQuestion() {
    clearAdvanceTimers();
    currentLetter = chooseLetter();
    lastLetter = currentLetter.letter;
    feedback.hidden = true;
    answerGrid.innerHTML = "";
    quizLetter.textContent = currentLetter.letter;
    quizLetter.setAttribute("aria-label", "Letter " + currentLetter.letter);
    updateHeader();

    makeChoices(currentLetter).forEach(function (choice) {
      var option = document.createElement("button");
      option.type = "button";
      option.className = "answer-option";
      option.textContent = choice.reading;
      option.dataset.letter = choice.letter;
      option.addEventListener("click", answerQuestion);
      answerGrid.appendChild(option);
    });
  }

  function answerQuestion(event) {
    var selected = event.currentTarget.dataset.letter;
    var correct = selected === currentLetter.letter;
    var tracking = session.letters[currentLetter.letter];
    var options = answerGrid.querySelectorAll(".answer-option");

    session.answered += 1;
    tracking.attempts += 1;
    remembered[currentLetter.letter].correct += correct ? 1 : 0;
    remembered[currentLetter.letter].wrong += correct ? 0 : 1;

    if (correct) {
      session.correct += 1;
      tracking.correct += 1;
      feedbackText.textContent = "ಸರಿಯಾಗಿದೆ! ಉತ್ತಮ ಪ್ರಯತ್ನ.";
      feedbackText.className = "correct-message";
    } else {
      tracking.wrong += 1;
      feedbackText.textContent = "ತಪ್ಪಾಗಿದೆ. ಈ ಅಕ್ಷರವನ್ನು ಮತ್ತೊಮ್ಮೆ ನೋಡಿ ಮತ್ತು ಕೇಳಿ.";
      feedbackText.className = "wrong-message";
    }

    options.forEach(function (option) {
      option.disabled = true;
      if (option.dataset.letter === currentLetter.letter) {
        option.classList.add("correct-answer");
      } else if (option === event.currentTarget) {
        option.classList.add("wrong-answer");
      }
    });

    saveRememberedAnswers();
    feedbackLetter.textContent = currentLetter.letter;
    feedbackReading.textContent = currentLetter.reading;
    feedbackListen.dataset.letter = currentLetter.letter;
    feedback.hidden = false;
    progressFill.style.width = (session.answered / TOTAL_QUESTIONS * 100) + "%";
    scoreCount.textContent = "ಸರಿಯಾದ ಉತ್ತರ: " + session.correct;
    nextQuestion.textContent = session.answered === TOTAL_QUESTIONS ?
      "ಈಗ ಫಲಿತಾಂಶ ನೋಡಿ" : "ಈಗ ಮುಂದುವರಿಸಿ";
    beginAutomaticAdvance();
  }

  function displayResults() {
    var missed = letters.filter(function (item) {
      return session.letters[item.letter].wrong > 0;
    }).sort(function (left, right) {
      return session.letters[right.letter].wrong - session.letters[left.letter].wrong;
    });

    clearAdvanceTimers();
    quizPanel.hidden = true;
    results.hidden = false;
    resultScore.textContent = "ನೀವು " + TOTAL_QUESTIONS + " ಪ್ರಶ್ನೆಗಳಲ್ಲಿ " +
      session.correct + " ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಿಯಾಗಿ ಉತ್ತರಿಸಿದ್ದೀರಿ.";
    reviewList.innerHTML = "";

    if (missed.length === 0) {
      reviewMessage.textContent = "ಬಹಳ ಚೆನ್ನಾಗಿದೆ! ಈ ಬಾರಿ ಯಾವುದೇ ತಪ್ಪು ಇಲ್ಲ.";
      return;
    }

    reviewMessage.textContent = "ಈ ಅಕ್ಷರಗಳನ್ನು ಮತ್ತೆ ಓದಿ ಮತ್ತು ಕೇಳಿ:";
    missed.forEach(function (item) {
      var card = document.createElement("div");
      var tries = session.letters[item.letter];
      card.className = "review-card";
      card.innerHTML = "<strong>" + item.letter + "</strong>" +
        "<span>" + item.reading + "</span>" +
        "<small>ತಪ್ಪು: " + tries.wrong + " / ಪ್ರಯತ್ನ: " + tries.attempts + "</small>";
      reviewList.appendChild(card);
    });
  }

  nextQuestion.addEventListener("click", function () {
    advanceFromFeedback();
  });

  feedbackListen.addEventListener("click", function () {
    speakLetter(feedbackListen.dataset.letter);
  });

  restartTest.addEventListener("click", function () {
    clearAdvanceTimers();
    session = createSession();
    lastLetter = "";
    results.hidden = true;
    quizPanel.hidden = false;
    displayQuestion();
  });

  displayQuestion();
}());
