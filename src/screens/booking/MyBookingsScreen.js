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
import PrimaryButton from "../../components/common/PrimaryButton";

import { COLORS, SPACING, RADIUS } from "../../theme";

const BOOKINGS = [
    {
        id: "BK001",
        service: "हेअर कट",
        serviceEnglish: "Hair Cut",
        date: "10 ऑगस्ट 2026",
        time: "10:30 AM",
        barber: "Rajesh",
        chair: 2,
        token: 18,
        amount: 200,
        status: "CONFIRMED",
        paymentStatus: "PAID",
        currentToken: 14,
        waitMinutes: 20,
    },
    {
        id: "BK002",
        service: "दाढी ट्रिम",
        serviceEnglish: "Beard Trim",
        date: "05 ऑगस्ट 2026",
        time: "04:30 PM",
        barber: "Amit",
        chair: 1,
        token: 12,
        amount: 100,
        status: "COMPLETED",
        paymentStatus: "PAID",
    },
];

export default function MyBookingsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState("UPCOMING");

    const upcomingBookings = BOOKINGS.filter(
        (booking) => booking.status === "CONFIRMED"
    );

    const pastBookings = BOOKINGS.filter(
        (booking) => booking.status === "COMPLETED"
    );

    const bookings =
        activeTab === "UPCOMING" ? upcomingBookings : pastBookings;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Screen Header */}
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <View style={styles.headerIndicator} />
                        <Text style={styles.heading}>माझ्या बुकिंग</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        तुमच्या सर्व अपॉइंटमेंट्स येथे पहा
                    </Text>
                </View>

                {/* Tab Switcher */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.tab,
                            activeTab === "UPCOMING" && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab("UPCOMING")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "UPCOMING" && styles.activeTabText,
                            ]}
                        >
                            आगामी ({upcomingBookings.length})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.tab,
                            activeTab === "PAST" && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab("PAST")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "PAST" && styles.activeTabText,
                            ]}
                        >
                            मागील ({pastBookings.length})
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* List Content */}
                {bookings.length === 0 ? (
                    <EmptyState />
                ) : (
                    bookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onQueue={() =>
                                navigation.navigate("Bookings", {
                                    screen: "Queue",
                                })
                            }
                        />
                    ))
                )}
            </ScrollView>
        </AppScreen>
    );
}

function BookingCard({ booking, onQueue }) {
    const isActive = booking.status === "CONFIRMED";

    return (
        <View style={styles.card}>
            {/* Header Row */}
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.service}>{booking.service}</Text>
                    <Text style={styles.serviceEnglish}>{booking.serviceEnglish}</Text>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        isActive ? styles.confirmedBadge : styles.completedBadge,
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            isActive ? styles.confirmedDot : styles.completedDot,
                        ]}
                    />
                    <Text
                        style={[
                            styles.statusText,
                            isActive ? styles.confirmedText : styles.completedText,
                        ]}
                    >
                        {isActive ? "Confirmed" : "Completed"}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Grid Details */}
            <View style={styles.grid}>
                <View style={styles.infoRow}>
                    <InfoItem
                        icon="calendar-outline"
                        label="तारीख"
                        value={booking.date}
                    />
                    <InfoItem
                        icon="time-outline"
                        label="वेळ"
                        value={booking.time}
                    />
                </View>

                <View style={styles.infoRow}>
                    <InfoItem
                        icon="person-outline"
                        label="बार्बर"
                        value={booking.barber}
                    />
                    <InfoItem
                        icon="business-outline"
                        label="चेअर"
                        value={`Chair ${booking.chair}`}
                    />
                </View>
            </View>

            {/* Live Queue Box */}
            {isActive && (
                <View style={styles.queueBox}>
                    <View style={styles.tokenCol}>
                        <Text style={styles.queueLabel}>तुमचा टोकन</Text>
                        <Text style={styles.token}>#{booking.token}</Text>
                    </View>

                    <View style={styles.queueDivider} />

                    <View style={[styles.tokenCol, styles.alignRight]}>
                        <Text style={styles.queueLabel}>सध्याचा टोकन</Text>
                        <Text style={styles.currentToken}>#{booking.currentToken}</Text>
                    </View>
                </View>
            )}

            {/* Payment Information */}
            <View style={styles.paymentRow}>
                <View>
                    <Text style={styles.paymentLabel}>एकूण रक्कम</Text>
                    <Text style={styles.amount}>₹{booking.amount}</Text>
                </View>

                <View style={styles.paidBadge}>
                    <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#16A34A"
                    />
                    <Text style={styles.paidText}>
                        {booking.paymentStatus === "PAID" ? "Paid" : "Pending"}
                    </Text>
                </View>
            </View>

            {/* Action Button */}
            {isActive && (
                <View style={styles.actionWrapper}>
                    <PrimaryButton
                        title="💈 Live Queue पहा"
                        onPress={onQueue}
                    />
                </View>
            )}
        </View>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <View style={styles.infoItem}>
            <View style={styles.iconBg}>
                <Ionicons
                    name={icon}
                    size={16}
                    color={COLORS.primary || "#F59E0B"}
                />
            </View>
            <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

