import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FinanceScreen from "../screens/admin/FinanceScreen";
import AddTransactionScreen from "../screens/admin/AddTransactionScreen";
import TransactionHistoryScreen from "../screens/admin/TransactionHistoryScreen";

const Stack = createNativeStackNavigator();

export default function FinanceNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="FinanceHome"
                component={FinanceScreen}
            />

            <Stack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
            />
            <Stack.Screen
                name="TransactionHistory"
                component={TransactionHistoryScreen}
            />
        </Stack.Navigator>
    );
}