import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import ServicesScreen from "../screens/services/ServicesScreen";
import BookingScreen from "../screens/booking/BookingScreen";
import ReviewsScreen from "../screens/reviews/ReviewsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="Services"
                component={ServicesScreen}
            />

            <Tab.Screen
                name="Booking"
                component={BookingScreen}
            />

            <Tab.Screen
                name="Reviews"
                component={ReviewsScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}