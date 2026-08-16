import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

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
    const [activeTab, setActiveTab] = useState("UPCOMING");

    const filteredAppointments = APPOINTMENTS.filter(
        (appointment) => appointment.status === activeTab
    );

    const getCount = (status) =>
        APPOINTMENTS.filter((item) => item.status === status).length;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Appointments</Text>
                    <Text style={styles.subtitle}>
                        आजच्या सर्व बुकिंग व्यवस्थापित करा
                    </Text>
                </View>

                {/* Segmented Tab Controls */}
                <View style={styles.tabsContainer}>
                    <Tab
                        title="Upcoming"
                        count={getCount("UPCOMING")}
                        active={activeTab === "UPCOMING"}
                        onPress={() => setActiveTab("UPCOMING")}
                    />
                    <Tab
                        title="In Progress"
                        count={getCount("IN_PROGRESS")}
                        active={activeTab === "IN_PROGRESS"}
                        onPress={() => setActiveTab("IN_PROGRESS")}
                    />
                    <Tab
                        title="Completed"
                        count={getCount("COMPLETED")}
                        active={activeTab === "COMPLETED"}
                        onPress={() => setActiveTab("COMPLETED")}
                    />
                </View>

                {/* Section Summary Header */}
                <View style={styles.countRow}>
                    <Text style={styles.countLabel}>
                        {getTabLabel(activeTab)}
                    </Text>
                    <Text style={styles.countSubtext}>
                        ({filteredAppointments.length} Total)
                    </Text>
                </View>

                {/* Appointment Cards List */}
                {filteredAppointments.length === 0 ? (
                    <EmptyState />
                ) : (
                    filteredAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))
                )}
            </ScrollView>
        </AppScreen>
    );
}

function Tab({ title, count, active, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.tab, active && styles.activeTab]}
            onPress={onPress}
        >
            <Text style={[styles.tabText, active && styles.activeTabText]}>
                {title}
            </Text>
            <View style={[styles.tabBadge, active && styles.activeTabBadge]}>
                <Text
                    style={[
                        styles.tabBadgeText,
                        active && styles.activeTabBadgeText,
                    ]}
                >
                    {count}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function AppointmentCard({ appointment }) {
    const isInProgress = appointment.status === "IN_PROGRESS";
    const isCompleted = appointment.status === "COMPLETED";

    const handleCallCustomer = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <View style={styles.card}>
            {/* Header: Customer Info & Status */}
            <View style={styles.cardHeader}>
                <View style={styles.customerHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {appointment.customer.charAt(0)}
                        </Text>
                    </View>

                    <View style={styles.customerMeta}>
                        <Text style={styles.customerName}>
                            {appointment.customer}
                        </Text>
                        <Text style={styles.bookingId}>#{appointment.id}</Text>
                    </View>
                </View>

                {/* Call Action & Status Badge */}
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.callButton}
                        onPress={() => handleCallCustomer(appointment.phone)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="call-outline"
                            size={16}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.statusBadge,
                            isInProgress && styles.progressBadge,
                            isCompleted && styles.completedBadge,
                            !isInProgress &&
                            !isCompleted &&
                            styles.upcomingBadge,
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                isInProgress && styles.progressText,
                                isCompleted && styles.completedText,
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
            </View>

            {/* Main Details Section */}
            <View style={styles.mainInfoContainer}>
                {/* Token Badge */}
                <View style={styles.tokenContainer}>
                    <Text style={styles.tokenLabel}>TOKEN</Text>
                    <Text style={styles.token}>#{appointment.token}</Text>
                </View>

                {/* Time Info */}
                <View style={styles.timeContainer}>
                    <View style={styles.timeIconWrapper}>
                        <Ionicons
                            name="time-outline"
                            size={20}
                            color={COLORS.primary || "#2563EB"}
                        />
                    </View>
                    <View style={styles.timeInfo}>
                        <Text style={styles.smallLabel}>वेळ (Time)</Text>
                        <Text style={styles.time}>{appointment.time}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Service Grid Details */}
            <View style={styles.detailGrid}>
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
            </View>

            {/* Footer Bar: Payment and Operational Message */}
            <View style={styles.cardFooter}>
                <View style={styles.paymentStatus}>
                    <Ionicons
                        name={
                            appointment.payment === "PAID"
                                ? "checkmark-circle"
                                : "alert-circle"
                        }
                        size={16}
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
                                    appointment.payment === "PAID"
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

            {/* Operational Banner */}
            {isInProgress && (
                <View style={styles.activeBanner}>
                    <Ionicons
                        name="cut"
                        size={15}
                        color="#D97706"
                    />
                    <Text style={styles.activeBannerText}>
                        Customer is currently being served
                    </Text>
                </View>
            )}

            {isCompleted && (
                <View style={styles.completedBanner}>
                    <Ionicons
                        name="checkmark-circle"
                        size={15}
                        color="#16A34A"
                    />
                    <Text style={styles.completedBannerText}>
                        Service completed successfully
                    </Text>
                </View>
            )}
        </View>
    );
}

