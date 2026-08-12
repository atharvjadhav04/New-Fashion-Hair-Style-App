import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import Images from "../../constants/Images";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function HeroBanner() {
    const hour = new Date().getHours();

    let greeting = "शुभ सकाळ";
    let icon = "sunny";

    if (hour >= 12 && hour < 17) {
        greeting = "शुभ दुपार";
        icon = "partly-sunny";
    } else if (hour >= 17 && hour < 21) {
        greeting = "शुभ संध्याकाळ";
        icon = "moon";
    } else if (hour >= 21 || hour < 6) {
        greeting = "शुभ रात्री";
        icon = "moon";
    }

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View>
                    <View style={styles.greetingRow}>
                        <Ionicons name={icon} size={18} color={COLORS.primary} />
                        <Text style={styles.greeting}> {greeting}</Text>
                    </View>

                    <Text style={styles.welcome}>👋 नमस्कार,</Text>

                    <Text style={styles.userName}>Atharv</Text>
                </View>

                <Image
                    source={Images.logo}
                    style={styles.logo}
                    contentFit="contain"
                />
            </View>

            <View style={styles.divider} />

            <Text style={styles.salonName}>
                NEW FASHION
            </Text>

            <Text style={styles.salonSub}>
                HAIR STYLE
            </Text>

            <View style={styles.statusRow}>
                <View style={styles.openDot} />

                <Text style={styles.openText}>
                    Open Now
                </Text>

                <Text style={styles.time}>
                    • 9:00 AM - 9:00 PM
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        marginBottom: SPACING.lg,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greetingRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    greeting: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
    },

    welcome: {
        color: COLORS.white,
        fontSize: 18,
        marginTop: 12,
    },

    userName: {
        color: COLORS.white,
        fontSize: 30,
        fontWeight: "700",
        marginTop: 4,
    },

    logo: {
        width: 85,
        height: 85,
    },

    divider: {
        height: 1,
        backgroundColor: "#333",
        marginVertical: 20,
    },

    salonName: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: 1,
    },

    salonSub: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 4,
        marginTop: 4,
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
    },

    openDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#22C55E",
    },

    openText: {
        color: "#22C55E",
        marginLeft: 8,
        fontWeight: "700",
    },

    time: {
        color: "#BBBBBB",
        marginLeft: 10,
    },

});