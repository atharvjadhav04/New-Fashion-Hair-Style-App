import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/home/HomeScreen";
import ServicesScreen from "../screens/services/ServicesScreen";
import ReviewsScreen from "../screens/reviews/ReviewsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import BookingNavigator from "../navigation/BookingNavigator";
import MyBookingsScreen from "../screens/booking/MyBookingsScreen";
import {
    House,
    Scissors,
    CalendarDays,
    Star,
    User
} from "lucide-react-native";
import { COLORS } from "../theme";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const insets = useSafeAreaInsets();

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
                    paddingBottom: Math.max(insets.bottom, 10),
                    paddingTop: 8,

                    shadowOpacity: 0,
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
                options={{ title: "मुख्य" }}
            />

            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{ title: "सेवा" }}
            />

            <Tab.Screen
                name="Bookings"
                component={MyBookingsScreen}
                options={{ title: "माझ्या बुकिंग" }}
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