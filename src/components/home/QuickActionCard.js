import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function QuickActionCard({
    title,
    subtitle,
    onPress,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={onPress}
        >
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        marginTop: SPACING.lg,
    },

    title: {
        fontSize: 24,
        color: COLORS.black,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 8,
        color: "#333",
        fontSize: 15,
    },
});