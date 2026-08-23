import React from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import BarberStatusCard from "../../components/home/BarberStatusCard";
import AppScreen from "../../components/common/AppScreen";
import { SERVICES } from "../../constants/DummyData";

export default function HomeScreen({ navigation }) {
    const popularServices = SERVICES ? SERVICES.slice(0, 5) : [];
    const barbers = [
        {
            id: "1",
            name: "Barber 1",
            chair: "Chair 1",
            status: "FREE",
            waiting: 0,
            currentCustomer: null,
        },
        {
            id: "2",
            name: "Barber 2",
            chair: "Chair 2",
            status: "BUSY",
            waiting: 3,
            currentCustomer: "Rahul",
        },
        {
            id: "3",
            name: "Barber 3",
            chair: "Chair 3",
            status: "NEXT",
            waiting: 1,
            currentCustomer: "Amit",
        },
    ];

    const freeCount = barbers.filter((b) => b.status === "FREE").length;
    const nextCount = barbers.filter((b) => b.status === "NEXT").length;
    const busyCount = barbers.filter((b) => b.status === "BUSY").length;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Modern Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingText}>नमस्कार, ग्राहक! 👋</Text>
                        <Text style={styles.brandTitle}>New Fashion Hair Style</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileBtn}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Ionicons
                            name="person"
                            size={18}
                            color="#1F2937"
                        />
                    </TouchableOpacity>
                </View>

                {/* Hero Banner */}
                <LinearGradient
                    colors={["#2C2013", "#1A130B", "#0D0A07"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroBanner}
                >
                    {/* Subtle Ambient Glow */}
                    <LinearGradient
                        colors={["rgba(240, 199, 117, 0.25)", "transparent"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.8, y: 0.8 }}
                        style={styles.heroGlowOverlay}
                    />

                    <View style={styles.heroTextContainer}>
                        <View style={styles.badgeContainer}>
                            <Text style={styles.heroTagline}>PREMIUM GROOMING</Text>
                        </View>

                        <Text style={styles.heroTitle}>
                            Style that shines{"\n"}with confidence
                        </Text>

                        <Text style={styles.heroSubtitle}>
                            Expert cuts, beard styling, & luxury care tailored for you.
                        </Text>
                    </View>

                    <View style={styles.heroIconBadge}>
                        <Ionicons name="cut-outline" size={32} color="#F0C775" />
                    </View>
                </LinearGradient>

                {/* CTA Button */}
                <TouchableOpacity
                    style={styles.bookBtn}
                    activeOpacity={0.88}
                    onPress={() => navigation.navigate("Services")}
                >
                    <Text style={styles.bookBtnText}>Book Appointment</Text>
                    <View style={styles.btnIconCircle}>
                        <Ionicons name="arrow-forward" size={16} color="#000000" />
                    </View>
                </TouchableOpacity>

                {/* Popular Services Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular Services</Text>
                    <TouchableOpacity
                        style={styles.exploreBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Services")}
                    >
                        <Text style={styles.swipeText}>Explore all</Text>
                        <Ionicons name="chevron-forward" size={14} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                {/* Popular Services Horizontal Carousel */}
                <FlatList
                    data={popularServices}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.carouselContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.serviceCard}
                            activeOpacity={0.82}
                            onPress={() => navigation.navigate("Services")}
                        >
                            <View style={styles.imageWrapper}>
                                {item.image ? (
                                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                                ) : (
                                    <View style={styles.placeholderImage}>
                                        <Ionicons name="cut-outline" size={26} color="#9CA3AF" />
                                    </View>
                                )}
                                <View style={styles.priceTag}>
                                    <Text style={styles.priceTagText}>₹{item.price}</Text>
                                </View>
                            </View>
                            <Text style={styles.serviceName} numberOfLines={1}>
                                {item.name}
                            </Text>
                            <Text style={styles.serviceCategory}>Popular Choice</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Today's Queue Status Section */}
                <View style={styles.queueHeader}>
                    <Text style={styles.queueTitle}>Today's Queue Status</Text>
                    <View style={styles.liveIndicator}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>LIVE</Text>
                    </View>
                </View>

                {/* Queue Summary Chips */}
                <View style={styles.queueSummaryContainer}>
                    <View style={[styles.statusChip, styles.chipFree]}>
                        <View style={[styles.statusDot, { backgroundColor: "#10B981" }]} />
                        <Text style={styles.chipText}>{freeCount} Free</Text>
                    </View>

                    <View style={[styles.statusChip, styles.chipNext]}>
                        <View style={[styles.statusDot, { backgroundColor: "#F59E0B" }]} />
                        <Text style={styles.chipText}>{nextCount} Next</Text>
                    </View>

                    <View style={[styles.statusChip, styles.chipBusy]}>
                        <View style={[styles.statusDot, { backgroundColor: "#EF4444" }]} />
                        <Text style={styles.chipText}>{busyCount} Busy</Text>
                    </View>
                </View>

                {/* Barber Cards */}
                {barbers.map((barber) => (
                    <BarberStatusCard key={barber.id} barber={barber} />
                ))}
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 13,
        color: "#6B7280",
        fontWeight: "600",
        marginBottom: 2,
    },
    brandTitle: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111827",
        letterSpacing: -0.4,
    },
    profileBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },

    // Hero Banner
    heroBanner: {
        borderRadius: 24,
        padding: 22,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 16,
        position: "relative",
        overflow: "hidden",
        minHeight: 185,
    },
    heroGlowOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    heroTextContainer: {
        flex: 1,
        paddingRight: 12,
        zIndex: 1,
    },
    badgeContainer: {
        alignSelf: "flex-start",
        backgroundColor: "rgba(240, 199, 117, 0.15)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(240, 199, 117, 0.3)",
        marginBottom: 10,
    },
    heroTagline: {
        fontSize: 10,
        fontWeight: "900",
        color: "#F0C775",
        letterSpacing: 1.2,
    },
    heroTitle: {
        fontSize: 21,
        fontWeight: "800",
        color: "#FFFFFF",
        lineHeight: 26,
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    heroSubtitle: {
        fontSize: 12,
        color: "#D1D5DB",
        lineHeight: 17,
        fontWeight: "400",
    },
    heroIconBadge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(240, 199, 117, 0.3)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },

    // CTA Button
    bookBtn: {
        backgroundColor: "#111827",
        borderRadius: 18,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
        gap: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    bookBtnText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: -0.2,
    },
    btnIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#F0C775",
        alignItems: "center",
        justifyContent: "center",
    },

    // Section Headers
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        letterSpacing: -0.3,
    },
    exploreBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    swipeText: {
        fontSize: 13,
        color: "#6B7280",
        fontWeight: "600",
    },

    // Services Carousel
    carouselContainer: {
        gap: 14,
        paddingBottom: 28,
    },
    serviceCard: {
        width: 156,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    imageWrapper: {
        width: "100%",
        height: 115,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#F3F4F6",
        marginBottom: 10,
        position: "relative",
    },
    cardImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    placeholderImage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    priceTag: {
        position: "absolute",
        bottom: 8,
        right: 8,
        backgroundColor: "rgba(17, 24, 39, 0.85)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    priceTagText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "700",
    },
    serviceName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 2,
    },
    serviceCategory: {
        fontSize: 11,
        fontWeight: "500",
        color: "#9CA3AF",
    },

    // Queue Section
    queueHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    queueTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        letterSpacing: -0.3,
    },
    liveIndicator: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF2F2",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 5,
        borderWidth: 1,
        borderColor: "#FEE2E2",
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#EF4444",
    },
    liveText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#EF4444",
        letterSpacing: 0.5,
    },

    // Queue Chips Summary
    queueSummaryContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
    },
    statusChip: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    chipFree: {
        backgroundColor: "#ECFDF5",
    },
    chipNext: {
        backgroundColor: "#FFFBEB",
    },
    chipBusy: {
        backgroundColor: "#FEF2F2",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    chipText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
    },
});