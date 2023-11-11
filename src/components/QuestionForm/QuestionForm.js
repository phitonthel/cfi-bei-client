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
                <h3 className="card-title mb-2">{question.title}</h3>
                {
                  question.description.split('\n').map((desc, index) => (
                    <p
                      key={index}
                      className="card-text"
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        paddingLeft: '1em' // This adds indentation
                      }}
                    >
                      {
                        index === 0
                          ? <p style={{ fontWeight: 'bold' }}>{desc}</p>
                          : <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <p style={{ marginRight: '8px', marginBottom: '0' }}>{index}.</p>
                            <p className="p-0 m-0">{desc.slice(2)}</p>
                          </div>
                      }

                    </p>
                  ))
                }


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
