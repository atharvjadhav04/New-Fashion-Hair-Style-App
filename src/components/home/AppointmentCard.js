import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function AppointmentCard() {
    return (
        <View style={styles.card}>

            <View style={styles.header}>
                <Ionicons
                    name="calendar"
                    size={20}
                    color={COLORS.primary}
                />

                <Text style={styles.title}>
                    Today's Appointment
                </Text>
            </View>

            <Text style={styles.service}>
                Hair Cut
            </Text>

            <Text style={styles.time}>
                Today • 10:30 AM
            </Text>

            <View style={styles.status}>
                <View style={styles.dot} />

                <Text style={styles.statusText}>
                    Confirmed
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: SPACING.lg,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    title: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "700",
    },

    service: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.black,
    },

    time: {
        color: "#666",
        marginTop: 5,
    },

    status: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#2ECC71",
    },

    statusText: {
        marginLeft: 8,
        color: "#2ECC71",
        fontWeight: "700",
    },

});