import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS, SPACING, RADIUS } from "../../theme";

export default function PopularServiceCard({
    name,
    price,
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>
                {name}
            </Text>

            <Text style={styles.price}>
                ₹ {price}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 140,
        marginRight: 15,
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.white,
        elevation: 3,
    },

    name: {
        fontWeight: "700",
        fontSize: 17,
    },

    price: {
        marginTop: 10,
        color: COLORS.primary,
        fontWeight: "700",
    },
});