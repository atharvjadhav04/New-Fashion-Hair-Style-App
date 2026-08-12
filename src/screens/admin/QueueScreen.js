import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
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
    const [chairs, setChairs] =
        useState(INITIAL_CHAIRS);

    const [waitingCustomers, setWaitingCustomers] =
        useState(WAITING_CUSTOMERS);

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
        (chair) =>
            chair.status === "SERVING"
    ).length;

    const waitingCount =
        chairs.filter(
            (chair) =>
                chair.status === "WAITING"
        ).length +
        waitingCustomers.length;

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.heading}>
                            Live Queue
                        </Text>

                        <Text style={styles.subtitle}>
                            आजची Queue व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />

                        <Text style={styles.liveText}>
                            LIVE
                        </Text>
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
                        <Text style={styles.sectionTitle}>
                            Chairs
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            सध्या प्रत्येक चेअरची स्थिती
                        </Text>
                    </View>

                </View>

                {chairs.map((chair) => (
                    <ChairQueueCard
                        key={chair.id}
                        chair={chair}
                        onDone={() =>
                            markDone(chair.id)
                        }
                    />
                ))}

                {/* Waiting Customers */}

                <View style={styles.sectionHeader}>

                    <View>
                        <Text style={styles.sectionTitle}>
                            Waiting Queue
                        </Text>

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

                {waitingCustomers.map(
                    (customer, index) => (
                        <WaitingCard
                            key={customer.id}
                            customer={customer}
                            position={index + 1}
                        />
                    )
                )}

            </ScrollView>

        </AppScreen>
    );
}

function SummaryCard({
    value,
    label,
    icon,
}) {
    return (
        <View style={styles.summaryCard}>

            <View style={styles.summaryIcon}>
                <Ionicons
                    name={icon}
                    size={19}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.summaryValue}>
                {value}
            </Text>

            <Text style={styles.summaryLabel}>
                {label}
            </Text>

        </View>
    );
}

