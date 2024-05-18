import React, { useState } from 'react';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
import './App.css';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);

  const handleQuizComplete = (score) => {
    setScore(score);
    setShowResult(true);
  };

  return (
    <div className="App">
      {showResult ? (
        <Result score={score} totalQuestions={totalQuestions} />
      ) : (
        <QuestionBox
          onQuizComplete={handleQuizComplete}
          setTotalQuestions={setTotalQuestions}
        />
      )}
    </div>
  );
}

export default App;
