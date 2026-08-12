import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import CustomerNavigator from "./CustomerNavigator";
import AdminNavigator from "./AdminNavigator";

export default function AppNavigator() {

    // TEMPORARY TEST
    const role = "ADMIN";

    return (
        <NavigationContainer>
            {role === "ADMIN" ? (
                <AdminNavigator />
            ) : (
                <CustomerNavigator />
            )}
        </NavigationContainer>
    );
}