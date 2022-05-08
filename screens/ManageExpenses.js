import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpensesContext } from '../contexts/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import http from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { deleteExpense, updateExpense, addExpense, expenses } =
    useExpensesContext();

  const selectedExpense = expenses.find(
    expense => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setLoading(true);
    try {
      deleteExpense(editedExpenseId);
      await http.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (e) {
      setError('Could not delete expense - Please try again later');
      setLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setLoading(true);
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData);
        await http.updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await http.addExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (e) {
      setError('Could not save data, please try again later');
      setLoading(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (loading) return <LoadingOverlay />;

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    marginBottom: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
