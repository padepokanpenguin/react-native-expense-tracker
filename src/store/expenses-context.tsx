import {createContext, ReactNode, useReducer} from 'react';
import {ExpenseItemProps} from '../components/ExpensesOutput/expense-item';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of Shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of Trousers',
    amount: 89.99,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some Bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 49.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'Another Book',
    description: 'A pair of Shoes',
    amount: 19.99,
    date: new Date('2022-01-18'),
  },
  {
    id: 'e12',
    description: 'A pair of Shoes',
    amount: 59.99,
    date: new Date('2023-01-22'),
  },
  {
    id: 'e11',
    description: 'A pair of Trousers',
    amount: 89.99,
    date: new Date('2022-01-05'),
  },
  {
    id: '141',
    description: 'Some Bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: '131',
    description: 'A book',
    amount: 49.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'Anoher Book',
    description: 'A pair of Shoes',
    amount: 19.99,
    date: new Date('2022-01-18'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}: ExpenseItemProps) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    {description, amount, date}: ExpenseItemProps,
  ) => {},
});

enum ExpenseActionKind {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

interface TypeExpenseReducerAction {
  type: ExpenseActionKind;
  payload: any;
}

interface ExpensesContextProviderProps {
  children: ReactNode;
}

type expenseDataType = ExpenseItemProps;

function expenseReducer(state: any, action: TypeExpenseReducerAction) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense: ExpenseItemProps) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(
        (expense: ExpenseItemProps) => expense.id !== action.payload,
      );
    default:
      return state;
  }
}

export default function ExpensesContextProvider({
  children,
}: ExpensesContextProviderProps) {
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: expenseDataType) {
    dispatch({type: ExpenseActionKind.ADD, payload: expenseData});
  }

  function deleteExpense(id: string) {
    dispatch({type: ExpenseActionKind.DELETE, payload: id});
  }

  function updateExpense(id: string, expenseData: expenseDataType) {
    dispatch({
      type: ExpenseActionKind.UPDATE,
      payload: {id: id, data: expenseData},
    });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
