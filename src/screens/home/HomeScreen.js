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
                {/* Dark Header Panel */}
                <View style={styles.headerPanel}>
                    <View style={styles.topHeader}>
                        <View style={styles.brandContainer}>
                            <View style={styles.logoBadge}>
                                <Ionicons name="sparkles" size={16} color="#0D1B1A" />
                            </View>
                            <View>
                                <Text style={styles.brandTitle}>Luxe Studio</Text>
                                <Text style={styles.brandSubtitle}>Premium Hair & Grooming</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.notificationBtn}
                            activeOpacity={0.75}
                            onPress={() => navigation.navigate("Notifications")}
                        >
                            <Ionicons name="notifications-outline" size={19} color="#F4F7F6" />
                            <View style={styles.notificationPulse} />
                        </TouchableOpacity>
                    </View>

                    {/* Hero Showcase Banner */}
                    <HeroBanner />
                </View>

                {/* Floating Metric Card — overlaps header/hero seam */}
                <View style={styles.metricsFloatWrapper}>
                    <View style={styles.metricsContainer}>
                        <View style={styles.metricCard}>
                            <View style={styles.metricIconBg}>
                                <Ionicons name="time-outline" size={17} color="#0F766E" />
                            </View>
                            <View>
                                <Text style={styles.metricVal}>20 Min</Text>
                                <Text style={styles.metricLbl}>Wait Time</Text>
                            </View>
                        </View>

                        <View style={styles.metricDivider} />

                        <View style={styles.metricCard}>
                            <View style={styles.metricIconBg}>
                                <Ionicons name="people-outline" size={17} color="#0F766E" />
                            </View>
                            <View>
                                <Text style={styles.metricVal}>4 Ahead</Text>
                                <Text style={styles.metricLbl}>Live Queue</Text>
                            </View>
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
                        <View style={styles.pillTag}>
                            <Text style={styles.pillTagText}>Live Queue</Text>
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
                        <View style={[styles.pillTag, styles.pillTagAlt]}>
                            <Text style={[styles.pillTagText, styles.pillTagTextAlt]}>Active Booking</Text>
                        </View>
                    </View>

                    <AppointmentCard />
                </View>

                {/* Popular Services Horizontal Carousel */}
                <View style={[styles.sectionWrapper, { marginBottom: 8 }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeadingLarge}>Popular Services</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate("Services")}
                            style={styles.exploreLinkBtn}
                        >
                            <Text style={styles.exploreLink}>See all</Text>
                            <Ionicons name="chevron-forward" size={14} color="#0F766E" />
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

const ACCENT = "#0F766E"; // deep teal — spa/salon aesthetic
const INK = "#0D1B1A";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F5F5F2",
    },
    content: {
        paddingBottom: 56,
    },

    // Dark Header Panel — replaces flat top bar
    headerPanel: {
        backgroundColor: INK,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        paddingHorizontal: SPACING.lg || 20,
        paddingTop: 14,
        paddingBottom: 28,
    },
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
    },
    logoBadge: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#4ADE9D",
        alignItems: "center",
        justifyContent: "center",
    },
    brandTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#F4F7F6",
        letterSpacing: 0.2,
    },
    brandSubtitle: {
        fontSize: 11.5,
        color: "#9FB3AF",
        fontWeight: "500",
        marginTop: 2,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
    },
    notificationPulse: {
        position: "absolute",
        top: 9,
        right: 10,
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: "#F87171",
        borderWidth: 1.5,
        borderColor: INK,
    },

    // Floating metric card, overlapping the header/content seam
    metricsFloatWrapper: {
        paddingHorizontal: SPACING.lg || 20,
        marginTop: -22,
        marginBottom: 22,
    },
    metricsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        paddingVertical: 16,
        paddingHorizontal: 18,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.10,
        shadowRadius: 16,
        elevation: 6,
    },
    metricCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    metricIconBg: {
        width: 36,
        height: 36,
        borderRadius: 11,
        backgroundColor: "#E6F5F2",
        alignItems: "center",
        justifyContent: "center",
    },
    metricVal: {
        fontSize: 14,
        fontWeight: "800",
        color: INK,
    },
    metricLbl: {
        fontSize: 10.5,
        color: "#8A938F",
        fontWeight: "500",
        marginTop: 1,
    },
    metricDivider: {
        width: 1,
        height: 28,
        backgroundColor: "#EAEDEC",
    },

    // Section Layout
    sectionWrapper: {
        paddingHorizontal: SPACING.lg || 20,
        marginBottom: 26,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    sectionHeadingLarge: {
        fontSize: 17,
        fontWeight: "800",
        color: INK,
        letterSpacing: -0.2,
    },

    // Pill-style section tags — replaces the old bar-indicator pattern
    pillTag: {
        backgroundColor: "#E6F5F2",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    pillTagText: {
        fontSize: 12.5,
        fontWeight: "800",
        color: ACCENT,
        letterSpacing: 0.2,
    },
    pillTagAlt: {
        backgroundColor: "#F1EAFB",
    },
    pillTagTextAlt: {
        color: "#7C3AED",
    },

    // Live Pill Chip
    liveChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E4F7E9",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 6,
    },
    livePulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#1DA34A",
    },
    liveChipText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#127A38",
        letterSpacing: 0.5,
    },

    // Explore Link
    exploreLinkBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    exploreLink: {
        fontSize: 13,
        fontWeight: "700",
        color: ACCENT,
    },

    // Carousel Layout
    carouselContainer: {
        paddingLeft: SPACING.lg || 20,
        paddingRight: 10,
        gap: 14,
    },
    carouselItemWrapper: {
        width: 215,
    },
});