function Detail({ icon, label, value }) {
    return (
        <View style={styles.detailItem}>
            <View style={styles.detailIconBox}>
                <Ionicons
                    name={icon}
                    size={16}
                    color={COLORS.primary || "#2563EB"}
                />
            </View>
            <View style={styles.detailContent}>
                <Text style={styles.smallLabel}>{label}</Text>
                <Text style={styles.detailValue} numberOfLines={1}>
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
                    name="calendar-clear-outline"
                    size={36}
                    color={COLORS.primary || "#2563EB"}
                />
            </View>
            <Text style={styles.emptyTitle}>कोणतीही बुकिंग नाही</Text>
            <Text style={styles.emptyText}>
                या category मध्ये सध्या कोणतीही बुकिंग उपलब्ध नाही.
            </Text>
        </View>
    );
}

function getTabLabel(status) {
    if (status === "UPCOMING") return "Upcoming Appointments";
    if (status === "IN_PROGRESS") return "In Progress Appointments";
    return "Completed Appointments";
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8FAFC",
    },
    content: {
        padding: SPACING.lg || 16,
        paddingBottom: 40,
    },

    // Header Styles
    headerContainer: {
        marginBottom: 16,
    },
    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        fontWeight: "500",
    },

    // Segmented Tabs
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#E2E8F0",
        borderRadius: RADIUS.xl || 16,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: (RADIUS.xl || 16) - 4,
    },
    activeTab: {
        backgroundColor: COLORS.black || "#0F172A",
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
    tabText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#64748B",
    },
    activeTabText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    tabBadge: {
        marginLeft: 5,
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 10,
        backgroundColor: "#CBD5E1",
    },
    activeTabBadge: {
        backgroundColor: COLORS.primary || "#2563EB",
    },
    tabBadgeText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#475569",
    },
    activeTabBadgeText: {
        color: "#FFFFFF",
    },

    // Section Summary
    countRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginBottom: 14,
    },
    countLabel: {
        color: COLORS.black || "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },
    countSubtext: {
        marginLeft: 6,
        color: "#64748B",
        fontSize: 13,
    },

    // Appointment Card
    card: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        marginBottom: 16,
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
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 16,
        fontWeight: "800",
    },
    customerMeta: {
        marginLeft: 12,
    },
    customerName: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    bookingId: {
        marginTop: 2,
        color: "#94A3B8",
        fontSize: 11,
        fontWeight: "500",
    },

    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    callButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    // Badges
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    upcomingBadge: {
        backgroundColor: "#FEF3C7",
    },
    progressBadge: {
        backgroundColor: "#FFEDD5",
    },
    completedBadge: {
        backgroundColor: "#DCFCE7",
    },
    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },
    upcomingText: {
        color: "#D97706",
    },
    progressText: {
        color: "#C2410C",
    },
    completedText: {
        color: "#15803D",
    },

    // Card Body Elements
    mainInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        backgroundColor: "#F8FAFC",
        padding: 10,
        borderRadius: 12,
    },
    tokenContainer: {
        width: 65,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    tokenLabel: {
        color: "#94A3B8",
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    token: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 18,
        fontWeight: "800",
    },
    timeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 14,
    },
    timeIconWrapper: {
        width: 34,
        height: 34,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    timeInfo: {
        marginLeft: 10,
    },
    time: {
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "700",
        marginTop: 1,
    },

    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 14,
    },

    // Detail Grid
    detailGrid: {
        gap: 12,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    detailIconBox: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },
    detailContent: {
        marginLeft: 8,
        flex: 1,
    },
    smallLabel: {
        color: "#94A3B8",
        fontSize: 10,
        fontWeight: "500",
    },
    detailValue: {
        color: COLORS.black || "#0F172A",
        fontSize: 13,
        fontWeight: "600",
        marginTop: 1,
    },

    // Card Footer
    cardFooter: {
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
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

    // Contextual Banners
    activeBanner: {
        marginTop: 10,
        padding: 9,
        borderRadius: 8,
        backgroundColor: "#FFFBEB",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FEF3C7",
    },
    activeBannerText: {
        marginLeft: 6,
        color: "#B45309",
        fontSize: 11,
        fontWeight: "600",
    },
    completedBanner: {
        marginTop: 10,
        padding: 9,
        borderRadius: 8,
        backgroundColor: "#F0FDF4",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DCFCE7",
    },
    completedBannerText: {
        marginLeft: 6,
        color: "#15803D",
        fontSize: 11,
        fontWeight: "600",
    },

    // Empty State
    empty: {
        alignItems: "center",
        paddingVertical: 60,
    },
    emptyIcon: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black || "#0F172A",
    },
    emptyText: {
        marginTop: 4,
        color: "#94A3B8",
        fontSize: 12,
        textAlign: "center",
    },
});