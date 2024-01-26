import { referenceCompetencies } from "./vars";

export const sortReports = (reports) => {
  // Reference array that defines the desired order
  // const referenceArray = ['dog', 'cat', 'bird', 'fish'];

  // Target array that you want to sort
  // const targetArray = ['fish', 'dog', 'bird', 'cat', 'dog', 'bird', 'cat'];

  // Create a map from the reference array
  const orderMap = new Map(referenceCompetencies.map((item, index) => [item, index]));

  // Sort the target array based on the reference array
  return reports.sort((a, b) => {
    return orderMap.get(a.title) - orderMap.get(b.title);
  });
}