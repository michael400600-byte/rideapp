import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/passenger/HomeScreen';
import SearchDestinationScreen from '../screens/passenger/SearchDestinationScreen';
import RequestRideScreen from '../screens/passenger/RequestRideScreen';
import SearchingDriverScreen from '../screens/passenger/SearchingDriverScreen';
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import RideRequestScreen from '../screens/driver/RideRequestScreen';
import RideInProgressScreen from '../screens/common/RideInProgressScreen';
import RideCompletedScreen from '../screens/common/RideCompletedScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import HistoryScreen from '../screens/common/HistoryScreen';
import { COLORS } from '../utils/theme';

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.textPrimary,
    border: COLORS.border,
    notification: COLORS.error,
  },
};

const AppNavigator = () => (
  <NavigationContainer theme={AppTheme}>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.background }, animation: 'slide_from_right' }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PassengerHome" component={HomeScreen} />
      <Stack.Screen name="SearchDestination" component={SearchDestinationScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="RequestRide" component={RequestRideScreen} />
      <Stack.Screen name="SearchingDriver" component={SearchingDriverScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
      <Stack.Screen name="RideRequest" component={RideRequestScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="RideInProgress" component={RideInProgressScreen} options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="RideCompleted" component={RideCompletedScreen} options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
