// QuestionFormV2.jsx - CFI Assessment Question Form
import React, { useState, useEffect } from 'react';
import { AssessmentCard } from '../../components/Cfi/AssessmentCardV2'
import { track } from '../../apis/track';

/**
 * QuestionFormV2 - Component for rendering CFI assessment questions
 * 
 * Expected question structure:
 * {
 *   id: string,
 *   title: string,
 *   description: {
 *     id: string,
 *     category: string,
 *     title: string,
 *     description: string,
 *     options: Array<{
 *       level: "BASIC" | "CAPABLE" | "INFLUENCING" | "INSPIRING",
 *       criterias: string[]
 *     }>,
 *     type: "BEHAVIOURAL" | "TECHNICAL",
 *     createdAt: string,
 *     updatedAt: string
 *   },
 *   score: number | null,
 *   justification: string | null,
 *   errorMessage: string | null // Error message to display (e.g., validation errors)
 * }
 */
const QuestionFormV2 = ({
  initialQuestions,
  setTsAssessments,
  type = 'BEHAVIOURAL',
  isSelfReview = true, // to hide the reviewee score
  setToLocalStorage,
}) => {
  const [questions, setQuestions] = useState([]);

  // Transform simple question structure to CFI assessment structure
  const transformQuestionToAssessment = (question) => {
    return {
      id: question.id,
      reviewerAssessment: {
        id: question.id,
        score: question.score,
        justification: question.justification,
        competencyRole: {
          Competency: {
            category: question.description.category,
            title: question.description.title,
            description: question.description.description,
            options: question.description.options,
            type: question.description.type,
          }
        }
      },
      revieweeAssessment: {
        id: question.id,
        score: null,
        justification: null,
      },
      errorMessage: question.errorMessage || null
    };
  };

  // Handlers following CFI pattern
  const handlers = {
    button: (assessmentId, score) => {
      const updatedQuestions = questions.map(question => {
        if (question.id === assessmentId) {
          return {
            ...question,
            score: score,
            errorMessage: null // Clear error when user makes changes
          };
        }
        return question;
      });

      setQuestions(updatedQuestions);
      setTsAssessments(updatedQuestions);

      track({
        event: 'click',
        target: 'cfi-assessment',
        action: 'button',
        data: {
          assessmentId: assessmentId,
          score: score
        }
      });

      if (setToLocalStorage) {
        setToLocalStorage();
      }
    },

    justification: (assessmentId, newValue) => {
      const updatedQuestions = questions.map(question => {
        if (question.id === assessmentId) {
          return {
            ...question,
            justification: newValue,
            errorMessage: null // Clear error when user makes changes
          };
        }
        return question;
      });

      setQuestions(updatedQuestions);
      setTsAssessments(updatedQuestions);

      if (setToLocalStorage) {
        setToLocalStorage();
      }
    }
  };

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  return (
    <div>
      {questions.map((question) => {
        // Transform to CFI assessment structure for AssessmentCardV2
        const assessment = transformQuestionToAssessment(question);

        return (
          <AssessmentCard
            key={question.id}
            assessment={assessment}
            handlers={handlers}
            type={type}
            isSelfReview={isSelfReview}
          />
        );
      })}
    </div>
  );
};

export default QuestionFormV2;
