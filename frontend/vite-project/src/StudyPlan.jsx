import React, { useState } from 'react';
import axios from 'axios';

const StudyPlanForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    currentLevel: '',
    targetLevel: '',
    studyHours: '',
    routine: '',
  });
  const [suggestedPlan, setSuggestedPlan] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `
      Please suggest a personalized study plan based on the following information:

      Subject: ${formData.subject}
      Current Level: ${formData.currentLevel}
      Target Level: ${formData.targetLevel}
      Available Study Hours: ${formData.studyHours}
      Study Routine: ${formData.routine}
    `;

    try {
      const response = await fetch('https://api.anthropic.com/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'Insert Key',
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 500,
          stop_sequences: ['\n\n'],
        }),
      });

      const data = await response.json();
      setSuggestedPlan(data.completion);
    } catch (error) {
      console.error('Error fetching study plan suggestion:', error);
    }
  };

  return (
    <div>
      <h2>Study Plan Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="currentLevel">Current Level:</label>
          <input
            type="text"
            id="currentLevel"
            name="currentLevel"
            value={formData.currentLevel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="targetLevel">Target Level:</label>
          <input
            type="text"
            id="targetLevel"
            name="targetLevel"
            value={formData.targetLevel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="studyHours">Available Study Hours:</label>
          <input
            type="text"
            id="studyHours"
            name="studyHours"
            value={formData.studyHours}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="routine">Study Routine:</label>
          <textarea
            id="routine"
            name="routine"
            value={formData.routine}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Get Study Plan Suggestion</button>
      </form>
      {suggestedPlan && (
        <div>
          <h3>Suggested Study Plan:</h3>
          <p>{suggestedPlan}</p>
        </div>
      )}
    </div>
  );
};

export default StudyPlanForm;