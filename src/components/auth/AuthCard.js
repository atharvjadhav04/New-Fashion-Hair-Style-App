import React from "react";
import { View, StyleSheet } from "react-native";

import {
    COLORS,
    SPACING,
    SHADOW,
    RADIUS,
} from "../../theme";

export default function AuthCard({
    children,
}) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        ...SHADOW.card,
    },

});