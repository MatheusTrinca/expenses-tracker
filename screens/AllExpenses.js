import React from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOverview/ExpensesOutput';

const AllExpenses = () => {
  return <ExpensesOutput expensesPeriod="Total" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
