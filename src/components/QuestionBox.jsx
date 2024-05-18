import React, {
  useReducer,
  useEffect,
  useCallback,
  createContext,
  useMemo,
  useRef,
} from 'react';
import questions from '../questions.js';
import Result from './Result.jsx';

export const DarkModeContext = createContext();

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return !state;
    default:
      return state;
  }
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_ANSWER':
      const updatedAnswers = [...state.answers];
      updatedAnswers[action.index] = action.answer;
      return { ...state, answers: updatedAnswers };
    case 'NEXT_QUESTION':
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case 'SHOW_RESULT':
      return { ...state, showResult: true };
    case 'HIGHLIGHT':
      return { ...state, isHighlighted: true };
    case 'REMOVE_HIGHLIGHT':
      return { ...state, isHighlighted: false };
    default:
      return state;
  }
};

const QuestionBox = () => {
  const [darkMode, dispatchDarkMode] = useReducer(darkModeReducer, true);
  const [state, dispatchQuiz] = useReducer(quizReducer, {
    currentQuestionIndex: 0,
    answers: new Array(questions.length).fill(null),
    showResult: false,
    isHighlighted: false,
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    dispatchDarkMode({ type: 'TOGGLE_THEME' });
  }, []);

  const handleAnswerSelect = useCallback(
    (optionId) => {
      dispatchQuiz({
        type: 'SELECT_ANSWER',
        index: state.currentQuestionIndex,
        answer: optionId,
      });
      if (state.currentQuestionIndex === questions.length - 1) {
        dispatchQuiz({ type: 'SHOW_RESULT' });
      } else {
        dispatchQuiz({ type: 'NEXT_QUESTION' });
      }
    },
    [state.currentQuestionIndex]
  );

  const currentQuestion = questions[state.currentQuestionIndex];

  const calculateScore = useMemo(() => {
    return state.answers.reduce((score, answerIndex, questionIndex) => {
      const correctOption = questions[questionIndex].options.findIndex(
        (option) => option.isCorrect
      );
      return score + (answerIndex === correctOption ? 1 : 0);
    }, 0);
  }, [state.answers]);

  return (
    <DarkModeContext.Provider value={darkMode}>
      <div>
        {state.showResult ? (
          <Result score={calculateScore} totalQuestions={questions.length} toggleTheme={toggleTheme} />
        ) : (
          <div>
            <div className={`quiz-header ${darkMode ? 'dark-header' : 'light-header'}`}>
              <h2>Kalvium</h2>
              <button className="theme-toggle-button" onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="question-section">
              <h2>
                Question: {state.currentQuestionIndex + 1} of {questions.length}
              </h2>
              <p
                className={
                  state.isHighlighted
                    ? 'highlighted-question'
                    : 'normal-question'
                }
              >
                {currentQuestion.text}
              </p>
              <div className="options-section">
                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      value={option.id}
                      checked={
                        state.answers[state.currentQuestionIndex] === option.id
                      }
                      onChange={() => handleAnswerSelect(option.id)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                    <label htmlFor={`option-${index}`}>{option.text}</label>
                  </div>
                ))}
              </div>
              <div className="control-buttons">
                <button
                  className="highlight-button"
                  onClick={() => dispatchQuiz({ type: 'HIGHLIGHT' })}
                >
                  Highlight
                </button>
                <button
                  className="remove-highlight-button"
                  onClick={() => dispatchQuiz({ type: 'REMOVE_HIGHLIGHT' })}
                >
                  Remove Highlight
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DarkModeContext.Provider>
  );
};

export default QuestionBox;


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

.question-section {
  background-color: #f2f2f2;
  border-radius: 15px;
  padding: 20px;
  width: 600px;
  height: auto;
}

.highlighted-question {
  font-weight: bold;
  color: red;
}

.normal-question {
  font-weight: bold;
  color: blue;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.options-section label {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #888;
  color: white;
  cursor: pointer;
}

.options-section label:hover {
  background-color: #777;
}

.options-section input[type="radio"] {
  display: none;
}

.control-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.highlight-button,
.remove-highlight-button {
  border-radius: 20px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
}

.highlight-button {
  background-color: red;
}

.remove-highlight-button {
  background-color: red;
}
`;
document.head.append(style);
