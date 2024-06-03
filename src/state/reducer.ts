import { State, Action, Operator } from './types.ts';
import { isOperatorOrDecimal, removeLastCharacter } from '../utils/utils.ts';
import { calculate } from '../utils/calculate.ts';
import { initialState } from './initialState.ts';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    
    // Append a new value (digit or operator) to the display. 
    // First checks if the calculator is in its initial state and starts a new number. 
    // Prevents invalid input such as multiple operators or decimal points in a row by checking the last character in the display.
    case 'APPEND':
      if (state.isInitial) {
        return { ...state, display: action.value, isInitial: false };
      }
      if (isOperatorOrDecimal(action.value) &&
          (state.display === '' || isOperatorOrDecimal(state.display.slice(-1)))) {
        return state; // Prevent invalid input
      }
      return { ...state, display: state.display + action.value };
    
    // Delete the last character from the display.
    // If the display becomes empty to reset the initial state.
    case 'DELETE':
      return { ...state, display: removeLastCharacter(state.display), isInitial: removeLastCharacter(state.display) === '0' };
    
    // Clear the display and resetting the state to its initial values.
    case 'CLEAR':
      return initialState;
    
    // Checks if an operator and previous value are set, 
    // Parses the current display value, and performs the calculation. 
    // If there's an error (e.g., division by zero), it sets the display to 'Error'. 
    // Otherwise, it updates the display with the result and resets the operator and previous value.
    case 'CALCULATE':
      if (!state.operator || state.previousValue === null) {
        return state;
      }
      const currentValue = parseFloat(state.display);
      const result = calculate(state.previousValue, currentValue, state.operator as Operator);
      if (result === 'Error') {
        return { display: 'Error', isInitial: true, operator: null, previousValue: null };
      }
      return { display: result.toString(), isInitial: true, operator: null, previousValue: null };
    
    // Sets the operator for the next calculation. 
    // Handles intermediate calculations if an operator and previous value are already set. 
    // If in the initial state with a previous value, it simply sets the new operator.
    case 'SET_OPERATOR':
      if (state.isInitial && state.previousValue !== null) {
        return { ...state, operator: action.operator };
      }
      if (state.operator && state.previousValue !== null) {
        const currentValue = parseFloat(state.display);
        const result = calculate(state.previousValue, currentValue, state.operator as Operator);
        if (result === 'Error') {
          return { display: 'Error', isInitial: true, operator: null, previousValue: null };
        }
        return { display: result.toString(), isInitial: true, operator: action.operator, previousValue: result };
      }
      return { ...state, operator: action.operator, previousValue: parseFloat(state.display), isInitial: true };
    
    
    default:
      return state;
  }
};

export { reducer };
