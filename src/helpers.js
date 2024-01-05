export function kebabCaseToTitleCase(colorName) {
  return colorName
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}