import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";
import { COLORS, SPACING } from "../../theme";

export default function PaymentScreen({ navigation }) {
    const { booking } = useBooking();

    return (
        <AppScreen style={styles.container}>
            <View>
                <Text style={styles.heading}>
                    पेमेंट
                </Text>

                <Text style={styles.amount}>
                    ₹{booking.amount || 0}
                </Text>

                <Text style={styles.text}>
                    Demo payment screen
                </Text>
            </View>

            <PrimaryButton
                title="पेमेंट यशस्वी करा"
                onPress={() => navigation.navigate("BookingSuccess")}
            />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
        justifyContent: "space-between",
        backgroundColor: COLORS.background,
    },

    heading: {
        fontSize: 30,
        fontWeight: "700",
    },

    amount: {
        fontSize: 36,
        fontWeight: "700",
        color: COLORS.primary,
        marginTop: 30,
    },

    text: {
        marginTop: 10,
        color: "#777",
    },
});