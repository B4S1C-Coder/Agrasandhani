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
        question: 'What is the benifit of additive manufacturing over traditional manufacturing?',
        options: ['Longer Lead Times', 'Higher Costs', 'More complex part geometries', 'Slower Build Times'],
        answer: 'More complex part geometries'
      },
      {
        question: 'What term was originally used for Additive Manufacturing when it was first commercially used mainly for prototypes and samples?',
        options: ['3D Printing', 'Rapid Prototyping', 'Digital fabrication', 'Layered manufacturing'],
        answer: 'Rapid Prototyping'
      },
      {
        question: 'Which AM process uses a laser to selectively fuse metallic powder material layer by layer?',
        options: ['Fused deposition modeling', 'Powder bed fusion', 'Stereolithography', 'Laminated object manufacturing'],
        answer: 'Power bed fusion'
      },
      {
        question: 'What is the typical layer thickness used in Stereolithography?',
        options: ['1mm', '0.5mm', '0.1mm', '0.001mm'],
        answer: '0.1mm'
      },
      {
        question: 'Which AM process belongs to the sheet lamination family?',
        options: ['Selective laser sintering', 'Fused deposition modeling', 'Laminated object manufacturing', 'Electron beam melting'],
        answer: 'Laminated object manufacturing'
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
        question: 'What was the capital of France in 1AD?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        answer: 'New Delhi'
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
      <Route path=":id" element={<QuizAttempt quizzes={quizzes} onQuizCompletion={handleQuizCompletion} />} />
    </Routes>
  );
};

export default Quiz;