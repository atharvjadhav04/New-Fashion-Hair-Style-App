import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
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
                            size={24}
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
                        <View style={styles.liveDot} />

                        <Text style={styles.liveText}>
                            LIVE QUEUE
                        </Text>
                    </View>

                    <Text style={styles.currentLabel}>
                        सध्या सुरू असलेला टोकन
                    </Text>

                    <Text style={styles.currentToken}>
                        {queue.currentToken}
                    </Text>

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
                                {queue.currentToken}
                            </Text>
                        </View>

                        <View style={styles.youContainer}>
                            <Text style={styles.youLabel}>
                                YOU
                            </Text>

                            <Text style={styles.yourToken}>
                                {queue.yourToken}
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
                            size={22}
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
                        size={15}
                        color="#999"
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
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 6,
        color: "#777",
        fontSize: 15,
    },

    barberCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
    },

    barberIcon: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    barberInfo: {
        flex: 1,
        marginLeft: 12,
    },

    smallLabel: {
        color: "#888",
        fontSize: 12,
    },

    barberName: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
    },

    chairBadge: {
        backgroundColor: "#F7F3E7",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
    },

    chairText: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "700",
    },

    queueCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 24,
        marginTop: 16,
    },

    liveRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#22C55E",
    },

    liveText: {
        marginLeft: 7,
        color: "#22C55E",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1,
    },

    currentLabel: {
        marginTop: 24,
        color: "#999",
        textAlign: "center",
        fontSize: 13,
    },

    currentToken: {
        marginTop: 4,
        color: COLORS.primary,
        fontSize: 58,
        fontWeight: "800",
        textAlign: "center",
    },

    divider: {
        height: 1,
        backgroundColor: "#333",
        marginVertical: 20,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 9,
    },

    progressLabel: {
        color: "#AAA",
        fontSize: 12,
    },

    progressPercent: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "700",
    },

    progressBackground: {
        height: 9,
        backgroundColor: "#333",
        borderRadius: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },

    tokenRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 22,
    },

    tokenLabel: {
        color: "#888",
        fontSize: 12,
    },

    tokenValue: {
        color: COLORS.white,
        fontSize: 25,
        fontWeight: "700",
        marginTop: 3,
    },

    youContainer: {
        alignItems: "flex-end",
    },

    youLabel: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "800",
    },

    yourToken: {
        color: COLORS.primary,
        fontSize: 25,
        fontWeight: "800",
        marginTop: 3,
    },

    waitingCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    waitingItem: {
        flex: 1,
        alignItems: "center",
    },

    waitingIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    waitingNumber: {
        marginTop: 8,
        fontSize: 23,
        fontWeight: "800",
        color: COLORS.black,
    },

    waitingLabel: {
        marginTop: 3,
        color: "#888",
        fontSize: 11,
        textAlign: "center",
    },

    verticalLine: {
        width: 1,
        height: 70,
        backgroundColor: "#EEEEEE",
    },

    statusCard: {
        backgroundColor: "#EAF8EF",
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 16,
        flexDirection: "row",
    },

    statusIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#D8F3E1",
        alignItems: "center",
        justifyContent: "center",
    },

    statusContent: {
        flex: 1,
        marginLeft: 12,
    },

    statusTitle: {
        color: "#166534",
        fontWeight: "700",
        fontSize: 14,
    },

    statusText: {
        color: "#34704A",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },

    refreshRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },

    refreshText: {
        marginLeft: 5,
        color: "#999",
        fontSize: 11,
    },
});