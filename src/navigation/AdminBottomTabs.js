import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdminQueueScreen from "../screens/admin/QueueScreen";
import AdminDashboardScreen from "../screens/admin/DashboardScreen";
import AdminAppointmentsScreen from "../screens/admin/AppointmentsScreen";
import ServicesNavigator from "./ServicesNavigator";
import SetupNavigator from "./SetupNavigator";
import FinanceNavigator from "./FinanceNavigator";

import { COLORS } from "../theme";

const Tab = createBottomTabNavigator();

export default function AdminBottomTabs() {

    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#888",

                tabBarHideOnKeyboard: true,

                tabBarStyle: {
                    backgroundColor: COLORS.black,
                    borderTopWidth: 0,
                    elevation: 0,

                    height: 70 + insets.bottom,

                    paddingBottom:
                        Math.max(insets.bottom, 8),

                    paddingTop: 6,

                    width: "100%",
                    margin: 0,
                },

                // IMPORTANT
                // Equal space for all 6 tabs
                tabBarItemStyle: {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                },

                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: "600",
                    marginTop: 2,
                },

                tabBarIcon: ({ color }) => {

                    let icon = "ellipse-outline";

                    switch (route.name) {

                        case "AdminDashboard":
                            icon = "grid-outline";
                            break;

                        case "AdminQueue":
                            icon = "people-outline";
                            break;

                        case "AdminAppointments":
                            icon = "calendar-outline";
                            break;

                        case "AdminServices":
                            icon = "cut-outline";
                            break;

                        case "AdminSetup":
                            icon = "settings-outline";
                            break;

                        case "AdminFinance":
                            icon = "wallet-outline";
                            break;
                    }

                    return (
                        <Ionicons
                            name={icon}
                            size={22}
                            color={color}
                        />
                    );
                },
            })}
        >

            {/* DASHBOARD */}

            <Tab.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
                options={{
                    title: "डॅशबोर्ड",
                }}
            />

            {/* QUEUE */}

            <Tab.Screen
                name="AdminQueue"
                component={AdminQueueScreen}
                options={{
                    title: "Queue",
                }}
            />

            {/* BOOKINGS */}

            <Tab.Screen
                name="AdminAppointments"
                component={AdminAppointmentsScreen}
                options={{
                    title: "बुकिंग",
                }}
            />

            {/* SERVICES */}

            <Tab.Screen
                name="AdminServices"
                component={ServicesNavigator}
                options={{
                    title: "सेवा",
                }}
            />

            {/* SETUP */}
            <Tab.Screen
                name="AdminSetup"
                component={SetupNavigator}
                options={{
                    title: "Setup",
                }}
            />

            {/* FINANCE */}

            <Tab.Screen
                name="AdminFinance"
                component={FinanceNavigator}
                options={{
                    title: "Finance",
                }}
            />

        </Tab.Navigator>
    );
}