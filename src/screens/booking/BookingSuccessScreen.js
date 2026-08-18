import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

// Success Theme Color Palette Constants
const SUCCESS_COLORS = {
    primaryGreen: "#059669",     // Rich Emerald Green
    lightGreen: "#10B981",       // Bright Accent Green
    softGreenBg: "#ECFDF5",      // Subtle Mint Background
    borderGreen: "#A7F3D0",      // Light Green Border
    darkGreenHeader: "#064E3B",  // Deep Forest Green for Ticket Header
    mintPill: "#D1FAE5",         // Token Pill Background
    textDark: "#065F46",         // Dark Green Text Accent
};

export default function BookingSuccessScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { booking } = useBooking();

    const serviceName =
        booking.service?.marathi ||
        booking.service?.name ||
        "Service";

    const barberName =
        booking.bookingType === "FASTEST"
            ? "Auto Assigned"
            : booking.barber?.name || "Barber";

    const chair =
        booking.bookingType === "FASTEST"
            ? "Auto Assigned"
            : booking.chair
                ? `Chair ${booking.chair}`
                : "Auto Assigned";

    const tokenNumber = 18;
    const estimatedMinutes = booking.barber?.eta || 20;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Layered Animated Success Badge */}
                <View style={styles.successWrapper}>
                    <View style={styles.outerGlowRing} />
                    <View style={styles.innerGlowRing} />
                    <View style={styles.successCircle}>
                        <Ionicons
                            name="checkmark-sharp"
                            size={48}
                            color={COLORS.white}
                        />
                    </View>
                </View>

                {/* Main Titles */}
                <Text style={styles.heading}>
                    बुकिंग निश्चित झाली! 🎉
                </Text>

                <Text style={styles.subtitle}>
                    तुमची अपॉइंटमेंट यशस्वीरित्या बुक झाली आहे.
                </Text>

                {/* Digital Ticket Card */}
                <View style={styles.ticketCard}>
                    {/* Ticket Header Block */}
                    <View style={styles.ticketTop}>
                        <View style={styles.confirmedBadge}>
                            <Ionicons name="checkmark-circle" size={14} color={SUCCESS_COLORS.primaryGreen} />
                            <Text style={styles.confirmedBadgeText}>कन्फर्म झाले</Text>
                        </View>

                        <Text style={styles.tokenLabel}>
                            तुमचा टोकन नंबर
                        </Text>
                        <Text style={styles.tokenNumber}>
                            #{tokenNumber}
                        </Text>
                        <View style={styles.tokenTag}>
                            <Ionicons name="information-circle-outline" size={12} color={SUCCESS_COLORS.textDark} />
                            <Text style={styles.tokenHint}>
                                हा नंबर सलूनमध्ये दाखवा
                            </Text>
                        </View>
                    </View>

                    {/* Perforated Ticket Notches */}
                    <View style={styles.notchContainer}>
                        <View style={styles.leftNotch} />
                        <View style={styles.dashedLine} />
                        <View style={styles.rightNotch} />
                    </View>

                    {/* Ticket Bottom Details */}
                    <View style={styles.ticketBottom}>
                        <Text style={styles.sectionTitle}>
                            अपॉइंटमेंट तपशील
                        </Text>

                        <DetailRow
                            icon="cut"
                            label="सेवा"
                            value={serviceName}
                        />

                        <DetailRow
                            icon="person"
                            label="बार्बर"
                            value={barberName}
                        />

                        <DetailRow
                            icon="business"
                            label="चेअर"
                            value={chair}
                        />

                        <DetailRow
                            icon="calendar"
                            label="तारीख"
                            value={booking.date || "--"}
                        />

                        <DetailRow
                            icon="time"
                            label="वेळ"
                            value={booking.time || "--"}
                            isLast
                        />
                    </View>
                </View>

                {/* Live Wait Info Card */}
                <View style={styles.queueCard}>
                    <View style={styles.queueIcon}>
                        <Ionicons
                            name="hourglass"
                            size={22}
                            color={SUCCESS_COLORS.primaryGreen}
                        />
                    </View>

                    <View style={styles.queueContent}>
                        <Text style={styles.queueTitle}>
                            अंदाजे प्रतीक्षा वेळ
                        </Text>
                        <Text style={styles.queueTime}>
                            {estimatedMinutes} मिनिटे
                        </Text>
                    </View>
                </View>

                {/* Inline Action Buttons (Scrolls with Screen) */}
                <View
                    style={[
                        styles.actionContainer,
                        {
                            marginBottom: Math.max(insets.bottom, 16),
                        },
                    ]}
                >
                    <PrimaryButton
                        title="💈 Live Queue पहा"
                        onPress={() => navigation.navigate("Queue")}
                        style={styles.primaryBtnOverride}
                    />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.homeButton}
                        onPress={() => {
                            navigation.getParent()?.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: "CustomerTabs",
                                    },
                                ],
                            });
                        }}
                    >
                        <Text style={styles.homeButtonText}>
                            मुख्य पृष्ठावर जा
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </AppScreen>
    );
}

