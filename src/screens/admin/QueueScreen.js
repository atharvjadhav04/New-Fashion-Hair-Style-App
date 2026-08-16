import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
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

const INITIAL_CHAIRS = [
    {
        id: 1,
        barber: "Rajesh",
        customer: "अमोल पाटील",
        token: 15,
        service: "हेअर कट",
        status: "SERVING",
        wait: 0,
    },
    {
        id: 2,
        barber: "Suresh",
        customer: "रोहित जाधव",
        token: 14,
        service: "हेअर कट + दाढी",
        status: "SERVING",
        wait: 0,
    },
    {
        id: 3,
        barber: "Amit",
        customer: "प्रणव देशमुख",
        token: 16,
        service: "दाढी ट्रिम",
        status: "WAITING",
        wait: 10,
    },
];

const WAITING_CUSTOMERS = [
    {
        id: "w1",
        token: 17,
        name: "सचिन शिंदे",
        service: "हेअर कट",
        estimated: 20,
    },
    {
        id: "w2",
        token: 18,
        name: "विकास पाटील",
        service: "दाढी",
        estimated: 30,
    },
    {
        id: "w3",
        token: 19,
        name: "रोहित कदम",
        service: "हेअर कट",
        estimated: 40,
    },
];

export default function QueueScreen() {
    const [chairs, setChairs] = useState(INITIAL_CHAIRS);
    const [waitingCustomers, setWaitingCustomers] = useState(WAITING_CUSTOMERS);

    const markDone = (chairId) => {
        setChairs((current) =>
            current.map((chair) => {
                if (chair.id !== chairId) {
                    return chair;
                }

                return {
                    ...chair,
                    customer: "Available",
                    token: null,
                    service: null,
                    status: "AVAILABLE",
                };
            })
        );
    };

    const servingCount = chairs.filter(
        (chair) => chair.status === "SERVING"
    ).length;

    const waitingCount =
        chairs.filter(
            (chair) => chair.status === "WAITING"
        ).length + waitingCustomers.length;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.heading}>Live Queue</Text>
                        <Text style={styles.subtitle}>
                            आजची Queue व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>LIVE</Text>
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.summaryRow}>
                    <SummaryCard
                        value={servingCount}
                        label="Serving"
                        icon="cut-outline"
                    />

                    <SummaryCard
                        value={waitingCount}
                        label="Waiting"
                        icon="people-outline"
                    />

                    <SummaryCard
                        value={chairs.length}
                        label="Chairs"
                        icon="business-outline"
                    />
                </View>

                {/* Active Chairs */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Chairs</Text>
                        <Text style={styles.sectionSubtitle}>
                            सध्या प्रत्येक चेअरची स्थिती
                        </Text>
                    </View>
                </View>

                {chairs.map((chair) => (
                    <ChairQueueCard
                        key={chair.id}
                        chair={chair}
                        onDone={() => markDone(chair.id)}
                    />
                ))}

                {/* Waiting Customers */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Waiting Queue</Text>
                        <Text style={styles.sectionSubtitle}>
                            पुढील ग्राहक
                        </Text>
                    </View>

                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>
                            {waitingCustomers.length}
                        </Text>
                    </View>
                </View>

                {waitingCustomers.map((customer, index) => (
                    <WaitingCard
                        key={customer.id}
                        customer={customer}
                        position={index + 1}
                    />
                ))}
            </ScrollView>
        </AppScreen>
    );
}

function SummaryCard({ value, label, icon }) {
    return (
        <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.summaryValue}>{value}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
        </View>
    );
}

function ChairQueueCard({ chair, onDone }) {
    const isServing = chair.status === "SERVING";
    const isWaiting = chair.status === "WAITING";

    return (
        <View style={styles.chairCard}>
            {/* Chair Header */}
            <View style={styles.chairHeader}>
                <View style={styles.chairTitleRow}>
                    <View style={styles.chairIcon}>
                        <Ionicons
                            name="business-outline"
                            size={20}
                            color={COLORS.primary}
                        />
                    </View>

                    <View>
                        <Text style={styles.chairTitle}>Chair {chair.id}</Text>
                        <Text style={styles.barber}>{chair.barber}</Text>
                    </View>
                </View>

                <StatusBadge status={chair.status} />
            </View>

            {/* Customer */}
            <View style={styles.customerSection}>
                {chair.token ? (
                    <View style={styles.tokenBox}>
                        <Text style={styles.tokenLabel}>TOKEN</Text>
                        <Text style={styles.token}>#{chair.token}</Text>
                    </View>
                ) : (
                    <View style={styles.availableIcon}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={28}
                            color="#16A34A"
                        />
                    </View>
                )}

                <View style={styles.customerInfo}>
                    <Text style={styles.customerLabel}>ग्राहक</Text>
                    <Text style={styles.customerName}>{chair.customer}</Text>

                    {chair.service && (
                        <Text style={styles.service}>{chair.service}</Text>
                    )}
                </View>
            </View>

            {/* Action */}
            {isServing && (
                <TouchableOpacity
                    style={styles.doneButton}
                    activeOpacity={0.85}
                    onPress={onDone}
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color={COLORS.black}
                    />
                    <Text style={styles.doneText}>Customer Done</Text>
                </TouchableOpacity>
            )}

            {isWaiting && (
                <View style={styles.waitingMessage}>
                    <Ionicons
                        name="time-outline"
                        size={18}
                        color="#A16207"
                    />
                    <Text style={styles.waitingMessageText}>
                        Customer waiting for service
                    </Text>
                </View>
            )}

            {chair.status === "AVAILABLE" && (
                <View style={styles.availableMessage}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={18}
                        color="#16A34A"
                    />
                    <Text style={styles.availableMessageText}>
                        Chair available
                    </Text>
                </View>
            )}
        </View>
    );
}

