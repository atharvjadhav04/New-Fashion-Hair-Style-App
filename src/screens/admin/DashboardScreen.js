import React from "react";
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

const STATS = {
    todayIncome: 4850,
    monthlyIncome: 78500,
    todayCustomers: 24,
    activeQueue: 7,
    activeBarbers: 3,
    totalBarbers: 5,
};

const CHAIRS = [
    {
        id: 1,
        barber: "Rajesh",
        token: 15,
        customer: "अमोल पाटील",
        status: "SERVING",
    },
    {
        id: 2,
        barber: "Suresh",
        token: 14,
        customer: "रोहित जाधव",
        status: "SERVING",
    },
    {
        id: 3,
        barber: "Amit",
        token: 16,
        customer: "Waiting",
        status: "WAITING",
    },
];

export default function DashboardScreen({ navigation }) {
    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>
                            नमस्कार 👋
                        </Text>
                        <Text style={styles.shopName}>
                            New Fashion Hair Style
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            आजच्या सलूनचा आढावा
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.notificationButton}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={COLORS.primary}
                        />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Income Main Card */}
                <View style={styles.incomeCard}>
                    <View style={styles.incomeHeader}>
                        <View>
                            <View style={styles.incomeTag}>
                                <Text style={styles.incomeLabel}>
                                    आजचे उत्पन्न
                                </Text>
                            </View>
                            <Text style={styles.incomeAmount}>
                                ₹{STATS.todayIncome.toLocaleString("en-IN")}
                            </Text>
                        </View>

                        <View style={styles.incomeIcon}>
                            <Ionicons
                                name="trending-up-outline"
                                size={24}
                                color={COLORS.black}
                            />
                        </View>
                    </View>

                    <View style={styles.incomeFooter}>
                        <Text style={styles.incomeFooterText}>
                            या महिन्यात
                        </Text>
                        <Text style={styles.monthlyAmount}>
                            ₹{STATS.monthlyIncome.toLocaleString("en-IN")}
                        </Text>
                    </View>
                </View>

                {/* Statistics */}
                <View style={styles.statsGrid}>
                    <StatCard
                        icon="people-outline"
                        value={STATS.todayCustomers}
                        label="आजचे ग्राहक"
                    />

                    <StatCard
                        icon="hourglass-outline"
                        value={STATS.activeQueue}
                        label="Active Queue"
                    />

                    <StatCard
                        icon="person-outline"
                        value={`${STATS.activeBarbers}/${STATS.totalBarbers}`}
                        label="आजचे बार्बर"
                    />

                    <StatCard
                        icon="calendar-outline"
                        value="18"
                        label="आजच्या बुकिंग"
                    />
                </View>

                {/* Queue Header */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Live Queue
                        </Text>
                        <Text style={styles.sectionSubtitle}>
                            सध्या सलूनमध्ये सुरू असलेली सेवा
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("AdminQueue")}
                    >
                        <Text style={styles.viewAll}>
                            सर्व पहा
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Chairs */}
                {CHAIRS.map((chair) => (
                    <ChairCard
                        key={chair.id}
                        chair={chair}
                    />
                ))}

                {/* Quick Actions */}
                <Text style={styles.quickTitle}>
                    Quick Actions
                </Text>

                <View style={styles.quickGrid}>
                    <QuickAction
                        icon="business-outline"
                        title="Salon Setup"
                        subtitle="Barber & Chair"
                        onPress={() => navigation.navigate("AdminSetup")}
                    />

                    <QuickAction
                        icon="cut-outline"
                        title="सेवा"
                        subtitle="Add / Edit"
                        onPress={() => navigation.navigate("AdminServices")}
                    />

                    <QuickAction
                        icon="bar-chart-outline"
                        title="रिपोर्ट"
                        subtitle="Income"
                        onPress={() => navigation.navigate("AdminFinance")}
                    />

                    <QuickAction
                        icon="calendar-outline"
                        title="Salon Status"
                        subtitle="Holiday / Open"
                        onPress={() =>
                            navigation.navigate("AdminSetup", {
                                screen: "SalonStatus",
                            })
                        }
                    />
                </View>

                {/* Today's Barbers */}
                <View style={styles.barberHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            आजचे बार्बर
                        </Text>
                        <Text style={styles.sectionSubtitle}>
                            {STATS.activeBarbers} बार्बर आज उपलब्ध
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate("AdminSetup", {
                                screen: "SalonSetup",
                            })
                        }
                    >
                        <Text style={styles.viewAll}>
                            Manage
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.barberCard}>
                    <Barber
                        name="Rajesh"
                        chair="Chair 1"
                    />

                    <Barber
                        name="Suresh"
                        chair="Chair 2"
                    />

                    <Barber
                        name="Amit"
                        chair="Chair 3"
                        isLast
                    />
                </View>
            </ScrollView>
        </AppScreen>
    );
}

function StatCard({ icon, value, label }) {
    return (
        <View style={styles.statCard}>
            <View style={styles.statIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.statValue}>
                {value}
            </Text>

            <Text style={styles.statLabel}>
                {label}
            </Text>
        </View>
    );
}

