// Helper function to check if a character is an operator or a decimal point
export const isOperatorOrDecimal = (value: string): boolean => {
  return ['+', '-', '×', '÷', '.'].includes(value);
};

// Helper function to remove the last character from the display
export const removeLastCharacter = (display: string): string => {
  return display.length > 1 ? display.slice(0, -1) : '0';
};