function EmptyState() {
    return (
        <View style={styles.emptyCard}>
            <View style={styles.emptyIconBg}>
                <Ionicons
                    name="calendar-clear-outline"
                    size={32}
                    color="#94A3B8"
                />
            </View>
            <Text style={styles.emptyTitle}>कोणतीही बुकिंग नाही</Text>
            <Text style={styles.emptyText}>
                तुमची कोणतीही अपॉइंटमेंट येथे दिसेल.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#FAF9F6",
    },
    content: {
        padding: SPACING.lg || 20,
        paddingBottom: 40,
    },

    // Header Styling
    header: {
        marginBottom: 20,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerIndicator: {
        width: 4,
        height: 24,
        borderRadius: 2,
        backgroundColor: "#F59E0B",
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

    // Segmented Control Tabs
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        borderRadius: RADIUS.xl || 16,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: (RADIUS.xl || 16) - 4,
    },
    activeTab: {
        backgroundColor: COLORS.black || "#0F172A",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    tabText: {
        color: "#64748B",
        fontWeight: "600",
        fontSize: 13,
    },
    activeTabText: {
        color: COLORS.primary || "#F59E0B",
        fontWeight: "700",
    },

    // Card Structure
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    service: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black || "#0F172A",
    },
    serviceEnglish: {
        marginTop: 2,
        color: "#94A3B8",
        fontSize: 12,
        fontWeight: "500",
    },

    // Status Badges
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 5,
    },
    confirmedBadge: {
        backgroundColor: "#DCFCE7",
    },
    completedBadge: {
        backgroundColor: "#F1F5F9",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    confirmedDot: {
        backgroundColor: "#16A34A",
    },
    completedDot: {
        backgroundColor: "#64748B",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },
    confirmedText: {
        color: "#15803D",
    },
    completedText: {
        color: "#475569",
    },

    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 14,
    },

    // Grid Data
    grid: {
        gap: 12,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    iconBg: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#FEF3C7",
        alignItems: "center",
        justifyContent: "center",
    },
    infoText: {
        marginLeft: 10,
    },
    infoLabel: {
        color: "#94A3B8",
        fontSize: 10,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    infoValue: {
        marginTop: 1,
        color: COLORS.black || "#0F172A",
        fontSize: 13,
        fontWeight: "600",
    },

    // Queue Counter Display
    queueBox: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.lg || 14,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
    },
    tokenCol: {
        flex: 1,
    },
    alignRight: {
        alignItems: "flex-end",
    },
    queueDivider: {
        width: 1,
        height: 28,
        backgroundColor: "#334155",
    },
    queueLabel: {
        color: "#94A3B8",
        fontSize: 10,
        fontWeight: "600",
    },
    token: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 22,
        fontWeight: "800",
        marginTop: 2,
    },
    currentToken: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "800",
        marginTop: 2,
    },

    // Payment Block
    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F8FAFC",
    },
    paymentLabel: {
        color: "#94A3B8",
        fontSize: 11,
        fontWeight: "500",
    },
    amount: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black || "#0F172A",
    },
    paidBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    paidText: {
        color: "#16A34A",
        fontWeight: "700",
        fontSize: 12,
    },

    actionWrapper: {
        marginTop: 14,
    },

    // Empty State
    emptyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 36,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginTop: 10,
    },
    emptyIconBg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    emptyTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },
    emptyText: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        textAlign: "center",
    },
});