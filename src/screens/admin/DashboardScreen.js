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

                    <View style={styles.notificationButton}>
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={COLORS.primary}
                        />

                        <View style={styles.notificationDot} />
                    </View>

                </View>

                {/* Income Main Card */}

                <View style={styles.incomeCard}>

                    <View style={styles.incomeHeader}>

                        <View>
                            <Text style={styles.incomeLabel}>
                                आजचे उत्पन्न
                            </Text>

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
                        onPress={() =>
                            navigation.navigate("AdminQueue")
                        }
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
                        onPress={() =>
                            navigation.navigate("AdminSetup")
                        }
                    />

                    <QuickAction
                        icon="cut-outline"
                        title="सेवा"
                        subtitle="Add / Edit"
                        onPress={() =>
                            navigation.navigate("AdminServices")
                        }
                    />

                    <QuickAction
                        icon="bar-chart-outline"
                        title="रिपोर्ट"
                        subtitle="Income"
                        onPress={() =>
                            navigation.navigate("AdminFinance")
                        }
                    />
                    <QuickAction
                        icon="calendar-outline"
                        title="Salon Status"
                        subtitle="Holiday / Open"
                        onPress={() =>
                            navigation.navigate("AdminSetup")
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
                        onPress={() =>
                            navigation.navigate("AdminMore")
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
                    />

                </View>

            </ScrollView>

        </AppScreen>
    );
}

function StatCard({
    icon,
    value,
    label,
}) {
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
                        {serving
                            ? "Serving"
                            : "Waiting"}
                    </Text>
                </View>

                <Text style={styles.tokenText}>
                    #{chair.token}
                </Text>

            </View>

        </View>
    );
}

function QuickAction({
    icon,
    title,
    subtitle,
    onPress,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.quickAction}
            onPress={onPress}
        >

            <View style={styles.quickIcon}>
                <Ionicons
                    name={icon}
                    size={22}
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

function Barber({
    name,
    chair,
}) {
    return (
        <View style={styles.barber}>

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
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        color: "#777",
        fontSize: 14,
    },

    shopName: {
        marginTop: 4,
        color: COLORS.black,
        fontSize: 23,
        fontWeight: "800",
    },

    headerSubtitle: {
        marginTop: 3,
        color: "#999",
        fontSize: 12,
    },

    notificationButton: {
        width: 45,
        height: 45,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    notificationDot: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#EF4444",
    },

    incomeCard: {
        marginTop: 24,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 22,
    },

    incomeHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    incomeLabel: {
        color: "#999",
        fontSize: 13,
    },

    incomeAmount: {
        color: COLORS.primary,
        fontSize: 34,
        fontWeight: "800",
        marginTop: 5,
    },

    incomeIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    incomeFooter: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#333",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    incomeFooterText: {
        color: "#888",
        fontSize: 12,
    },

    monthlyAmount: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "700",
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16,
    },

    statCard: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 12,
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
        marginTop: 10,
        color: COLORS.black,
        fontSize: 23,
        fontWeight: "800",
    },

    statLabel: {
        marginTop: 3,
        color: "#888",
        fontSize: 11,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 12,
    },

    sectionTitle: {
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },

    sectionSubtitle: {
        color: "#999",
        fontSize: 11,
        marginTop: 3,
    },

    viewAll: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "700",
    },

    chairCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    chairNumber: {
        width: 48,
        height: 48,
        borderRadius: 15,
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
        marginLeft: 12,
    },

    chairLabel: {
        color: "#999",
        fontSize: 10,
    },

    barberName: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
        marginTop: 2,
    },

    customerName: {
        color: "#777",
        fontSize: 11,
        marginTop: 2,
    },

    chairRight: {
        alignItems: "flex-end",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 15,
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
        marginRight: 5,
    },

    servingDot: {
        backgroundColor: "#22C55E",
    },

    waitingDot: {
        backgroundColor: "#EAB308",
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

    tokenText: {
        marginTop: 6,
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "800",
    },

    quickTitle: {
        marginTop: 22,
        marginBottom: 12,
        fontSize: 18,
        fontWeight: "800",
    },

    quickGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%"
    },

    quickAction: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        marginBottom: 12,
    },

    quickIcon: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    quickActionTitle: {
        marginTop: 10,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
    },

    quickActionSubtitle: {
        marginTop: 3,
        color: "#999",
        fontSize: 10,
    },

    barberHeader: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    barberCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: 15,
    },

    barber: {
        minHeight: 65,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
    },

    barberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        right: -1,
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
        marginLeft: 10,
    },

    barberChair: {
        color: "#999",
        fontSize: 10,
        marginTop: 2,
    },

    availableBadge: {
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 15,
    },

    availableText: {
        color: "#16A34A",
        fontSize: 9,
        fontWeight: "700",
    },

});