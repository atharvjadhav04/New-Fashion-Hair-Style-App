import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ServicesScreen from "../screens/admin/ServicesScreen";
import AddServiceScreen from "../screens/admin/AddServiceScreen";

const Stack = createNativeStackNavigator();

export default function ServicesNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="ServicesHome"
                component={ServicesScreen}
            />

            <Stack.Screen
                name="AddService"
                component={AddServiceScreen}
            />
        </Stack.Navigator>
    );
}