import React from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function SetupScreen({ navigation }) {
    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>Setup</Text>
                        <Text style={styles.subtitle}>
                            सलूनच्या settings आणि preferences व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIconContainer}>
                        <Ionicons
                            name="settings-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>
                </View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Salon Configuration</Text>
                    <Text style={styles.sectionSubtitle}>
                        सलूनची दैनंदिन माहिती, वेळ आणि व्यवस्थापन
                    </Text>
                </View>

                {/* Configuration Options List */}
                <View style={styles.cardList}>
                    {/* Barbers & Chairs */}
                    <SetupCard
                        icon="people-outline"
                        title="Barbers & Chairs"
                        subtitle="Barbers आणि chairs add किंवा edit करा"
                        badgeText="Staff & Chairs"
                        onPress={() => navigation.navigate("SalonSetup")}
                    />

                    {/* Salon Status */}
                    <SetupCard
                        icon="storefront-outline"
                        title="Salon Status & Hours"
                        subtitle="Salon open / close सद्यस्थिती आणि timing"
                        badgeText="Timing"
                        onPress={() => navigation.navigate("SalonStatus")}
                    />

                    {/* Holidays */}
                    <SetupCard
                        icon="calendar-outline"
                        title="Holidays & Closures"
                        subtitle="विशेष सुट्ट्या आणि बंद दिवस व्यवस्थापित करा"
                        badgeText="Schedule"
                        onPress={() => navigation.navigate("Holidays")}
                    />
                </View>

                {/* Setup Information Callout */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>
                        <Ionicons
                            name="information-circle"
                            size={20}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>

                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Setup Information</Text>
                        <Text style={styles.infoText}>
                            येथे केलेले बदल direct ग्राहक booking, queue timing आणि
                            availability वर लागू होतील.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </AppScreen>
    );
}

function SetupCard({ icon, title, subtitle, badgeText, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.card}
            onPress={onPress}
        >
            <View style={styles.cardIcon}>
                <Ionicons
                    name={icon}
                    size={24}
                    color={COLORS.primary || "#F59E0B"}
                />
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    {badgeText && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{badgeText}</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </View>

            <View style={styles.arrowContainer}>
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#94A3B8"
                />
            </View>
        </TouchableOpacity>
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

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    headerTextGroup: {
        flex: 1,
        marginRight: 12,
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
    headerIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },

    // Section Titles
    sectionHeader: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
    },
    sectionSubtitle: {
        marginTop: 3,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },

    // Card List
    cardList: {
        gap: 12,
        marginBottom: 20,
    },
    card: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContent: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },
    cardTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 6,
    },
    cardTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    badge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        color: "#475569",
        fontSize: 10,
        fontWeight: "600",
    },
    cardSubtitle: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 12,
        lineHeight: 16,
    },
    arrowContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
    },

    // Info Card Callout
    infoCard: {
        padding: 14,
        borderRadius: RADIUS.xl || 16,
        backgroundColor: "#FEF3C7",
        borderWidth: 1,
        borderColor: "#FDE68A",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    infoIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    infoContent: {
        flex: 1,
        marginLeft: 12,
    },
    infoTitle: {
        color: "#78350F",
        fontSize: 13,
        fontWeight: "800",
    },
    infoText: {
        marginTop: 2,
        color: "#92400E",
        fontSize: 11,
        lineHeight: 16,
        fontWeight: "500",
    },
});