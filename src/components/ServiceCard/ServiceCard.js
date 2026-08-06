import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";
import SPACING from "../../theme/spacing";
import RADIUS from "../../theme/radius";

export default function ServiceCard({
    title,
    price,
    duration,
}) {
    return (
        <View style={styles.card}>

            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.price}>
                ₹ {price}
            </Text>

            <Text style={styles.duration}>
                {duration}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.md,
        ...SHADOW.card,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
    },

    price: {
        color: COLORS.primary,
        fontSize: 18,
        marginTop: 10,
        fontWeight: "700",
    },

    duration: {
        marginTop: 6,
        color: COLORS.subtitle,
    },

});