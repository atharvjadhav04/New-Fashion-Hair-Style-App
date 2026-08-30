import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddReviewScreen from "../screens/reviews/AddReviewScreen";
import BottomTabs from "./BottomTabs";
import BookingNavigator from "./BookingNavigator";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

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

            <Stack.Screen
                name="AddReview"
                component={AddReviewScreen}
            />

            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
            />
        </Stack.Navigator>
    );
}