import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function LiveQueueCard() {
    return (
        <View style={styles.card}>

            <Text style={styles.heading}>
                🎟 Live Queue
            </Text>

            <View style={styles.row}>
                <Text>Current Token</Text>

                <Text style={styles.value}>
                    14
                </Text>
            </View>

            <View style={styles.row}>
                <Text>Your Token</Text>

                <Text style={styles.value}>
                    --
                </Text>
            </View>

            <View style={styles.row}>
                <Text>Waiting</Text>

                <Text style={styles.value}>
                    --
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        marginTop: SPACING.lg,
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        elevation: 3,
    },

    heading: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
    },

    value: {
        color: COLORS.primary,
        fontWeight: "700",
    },

});