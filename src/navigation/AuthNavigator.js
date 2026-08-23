import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import CompleteProfileScreen from "../screens/auth/CompleteProfileScreen";
import LanguageScreen from "../screens/auth/LanguageScreen";
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Splash"
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
            />

            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />

            <Stack.Screen
                name="Otp"
                component={OtpScreen}
            />
            <Stack.Screen
                name="Language"
                component={LanguageScreen}
            />
            <Stack.Screen
                name="CompleteProfile"
                component={CompleteProfileScreen}
            />
        </Stack.Navigator>
    );
}