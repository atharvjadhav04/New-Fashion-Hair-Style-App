import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
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
                {/* Success Icon */}

                <View style={styles.successCircle}>
                    <Ionicons
                        name="checkmark"
                        size={48}
                        color={COLORS.black}
                    />
                </View>

                <Text style={styles.heading}>
                    बुकिंग निश्चित झाली! 🎉
                </Text>

                <Text style={styles.subtitle}>
                    तुमची अपॉइंटमेंट यशस्वीरित्या बुक झाली आहे.
                </Text>

                {/* Token */}

                <View style={styles.tokenCard}>
                    <Text style={styles.tokenLabel}>
                        तुमचा टोकन नंबर
                    </Text>

                    <Text style={styles.tokenNumber}>
                        {tokenNumber}
                    </Text>

                    <Text style={styles.tokenHint}>
                        हा नंबर लक्षात ठेवा
                    </Text>
                </View>

                {/* Appointment Details */}

                <View style={styles.detailsCard}>
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
                    />
                </View>

                {/* Queue */}

                <View style={styles.queueCard}>
                    <View style={styles.queueIcon}>
                        <Ionicons
                            name="hourglass-outline"
                            size={24}
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

            <View style={styles.bottomContainer}>
                <PrimaryButton
                    title="💈 Live Queue पहा"
                    onPress={() => navigation.navigate("Queue")}
                />

                <View style={styles.secondaryButton}>
                    <PrimaryButton
                        title="मुख्य पृष्ठावर जा"
                        onPress={() => {
                            navigation.popToTop();
                            navigation.getParent()?.navigate("Home");
                        }}
                    />
                </View>
            </View>
        </AppScreen>
    );
}

function DetailRow({
    icon,
    label,
    value,
}) {
    return (
        <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
                <Ionicons
                    name={icon}
                    size={19}
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
        paddingBottom: 160,
    },

    successCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

    heading: {
        marginTop: 24,
        fontSize: 26,
        fontWeight: "700",
        color: COLORS.black,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 8,
        color: "#777",
        textAlign: "center",
        lineHeight: 21,
    },

    tokenCard: {
        width: "100%",
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 24,
        alignItems: "center",
        marginTop: 28,
    },

    tokenLabel: {
        color: "#AAAAAA",
        fontSize: 14,
    },

    tokenNumber: {
        color: COLORS.primary,
        fontSize: 58,
        fontWeight: "800",
        marginVertical: 4,
    },

    tokenHint: {
        color: "#CCCCCC",
        fontSize: 12,
    },

    detailsCard: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    detailIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    detailContent: {
        marginLeft: 12,
        flex: 1,
    },

    detailLabel: {
        color: "#888",
        fontSize: 12,
    },

    detailValue: {
        marginTop: 3,
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
    },

    queueCard: {
        width: "100%",
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    queueIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: "#292929",
        alignItems: "center",
        justifyContent: "center",
    },

    queueContent: {
        marginLeft: 14,
    },

    queueTitle: {
        color: "#AAAAAA",
        fontSize: 13,
    },

    queueTime: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "700",
        marginTop: 3,
    },

    bottomContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        paddingTop: 8,
    },

    secondaryButton: {
        marginTop: 8,
    },
});