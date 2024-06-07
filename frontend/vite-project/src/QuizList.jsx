import React from 'react';
import { Link } from 'react-router-dom';

const QuizList = ({ quizzes }) => {
  return (
    <div>
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map(quiz => (
          <Link key={quiz.id} to={`/quiz/${quiz.id}`}>
            <li>
              {quiz.title} - {quiz.attempted ? `Attempted (Score: ${quiz.score})` : 'Unattempted'}
              {!quiz.attempted && 'Attempt Quiz'}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;