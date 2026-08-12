import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function CategoryChip({
    title,
    active,
    onPress,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.chip,
                active && styles.activeChip,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    active && styles.activeText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    chip: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: RADIUS.full,
        backgroundColor: "#EAEAEA",
        marginRight: 10,
    },

    activeChip: {
        backgroundColor: COLORS.black,
    },

    text: {
        color: COLORS.black,
        fontWeight: "600",
    },

    activeText: {
        color: COLORS.white,
    },

});