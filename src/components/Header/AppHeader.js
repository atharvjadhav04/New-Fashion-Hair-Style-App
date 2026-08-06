import React from "react";
import { View, Text, StyleSheet } from "react-native";

import COLORS from "../../theme/colors";
import SPACING from "../../theme/spacing";

export default function AppHeader({
    title,
    subtitle,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {subtitle ? (
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: COLORS.secondary,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 15,
        color: COLORS.subtitle,
    },
});