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

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

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
        (booking) =>
            booking.status === "CONFIRMED"
    );

    const pastBookings = BOOKINGS.filter(
        (booking) =>
            booking.status === "COMPLETED"
    );

    const bookings =
        activeTab === "UPCOMING"
            ? upcomingBookings
            : pastBookings;

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                <Text style={styles.heading}>
                    माझ्या बुकिंग
                </Text>

                <Text style={styles.subtitle}>
                    तुमच्या सर्व अपॉइंटमेंट्स येथे पहा
                </Text>

                {/* Tabs */}

                <View style={styles.tabs}>

                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeTab === "UPCOMING" &&
                            styles.activeTab,
                        ]}
                        onPress={() =>
                            setActiveTab("UPCOMING")
                        }
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "UPCOMING" &&
                                styles.activeTabText,
                            ]}
                        >
                            आगामी
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeTab === "PAST" &&
                            styles.activeTab,
                        ]}
                        onPress={() =>
                            setActiveTab("PAST")
                        }
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "PAST" &&
                                styles.activeTabText,
                            ]}
                        >
                            मागील
                        </Text>
                    </TouchableOpacity>

                </View>

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

function BookingCard({
    booking,
    onQueue,
}) {
    const isActive =
        booking.status === "CONFIRMED";

    return (
        <View style={styles.card}>

            {/* Header */}

            <View style={styles.cardHeader}>

                <View>
                    <Text style={styles.service}>
                        {booking.service}
                    </Text>

                    <Text style={styles.serviceEnglish}>
                        {booking.serviceEnglish}
                    </Text>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        isActive
                            ? styles.confirmedBadge
                            : styles.completedBadge,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            isActive
                                ? styles.confirmedText
                                : styles.completedText,
                        ]}
                    >
                        {isActive
                            ? "Confirmed"
                            : "Completed"}
                    </Text>
                </View>

            </View>

            <View style={styles.divider} />

            {/* Date & Time */}

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

            {/* Barber */}

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

            {/* Token */}

            {isActive && (
                <View style={styles.queueBox}>

                    <View>
                        <Text style={styles.queueLabel}>
                            तुमचा टोकन
                        </Text>

                        <Text style={styles.token}>
                            #{booking.token}
                        </Text>
                    </View>

                    <View style={styles.queueRight}>

                        <Text style={styles.queueLabel}>
                            सध्याचा टोकन
                        </Text>

                        <Text style={styles.currentToken}>
                            #{booking.currentToken}
                        </Text>

                    </View>

                </View>
            )}

            {/* Payment */}

            <View style={styles.paymentRow}>

                <View>
                    <Text style={styles.paymentLabel}>
                        पेमेंट
                    </Text>

                    <Text style={styles.amount}>
                        ₹{booking.amount}
                    </Text>
                </View>

                <View style={styles.paidBadge}>
                    <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#16A34A"
                    />

                    <Text style={styles.paidText}>
                        {booking.paymentStatus === "PAID"
                            ? "Paid"
                            : "Pending"}
                    </Text>
                </View>

            </View>

            {/* Queue Button */}

            {isActive && (
                <PrimaryButton
                    title="💈 Live Queue पहा"
                    onPress={onQueue}
                />
            )}

        </View>
    );
}

function InfoItem({
    icon,
    label,
    value,
}) {
    return (
        <View style={styles.infoItem}>

            <Ionicons
                name={icon}
                size={18}
                color={COLORS.primary}
            />

            <View style={styles.infoText}>
                <Text style={styles.infoLabel}>
                    {label}
                </Text>

                <Text style={styles.infoValue}>
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
                    size={35}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.emptyTitle}>
                कोणतीही बुकिंग नाही
            </Text>

            <Text style={styles.emptyText}>
                तुमची अपॉइंटमेंट येथे दिसेल.
            </Text>

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
        paddingBottom: 40,
    },

    heading: {
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 7,
        color: "#777",
        fontSize: 14,
    },

    tabs: {
        flexDirection: "row",
        backgroundColor: "#EAEAEA",
        borderRadius: RADIUS.xl,
        padding: 4,
        marginTop: 24,
        marginBottom: 18,
    },

    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 11,
        borderRadius: RADIUS.xl,
    },

    activeTab: {
        backgroundColor: COLORS.black,
    },

    tabText: {
        color: "#777",
        fontWeight: "600",
    },

    activeTabText: {
        color: COLORS.primary,
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: 16,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    service: {
        fontSize: 19,
        fontWeight: "700",
        color: COLORS.black,
    },

    serviceEnglish: {
        marginTop: 3,
        color: "#888",
        fontSize: 12,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    confirmedBadge: {
        backgroundColor: "#EAF8EF",
    },

    completedBadge: {
        backgroundColor: "#EEEEEE",
    },

    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },

    confirmedText: {
        color: "#16A34A",
    },

    completedText: {
        color: "#666",
    },

    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 16,
    },

    infoRow: {
        flexDirection: "row",
        marginBottom: 16,
    },

    infoItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    infoText: {
        marginLeft: 9,
    },

    infoLabel: {
        color: "#999",
        fontSize: 11,
    },

    infoValue: {
        marginTop: 2,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "600",
    },

    queueBox: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    queueRight: {
        alignItems: "flex-end",
    },

    queueLabel: {
        color: "#999",
        fontSize: 11,
    },

    token: {
        color: COLORS.primary,
        fontSize: 27,
        fontWeight: "800",
        marginTop: 3,
    },

    currentToken: {
        color: COLORS.white,
        fontSize: 27,
        fontWeight: "800",
        marginTop: 3,
    },

    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    paymentLabel: {
        color: "#999",
        fontSize: 11,
    },

    amount: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: "700",
    },

    paidBadge: {
        flexDirection: "row",
        alignItems: "center",
    },

    paidText: {
        marginLeft: 5,
        color: "#16A34A",
        fontWeight: "700",
    },

    empty: {
        alignItems: "center",
        paddingVertical: 80,
    },

    emptyIcon: {
        width: 75,
        height: 75,
        borderRadius: 25,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyTitle: {
        marginTop: 18,
        fontSize: 18,
        fontWeight: "700",
    },

    emptyText: {
        marginTop: 6,
        color: "#888",
    },

});