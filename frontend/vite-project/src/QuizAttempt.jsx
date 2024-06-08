import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizAttempt = ({ quizzes, onQuizCompletion }) => {
  const { id } = useParams();
  const quiz = quizzes.find(q => q.id === parseInt(id));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setAnswers({
      ...answers,
      [currentQuestionIndex]: selectedOption
    });

    setScore(prevScore => prevScore + (isCorrect ? 1 : 0));
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setAnswers({
      ...answers,
      [currentQuestionIndex]: selectedOption
    });

    setScore(prevScore => {
      const finalScore = prevScore + (isCorrect ? 1 : 0);
      const percentageScore = (finalScore / quiz.questions.length) * 100;
      onQuizCompletion(quiz.id, percentageScore);
      return finalScore;
    });
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      <div>
        <p>{currentQuestion.question}</p>
        <form>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </form>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleFinishQuiz}>Finish Quiz</button>
        )}
      </div>
    </div>
  );
};

export default QuizAttempt;