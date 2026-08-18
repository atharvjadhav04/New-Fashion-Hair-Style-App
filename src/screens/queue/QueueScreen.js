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
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Live Queue</Text>
                    <Text style={styles.subtitle}>तुमचा नंबर जवळ येत आहे</Text>
                </View>

                {/* Barber Card */}
                <View style={styles.barberCard}>
                    <View style={styles.barberAvatarWrapper}>
                        <View style={styles.barberIcon}>
                            <Ionicons
                                name="person"
                                size={20}
                                color={COLORS.primary || "#EAB308"}
                            />
                        </View>
                    </View>

                    <View style={styles.barberInfo}>
                        <Text style={styles.smallLabel}>तुमचा बार्बर</Text>
                        <Text style={styles.barberName}>
                            {queue.barberName}
                        </Text>
                    </View>

                    <View style={styles.chairBadge}>
                        <Ionicons
                            name="cut-outline"
                            size={13}
                            color={COLORS.black || "#111827"}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.chairText}>
                            Chair {queue.chairNumber}
                        </Text>
                    </View>
                </View>

                {/* Main Queue Card */}
                <View style={styles.queueCard}>
                    <View style={styles.liveRow}>
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDotOuter}>
                                <View style={styles.liveDot} />
                            </View>
                            <Text style={styles.liveText}>LIVE QUEUE</Text>
                        </View>
                    </View>

                    <Text style={styles.currentLabel}>सध्या सुरू असलेला टोकन</Text>

                    <View style={styles.tokenDisplayBox}>
                        <Text style={styles.currentTokenSymbol}>#</Text>
                        <Text style={styles.currentToken}>
                            {queue.currentToken}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Queue Progress</Text>
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
                        <View style={styles.tokenBox}>
                            <Text style={styles.tokenLabel}>Current</Text>
                            <Text style={styles.tokenValue}>
                                #{queue.currentToken}
                            </Text>
                        </View>

                        <View style={styles.tokenDividerVertical} />

                        <View style={[styles.tokenBox, styles.youContainer]}>
                            <Text style={styles.youLabel}>YOU</Text>
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
                                name="people"
                                size={20}
                                color={COLORS.primary || "#111827"}
                            />
                        </View>
                        <Text style={styles.waitingNumber}>
                            {customersAhead}
                        </Text>
                        <Text style={styles.waitingLabel}>ग्राहक तुमच्या आधी</Text>
                    </View>

                    <View style={styles.verticalLine} />

                    <View style={styles.waitingItem}>
                        <View style={styles.waitingIcon}>
                            <Ionicons
                                name="time"
                                size={20}
                                color={COLORS.primary || "#111827"}
                            />
                        </View>
                        <Text style={styles.waitingNumber}>
                            {queue.estimatedMinutes}
                        </Text>
                        <Text style={styles.waitingLabel}>अंदाजे मिनिटे</Text>
                    </View>
                </View>

                {/* Status */}
                <View style={styles.statusCard}>
                    <View style={styles.statusIcon}>
                        <Ionicons
                            name="notifications"
                            size={18}
                            color="#16A34A"
                        />
                    </View>

                    <View style={styles.statusContent}>
                        <Text style={styles.statusTitle}>
                            तुमची पाळी जवळ आली आहे
                        </Text>
                        <Text style={styles.statusText}>
                            कृपया सलूनमध्ये उपलब्ध रहा. तुमचा नंबर जवळ आल्यावर तुम्हाला अपडेट मिळेल.
                        </Text>
                    </View>
                </View>

                {/* Refresh info */}
                <View style={styles.refreshRow}>
                    <Ionicons
                        name="sync-outline"
                        size={13}
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
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    content: {
        paddingHorizontal: SPACING.lg || 20,
        paddingTop: SPACING.md || 16,
        paddingBottom: 40,
    },

    headerContainer: {
        marginBottom: 8,
    },

    heading: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.8,
    },

    subtitle: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "500",
    },

    barberCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: SPACING.lg || 16,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    barberAvatarWrapper: {
        position: "relative",
    },

    barberIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: COLORS.black || "#111827",
        alignItems: "center",
        justifyContent: "center",
    },

    barberInfo: {
        flex: 1,
        marginLeft: 14,
    },

    smallLabel: {
        color: "#6B7280",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    barberName: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black || "#111827",
        letterSpacing: -0.3,
    },

    chairBadge: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    chairText: {
        color: COLORS.black || "#111827",
        fontSize: 12,
        fontWeight: "700",
    },

    queueCard: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.xl || 24,
        padding: 24,
        marginTop: 18,
        borderWidth: 1,
        borderColor: "#1E293B",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
            },
            android: {
                elevation: 8,
            },
        }),
    },

    liveRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    liveBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(34, 197, 94, 0.25)",
    },

    liveDotOuter: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        alignItems: "center",
        justifyContent: "center",
    },

    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#22C55E",
    },

    liveText: {
        marginLeft: 6,
        color: "#22C55E",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1,
    },

    currentLabel: {
        marginTop: 18,
        color: "#9CA3AF",
        textAlign: "center",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 0.2,
    },

    tokenDisplayBox: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "center",
        paddingVertical: 2,
    },

    currentTokenSymbol: {
        color: COLORS.primary || "#EAB308",
        fontSize: 36,
        fontWeight: "700",
        marginRight: 2,
    },

    currentToken: {
        color: COLORS.primary || "#EAB308",
        fontSize: 68,
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: -2,
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        marginVertical: 18,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    progressLabel: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "600",
    },

    progressPercent: {
        color: COLORS.primary || "#EAB308",
        fontSize: 13,
        fontWeight: "800",
    },

    progressBackground: {
        height: 8,
        backgroundColor: "#1E293B",
        borderRadius: 4,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: COLORS.primary || "#EAB308",
        borderRadius: 4,
    },

    tokenRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.05)",
    },

    tokenBox: {
        flex: 1,
    },

    tokenDividerVertical: {
        width: 1,
        height: 28,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginHorizontal: 12,
    },

    tokenLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    tokenValue: {
        color: COLORS.white || "#FFFFFF",
        fontSize: 20,
        fontWeight: "800",
        marginTop: 2,
    },

    youContainer: {
        alignItems: "flex-end",
    },

    youLabel: {
        color: COLORS.primary || "#EAB308",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.8,
    },

    yourToken: {
        color: COLORS.primary || "#EAB308",
        fontSize: 20,
        fontWeight: "800",
        marginTop: 2,
    },

    waitingCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        paddingVertical: 18,
        paddingHorizontal: SPACING.lg || 16,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 10,
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
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },

    waitingNumber: {
        marginTop: 8,
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.5,
    },

    waitingLabel: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
    },

    verticalLine: {
        width: 1,
        height: 50,
        backgroundColor: "#E5E7EB",
    },

    statusCard: {
        backgroundColor: "#F0FDF4",
        borderRadius: RADIUS.xl || 20,
        padding: SPACING.lg || 16,
        marginTop: 18,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#BBF7D0",
    },

    statusIcon: {
        width: 36,
        height: 36,
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
        marginTop: 4,
    },

    refreshRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    refreshText: {
        marginLeft: 6,
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
    },
});