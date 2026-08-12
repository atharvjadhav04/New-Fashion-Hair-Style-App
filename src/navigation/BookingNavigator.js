import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookingDetailsScreen from "../screens/booking/BookingDetailsScreen";
import BookingPreferenceScreen from "../screens/booking/BookingPreferenceScreen";
import BarberSelectionScreen from "../screens/booking/BarberSelectionScreen";
import SelectDateScreen from "../screens/booking/SelectDateScreen";
import SelectTimeScreen from "../screens/booking/SelectTimeScreen";
import BookingSummaryScreen from "../screens/booking/BookingSummaryScreen";
import BookingSuccessScreen from "../screens/booking/BookingSuccessScreen";
import PaymentScreen from "../screens/booking/PaymentScreen";
import QueueScreen from "../screens/queue/QueueScreen";

const Stack = createNativeStackNavigator();

export default function BookingNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="BookingDetails"
                component={BookingDetailsScreen}
            />

            <Stack.Screen
                name="BookingPreference"
                component={BookingPreferenceScreen}
            />

            <Stack.Screen
                name="BarberSelection"
                component={BarberSelectionScreen}
            />

            <Stack.Screen
                name="SelectDate"
                component={SelectDateScreen}
            />

            <Stack.Screen
                name="SelectTime"
                component={SelectTimeScreen}
            />

            <Stack.Screen
                name="BookingSummary"
                component={BookingSummaryScreen}
            />
            <Stack.Screen
                name="Payment"
                component={PaymentScreen}
            />

            <Stack.Screen
                name="BookingSuccess"
                component={BookingSuccessScreen}
            />
            <Stack.Screen
                name="Queue"
                component={QueueScreen}
            />
        </Stack.Navigator>
    );
}