import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW, SPACING } from "../../theme";

export default function AppCard({ children, style }) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOW.card,
    },
});