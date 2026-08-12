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

const APPOINTMENTS = [
    {
        id: "BK001",
        token: 15,
        customer: "अमोल पाटील",
        phone: "9876543210",
        service: "हेअर कट",
        barber: "Rajesh",
        chair: 1,
        time: "10:30 AM",
        amount: 200,
        payment: "PAID",
        status: "UPCOMING",
    },
    {
        id: "BK002",
        token: 16,
        customer: "प्रणव देशमुख",
        phone: "9823456789",
        service: "दाढी ट्रिम",
        barber: "Amit",
        chair: 3,
        time: "11:00 AM",
        amount: 100,
        payment: "PAID",
        status: "UPCOMING",
    },
    {
        id: "BK003",
        token: 14,
        customer: "रोहित जाधव",
        phone: "9765432109",
        service: "हेअर कट + दाढी",
        barber: "Suresh",
        chair: 2,
        time: "10:00 AM",
        amount: 300,
        payment: "PAID",
        status: "IN_PROGRESS",
    },
    {
        id: "BK004",
        token: 13,
        customer: "सचिन शिंदे",
        phone: "9898989898",
        service: "हेअर कट",
        barber: "Rajesh",
        chair: 1,
        time: "09:30 AM",
        amount: 200,
        payment: "PAID",
        status: "COMPLETED",
    },
    {
        id: "BK005",
        token: 12,
        customer: "विकास पाटील",
        phone: "9812345678",
        service: "दाढी",
        barber: "Amit",
        chair: 3,
        time: "09:00 AM",
        amount: 100,
        payment: "PAID",
        status: "COMPLETED",
    },
];

export default function AppointmentsScreen() {
    const [activeTab, setActiveTab] =
        useState("UPCOMING");

    const filteredAppointments =
        APPOINTMENTS.filter(
            (appointment) =>
                appointment.status === activeTab
        );

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}

                <Text style={styles.heading}>
                    Appointments
                </Text>

                <Text style={styles.subtitle}>
                    आजच्या सर्व बुकिंग व्यवस्थापित करा
                </Text>

                {/* Tabs */}

                <View style={styles.tabs}>
                    <Tab
                        title="Upcoming"
                        active={
                            activeTab === "UPCOMING"
                        }
                        onPress={() =>
                            setActiveTab("UPCOMING")
                        }
                    />

                    <Tab
                        title="In Progress"
                        active={
                            activeTab === "IN_PROGRESS"
                        }
                        onPress={() =>
                            setActiveTab("IN_PROGRESS")
                        }
                    />

                    <Tab
                        title="Completed"
                        active={
                            activeTab === "COMPLETED"
                        }
                        onPress={() =>
                            setActiveTab("COMPLETED")
                        }
                    />
                </View>

                {/* Count */}

                <View style={styles.countRow}>
                    <Text style={styles.countLabel}>
                        {getTabLabel(activeTab)}
                    </Text>

                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>
                            {filteredAppointments.length}
                        </Text>
                    </View>
                </View>

                {/* Appointments */}

                {filteredAppointments.length === 0 ? (
                    <EmptyState />
                ) : (
                    filteredAppointments.map(
                        (appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                            />
                        )
                    )
                )}
            </ScrollView>
        </AppScreen>
    );
}

function Tab({
    title,
    active,
    onPress,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.tab,
                active && styles.activeTab,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.tabText,
                    active && styles.activeTabText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

function AppointmentCard({
    appointment,
}) {
    const isInProgress =
        appointment.status === "IN_PROGRESS";

    const isCompleted =
        appointment.status === "COMPLETED";

    return (
        <View style={styles.card}>
            {/* Header */}

            <View style={styles.cardHeader}>
                <View style={styles.customerHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {appointment.customer.charAt(0)}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.customerName}>
                            {appointment.customer}
                        </Text>

                        <Text style={styles.bookingId}>
                            {appointment.id}
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        isInProgress &&
                        styles.progressBadge,
                        isCompleted &&
                        styles.completedBadge,
                        !isInProgress &&
                        !isCompleted &&
                        styles.upcomingBadge,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            isInProgress &&
                            styles.progressText,
                            isCompleted &&
                            styles.completedText,
                            !isInProgress &&
                            !isCompleted &&
                            styles.upcomingText,
                        ]}
                    >
                        {isInProgress
                            ? "In Progress"
                            : isCompleted
                                ? "Completed"
                                : "Upcoming"}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Token */}

            <View style={styles.tokenRow}>
                <View style={styles.tokenContainer}>
                    <Text style={styles.tokenLabel}>
                        TOKEN
                    </Text>

                    <Text style={styles.token}>
                        #{appointment.token}
                    </Text>
                </View>

                <View style={styles.timeContainer}>
                    <Ionicons
                        name="time-outline"
                        size={18}
                        color={COLORS.primary}
                    />

                    <View style={styles.timeInfo}>
                        <Text style={styles.smallLabel}>
                            वेळ
                        </Text>

                        <Text style={styles.time}>
                            {appointment.time}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Service */}

            <View style={styles.detailRow}>
                <Detail
                    icon="cut-outline"
                    label="सेवा"
                    value={appointment.service}
                />

                <Detail
                    icon="person-outline"
                    label="बार्बर"
                    value={appointment.barber}
                />
            </View>

            <View style={styles.detailRow}>
                <Detail
                    icon="business-outline"
                    label="चेअर"
                    value={`Chair ${appointment.chair}`}
                />

                <Detail
                    icon="cash-outline"
                    label="रक्कम"
                    value={`₹${appointment.amount}`}
                />
            </View>

            {/* Payment */}

            <View style={styles.paymentRow}>
                <View style={styles.paymentStatus}>
                    <Ionicons
                        name={
                            appointment.payment === "PAID"
                                ? "checkmark-circle"
                                : "alert-circle"
                        }
                        size={17}
                        color={
                            appointment.payment === "PAID"
                                ? "#16A34A"
                                : "#D97706"
                        }
                    />

                    <Text
                        style={[
                            styles.paymentText,
                            {
                                color:
                                    appointment.payment ===
                                        "PAID"
                                        ? "#16A34A"
                                        : "#D97706",
                            },
                        ]}
                    >
                        {appointment.payment === "PAID"
                            ? "Payment Received"
                            : "Payment Pending"}
                    </Text>
                </View>
            </View>

            {/* Action */}

            {isInProgress && (
                <View style={styles.activeMessage}>
                    <Ionicons
                        name="cut-outline"
                        size={18}
                        color={COLORS.primary}
                    />

                    <Text style={styles.activeMessageText}>
                        Customer is currently being served
                    </Text>
                </View>
            )}

            {isCompleted && (
                <View style={styles.completedMessage}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={18}
                        color="#16A34A"
                    />

                    <Text
                        style={styles.completedMessageText}
                    >
                        Service completed
                    </Text>
                </View>
            )}
        </View>
    );
}

