import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import ManageExpense from './src/screens/manage-expense';
import RecentExpenses from './src/screens/recent-expenses';
import AllExpenses from './src/screens/all-expenses';
import {GlobalStyles} from './src/utils/color';
import IconButton from './src/components/UI/icon-button';
import ExpensesContextProvider from './src/store/expenses-context';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => {
          return (
            <IconButton
              icon="plus"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate('ManageExpense');
              }}
            />
          );
        },
      })}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => {
            return <Feather name="clock" color={color} size={size} />;
          },
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Expenses',
          tabBarIcon: ({color, size}) => {
            return <Feather name="calendar" color={color} size={size} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpenseOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{presentation: 'modal'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

export default App;
