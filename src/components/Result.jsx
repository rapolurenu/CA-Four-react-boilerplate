import React, { useContext, useEffect } from 'react';
import { DarkModeContext } from './QuestionBox.jsx';

const Result = ({ score, totalQuestions, toggleTheme }) => {
  const darkMode = useContext(DarkModeContext);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  const percentage = Math.round((score / totalQuestions) * 100);

  const restartQuiz = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="quiz-header">
        <h2 className={darkMode ? 'dark-header' : 'light-header'}>Kalvium</h2>
        <button
          className="theme-toggle-button"
          onClick={toggleTheme}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="result-header">
        <h2 className={darkMode ? 'dark-header' : 'light-header'}>
          Final Results
        </h2>
      </div>
      <div className="result-container">
        <div className="result-details">
          <p>
            {score} out of {totalQuestions} correct - ({percentage}%)
          </p>
        </div>
        <button className="restart-btn" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;

// CSS Styles
const style = document.createElement('style');
style.textContent = `
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

body.dark-theme {
  background-color: #333;
  color: white;
}

body.light-theme {
  background-color: white;
  color: black;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.quiz-header h2 {
  margin: 0;
}

.dark-header {
  color: white;
}

.light-header {
  color: black;
}

.theme-toggle-button {
  border-radius: 20px;
  padding: 8px 15px;
  background-color: black;
  color: white;
  cursor: pointer;
}

.result-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.result-header h2 {
  margin: 0;
}

.result-container {
  background-color: white;
  border-radius: 15px;
  width: 600px;
  height: auto;
  margin-top: 100px;
  padding: 20px;
}

.result-details {
  text-align: center;
  font-weight: bold;
  color: black;
}

.result-details p {
  font-size: 18px;
  margin-bottom: 20px;
}

.restart-btn {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  display: block;
  margin: 0 auto;
}
`;
document.head.append(style);
