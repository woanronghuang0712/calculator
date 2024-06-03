export type Operator = '+' | '-' | '×' | '÷';

export interface State {
  display: string;
  isInitial: boolean;
  operator: Operator | null;
  previousValue: number | null;
}

export interface Action {
  type: string;
  value?: string;
  operator?: Operator;
}
