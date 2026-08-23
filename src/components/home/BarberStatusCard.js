import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function BarberStatusCard({
    barber,
}) {
    const isFree = barber.status === "FREE";
    const isBusy = barber.status === "BUSY";

    const statusText = isFree
        ? "Free"
        : isBusy
            ? "Busy"
            : "Next";

    const statusIcon = isFree
        ? "checkmark-circle"
        : isBusy
            ? "cut"
            : "time";

    const statusColor = isFree
        ? "#16A34A"
        : isBusy
            ? "#DC2626"
            : "#D97706";

    return (
        <View style={styles.card}>

            <View style={styles.topRow}>

                <View style={styles.barberInfo}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="person"
                            size={21}
                            color="#111827"
                        />
                    </View>

                    <View>
                        <Text style={styles.barberName}>
                            {barber.name}
                        </Text>

                        <Text style={styles.chairText}>
                            {barber.chair}
                        </Text>
                    </View>

                </View>

                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor:
                                `${statusColor}15`,
                        },
                    ]}
                >
                    <Ionicons
                        name={statusIcon}
                        size={14}
                        color={statusColor}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            {
                                color: statusColor,
                            },
                        ]}
                    >
                        {statusText}
                    </Text>
                </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.queueRow}>

                <View>
                    <Text style={styles.queueLabel}>
                        Waiting
                    </Text>

                    <Text style={styles.queueValue}>
                        {barber.waiting} customers
                    </Text>
                </View>

                {barber.currentCustomer ? (
                    <View style={styles.currentCustomer}>
                        <Text style={styles.queueLabel}>
                            Currently serving
                        </Text>

                        <Text style={styles.customerName}>
                            {barber.currentCustomer}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.currentCustomer}>
                        <Text style={styles.queueLabel}>
                            Current
                        </Text>

                        <Text style={styles.customerName}>
                            No customer
                        </Text>
                    </View>
                )}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    barberInfo: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    barberName: {
        fontSize: 15,
        fontWeight: "800",
        color: "#111827",
    },

    chairText: {
        marginTop: 3,
        fontSize: 12,
        color: "#6B7280",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: "700",
    },

    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 13,
    },

    queueRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    queueLabel: {
        fontSize: 11,
        color: "#94A3B8",
        fontWeight: "600",
    },

    queueValue: {
        marginTop: 3,
        fontSize: 13,
        color: "#111827",
        fontWeight: "700",
    },

    currentCustomer: {
        alignItems: "flex-end",
    },

    customerName: {
        marginTop: 3,
        fontSize: 13,
        color: "#111827",
        fontWeight: "700",
    },
});