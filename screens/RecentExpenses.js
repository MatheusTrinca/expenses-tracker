import React, { useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOverview/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { useExpensesContext } from '../contexts/expenses-context';
import { getDateMinusDays } from '../utils/date';
import http from '../utils/http';

const RecentExpenses = () => {
  const { expenses, setExpenses } = useExpensesContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const data = await http.fetchExpenses();
        setExpenses(data);
      } catch (e) {
        setError('Could not fetch expenses');
      }
      setLoading(false);
    };
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !loading)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;

  if (loading) return <LoadingOverlay />;

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
