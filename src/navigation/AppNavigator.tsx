import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import LoginScreen from '../screen/authscreen/LoginScreen';
import DemoScreen from '../screen/homescreen/DemoScreen';
import HomeScreen from '../screen/homescreen/HomeScreen';
import UserDemoScreen from '../screen/homescreen/UserDemoScreen';

export type RootStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
  DemoScreen: undefined;
  UserDemoScreen: undefined;
};

export type RootScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const isAuthenticated = useAppSelector(
    state => state.auth.isAuthenticated,
  );

  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DemoScreen" component={DemoScreen} />
          <Stack.Screen name="UserDemoScreen" component={UserDemoScreen} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}