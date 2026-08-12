import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminBottomTabs from "./AdminBottomTabs";

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="AdminTabs"
                component={AdminBottomTabs}
            />

        </Stack.Navigator>
    );
}