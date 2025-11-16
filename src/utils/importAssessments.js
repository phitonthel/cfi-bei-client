export const mergeCfiToCfi = (fromCfiAssessments, toCfiAssessments) => {
  const mergedResult = []
  toCfiAssessments.forEach(assessment => {
    const assessmentName = assessment.reviewerAssessment.competencyRole?.Competency?.title;

    // find from Cfi assessment with the same competency name
    const matchingFromAssessment = fromCfiAssessments.find(
      fromAssessment => fromAssessment.reviewerAssessment.competencyRole?.Competency?.title === assessmentName
    );

    if (matchingFromAssessment) {
      mergedResult.push({
        ...assessment,
        reviewerAssessment: {
          ...assessment.reviewerAssessment,
          score: matchingFromAssessment.reviewerAssessment.score,
          justification: matchingFromAssessment.reviewerAssessment.justification ?? ""
        }
      });
    } else {
      mergedResult.push({
        ...assessment,
      });
    }
  });

  return mergedResult;
}

export const mergeCfiToTs = (fromCfiAssessments, toTsAssessments) => {
  const mergedResult = []

  toTsAssessments.forEach(assessment => {
    const tsAssessmentName = assessment.title

    // find from Cfi assessment with the same competency name
    const matchingFromAssessment = fromCfiAssessments.find(
      fromAssessment => fromAssessment.reviewerAssessment.competencyRole?.Competency?.title === tsAssessmentName
    );

    if (matchingFromAssessment) {
      mergedResult.push({
        ...assessment,
        score: matchingFromAssessment.reviewerAssessment.score + 1, // TS score is 1-5, CFI is 0-4
        justification: matchingFromAssessment.reviewerAssessment.justification ?? ""
      });
    } else {
      mergedResult.push({
        ...assessment,
      });
    }
  });

  return mergedResult;
}