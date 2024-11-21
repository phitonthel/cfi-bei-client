// QuestionForm.jsx
import { track } from '../../apis/track';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  background-color: white;
  color: black;
  opacity: 1;
  // cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
  // pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  resize: none;

  &:disabled {
    // background-color: #e8e8e8;
    background-color: white;
    color: black;
  }
`;

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
    track({
      event: 'click',
      target: 'ts-assessment',
      action: 'button',
      data: {
        tsaId: newQuestions[index].id,
        tsaScore: score,
      }
    })
  };

  const handleJustificationChange = (index, justification) => {
    const newQuestions = [...questions];
    newQuestions[index].justification = justification;
    setQuestions(newQuestions);
    setTsAssessments(newQuestions)
  }

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  return (
    <div>
      {questions.map((question, index) => (
        <div id={question.id} key={question.id} className="card mb-4">
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
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">

                <span>Score:</span>
                <div className="d-flex w-100 justify-content-between mb-2">
                  {[1, 2, 3, 4, 5].map(score => (
                    <button
                      key={score}
                      style={{
                        backgroundColor: questions[index].score === score ? '#007BFF' : '', // Highlight selected score
                        color: questions[index].score === score ? 'white' : ''
                      }}
                      className="btn btn-outline-primary flex-grow-1 mx-1"
                      onClick={() => handleScoreChange(index, score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>

                <span style={{ marginTop: '10%' }}>Justification:</span>
                <StyledTextarea
                  // value={question.id}
                  value={question.justification}
                  className="form-control mt-1"
                  placeholder="(Required) Describe the factors that led to this score"
                  rows="4"
                  onChange={(e) => handleJustificationChange(index, e.target.value)}
                />

                {question.errorMessage && (
                  <div className="text-danger mt-2">
                    {question.errorMessage}
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionForm;
