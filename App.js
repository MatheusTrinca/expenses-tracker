import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpenses from './screens/ManageExpenses';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTab.Navigators screenOptions={{}}>
      <BottomTab.Screen name="AllExpenses" component={AllExpenses} />
      <BottomTab.Screen name="RecentExpenses" component={RecentExpenses} />
    </BottomTab.Navigators>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
