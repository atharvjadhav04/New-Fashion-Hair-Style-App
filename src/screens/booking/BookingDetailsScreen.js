import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function BookingDetailsScreen({ navigation }) {
    const { booking, removeService } = useBooking();

    const servicesList = booking?.services || [];
    const totalAmount = booking?.amount || 0;

    return (
        <AppScreen style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.stepBadge}>
                        <Ionicons
                            name="receipt-outline"
                            size={12}
                            color={COLORS.primary || "#D97706"}
                        />
                        <Text style={styles.stepBadgeText}>बुक तपशील</Text>
                    </View>
                    <Text style={styles.heading}>Booking Details</Text>
                    <Text style={styles.subtitle}>
                        तुमच्या निवडलेल्या सेवेचे तपशील तपासा
                    </Text>
                </View>

                {/* Main Summary Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Selected Services</Text>

                    {servicesList.length === 0 ? (
                        <View style={styles.emptyServices}>
                            <View style={styles.emptyIconCircle}>
                                <Ionicons
                                    name="cut-outline"
                                    size={28}
                                    color="#9CA3AF"
                                />
                            </View>
                            <Text style={styles.emptyText}>No Service Selected</Text>
                        </View>
                    ) : (
                        servicesList.map((service, index) => {
                            const isLast = index === servicesList.length - 1;
                            return (
                                <View
                                    key={service.id}
                                    style={[
                                        styles.serviceRow,
                                        !isLast && styles.serviceRowBorder,
                                    ]}
                                >
                                    <View style={styles.serviceIconContainer}>
                                        <Ionicons
                                            name="cut-outline"
                                            size={20}
                                            color={COLORS.primary || "#F59E0B"}
                                        />
                                    </View>

                                    <View style={styles.serviceMain}>
                                        <Text style={styles.serviceName}>
                                            {service.marathi}
                                        </Text>

                                        {service.duration && (
                                            <View style={styles.durationBadge}>
                                                <Ionicons
                                                    name="time-outline"
                                                    size={12}
                                                    color="#6B7280"
                                                />
                                                <Text style={styles.durationText}>
                                                    {service.duration}
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.serviceRight}>
                                        <Text style={styles.servicePrice}>
                                            ₹ {service.price}
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            activeOpacity={0.7}
                                            onPress={() => removeService(service.id)}
                                        >
                                            <Ionicons
                                                name="trash-outline"
                                                size={15}
                                                color="#DC2626"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )}

                    <View style={styles.divider} />

                    {/* Total Price Summary Box */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>
                            एकूण रक्कम (Total Price)
                        </Text>
                        <Text style={styles.priceValue}>
                            ₹ {totalAmount}
                        </Text>
                    </View>
                </View>

                {/* Add More Services Button */}
                <TouchableOpacity
                    style={styles.addMoreButton}
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate("CustomerTabs", {
                            screen: "Services",
                        })
                    }
                >
                    <Ionicons
                        name="add-circle-outline"
                        size={20}
                        color={COLORS.primary || "#F59E0B"}
                    />
                    <Text style={styles.addMoreText}>Add More Services</Text>
                </TouchableOpacity>

                {/* Info Callout Badge */}
                <View style={styles.infoBadge}>
                    <View style={styles.infoIconWrapper}>
                        <Ionicons
                            name="information-circle-outline"
                            size={18}
                            color="#2563EB"
                        />
                    </View>
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
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    scrollContent: {
        padding: SPACING.lg || 20,
        paddingBottom: 110,
    },

    headerContainer: {
        marginBottom: 20,
    },

    stepBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#FEF3C7",
    },

    stepBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.primary || "#D97706",
        marginLeft: 4,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
    },

    card: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: SPACING.lg || 20,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        marginBottom: 12,
        letterSpacing: -0.2,
    },

    serviceRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },

    serviceRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    serviceIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
    },

    serviceMain: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },

    serviceName: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black || "#111827",
        letterSpacing: -0.2,
    },

    durationBadge: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

    durationText: {
        marginLeft: 4,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },

    serviceRight: {
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 6,
    },

    servicePrice: {
        fontSize: 15,
        fontWeight: "800",
        color: COLORS.black || "#111827",
    },

    deleteButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FEE2E2",
        alignItems: "center",
        justifyContent: "center",
    },

    emptyServices: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },

    emptyIconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    emptyText: {
        color: "#9CA3AF",
        fontSize: 13,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 14,
    },

    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: RADIUS.md || 12,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },

    priceLabel: {
        fontSize: 13,
        color: "#4B5563",
        fontWeight: "600",
    },

    priceValue: {
        fontSize: 20,
        color: COLORS.primary || "#D97706",
        fontWeight: "800",
    },

    addMoreButton: {
        marginTop: 16,
        height: 50,
        borderRadius: RADIUS.lg || 16,
        borderWidth: 1.5,
        borderColor: COLORS.primary || "#F59E0B",
        backgroundColor: COLORS.white || "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    addMoreText: {
        marginLeft: 8,
        color: COLORS.primary || "#D97706",
        fontSize: 14,
        fontWeight: "700",
    },

    infoBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: RADIUS.lg || 14,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#DBEAFE",
    },

    infoIconWrapper: {
        marginRight: 10,
    },

    infoBadgeText: {
        color: "#1E40AF",
        fontSize: 12,
        fontWeight: "500",
        flex: 1,
        lineHeight: 18,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.lg || 20,
        paddingBottom: Platform.OS === "ios" ? 32 : 20,
        paddingTop: 14,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 8,
    },
});