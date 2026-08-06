import React from "react";
import { Text, StyleSheet } from "react-native";

import COLORS from "../../theme/colors";
import SPACING from "../../theme/spacing";

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
        color: COLORS.text,
        marginVertical: SPACING.md,
    },
});