function ChairCard({ chair }) {
    const serving = chair.status === "SERVING";

    return (
        <View style={styles.chairCard}>
            <View style={styles.chairNumber}>
                <Ionicons
                    name="business-outline"
                    size={20}
                    color={COLORS.primary}
                />
                <Text style={styles.chairNumberText}>
                    {chair.id}
                </Text>
            </View>

            <View style={styles.chairInfo}>
                <Text style={styles.chairLabel}>
                    Chair {chair.id}
                </Text>

                <Text style={styles.barberName}>
                    {chair.barber}
                </Text>

                <Text style={styles.customerName}>
                    {chair.customer}
                </Text>
            </View>

            <View style={styles.chairRight}>
                <View
                    style={[
                        styles.statusBadge,
                        serving
                            ? styles.servingBadge
                            : styles.waitingBadge,
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            serving
                                ? styles.servingDot
                                : styles.waitingDot,
                        ]}
                    />
                    <Text
                        style={[
                            styles.statusText,
                            serving
                                ? styles.servingText
                                : styles.waitingText,
                        ]}
                    >
                        {serving ? "Serving" : "Waiting"}
                    </Text>
                </View>

                <Text style={styles.tokenText}>
                    #{chair.token}
                </Text>
            </View>
        </View>
    );
}

function QuickAction({ icon, title, subtitle, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.quickAction}
            onPress={onPress}
        >
            <View style={styles.quickIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.quickActionTitle}>
                {title}
            </Text>

            <Text style={styles.quickActionSubtitle}>
                {subtitle}
            </Text>
        </TouchableOpacity>
    );
}

function Barber({ name, chair, isLast }) {
    return (
        <View style={[styles.barber, isLast && styles.barberNoBorder]}>
            <View style={styles.barberAvatar}>
                <Text style={styles.barberInitial}>
                    {name.charAt(0)}
                </Text>

                <View style={styles.onlineDot} />
            </View>

            <View style={styles.barberInfo}>
                <Text style={styles.barberName}>
                    {name}
                </Text>

                <Text style={styles.barberChair}>
                    {chair}
                </Text>
            </View>

            <View style={styles.availableBadge}>
                <Text style={styles.availableText}>
                    Available
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
        paddingBottom: 60,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    greeting: {
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 0.2,
    },

    shopName: {
        marginTop: 2,
        color: COLORS.black,
        fontSize: 24,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    headerSubtitle: {
        marginTop: 3,
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
    },

    notificationButton: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
    },

    notificationDot: {
        position: "absolute",
        top: 11,
        right: 11,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#EF4444",
        borderWidth: 1.5,
        borderColor: COLORS.black,
    },

    incomeCard: {
        marginTop: 20,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },

    incomeHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    incomeTag: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
    },

    incomeLabel: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "600",
    },

    incomeAmount: {
        color: COLORS.primary,
        fontSize: 34,
        fontWeight: "900",
        marginTop: 8,
        letterSpacing: -0.5,
    },

    incomeIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    incomeFooter: {
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.1)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    incomeFooterText: {
        color: "#9CA3AF",
        fontSize: 13,
        fontWeight: "500",
    },

    monthlyAmount: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "700",
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
    },

    statCard: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.03)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },

    statIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    statValue: {
        marginTop: 12,
        color: COLORS.black,
        fontSize: 22,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    statLabel: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 11,
        fontWeight: "600",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 16,
        marginBottom: 14,
    },

    sectionTitle: {
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: -0.3,
    },

    sectionSubtitle: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 2,
    },

    viewAll: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "700",
    },

    chairCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.03)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },

    chairNumber: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    chairNumberText: {
        position: "absolute",
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "800",
    },

    chairInfo: {
        flex: 1,
        marginLeft: 14,
    },

    chairLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    barberName: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
        marginTop: 2,
    },

    customerName: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 2,
    },

    chairRight: {
        alignItems: "flex-end",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    servingBadge: {
        backgroundColor: "#EAF8EF",
    },

    waitingBadge: {
        backgroundColor: "#FFF7E0",
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
        backgroundColor: "#EAB308",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    servingText: {
        color: "#15803D",
    },

    waitingText: {
        color: "#A16207",
    },

    tokenText: {
        marginTop: 6,
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "800",
    },

    quickTitle: {
        marginTop: 18,
        marginBottom: 14,
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.3,
    },

    quickGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
    },

    quickAction: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.03)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },

    quickIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    quickActionTitle: {
        marginTop: 12,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
    },

    quickActionSubtitle: {
        marginTop: 2,
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
    },

    barberHeader: {
        marginTop: 10,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },

    barberCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.03)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },

    barber: {
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    barberNoBorder: {
        borderBottomWidth: 0,
    },

    barberAvatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    barberInitial: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "800",
    },

    onlineDot: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#22C55E",
        borderWidth: 2,
        borderColor: COLORS.white,
    },

    barberInfo: {
        flex: 1,
        marginLeft: 12,
    },

    barberChair: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
        marginTop: 2,
    },

    availableBadge: {
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },

    availableText: {
        color: "#15803D",
        fontSize: 10,
        fontWeight: "700",
    },
});