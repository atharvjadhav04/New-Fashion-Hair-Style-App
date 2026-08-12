import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../theme";

export default function AppScreen({ children, style }) {
    return (
        <SafeAreaView
            edges={["top", "left", "right"]}
            style={[styles.container, style]}
        >
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        flex: 1,
    },
});