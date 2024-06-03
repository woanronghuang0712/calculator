import { State, Action, Operator } from './types.ts';
import { isOperatorOrDecimal, removeLastCharacter } from '../utils/utils.ts';
import { calculate } from '../utils/calculate.ts';
import { initialState } from './initialState.ts';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'APPEND':
      if (state.isInitial) {
        return { ...state, display: action.value, isInitial: false };
      }
      if (isOperatorOrDecimal(action.value) &&
          (state.display === '' || isOperatorOrDecimal(state.display.slice(-1)))) {
        return state; // Prevent invalid input
      }
      return { ...state, display: state.display + action.value };
    
    case 'DELETE':
      return { ...state, display: removeLastCharacter(state.display), isInitial: removeLastCharacter(state.display) === '0' };
    
    case 'CLEAR':
      return initialState;
    
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
