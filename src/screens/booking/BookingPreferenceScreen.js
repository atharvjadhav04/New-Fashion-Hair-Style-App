import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function BookingPreferenceScreen({ navigation }) {

    const { updateBooking } = useBooking();

    const [selected, setSelected] = useState("FASTEST");

    const handleContinue = () => {

        updateBooking({
            bookingType: selected,
        });

        if (selected === "FASTEST") {
            navigation.navigate("SelectDate");
        } else {
            navigation.navigate("BarberSelection");
        }

    };

    return (

        <AppScreen style={styles.container}>

            <Text style={styles.heading}>
                Booking Preference
            </Text>

            <Text style={styles.subHeading}>
                Choose how you want to book
            </Text>

            <TouchableOpacity
                style={[
                    styles.card,
                    selected === "FASTEST" && styles.activeCard,
                ]}
                onPress={() => setSelected("FASTEST")}
            >

                <Text style={styles.title}>
                    ⚡ Fastest Available
                </Text>

                <Text style={styles.desc}>
                    We'll assign the barber with the shortest waiting time.
                </Text>

                <Text style={styles.wait}>
                    Approx Wait : 10 Minutes
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.card,
                    selected === "CUSTOM" && styles.activeCard,
                ]}
                onPress={() => setSelected("CUSTOM")}
            >

                <Text style={styles.title}>
                    💈 Choose My Barber
                </Text>

                <Text style={styles.desc}>
                    Select your preferred barber.
                </Text>

                <Text style={styles.wait}>
                    Approx Wait : 20 Minutes
                </Text>

            </TouchableOpacity>

            <PrimaryButton
                title="Continue"
                onPress={handleContinue}
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
        color: COLORS.black,
        marginTop: 10,
    },

    subHeading: {
        color: "#666",
        marginBottom: 20,
        marginTop: 8,
        fontSize: 16,
    },

    card: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 2,
        borderColor: "#EEE",
        marginBottom: 20,
    },

    activeCard: {
        borderColor: COLORS.primary,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.black,
    },

    desc: {
        marginTop: 10,
        color: "#777",
        lineHeight: 22,
    },

    wait: {
        marginTop: 20,
        color: COLORS.primary,
        fontWeight: "700",
    },

}); 