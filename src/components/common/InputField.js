import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function InputField({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
}) {
    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                {label}
            </Text>

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                keyboardType={keyboardType}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginBottom: SPACING.lg,
    },

    label: {
        marginBottom: 8,
        color: COLORS.text,
        fontWeight: "600",
    },

    input: {
        height: 55,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: "#FAFAFA",
    },

});