import React from 'react';
import ExpensesOutput from '../components/ExpensesOverview/ExpensesOutput';
import { useExpensesContext } from '../contexts/expenses-context';
import { getDateMinusDays } from '../utils/date';

const RecentExpenses = () => {
  const { expenses } = useExpensesContext();

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No recent expenses registered yet"
    />
  );
};

export default RecentExpenses;
