
export const getAppreciation = (percentage: number): string => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Très bien";
  if (percentage >= 70) return "Bien";
  if (percentage >= 60) return "Assez bien";
  if (percentage >= 50) return "Passable";
  return "Insuffisant";
};

export const getGlobalAppreciation = (percentage: number): string => {
  if (percentage >= 90) return "Félicitations";
  if (percentage >= 80) return "Compliments du conseil de classe";
  if (percentage >= 70) return "Tableau d'honneur";
  if (percentage >= 60) return "Encouragements";
  if (percentage >= 50) return "Doit faire plus d'efforts";
  return "Travail insuffisant";
};

export const getGradeColor = (percentage: number): string => {
  if (percentage >= 70) return "text-green-600";
  if (percentage >= 50) return "text-amber-600";
  return "text-red-600";
};
