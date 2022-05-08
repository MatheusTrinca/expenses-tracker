import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from '../UI/Button';
import { formattedDate } from '../../utils/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toFixed(2).toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? formattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function inputChangeHandler(identifier, enteredValue) {
    setInputs(prevState => ({
      ...prevState,
      [identifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(prevState => ({
        amount: { value: prevState.amount.value, isValid: amountIsValid },
        date: { value: prevState.date.value, isValid: dateIsValid },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: value => inputChangeHandler('amount', value),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: value => inputChangeHandler('date', value),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: value => inputChangeHandler('description', value),
          //autoCapitalize: 'none',
          //autoCorrect: false // default is True
        }}
      />
      {formIsInvalid && (
        <Text style={styles.error}>
          Invalid Inputs, Plesase check your input values
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    textAlign: 'center',
  },
});
