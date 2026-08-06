import React from "react";
import { Text, StyleSheet } from "react-native";

import { COLORS, SPACING } from "../../theme";

export default function SectionTitle({ title }) {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.black,
        marginVertical: SPACING.lg,
    },
});