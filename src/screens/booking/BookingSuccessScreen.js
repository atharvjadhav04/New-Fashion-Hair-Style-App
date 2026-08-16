import React from "react";
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

export default function BookingSuccessScreen({ navigation }) {
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

    // Demo values for now.
    // Backend will provide these after real booking confirmation.
    const tokenNumber = 18;
    const estimatedMinutes =
        booking.barber?.eta || 20;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Success Animated Badge */}
                <View style={styles.successWrapper}>
                    <View style={styles.successGlow} />
                    <View style={styles.successCircle}>
                        <Ionicons
                            name="checkmark-sharp"
                            size={44}
                            color={COLORS.black}
                        />
                    </View>
                </View>

                <Text style={styles.heading}>
                    बुकिंग निश्चित झाली! 🎉
                </Text>

                <Text style={styles.subtitle}>
                    तुमची अपॉइंटमेंट यशस्वीरित्या बुक झाली आहे.
                </Text>

                {/* Main Digital Ticket / Token */}
                <View style={styles.ticketCard}>
                    <View style={styles.ticketTop}>
                        <Text style={styles.tokenLabel}>
                            तुमचा टोकन नंबर
                        </Text>
                        <Text style={styles.tokenNumber}>
                            #{tokenNumber}
                        </Text>
                        <View style={styles.tokenTag}>
                            <Text style={styles.tokenHint}>
                                हा नंबर लक्षात ठेवा
                            </Text>
                        </View>
                    </View>

                    {/* Ticket Notches */}
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
                            icon="cut-outline"
                            label="सेवा"
                            value={serviceName}
                        />

                        <DetailRow
                            icon="person-outline"
                            label="बार्बर"
                            value={barberName}
                        />

                        <DetailRow
                            icon="business-outline"
                            label="चेअर"
                            value={chair}
                        />

                        <DetailRow
                            icon="calendar-outline"
                            label="तारीख"
                            value={booking.date || "--"}
                        />

                        <DetailRow
                            icon="time-outline"
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
                            name="hourglass-outline"
                            size={22}
                            color={COLORS.primary}
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
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomContainer}>
                <PrimaryButton
                    title="💈 Live Queue पहा"
                    onPress={() => navigation.navigate("Queue")}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.homeButton}
                    onPress={() => {
                        navigation.popToTop();
                        navigation.getParent()?.navigate("Home");
                    }}
                >
                    <Text style={styles.homeButtonText}>
                        मुख्य पृष्ठावर जा
                    </Text>
                </TouchableOpacity>
            </View>
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
                    color={COLORS.primary}
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
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        alignItems: "center",
        paddingBottom: 170,
    },

    successWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },

    successGlow: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        opacity: 0.18,
    },

    successCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    heading: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black,
        textAlign: "center",
        letterSpacing: -0.4,
    },

    subtitle: {
        marginTop: 6,
        color: "#6B7280",
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
    },

    ticketCard: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.05,
                shadowRadius: 12,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    ticketTop: {
        backgroundColor: COLORS.black,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        padding: 24,
        alignItems: "center",
    },

    tokenLabel: {
        color: "#9CA3AF",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 0.3,
    },

    tokenNumber: {
        color: COLORS.primary,
        fontSize: 54,
        fontWeight: "800",
        marginVertical: 2,
        letterSpacing: -1,
    },

    tokenTag: {
        backgroundColor: "#262626",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },

    tokenHint: {
        color: "#E5E7EB",
        fontSize: 11,
        fontWeight: "600",
    },

    notchContainer: {
        height: 20,
        backgroundColor: COLORS.black,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },

    leftNotch: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.background,
        marginLeft: -8,
    },

    dashedLine: {
        flex: 1,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#374151",
        marginHorizontal: 8,
    },

    rightNotch: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.background,
        marginRight: -8,
    },

    ticketBottom: {
        padding: SPACING.lg,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black,
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
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#FFFDF9",
        borderWidth: 1,
        borderColor: "#FEF3C7",
        alignItems: "center",
        justifyContent: "center",
    },

    detailContent: {
        marginLeft: 12,
        flex: 1,
    },

    detailLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
    },

    detailValue: {
        marginTop: 2,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
    },

    queueCard: {
        width: "100%",
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.lg,
        padding: 16,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    queueIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#1F2937",
        alignItems: "center",
        justifyContent: "center",
    },

    queueContent: {
        marginLeft: 12,
    },

    queueTitle: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
    },

    queueTime: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "800",
        marginTop: 2,
    },

    bottomContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.lg,
        paddingBottom: Platform.OS === "ios" ? 28 : SPACING.lg,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
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