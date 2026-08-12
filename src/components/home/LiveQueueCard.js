import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS, SPACING, RADIUS } from "../../theme";

export default function LiveQueueCard() {
    const currentToken = 14;
    const yourToken = 18;

    const waiting = yourToken - currentToken;

    const progress = ((currentToken / yourToken) * 100).toFixed(0);

    return (
        <View style={styles.card}>

            <Text style={styles.heading}>
                💈 Live Queue
            </Text>

            <Text style={styles.barber}>
                Rajesh • Chair 2
            </Text>

            <View style={styles.tokenRow}>

                <View>
                    <Text style={styles.label}>
                        Current
                    </Text>

                    <Text style={styles.number}>
                        {currentToken}
                    </Text>
                </View>

                <View>
                    <Text style={styles.label}>
                        Your
                    </Text>

                    <Text style={styles.number}>
                        {yourToken}
                    </Text>
                </View>

            </View>

            <View style={styles.progressBg}>
                <View
                    style={[
                        styles.progress,
                        {
                            width: `${progress}%`,
                        },
                    ]}
                />
            </View>

            <Text style={styles.wait}>
                {waiting} Customers Before You
            </Text>

            <Text style={styles.eta}>
                ⏳ Approx. 20 Minutes
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        elevation: 2,
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
    },

    barber: {
        marginTop: 6,
        color: COLORS.primary,
        fontWeight: "600",
    },

    tokenRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 24,
    },

    label: {
        color: "#777",
        textAlign: "center",
    },

    number: {
        fontSize: 36,
        fontWeight: "700",
        color: COLORS.black,
        textAlign: "center",
    },

    progressBg: {
        height: 10,
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        backgroundColor: COLORS.primary,
    },

    wait: {
        marginTop: 18,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },

    eta: {
        marginTop: 8,
        textAlign: "center",
        color: "#666",
    },

});