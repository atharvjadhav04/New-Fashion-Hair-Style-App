import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SetupScreen from "../screens/admin/SetupScreen";
import SalonSetupScreen from "../screens/admin/SalonSetupScreen";
import SalonStatusScreen from "../screens/admin/SalonStatusScreen";
import HolidaysScreen from "../screens/admin/HolidaysScreen";
import AddBarberChairScreen from "../screens/admin/AddBarberChairScreen";
import AddHolidayScreen from "../screens/admin/AddHolidayScreen";

const Stack = createNativeStackNavigator();

export default function SetupNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="SetupHome"
                component={SetupScreen}
            />

            <Stack.Screen
                name="SalonSetup"
                component={SalonSetupScreen}
            />

            <Stack.Screen
                name="SalonStatus"
                component={SalonStatusScreen}
            />

            <Stack.Screen
                name="Holidays"
                component={HolidaysScreen}
            />

            <Stack.Screen
                name="AddBarberChair"
                component={AddBarberChairScreen}
            />

            <Stack.Screen
                name="AddHoliday"
                component={AddHolidayScreen}
            />
        </Stack.Navigator>
    );
}