import React from 'react';
import { Link } from 'react-router-dom';

const QuizList = ({ quizzes }) => {
  return (
    <div>
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>
              {quiz.title} - {quiz.attempted ? `Attempted (Score: ${quiz.score})` : 'Unattempted'}
              {!quiz.attempted && ' Attempt Quiz'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
