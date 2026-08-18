import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
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

export default function BookingSummaryScreen({ navigation }) {
    const { booking } = useBooking();

    const service = booking?.service;
    const barber = booking?.barber;

    const serviceName =
        service?.marathi || service?.name || "Service";

    const barberName =
        booking?.bookingType === "FASTEST"
            ? "Fastest Available"
            : barber?.name || "Not selected";

    const chair =
        booking?.bookingType === "FASTEST"
            ? "Auto Assigned"
            : barber?.chair
                ? `Chair ${barber.chair}`
                : "Auto Assigned";

    const total = booking?.amount || service?.price || 0;

    const handlePayment = () => {
        navigation.navigate("Payment");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>
                        बुकिंग तपशील
                    </Text>
                    <Text style={styles.subtitle}>
                        पेमेंट करण्यापूर्वी तुमची बुकिंग तपासा
                    </Text>
                </View>

                {/* Service Card */}
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="cut-outline"
                            size={22}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.mainInfo}>
                        <Text style={styles.label}>
                            निवडलेली सेवा
                        </Text>
                        <Text style={styles.value} numberOfLines={1}>
                            {serviceName}
                        </Text>
                        <Text style={styles.secondary}>
                            ⏱️ {service?.duration || "-- मिनिटे"}
                        </Text>
                    </View>

                    <Text style={styles.price}>
                        ₹{total}
                    </Text>
                </View>

                {/* Appointment Details */}
                <View style={styles.detailsCard}>
                    <Text style={styles.sectionTitle}>
                        अपॉइंटमेंट तपशील
                    </Text>

                    <DetailRow
                        icon="calendar-outline"
                        label="तारीख"
                        value={formatDate(booking?.date)}
                    />

                    <DetailRow
                        icon="time-outline"
                        label="वेळ"
                        value={booking?.time || "--"}
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
                        isLast
                    />
                </View>

                {/* Booking Type Banner */}
                <View style={styles.typeCard}>
                    <View style={styles.typeIcon}>
                        <Ionicons
                            name={
                                booking?.bookingType === "FASTEST"
                                    ? "flash"
                                    : "person"
                            }
                            size={18}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.typeContent}>
                        <Text style={styles.typeTitle}>
                            {booking?.bookingType === "FASTEST"
                                ? "Fastest Available"
                                : "Preferred Barber"}
                        </Text>
                        <Text style={styles.typeDescription}>
                            {booking?.bookingType === "FASTEST"
                                ? "आम्ही उपलब्धतेनुसार बार्बर आणि चेअर निवडू."
                                : "तुम्ही निवडलेला बार्बर तुमच्यासाठी राखीव असेल."}
                        </Text>
                    </View>
                </View>

                {/* Price Summary */}
                <View style={styles.priceCard}>
                    <Text style={styles.sectionTitle}>
                        पेमेंट सारांश
                    </Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel} numberOfLines={1}>
                            {serviceName}
                        </Text>
                        <Text style={styles.priceValue}>
                            ₹{total}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>
                            एकूण रक्कम
                        </Text>
                        <Text style={styles.totalValue}>
                            ₹{total}
                        </Text>
                    </View>
                </View>

                {/* Payment Notice */}
                <View style={styles.notice}>
                    <Ionicons
                        name="shield-checkmark-sharp"
                        size={18}
                        color="#15803D"
                    />
                    <Text style={styles.noticeText}>
                        तुमचे पेमेंट सुरक्षितपणे प्रोसेस केले जाईल.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomPrice}>
                    <View style={styles.bottomLabelContainer}>
                        <Text style={styles.bottomLabel}>
                            एकूण देय रक्कम
                        </Text>
                        <Text style={styles.bottomAmount}>
                            ₹{total}
                        </Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <PrimaryButton
                            title="पेमेंट करा"
                            onPress={handlePayment}
                        />
                    </View>
                </View>
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
                    size={16}
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

function formatDate(dateString) {
    if (!dateString) {
        return "--";
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("mr-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 140,
    },

    headerContainer: {
        marginBottom: SPACING.md,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "500",
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.md + 4,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.lg || 12,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    mainInfo: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },

    label: {
        fontSize: 10,
        fontWeight: "700",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    value: {
        marginTop: 2,
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
    },

    secondary: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },

    price: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.primary,
    },

    detailsCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 14,
        letterSpacing: -0.2,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    noBorder: {
        borderBottomWidth: 0,
        paddingBottom: 0,
        marginBottom: 0,
    },

    detailIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },

    detailContent: {
        marginLeft: 12,
        flex: 1,
    },

    detailLabel: {
        fontSize: 11,
        fontWeight: "500",
        color: "#9CA3AF",
    },

    detailValue: {
        marginTop: 1,
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.black,
    },

    typeCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.md + 4,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
    },

    typeIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#262626",
        alignItems: "center",
        justifyContent: "center",
    },

    typeContent: {
        flex: 1,
        marginLeft: 12,
    },

    typeTitle: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "700",
    },

    typeDescription: {
        color: "#9CA3AF",
        fontSize: 12,
        lineHeight: 16,
        marginTop: 2,
    },

    priceCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    priceLabel: {
        color: "#4B5563",
        fontSize: 14,
        fontWeight: "500",
        flex: 1,
        marginRight: 8,
    },

    priceValue: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 12,
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    totalLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
    },

    totalValue: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.primary,
    },

    notice: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
        borderWidth: 1,
        borderColor: "#DCFCE7",
        padding: 12,
        borderRadius: RADIUS.lg,
    },

    noticeText: {
        flex: 1,
        marginLeft: 10,
        color: "#166534",
        fontSize: 12,
        fontWeight: "600",
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.lg,
        paddingTop: 14,
        paddingBottom: Platform.OS === "ios" ? 32 : SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },

    bottomPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    bottomLabelContainer: {
        flex: 1,
        marginRight: 12,
    },

    bottomLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    bottomAmount: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.black,
        marginTop: 1,
    },

    buttonWrapper: {
        flex: 1.2,
    },
});