function DetailRow({
    icon,
    label,
    value,
    isLast = false,
}) {
    return (
        <View style={[styles.detailRow, isLast && styles.noBorder]}>
            <View style={styles.detailIcon}>
                <Ionicons
                    name={icon}
                    size={18}
                    color={SUCCESS_COLORS.primaryGreen}
                />
            </View>

            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>
                    {label}
                </Text>

                <Text style={styles.detailValue}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    content: {
        padding: SPACING.lg,
        alignItems: "center",
        paddingBottom: SPACING.lg,
    },

    /* Success Header Rings */
    successWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },

    outerGlowRing: {
        position: "absolute",
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: SUCCESS_COLORS.lightGreen,
        opacity: 0.15,
    },

    innerGlowRing: {
        position: "absolute",
        width: 92,
        height: 92,
        borderRadius: 46,
        backgroundColor: SUCCESS_COLORS.primaryGreen,
        opacity: 0.25,
    },

    successCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: SUCCESS_COLORS.primaryGreen,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: SUCCESS_COLORS.primaryGreen,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
    },

    heading: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: "800",
        color: "#111827",
        textAlign: "center",
        letterSpacing: -0.4,
    },

    subtitle: {
        marginTop: 6,
        color: "#4B5563",
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
    },

    /* Ticket Container */
    ticketCard: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.07,
                shadowRadius: 16,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    ticketTop: {
        backgroundColor: SUCCESS_COLORS.darkGreenHeader,
        padding: 22,
        alignItems: "center",
        position: "relative",
    },

    confirmedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: SUCCESS_COLORS.softGreenBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 10,
    },

    confirmedBadgeText: {
        color: SUCCESS_COLORS.textDark,
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 4,
    },

    tokenLabel: {
        color: "#A7F3D0",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 0.3,
    },

    tokenNumber: {
        color: "#34D399",
        fontSize: 52,
        fontWeight: "900",
        marginVertical: 2,
        letterSpacing: -1,
    },

    tokenTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(209, 250, 229, 0.2)",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(167, 243, 208, 0.3)",
        marginTop: 4,
    },

    tokenHint: {
        color: "#ECFDF5",
        fontSize: 11,
        fontWeight: "600",
        marginLeft: 5,
    },

    notchContainer: {
        height: 20,
        backgroundColor: SUCCESS_COLORS.darkGreenHeader,
        flexDirection: "row",
        alignItems: "center",
    },

    leftNotch: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#F9FAFB",
        marginLeft: -9,
    },

    dashedLine: {
        flex: 1,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "rgba(167, 243, 208, 0.4)",
        marginHorizontal: 8,
    },

    rightNotch: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#F9FAFB",
        marginRight: -9,
    },

    ticketBottom: {
        padding: SPACING.lg,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
        letterSpacing: -0.2,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    noBorder: {
        borderBottomWidth: 0,
        paddingBottom: 0,
        marginBottom: 0,
    },

    detailIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: SUCCESS_COLORS.softGreenBg,
        borderWidth: 1,
        borderColor: SUCCESS_COLORS.borderGreen,
        alignItems: "center",
        justifyContent: "center",
    },

    detailContent: {
        marginLeft: 12,
        flex: 1,
    },

    detailLabel: {
        color: "#6B7280",
        fontSize: 11,
        fontWeight: "500",
    },

    detailValue: {
        marginTop: 2,
        color: "#111827",
        fontSize: 14,
        fontWeight: "700",
    },

    /* Queue Wait Card */
    queueCard: {
        width: "100%",
        backgroundColor: SUCCESS_COLORS.softGreenBg,
        borderRadius: RADIUS.lg,
        padding: 16,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: SUCCESS_COLORS.borderGreen,
    },

    queueIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: SUCCESS_COLORS.borderGreen,
        alignItems: "center",
        justifyContent: "center",
    },

    queueContent: {
        marginLeft: 14,
    },

    queueTitle: {
        color: "#047857",
        fontSize: 12,
        fontWeight: "600",
    },

    queueTime: {
        color: SUCCESS_COLORS.darkGreenHeader,
        fontSize: 19,
        fontWeight: "800",
        marginTop: 1,
    },

    /* In-scroll Action Container */
    actionContainer: {
        width: "100%",
        marginTop: 24,
    },

    primaryBtnOverride: {
        backgroundColor: SUCCESS_COLORS.primaryGreen,
    },

    homeButton: {
        marginTop: 12,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    homeButtonText: {
        color: "#4B5563",
        fontSize: 15,
        fontWeight: "700",
    },
});