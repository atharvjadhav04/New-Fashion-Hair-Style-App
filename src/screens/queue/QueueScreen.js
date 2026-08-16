import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function QueueScreen() {
    // Demo data.
    // Later this will come from Spring Boot.
    const queue = {
        barberName: "Rajesh",
        chairNumber: 2,
        currentToken: 14,
        yourToken: 18,
        estimatedMinutes: 20,
    };

    const customersAhead =
        Math.max(
            queue.yourToken - queue.currentToken - 1,
            0
        );

    const progress =
        queue.yourToken > queue.currentToken
            ? Math.min(
                ((queue.currentToken /
                    queue.yourToken) *
                    100),
                100
            )
            : 100;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}

                <Text style={styles.heading}>
                    Live Queue
                </Text>

                <Text style={styles.subtitle}>
                    तुमचा नंबर जवळ येत आहे
                </Text>

                {/* Barber */}

                <View style={styles.barberCard}>
                    <View style={styles.barberIcon}>
                        <Ionicons
                            name="person"
                            size={22}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.barberInfo}>
                        <Text style={styles.smallLabel}>
                            तुमचा बार्बर
                        </Text>

                        <Text style={styles.barberName}>
                            {queue.barberName}
                        </Text>
                    </View>

                    <View style={styles.chairBadge}>
                        <Text style={styles.chairText}>
                            Chair {queue.chairNumber}
                        </Text>
                    </View>
                </View>

                {/* Main Queue Card */}

                <View style={styles.queueCard}>
                    <View style={styles.liveRow}>
                        <View style={styles.liveDotOuter}>
                            <View style={styles.liveDot} />
                        </View>

                        <Text style={styles.liveText}>
                            LIVE QUEUE
                        </Text>
                    </View>

                    <Text style={styles.currentLabel}>
                        सध्या सुरू असलेला टोकन
                    </Text>

                    <View style={styles.tokenDisplayBox}>
                        <Text style={styles.currentToken}>
                            {queue.currentToken}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>
                            Queue Progress
                        </Text>

                        <Text style={styles.progressPercent}>
                            {Math.round(progress)}%
                        </Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${progress}%`,
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.tokenRow}>
                        <View>
                            <Text style={styles.tokenLabel}>
                                Current
                            </Text>

                            <Text style={styles.tokenValue}>
                                #{queue.currentToken}
                            </Text>
                        </View>

                        <View style={styles.youContainer}>
                            <Text style={styles.youLabel}>
                                YOU
                            </Text>

                            <Text style={styles.yourToken}>
                                #{queue.yourToken}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Waiting Information */}

                <View style={styles.waitingCard}>
                    <View style={styles.waitingItem}>
                        <View style={styles.waitingIcon}>
                            <Ionicons
                                name="people-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.waitingNumber}>
                            {customersAhead}
                        </Text>

                        <Text style={styles.waitingLabel}>
                            ग्राहक तुमच्या आधी
                        </Text>
                    </View>

                    <View style={styles.verticalLine} />

                    <View style={styles.waitingItem}>
                        <View style={styles.waitingIcon}>
                            <Ionicons
                                name="time-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.waitingNumber}>
                            {queue.estimatedMinutes}
                        </Text>

                        <Text style={styles.waitingLabel}>
                            अंदाजे मिनिटे
                        </Text>
                    </View>
                </View>

                {/* Status */}

                <View style={styles.statusCard}>
                    <View style={styles.statusIcon}>
                        <Ionicons
                            name="notifications-outline"
                            size={20}
                            color="#16A34A"
                        />
                    </View>

                    <View style={styles.statusContent}>
                        <Text style={styles.statusTitle}>
                            तुमची पाळी जवळ आली आहे
                        </Text>

                        <Text style={styles.statusText}>
                            कृपया सलूनमध्ये उपलब्ध रहा. तुमचा नंबर
                            जवळ आल्यावर तुम्हाला अपडेट मिळेल.
                        </Text>
                    </View>
                </View>

                {/* Refresh info */}

                <View style={styles.refreshRow}>
                    <Ionicons
                        name="sync-outline"
                        size={14}
                        color="#9CA3AF"
                    />

                    <Text style={styles.refreshText}>
                        Queue माहिती आपोआप अपडेट होईल
                    </Text>
                </View>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 40,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "400",
    },

    barberCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    barberIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    barberInfo: {
        flex: 1,
        marginLeft: 14,
    },

    smallLabel: {
        color: "#8E8E93",
        fontSize: 11,
        fontWeight: "500",
    },

    barberName: {
        marginTop: 2,
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.black,
        letterSpacing: -0.2,
    },

    chairBadge: {
        backgroundColor: "#F8F6EF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.04)",
    },

    chairText: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "700",
    },

    queueCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 22,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#222222",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.18,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    liveRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    liveDotOuter: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },

    liveDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: "#22C55E",
    },

    liveText: {
        marginLeft: 8,
        color: "#22C55E",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.2,
    },

    currentLabel: {
        marginTop: 20,
        color: "#9CA3AF",
        textAlign: "center",
        fontSize: 13,
        fontWeight: "500",
    },

    tokenDisplayBox: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
    },

    currentToken: {
        color: COLORS.primary,
        fontSize: 62,
        fontWeight: "800",
        textAlign: "center",
        letterSpacing: -1,
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginVertical: 18,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    progressLabel: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
    },

    progressPercent: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "700",
    },

    progressBackground: {
        height: 8,
        backgroundColor: "#262626",
        borderRadius: 4,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },

    tokenRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    tokenLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
    },

    tokenValue: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "700",
        marginTop: 2,
    },

    youContainer: {
        alignItems: "flex-end",
    },

    youLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.5,
    },

    yourToken: {
        color: COLORS.primary,
        fontSize: 22,
        fontWeight: "800",
        marginTop: 2,
    },

    waitingCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingVertical: 18,
        paddingHorizontal: SPACING.lg,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    waitingItem: {
        flex: 1,
        alignItems: "center",
    },

    waitingIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F8F6EF",
        alignItems: "center",
        justifyContent: "center",
    },

    waitingNumber: {
        marginTop: 6,
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    waitingLabel: {
        marginTop: 2,
        color: "#8E8E93",
        fontSize: 11,
        fontWeight: "500",
        textAlign: "center",
    },

    verticalLine: {
        width: 1,
        height: 55,
        backgroundColor: "#F3F4F6",
    },

    statusCard: {
        backgroundColor: "#F0FDF4",
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 16,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#DCFCE7",
    },

    statusIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#DCFCE7",
        alignItems: "center",
        justifyContent: "center",
    },

    statusContent: {
        flex: 1,
        marginLeft: 12,
    },

    statusTitle: {
        color: "#15803D",
        fontWeight: "700",
        fontSize: 14,
    },

    statusText: {
        color: "#166534",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 3,
    },

    refreshRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    refreshText: {
        marginLeft: 6,
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
    },
});