function ChairQueueCard({
    chair,
    onDone,
}) {
    const isServing =
        chair.status === "SERVING";

    const isWaiting =
        chair.status === "WAITING";

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
                        <Text style={styles.chairTitle}>
                            Chair {chair.id}
                        </Text>

                        <Text style={styles.barber}>
                            {chair.barber}
                        </Text>
                    </View>

                </View>

                <StatusBadge
                    status={chair.status}
                />

            </View>

            {/* Customer */}

            <View style={styles.customerSection}>

                {chair.token ? (
                    <View style={styles.tokenBox}>

                        <Text style={styles.tokenLabel}>
                            TOKEN
                        </Text>

                        <Text style={styles.token}>
                            #{chair.token}
                        </Text>

                    </View>
                ) : (
                    <View style={styles.availableIcon}>
                        <Ionicons
                            name="checkmark"
                            size={25}
                            color="#16A34A"
                        />
                    </View>
                )}

                <View style={styles.customerInfo}>

                    <Text style={styles.customerLabel}>
                        ग्राहक
                    </Text>

                    <Text style={styles.customerName}>
                        {chair.customer}
                    </Text>

                    {chair.service && (
                        <Text style={styles.service}>
                            {chair.service}
                        </Text>
                    )}

                </View>

            </View>

            {/* Action */}

            {isServing && (
                <TouchableOpacity
                    style={styles.doneButton}
                    activeOpacity={0.8}
                    onPress={onDone}
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color={COLORS.black}
                    />

                    <Text style={styles.doneText}>
                        Customer Done
                    </Text>
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
                        name="checkmark-circle"
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

            <View
                style={[
                    styles.statusDot,
                    dotStyle,
                ]}
            />

            <Text
                style={[
                    styles.statusText,
                    textStyle,
                ]}
            >
                {label}
            </Text>

        </View>
    );
}

function WaitingCard({
    customer,
    position,
}) {
    return (
        <View style={styles.waitingCard}>

            <View style={styles.positionCircle}>
                <Text style={styles.positionText}>
                    {position}
                </Text>
            </View>

            <View style={styles.waitingCustomerInfo}>

                <Text style={styles.waitingCustomerName}>
                    {customer.name}
                </Text>

                <Text style={styles.waitingService}>
                    {customer.service}
                </Text>

            </View>

            <View style={styles.waitingRight}>

                <Text style={styles.waitingToken}>
                    #{customer.token}
                </Text>

                <Text style={styles.estimated}>
                    ~{customer.estimated} min
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    heading: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 5,
        color: "#888",
        fontSize: 13,
    },

    liveBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
    },

    liveDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#22C55E",
        marginRight: 5,
    },

    liveText: {
        color: "#16A34A",
        fontSize: 10,
        fontWeight: "800",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 22,
    },

    summaryCard: {
        width: "31.5%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 13,
    },

    summaryIcon: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    summaryValue: {
        marginTop: 8,
        fontSize: 23,
        fontWeight: "800",
        color: COLORS.black,
    },

    summaryLabel: {
        marginTop: 2,
        fontSize: 10,
        color: "#888",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 26,
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: COLORS.black,
    },

    sectionSubtitle: {
        marginTop: 3,
        fontSize: 11,
        color: "#999",
    },

    chairCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 12,
    },

    chairHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    chairTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    chairIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    chairTitle: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "800",
        color: COLORS.black,
    },

    barber: {
        marginLeft: 10,
        marginTop: 2,
        color: "#888",
        fontSize: 11,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 20,
    },

    servingBadge: {
        backgroundColor: "#EAF8EF",
    },

    waitingBadge: {
        backgroundColor: "#FFF7E0",
    },

    availableBadge: {
        backgroundColor: "#F1F1F1",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },

    servingDot: {
        backgroundColor: "#22C55E",
    },

    waitingDot: {
        backgroundColor: "#EAB308",
    },

    availableDot: {
        backgroundColor: "#999",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "700",
    },

    servingText: {
        color: "#16A34A",
    },

    waitingText: {
        color: "#A16207",
    },

    availableText: {
        color: "#777",
    },

    customerSection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
    },

    tokenBox: {
        width: 65,
        height: 65,
        borderRadius: 18,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    tokenLabel: {
        color: "#888",
        fontSize: 9,
    },

    token: {
        color: COLORS.primary,
        fontSize: 24,
        fontWeight: "800",
        marginTop: 2,
    },

    availableIcon: {
        width: 65,
        height: 65,
        borderRadius: 18,
        backgroundColor: "#EAF8EF",
        alignItems: "center",
        justifyContent: "center",
    },

    customerInfo: {
        flex: 1,
        marginLeft: 13,
    },

    customerLabel: {
        color: "#999",
        fontSize: 10,
    },

    customerName: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "700",
        marginTop: 3,
    },

    service: {
        color: "#777",
        fontSize: 11,
        marginTop: 3,
    },

    doneButton: {
        marginTop: 16,
        height: 48,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    doneText: {
        marginLeft: 7,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "800",
    },

    waitingMessage: {
        marginTop: 15,
        padding: 12,
        borderRadius: 13,
        backgroundColor: "#FFF7E0",
        flexDirection: "row",
        alignItems: "center",
    },

    waitingMessageText: {
        marginLeft: 7,
        color: "#A16207",
        fontSize: 11,
    },

    availableMessage: {
        marginTop: 15,
        padding: 12,
        borderRadius: 13,
        backgroundColor: "#EAF8EF",
        flexDirection: "row",
        alignItems: "center",
    },

    availableMessageText: {
        marginLeft: 7,
        color: "#16A34A",
        fontSize: 11,
    },

    countBadge: {
        minWidth: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    countText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "800",
    },

    waitingCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
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
        marginLeft: 11,
    },

    waitingCustomerName: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
    },

    waitingService: {
        marginTop: 3,
        color: "#888",
        fontSize: 11,
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
        marginTop: 3,
        color: "#999",
        fontSize: 10,
    },

});