export const toCamelCase: (str: string) => string = (str) => {
  return str
    .split(" ")
    .map((v, i) =>
      i !== 0 ? v.charAt(0).toUpperCase() + v.slice(1) : v.charAt(0).toLowerCase() + v.slice(1),
    )
    .join("");
};