function Detail({
    icon,
    label,
    value,
}) {
    return (
        <View style={styles.detail}>
            <Ionicons
                name={icon}
                size={17}
                color={COLORS.primary}
            />

            <View style={styles.detailContent}>
                <Text style={styles.smallLabel}>
                    {label}
                </Text>

                <Text style={styles.detailValue}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

function EmptyState() {
    return (
        <View style={styles.empty}>
            <View style={styles.emptyIcon}>
                <Ionicons
                    name="calendar-outline"
                    size={32}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.emptyTitle}>
                कोणतीही बुकिंग नाही
            </Text>

            <Text style={styles.emptyText}>
                या category मध्ये सध्या बुकिंग उपलब्ध नाही.
            </Text>
        </View>
    );
}

function getTabLabel(status) {
    if (status === "UPCOMING") {
        return "Upcoming Appointments";
    }

    if (status === "IN_PROGRESS") {
        return "In Progress";
    }

    return "Completed Appointments";
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

    tabs: {
        flexDirection: "row",
        backgroundColor: "#E9E9E9",
        borderRadius: RADIUS.xl,
        padding: 4,
        marginTop: 22,
    },

    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        borderRadius: RADIUS.xl,
    },

    activeTab: {
        backgroundColor: COLORS.black,
    },

    tabText: {
        fontSize: 10,
        fontWeight: "600",
        color: "#777",
        textAlign: "center",
    },

    activeTabText: {
        color: COLORS.primary,
    },

    countRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 12,
    },

    countLabel: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "700",
    },

    countBadge: {
        minWidth: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },

    countText: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "800",
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 14,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    customerHeader: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: COLORS.primary,
        fontSize: 17,
        fontWeight: "800",
    },

    customerName: {
        marginLeft: 11,
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
    },

    bookingId: {
        marginLeft: 11,
        marginTop: 3,
        color: "#999",
        fontSize: 10,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 20,
    },

    upcomingBadge: {
        backgroundColor: "#F7F3E7",
    },

    progressBadge: {
        backgroundColor: "#FFF7E0",
    },

    completedBadge: {
        backgroundColor: "#EAF8EF",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "700",
    },

    upcomingText: {
        color: "#A16207",
    },

    progressText: {
        color: "#D97706",
    },

    completedText: {
        color: "#16A34A",
    },

    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 15,
    },

    tokenRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    tokenContainer: {
        width: 70,
        height: 58,
        borderRadius: 15,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    tokenLabel: {
        color: "#888",
        fontSize: 8,
    },

    token: {
        color: COLORS.primary,
        fontSize: 22,
        fontWeight: "800",
        marginTop: 2,
    },

    timeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 14,
    },

    timeInfo: {
        marginLeft: 8,
    },

    smallLabel: {
        color: "#999",
        fontSize: 10,
    },

    time: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
        marginTop: 2,
    },

    detailRow: {
        flexDirection: "row",
        marginBottom: 14,
    },

    detail: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    detailContent: {
        marginLeft: 8,
        flex: 1,
    },

    detailValue: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "600",
        marginTop: 2,
    },

    paymentRow: {
        borderTopWidth: 1,
        borderTopColor: "#EEEEEE",
        paddingTop: 13,
    },

    paymentStatus: {
        flexDirection: "row",
        alignItems: "center",
    },

    paymentText: {
        marginLeft: 6,
        fontSize: 11,
        fontWeight: "700",
    },

    activeMessage: {
        marginTop: 13,
        padding: 11,
        borderRadius: 13,
        backgroundColor: "#FFF7E0",
        flexDirection: "row",
        alignItems: "center",
    },

    activeMessageText: {
        marginLeft: 7,
        color: "#A16207",
        fontSize: 11,
    },

    completedMessage: {
        marginTop: 13,
        padding: 11,
        borderRadius: 13,
        backgroundColor: "#EAF8EF",
        flexDirection: "row",
        alignItems: "center",
    },

    completedMessageText: {
        marginLeft: 7,
        color: "#16A34A",
        fontSize: 11,
    },

    empty: {
        alignItems: "center",
        paddingVertical: 80,
    },

    emptyIcon: {
        width: 70,
        height: 70,
        borderRadius: 23,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyTitle: {
        marginTop: 18,
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
    },

    emptyText: {
        marginTop: 7,
        color: "#888",
        fontSize: 12,
        textAlign: "center",
    },
});