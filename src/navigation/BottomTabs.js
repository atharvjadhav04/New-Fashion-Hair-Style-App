import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import ServicesScreen from "../screens/services/ServicesScreen";
import BookingScreen from "../screens/booking/BookingScreen";
import ReviewsScreen from "../screens/reviews/ReviewsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

import { COLORS } from "../theme";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#888",

                tabBarStyle: {
                    backgroundColor: COLORS.black,
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                    borderTopWidth: 0,
                },

                tabBarIcon: ({ color, size }) => {
                    let icon;

                    switch (route.name) {
                        case "Home":
                            icon = "home";
                            break;
                        case "Services":
                            icon = "construct";
                            break;
                        case "Bookings":
                            icon = "calendar";
                            break;
                        case "Reviews":
                            icon = "star";
                            break;
                        case "Profile":
                            icon = "person";
                            break;
                        default:
                            icon = "ellipse";
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
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "मुख्य" }}
            />

            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{ title: "सेवा" }}
            />

            <Tab.Screen
                name="Bookings"
                component={BookingScreen}
                options={{ title: "बुकिंग" }}
            />

            <Tab.Screen
                name="Reviews"
                component={ReviewsScreen}
                options={{ title: "रिव्ह्यू" }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "प्रोफाइल" }}
            />
        </Tab.Navigator>
    );
}