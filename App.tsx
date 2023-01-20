import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ManageExpense from './src/screens/manage-expense';
import RecentExpenses from './src/screens/recent-expenses';
import AllExpenses from './src/screens/all-expenses';
import {GlobalStyles} from './src/utils/color';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}>
      <BottomTab.Screen name="RecentExpenses" component={RecentExpenses} />
      <BottomTab.Screen name="AllExpenses" component={AllExpenses} />
    </BottomTab.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpenseOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
