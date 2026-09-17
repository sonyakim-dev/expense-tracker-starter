export const CATEGORY_COLORS = {
  food: "#c0862b",
  housing: "#2e6fa6",
  utilities: "#b23a2e",
  transport: "#1f8f5c",
  entertainment: "#8b3f86",
  salary: "#0496ad",
  other: "#a85c1e",
};

export const categoryColor = (category) => CATEGORY_COLORS[category] ?? CATEGORY_COLORS.other;
