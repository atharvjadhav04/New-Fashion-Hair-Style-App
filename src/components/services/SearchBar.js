import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function SearchBar({
    value,
    onChangeText,
}) {
    return (
        <View style={styles.container}>
            <Ionicons
                name="search"
                size={20}
                color="#777"
            />

            <TextInput
                placeholder="Search Service..."
                placeholderTextColor="#777"
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.lg,
        height: 55,
        marginBottom: SPACING.lg,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },

});