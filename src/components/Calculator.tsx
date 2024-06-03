import React, { useReducer } from 'react';
import { reducer } from '../state/reducer.ts';
import { initialState } from '../state/initialState.ts';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

 const handleButtonClick = (value: string) => {
    if (['+', '-', '×', '÷'].includes(value)) {
      dispatch({ type: 'SET_OPERATOR', operator: value });
    } else if (value === 'C') {
      dispatch({ type: 'CLEAR' });
    } else if (value === 'DEL') {
      dispatch({ type: 'DELETE' });
    } else if (value === '=') {
      dispatch({ type: 'CALCULATE' });
    } else {
      dispatch({ type: 'APPEND', value });
    }
  };

  const buttons = [
    'C', 'DEL', '÷', '×',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.'
  ];

  return (
    <div className="calculator">
      <div className="display">{state.display}</div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)} aria-label={btn}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