function StatusBadge({ status }) {
    let label = "Available";
    let badgeStyle = styles.availableBadge;
    let textStyle = styles.availableText;
    let dotStyle = styles.availableDot;

    if (status === "SERVING") {
        label = "Serving";
        badgeStyle = styles.servingBadge;
        textStyle = styles.servingText;
        dotStyle = styles.servingDot;
    }

    if (status === "WAITING") {
        label = "Waiting";
        badgeStyle = styles.waitingBadge;
        textStyle = styles.waitingText;
        dotStyle = styles.waitingDot;
    }

    return (
        <View style={[styles.statusBadge, badgeStyle]}>
            <View style={[styles.statusDot, dotStyle]} />
            <Text style={[styles.statusText, textStyle]}>{label}</Text>
        </View>
    );
}

function WaitingCard({ customer, position }) {
    return (
        <View style={styles.waitingCard}>
            <View style={styles.positionCircle}>
                <Text style={styles.positionText}>{position}</Text>
            </View>

            <View style={styles.waitingCustomerInfo}>
                <Text style={styles.waitingCustomerName}>{customer.name}</Text>
                <Text style={styles.waitingService}>{customer.service}</Text>
            </View>

            <View style={styles.waitingRight}>
                <Text style={styles.waitingToken}>#{customer.token}</Text>
                <Text style={styles.estimated}>~{customer.estimated} min</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8F9FA",
    },

    content: {
        padding: SPACING.lg || 16,
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
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
        fontSize: 13,
        fontWeight: "500",
    },

    liveBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#86EFAC",
    },

    liveDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#22C55E",
        marginRight: 6,
    },

    liveText: {
        color: "#15803D",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.5,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    summaryCard: {
        width: "31.5%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl || 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    summaryIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#FDF8EA",
        alignItems: "center",
        justifyContent: "center",
    },

    summaryValue: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    summaryLabel: {
        marginTop: 2,
        fontSize: 11,
        fontWeight: "600",
        color: "#6B7280",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 26,
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.3,
    },

    sectionSubtitle: {
        marginTop: 2,
        fontSize: 12,
        color: "#6B7280",
    },

    chairCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    chairHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        paddingBottom: 12,
    },

    chairTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    chairIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    chairTitle: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.black,
    },

    barber: {
        marginLeft: 12,
        marginTop: 1,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
    },

    servingBadge: {
        backgroundColor: "#DCFCE7",
        borderColor: "#86EFAC",
    },

    waitingBadge: {
        backgroundColor: "#FEF3C7",
        borderColor: "#FDE68A",
    },

    availableBadge: {
        backgroundColor: "#F3F4F6",
        borderColor: "#E5E7EB",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },

    servingDot: {
        backgroundColor: "#22C55E",
    },

    waitingDot: {
        backgroundColor: "#D97706",
    },

    availableDot: {
        backgroundColor: "#6B7280",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 0.4,
        textTransform: "uppercase",
    },

    servingText: {
        color: "#15803D",
    },

    waitingText: {
        color: "#B45309",
    },

    availableText: {
        color: "#4B5563",
    },

    customerSection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },

    tokenBox: {
        width: 62,
        height: 62,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    tokenLabel: {
        color: "#9CA3AF",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.8,
    },

    token: {
        color: COLORS.primary,
        fontSize: 22,
        fontWeight: "800",
        marginTop: 1,
    },

    availableIcon: {
        width: 62,
        height: 62,
        borderRadius: 16,
        backgroundColor: "#F0FDF4",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#DCFCE7",
    },

    customerInfo: {
        flex: 1,
        marginLeft: 14,
    },

    customerLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
    },

    customerName: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "700",
        marginTop: 2,
    },

    service: {
        color: "#4B5563",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 2,
    },

    doneButton: {
        marginTop: 16,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    doneText: {
        marginLeft: 8,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "800",
    },

    waitingMessage: {
        marginTop: 14,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#FEF3C7",
        flexDirection: "row",
        alignItems: "center",
    },

    waitingMessageText: {
        marginLeft: 8,
        color: "#B45309",
        fontSize: 12,
        fontWeight: "600",
    },

    availableMessage: {
        marginTop: 14,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#F0FDF4",
        flexDirection: "row",
        alignItems: "center",
    },

    availableMessageText: {
        marginLeft: 8,
        color: "#15803D",
        fontSize: 12,
        fontWeight: "600",
    },

    countBadge: {
        minWidth: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
    },

    countText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "800",
    },

    waitingCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl || 16,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    positionCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    positionText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "800",
    },

    waitingCustomerInfo: {
        flex: 1,
        marginLeft: 12,
    },

    waitingCustomerName: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
    },

    waitingService: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },

    waitingRight: {
        alignItems: "flex-end",
    },

    waitingToken: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "800",
    },

    estimated: {
        marginTop: 2,
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
    },
});