import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import BookingNavigator from "./BookingNavigator";

const Stack = createNativeStackNavigator();

export default function CustomerNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="CustomerTabs"
                component={BottomTabs}
            />

            <Stack.Screen
                name="BookingFlow"
                component={BookingNavigator}
            />
        </Stack.Navigator>
    );
}