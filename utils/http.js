import axios from 'axios';

const BASE_URL =
  'https://react-native-course-f6dbc-default-rtdb.firebaseio.com';

const addExpense = async expenseData => {
  const response = await axios.post(BASE_URL + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
};

const fetchExpenses = async () => {
  const response = await axios.get(BASE_URL + '/expenses.json');

  const expenses = [];

  for (let key in response.data) {
    const newObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(newObj);
  }

  // const expenses = response.data.map(expense => {
  //   return {
  //     id: expense,
  //     date: new Date(expense.date),
  //     description: expense.description,
  //   };
  // });
  return expenses;
};

const updateExpense = (id, expenseData) => {
  return axios.put(BASE_URL + `/expenses/${id}.json`, expenseData);
};

const deleteExpense = id => {
  return axios.delete(BASE_URL + `/expenses/${id}.json`);
};

export default { addExpense, fetchExpenses, updateExpense, deleteExpense };
