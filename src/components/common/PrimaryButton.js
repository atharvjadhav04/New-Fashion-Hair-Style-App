import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

import { COLORS, RADIUS } from "../../theme";

export default function PrimaryButton({
    title,
    onPress,
    loading = false,
    disabled = false,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled || loading}
            style={styles.button}
            onPress={onPress}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.text}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.black,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: COLORS.white,
        fontWeight: "700",
        fontSize: 16,
    },
});