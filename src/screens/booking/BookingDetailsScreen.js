import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";
import { COLORS, SPACING } from "../../theme";

export default function BookingDetailsScreen({ navigation }) {

    const { booking } = useBooking();

    return (
        <AppScreen style={styles.container}>

            <View>

                <Text style={styles.heading}>
                    Booking Details
                </Text>

                <Text style={styles.service}>
                    {booking.service?.marathi || "No Service Selected"}
                </Text>

                <Text style={styles.price}>
                    ₹ {booking.amount}
                </Text>

                <Text style={styles.duration}>
                    {booking.service?.duration}
                </Text>

                <Text style={styles.description}>
                    {booking.service?.description}
                </Text>

            </View>

            <PrimaryButton
                title="Continue"
                onPress={() =>
                    navigation.navigate("BookingPreference")
                }
            />

        </AppScreen>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },

    heading: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 25,
    },

    service: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.black,
    },

    price: {
        fontSize: 22,
        color: COLORS.primary,
        marginTop: 15,
        fontWeight: "700",
    },

    duration: {
        marginTop: 10,
        color: "#666",
        fontSize: 16,
    },

    description: {
        marginTop: 20,
        color: "#555",
        lineHeight: 24,
        fontSize: 16,
    },

});