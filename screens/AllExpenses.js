import React from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOverview/ExpensesOutput';
import { useExpensesContext } from '../contexts/expenses-context';

const AllExpenses = () => {
  const { expenses } = useExpensesContext();
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No expenses registered yet"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
