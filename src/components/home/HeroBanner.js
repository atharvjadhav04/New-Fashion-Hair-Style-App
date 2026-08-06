import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

import Images from "../../constants/Images";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function HeroBanner() {
    return (
        <View style={styles.container}>
            <Image
                source={Images.logo}
                style={styles.logo}
                contentFit="contain"
            />

            <Text style={styles.title}>
                NEW FASHION
            </Text>

            <Text style={styles.subtitle}>
                HAIR STYLE
            </Text>

            <Text style={styles.rating}>
                ⭐ 4.9 (320 Reviews)
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        alignItems: "center",
    },

    logo: {
        width: 90,
        height: 90,
    },

    title: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "700",
        marginTop: 10,
    },

    subtitle: {
        color: COLORS.primary,
        fontSize: 18,
        marginTop: 5,
        fontWeight: "600",
    },

    rating: {
        color: COLORS.white,
        marginTop: 15,
    },
});