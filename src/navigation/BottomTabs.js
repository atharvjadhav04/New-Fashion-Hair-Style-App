import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/home/HomeScreen";
import ServicesScreen from "../screens/services/ServicesScreen";
import ReviewsScreen from "../screens/reviews/ReviewsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MyBookingsScreen from "../screens/booking/MyBookingsScreen";

import { COLORS } from "../theme";
import { useTranslation } from "../context/LanguageContext";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    const insets = useSafeAreaInsets();

    // Language translation function
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                headerShown: false,

                animation: "shift",

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },

                tabBarHideOnKeyboard: true,

                tabBarActiveTintColor: COLORS.primary,

                tabBarInactiveTintColor: "#888",

                tabBarStyle: {
                    backgroundColor: COLORS.black,
                    borderTopWidth: 0,
                    elevation: 0,

                    height: 70 + insets.bottom,

                    paddingBottom: Math.max(
                        insets.bottom,
                        10
                    ),

                    paddingTop: 8,

                    shadowOpacity: 0,
                },

                tabBarIcon: ({ color }) => {

                    let icon;

                    switch (route.name) {

                        case "Home":
                            icon = "home";
                            break;

                        case "Services":
                            icon = "cut";
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
                            size={24}
                            color={color}
                        />
                    );
                },

            })}
        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: t("home"),
                }}
            />

            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    title: t("services"),
                }}
            />

            <Tab.Screen
                name="Bookings"
                component={MyBookingsScreen}
                options={{
                    title: t("bookings"),
                }}
            />

            <Tab.Screen
                name="Reviews"
                component={ReviewsScreen}
                options={{
                    title: t("reviews"),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: t("profile"),
                }}
            />

        </Tab.Navigator>
    );
}