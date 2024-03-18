/**
 *
 * @param {string} text : The text we will slice it.
 * @param {number} max : The maximum number of character of text.
 * @returns : The text after slice it.
 */
export const textSlicer = (text: string, max: number = 50): string => {
  if (text.length >= 50) return `${text.slice(0, max)}...`;
  else return text;
};
/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
