import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizAttempt = ({ quizzes, onQuizCompletion }) => {
  const { id } = useParams();
  const quiz = quizzes.find(q => q.id === parseInt(id));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option
    });
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = () => {
    const finalScore = (score / quiz.questions.length) * 100;
    onQuizCompletion(quiz.id, finalScore);
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      <div>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li key={index} onClick={() => handleAnswer(option)}>
              {option}
            </li>
          ))}
        </ul>
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
