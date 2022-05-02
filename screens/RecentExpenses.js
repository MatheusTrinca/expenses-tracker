import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOverview/ExpensesOutput';

const RecentExpenses = () => {
  return <ExpensesOutput expensesPeriod="Last 7 days" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
