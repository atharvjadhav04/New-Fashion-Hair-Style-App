import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";
import { COLORS, SPACING, RADIUS } from "../../theme";
export default function BookingDetailsScreen({
    navigation,
    route,
}) {
    const { booking } = useBooking();
    const service = route?.params?.service;
    return (
        <AppScreen style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <Text style={styles.heading}>Booking Details</Text>
                <Text style={styles.subtitle}>
                    तुमच्या निवडलेल्या सेवेचे तपशील तपासा
                </Text>

                {/* Main Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.serviceIconContainer}>
                            <Ionicons
                                name="cut-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                        </View>
                        <View style={styles.serviceMain}>
                            <Text style={styles.service}>
                                {booking.service?.marathi || "No Service Selected"}
                            </Text>
                            {booking.service?.duration && (
                                <View style={styles.durationRow}>
                                    <Ionicons
                                        name="time-outline"
                                        size={14}
                                        color="#6B7280"
                                    />
                                    <Text style={styles.duration}>
                                        {booking.service?.duration}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Price Breakdown Row */}
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>एकूण रक्कम (Total Price)</Text>
                        <Text style={styles.price}>₹ {booking.amount || 0}</Text>
                    </View>

                    {/* Description Section */}
                    {booking.service?.description && (
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionLabel}>सेवेची माहिती</Text>
                            <Text style={styles.description}>
                                {booking.service?.description}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Additional Info Badge */}
                <View style={styles.infoBadge}>
                    <Ionicons
                        name="information-circle-outline"
                        size={18}
                        color="#4B5563"
                    />
                    <Text style={styles.infoBadgeText}>
                        तुम्ही पुढच्या टप्प्यावर बार्बर आणि तारीख निवडू शकता.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Sticky Action Area */}
            <View style={styles.footer}>
                <PrimaryButton
                    title="Continue"
                    onPress={() => navigation.navigate("BookingPreference")}
                />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 110,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        marginBottom: 20,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "400",
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    serviceIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    serviceMain: {
        flex: 1,
        marginLeft: 14,
    },

    service: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.black,
        letterSpacing: -0.3,
    },

    durationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

    duration: {
        marginLeft: 5,
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "500",
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 18,
    },

    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        padding: 14,
        borderRadius: RADIUS.md,
    },

    priceLabel: {
        fontSize: 13,
        color: "#4B5563",
        fontWeight: "600",
    },

    price: {
        fontSize: 20,
        color: COLORS.primary,
        fontWeight: "800",
    },

    descriptionContainer: {
        marginTop: 18,
    },

    descriptionLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "#8E8E93",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 6,
    },

    description: {
        color: "#4B5563",
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "400",
    },

    infoBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        padding: 14,
        borderRadius: RADIUS.lg,
        marginTop: 16,
    },

    infoBadgeText: {
        marginLeft: 10,
        color: "#4B5563",
        fontSize: 12,
        fontWeight: "500",
        flex: 1,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.lg,
        paddingBottom: Platform.OS === "ios" ? 28 : SPACING.lg,
        paddingTop: 12,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
});