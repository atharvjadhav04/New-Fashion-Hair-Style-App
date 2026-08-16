import React from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import HeroBanner from "../../components/home/HeroBanner";
import AppointmentCard from "../../components/home/AppointmentCard";
import LiveQueueCard from "../../components/home/LiveQueueCard";
import BookNowCard from "../../components/home/BookNowCard";
import PopularServiceCard from "../../components/home/PopularServiceCard";

import { SERVICES } from "../../constants/DummyData";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function HomeScreen({ navigation }) {
    const popularServices = SERVICES ? SERVICES.slice(0, 5) : [];

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Luxury Salon Top Branding & Action Bar */}
                <View style={styles.topHeader}>
                    <View style={styles.brandContainer}>
                        <View style={styles.logoBadge}>
                            <Ionicons name="sparkles" size={16} color="#F59E0B" />
                        </View>
                        <View>
                            <Text style={styles.brandTitle}>LUXE STUDIO</Text>
                            <Text style={styles.brandSubtitle}>Premium Hair & Grooming</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.notificationBtn}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Notifications")}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={20}
                            color={COLORS.black || "#0F172A"}
                        />
                        <View style={styles.notificationPulse} />
                    </TouchableOpacity>
                </View>

                {/* Hero Showcase Banner */}
                <View style={styles.sectionWrapper}>
                    <HeroBanner />
                </View>

                {/* Real-time Salon Metric Dashboard */}
                <View style={styles.metricsContainer}>
                    <View style={styles.metricCard}>
                        <View style={styles.metricIconBg}>
                            <Ionicons name="time-outline" size={18} color="#D97706" />
                        </View>
                        <View>
                            <Text style={styles.metricVal}>20 Min</Text>
                            <Text style={styles.metricLbl}>Wait Time</Text>
                        </View>
                    </View>

                    <View style={styles.metricDivider} />

                    <View style={styles.metricCard}>
                        <View style={styles.metricIconBg}>
                            <Ionicons name="people-outline" size={18} color="#2563EB" />
                        </View>
                        <View>
                            <Text style={styles.metricVal}>4 Ahead</Text>
                            <Text style={styles.metricLbl}>Live Queue</Text>
                        </View>
                    </View>
                </View>

                {/* Express Booking Card */}
                <View style={styles.sectionWrapper}>
                    <BookNowCard
                        onPress={() => navigation.navigate("Services")}
                    />
                </View>

                {/* Live Chair Status Section */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <View style={styles.sectionIndicator} />
                            <Text style={styles.sectionHeading}>Live Queue</Text>
                        </View>
                        <View style={styles.liveChip}>
                            <View style={styles.livePulseDot} />
                            <Text style={styles.liveChipText}>IN PROGRESS</Text>
                        </View>
                    </View>

                    <LiveQueueCard
                        barberName="Rajesh"
                        chairNumber={2}
                        currentToken={14}
                        yourToken={18}
                        estimatedMinutes={20}
                    />
                </View>

                {/* Active Appointments Section */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIndicator, { backgroundColor: "#8B5CF6" }]} />
                            <Text style={styles.sectionHeading}>Active Booking</Text>
                        </View>
                    </View>

                    <AppointmentCard />
                </View>

                {/* Popular Services Horizontal Carousel */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <View style={[styles.sectionIndicator, { backgroundColor: "#F59E0B" }]} />
                            <Text style={styles.sectionHeading}>Popular Services</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate("Services")}
                        >
                            <Text style={styles.exploreLink}>Explore All →</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={popularServices}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.carouselContainer}
                        renderItem={({ item }) => (
                            <View style={styles.carouselItemWrapper}>
                                <PopularServiceCard
                                    name={item.marathi || item.name}
                                    price={item.price}
                                    duration={item.duration}
                                    onPress={() => navigation.navigate("Services")}
                                />
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#FAF9F6",
    },
    content: {
        padding: SPACING.lg || 20,
        paddingBottom: 50,
    },

    // Luxury Brand Header
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 4,
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    logoBadge: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#FEF3C7",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#FDE68A",
    },
    brandTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: COLORS.black || "#0F172A",
        letterSpacing: 1.5,
    },
    brandSubtitle: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "600",
        letterSpacing: 0.2,
    },
    notificationBtn: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    notificationPulse: {
        position: "absolute",
        top: 10,
        right: 11,
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: "#EF4444",
    },

    // Real-time Salon Metric Dashboard
    metricsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 18,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    metricCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    metricIconBg: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
    },
    metricVal: {
        fontSize: 14,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
    },
    metricLbl: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "500",
    },
    metricDivider: {
        width: 1,
        height: 26,
        backgroundColor: "#E2E8F0",
    },

    // Section Layout Scaffold
    sectionWrapper: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sectionTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    sectionIndicator: {
        width: 4,
        height: 16,
        borderRadius: 2,
        backgroundColor: COLORS.primary || "#2563EB",
    },
    sectionHeading: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.3,
    },

    // Live Pill Chip
    liveChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 5,
    },
    livePulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#16A34A",
    },
    liveChipText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#15803D",
        letterSpacing: 0.5,
    },

    // Explore Link
    exploreLink: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D97706",
    },

    // Carousel Layout
    carouselContainer: {
        paddingRight: 10,
        gap: 12,
    },
    carouselItemWrapper: {
        width: 215,
    },
});