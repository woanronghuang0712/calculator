import { Operator } from '../state/types';

// Calculate the result based on the operator and operands
export const calculate = (leftOperand: number, rightOperand: number, operator: Operator): number | string => {
  const maxDisplayLength = 15;
  let result: number;

  switch (operator) {
    case '+':
      result = leftOperand + rightOperand;
      break;
    case '-':
      result = leftOperand - rightOperand;
      break;
    case '×':
      result = leftOperand * rightOperand;
      break;
    case '÷':
      if (rightOperand === 0) return 'Error';
      result = leftOperand / rightOperand;
      break;
    default:
      return 'Error';
  }

  // Convert result to string and handle potential overflow
  let resultStr = result.toString();

  // Check if the result length exceeds the max display length
  if (resultStr.length > maxDisplayLength) {
    if (resultStr.includes('.')) {
      // Trim to max display length
      const integerPartLength = resultStr.split('.')[0].length;
      const decimalPartLength = maxDisplayLength - integerPartLength - 1; // -1 for the decimal point
      resultStr = result.toFixed(decimalPartLength);
    } else {
      // Convert to exponential notation if the result is too large and has no decimal part
      return result.toExponential(maxDisplayLength - 5); // Adjust for exponential format
    }
  }

  // Trim any trailing zeros after the decimal point
  if (resultStr.includes('.')) {
    resultStr = resultStr.replace(/\.?0+$/, '');
  }

  // Handle potential overflow again after trimming
  if (resultStr.length > maxDisplayLength) {
    return result.toExponential(maxDisplayLength - 5);
  }

  return resultStr;
};
