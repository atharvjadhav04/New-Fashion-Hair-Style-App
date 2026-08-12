import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import PrimaryButton from "../common/PrimaryButton";
import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function BookNowCard({ onPress }) {
    return (
        <View style={styles.card}>

            <Text style={styles.title}>
                Ready for your next look?
            </Text>

            <Text style={styles.subtitle}>
                Book your appointment in just a few taps.
            </Text>

            <PrimaryButton
                title="📅 Book Appointment"
                onPress={onPress}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        marginVertical: SPACING.lg,
    },

    title: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },

    subtitle: {
        color: "#CCCCCC",
        marginBottom: 20,
        fontSize: 15,
    },

});