import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../theme";

export default function ScreenHeader({ title, subtitle }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? (
                <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: SPACING.lg,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 15,
        color: COLORS.subtitle,
    },
});