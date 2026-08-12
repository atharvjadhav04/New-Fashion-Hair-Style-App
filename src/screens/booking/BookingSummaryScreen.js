import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
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

    const service = booking.service;
    const barber = booking.barber;

    const serviceName =
        service?.marathi || service?.name || "Service";

    const barberName =
        booking.bookingType === "FASTEST"
            ? "Fastest Available"
            : barber?.name || "Not selected";

    const chair =
        booking.bookingType === "FASTEST"
            ? "Auto Assigned"
            : barber?.chair
                ? `Chair ${barber.chair}`
                : "Auto Assigned";

    const total = booking.amount || service?.price || 0;

    const handlePayment = () => {
        navigation.navigate("Payment");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.heading}>
                    बुकिंग तपशील
                </Text>

                <Text style={styles.subtitle}>
                    पेमेंट करण्यापूर्वी तुमची बुकिंग तपासा
                </Text>

                {/* Service */}
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="cut-outline"
                            size={25}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.mainInfo}>
                        <Text style={styles.label}>
                            सेवा
                        </Text>

                        <Text style={styles.value}>
                            {serviceName}
                        </Text>

                        <Text style={styles.secondary}>
                            {service?.duration || "--"}
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
                        value={formatDate(booking.date)}
                    />

                    <DetailRow
                        icon="time-outline"
                        label="वेळ"
                        value={booking.time || "--"}
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
                </View>

                {/* Booking Type */}
                <View style={styles.typeCard}>
                    <View style={styles.typeIcon}>
                        <Ionicons
                            name={
                                booking.bookingType === "FASTEST"
                                    ? "flash"
                                    : "person"
                            }
                            size={20}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.typeContent}>
                        <Text style={styles.typeTitle}>
                            {booking.bookingType === "FASTEST"
                                ? "Fastest Available"
                                : "Preferred Barber"}
                        </Text>

                        <Text style={styles.typeDescription}>
                            {booking.bookingType === "FASTEST"
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
                        <Text style={styles.priceLabel}>
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
                        name="shield-checkmark-outline"
                        size={20}
                        color="#16A34A"
                    />

                    <Text style={styles.noticeText}>
                        तुमचे पेमेंट सुरक्षितपणे प्रोसेस केले जाईल.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <View style={styles.bottomPrice}>
                    <Text style={styles.bottomLabel}>
                        एकूण
                    </Text>

                    <Text style={styles.bottomAmount}>
                        ₹{total}
                    </Text>
                </View>

                <PrimaryButton
                    title="पेमेंट करा"
                    onPress={handlePayment}
                />
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
                <Text style={styles.label}>
                    {label}
                </Text>

                <Text style={styles.value}>
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
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 150,
    },

    heading: {
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 8,
        color: "#777",
        fontSize: 14,
        marginBottom: 24,
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    iconContainer: {
        width: 55,
        height: 55,
        borderRadius: 18,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    mainInfo: {
        flex: 1,
        marginLeft: 14,
    },

    label: {
        fontSize: 12,
        color: "#888",
    },

    value: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black,
    },

    secondary: {
        marginTop: 4,
        color: "#777",
        fontSize: 13,
    },

    price: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.primary,
    },

    detailsCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 18,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    detailIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    detailContent: {
        marginLeft: 12,
        flex: 1,
    },

    typeCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    typeIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#292929",
        alignItems: "center",
        justifyContent: "center",
    },

    typeContent: {
        flex: 1,
        marginLeft: 12,
    },

    typeTitle: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "700",
    },

    typeDescription: {
        color: "#CCC",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },

    priceCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: 16,
    },

    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    priceLabel: {
        color: "#666",
    },

    priceValue: {
        color: COLORS.black,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 16,
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    totalLabel: {
        fontSize: 17,
        fontWeight: "700",
    },

    totalValue: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.primary,
    },

    notice: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF8EF",
        padding: 14,
        borderRadius: RADIUS.xl,
    },

    noticeText: {
        flex: 1,
        marginLeft: 10,
        color: "#166534",
        fontSize: 13,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.lg,
        paddingTop: 10,
        paddingBottom: SPACING.lg,
    },

    bottomPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    bottomLabel: {
        color: "#777",
        fontSize: 13,
    },

    bottomAmount: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.black,
    },
});