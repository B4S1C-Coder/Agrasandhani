import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import QuizList from './QuizList';
import QuizAttempt from './QuizAttempt';

const initialQuizzes = [
  {
    id: 1,
    title: 'Quiz 1',
    attempted: false,
    score: null,
    questions: [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
      },
    ]
  },
  {
    id: 2,
    title: 'Quiz 2',
    attempted: true,
    score: 100,
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        answer: 'Paris'
      },
    ]
  },
];

const Quiz = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const navigate = useNavigate();

  const handleQuizCompletion = (quizId, score) => {
    setQuizzes(prevQuizzes =>
      prevQuizzes.map(quiz =>
        quiz.id === quizId
          ? { ...quiz, attempted: true, score }
          : quiz
      )
    );
    navigate('/quiz'); // Navigate back to quiz list after completion
  };

  return (
    <Routes>
      <Route path="/" element={<QuizList quizzes={quizzes} />} />
      <Route path="/quiz/:id" element={<QuizAttempt quizzes={quizzes} onQuizCompletion={handleQuizCompletion} />} />
    </Routes>
  );
};

export default Quiz;