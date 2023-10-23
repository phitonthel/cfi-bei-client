// QuestionForm.jsx
import React, { useState, useEffect } from 'react';

const QuestionForm = ({
  initialQuestions,
  setTsAssessments,
}) => {
  const [questions, setQuestions] = useState([]);

  const handleScoreChange = (index, score) => {
    const newQuestions = [...questions];
    newQuestions[index].score = score;
    setQuestions(newQuestions);
    setTsAssessments(newQuestions)
  };

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id} className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                {/* <h4 className="card-text">{question.category}</h4> */}
                <h4 className="card-title">{index + 1}{'. '}{question.title}</h4>
                <p className="card-text mt-2">{question.description}</p>
              </div>
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    style={{
                      margin: '5px',
                      backgroundColor: questions[index].score === score ? '#007BFF' : '', // Highlight selected score
                      color: questions[index].score === score ? 'white' : ''
                    }}
                    className="btn btn-outline-primary"
                    onClick={() => handleScoreChange(index, score)}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionForm;
