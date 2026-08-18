import React, { useState, useCallback } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
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
    const [refreshing, setRefreshing] = useState(false);

    const upcomingBookings = BOOKINGS.filter(
        (booking) => booking.status === "CONFIRMED"
    );

    const pastBookings = BOOKINGS.filter(
        (booking) => booking.status === "COMPLETED"
    );

    const bookings =
        activeTab === "UPCOMING" ? upcomingBookings : pastBookings;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate data fetch
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    }, []);

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary || "#F59E0B"}
                        colors={[COLORS.primary || "#F59E0B"]}
                    />
                }
            >
                {/* Screen Header */}
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <View style={styles.headerIndicator} />
                        <Text style={styles.heading}>माझ्या बुकिंग</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        तुमच्या सर्व अपॉइंटमेंट्स आणि लाईव्ह रांग येथे पहा
                    </Text>
                </View>

                {/* Tab Switcher */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
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
                            आगामी
                        </Text>
                        <View
                            style={[
                                styles.badgeCount,
                                activeTab === "UPCOMING" && styles.activeBadgeCount,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.badgeCountText,
                                    activeTab === "UPCOMING" && styles.activeBadgeText,
                                ]}
                            >
                                {upcomingBookings.length}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
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
                            मागील
                        </Text>
                        <View
                            style={[
                                styles.badgeCount,
                                activeTab === "PAST" && styles.activeBadgeCount,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.badgeCountText,
                                    activeTab === "PAST" && styles.activeBadgeText,
                                ]}
                            >
                                {pastBookings.length}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* List Content */}
                {bookings.length === 0 ? (
                    <EmptyState navigation={navigation} isPast={activeTab === "PAST"} />
                ) : (
                    bookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onQueue={() =>
                                navigation.navigate("BookingFlow", {
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
    const tokensAhead = Math.max(0, booking.token - booking.currentToken);
    const progress = Math.min(
        1,
        Math.max(0, booking.currentToken / booking.token)
    );

    return (
        <View style={[styles.card, isActive && styles.activeCardBorder]}>
            {/* Header Row */}
            <View style={styles.cardHeader}>
                <View style={styles.serviceTitleGroup}>
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
                        icon="briefcase-outline"
                        label="चेअर क्र."
                        value={`Chair ${booking.chair}`}
                    />
                </View>
            </View>

            {/* Live Queue Box with Visual Progress */}
            {isActive && (
                <View style={styles.queueBox}>
                    <View style={styles.liveBadgeRow}>
                        <View style={styles.liveIndicator}>
                            <View style={styles.livePulseDot} />
                            <Text style={styles.liveText}>LIVE QUEUE</Text>
                        </View>
                        {booking.waitMinutes > 0 && (
                            <View style={styles.waitPill}>
                                <Ionicons name="timer-outline" size={12} color="#F59E0B" />
                                <Text style={styles.waitPillText}>~{booking.waitMinutes} min wait</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.tokenRow}>
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

                    {/* Progress Bar */}
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.fillProgress,
                                { width: `${progress * 100}%` },
                            ]}
                        />
                    </View>

                    <Text style={styles.tokensAheadText}>
                        {tokensAhead === 0
                            ? "🎉 तुमची वेळ आली आहे!"
                            : `तुमच्या आधी ${tokensAhead} ग्राहक बाकी आहेत.`}
                    </Text>
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
                        title="💈 Live Queue ट्रॅक करा"
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
                    color={COLORS.primary || "#D97706"}
                />
            </View>
            <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

function EmptyState({ navigation, isPast }) {
    return (
        <View style={styles.emptyCard}>
            <View style={styles.emptyIconBg}>
                <Ionicons
                    name="calendar-clear-outline"
                    size={36}
                    color="#94A3B8"
                />
            </View>
            <Text style={styles.emptyTitle}>
                {isPast ? "कोणतीही मागील बुकिंग नाही" : "कोणतीही आगामी बुकिंग नाही"}
            </Text>
            <Text style={styles.emptyText}>
                {isPast
                    ? "तुमच्या पूर्ण झालेल्या अपॉइंटमेंट्स येथे दिसतील."
                    : "तुमची कोणतीही आगामी अपॉइंटमेंट येथे दिसेल."}
            </Text>

            {!isPast && (
                <TouchableOpacity
                    style={styles.bookNowBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation?.navigate("Services")}
                >
                    <Text style={styles.bookNowBtnText}>नवीन बुकिंग करा</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
            )}
        </View>
    );
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

    // Header Styling
    header: {
        marginBottom: 20,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    headerIndicator: {
        width: 4,
        height: 26,
        borderRadius: 2,
        backgroundColor: COLORS.primary || "#F59E0B",
    },
    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 14,
    },

    // Segmented Control Tabs
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#E2E8F0",
        borderRadius: RADIUS.xl || 14,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: (RADIUS.xl || 14) - 3,
        gap: 8,
    },
    activeTab: {
        backgroundColor: COLORS.black || "#0F172A",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabText: {
        color: "#64748B",
        fontWeight: "600",
        fontSize: 13,
    },
    activeTabText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    badgeCount: {
        backgroundColor: "#CBD5E1",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 10,
    },
    activeBadgeCount: {
        backgroundColor: COLORS.primary || "#F59E0B",
    },
    badgeCountText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#475569",
    },
    activeBadgeText: {
        color: "#0F172A",
    },

    // Card Structure
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
    },
    activeCardBorder: {
        borderColor: "#FCD34D",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    serviceTitleGroup: {
        flex: 1,
    },
    service: {
        fontSize: 18,
        fontWeight: "800",
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
        paddingVertical: 5,
        borderRadius: 20,
        gap: 6,
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
        width: 34,
        height: 34,
        borderRadius: 10,
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
        letterSpacing: 0.5,
    },
    infoValue: {
        marginTop: 2,
        color: COLORS.black || "#0F172A",
        fontSize: 13,
        fontWeight: "700",
    },

    // Queue Counter Display
    queueBox: {
        backgroundColor: "#0F172A",
        borderRadius: RADIUS.lg || 16,
        padding: 16,
        marginTop: 16,
    },
    liveBadgeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    liveIndicator: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    livePulseDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#EF4444",
    },
    liveText: {
        color: "#EF4444",
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 0.8,
    },
    waitPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E293B",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        gap: 4,
    },
    waitPillText: {
        color: "#F59E0B",
        fontSize: 11,
        fontWeight: "600",
    },
    tokenRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        fontSize: 11,
        fontWeight: "600",
    },
    token: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 24,
        fontWeight: "800",
        marginTop: 2,
    },
    currentToken: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "800",
        marginTop: 2,
    },
    progressTrack: {
        height: 6,
        backgroundColor: "#334155",
        borderRadius: 3,
        marginTop: 14,
        overflow: "hidden",
    },
    fillProgress: {
        height: "100%",
        backgroundColor: COLORS.primary || "#F59E0B",
        borderRadius: 3,
    },
    tokensAheadText: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: "600",
        color: "#94A3B8",
        textAlign: "center",
    },

    // Payment Block
    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    paymentLabel: {
        color: "#94A3B8",
        fontSize: 11,
        fontWeight: "500",
    },
    amount: {
        marginTop: 2,
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
    },
    paidBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
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
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 10,
    },
    emptyIconBg: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    emptyTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 17,
        fontWeight: "700",
    },
    emptyText: {
        marginTop: 6,
        color: "#64748B",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 18,
    },
    bookNowBtn: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.black || "#0F172A",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
    },
    bookNowBtnText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },
});