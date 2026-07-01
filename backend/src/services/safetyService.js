export function validateAIReport(report) {
  const issues = [];

  if (!report.summary) {
    issues.push("Missing summary");
  }

  if (!report.recommendations || report.recommendations.length === 0) {
    issues.push("No recommendations generated");
  }

  if (
    report.confidence_score !== undefined &&
    report.confidence_score < 60
  ) {
    issues.push("Low confidence prediction");
  }

  return {
    trusted: issues.length === 0,
    validationIssues: issues
  };
}