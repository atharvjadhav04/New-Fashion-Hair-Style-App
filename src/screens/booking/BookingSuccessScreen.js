import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { useBooking } from "../../context/BookingContext";

export default function BookingSuccessScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { booking } = useBooking();

    const bookingDate = booking?.date || "12 Aug 2026";
    const bookingTime = booking?.time || "10:30 AM";
    const tokenNumber = booking?.tokenNumber || "A-024";

    const handleNavigateToBookings = () => {
        navigation.getParent()?.reset({
            index: 0,
            routes: [
                {
                    name: "CustomerTabs",
                    params: {
                        screen: "Bookings",
                    },
                },
            ],
        });
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: Math.max(insets.bottom, 24) },
                ]}
            >
                {/* Animated Checkmark Circle */}
                <View style={styles.iconContainer}>
                    <View style={styles.outerGlow}>
                        <View style={styles.innerCheck}>
                            <Ionicons name="checkmark" size={44} color="#FFFFFF" />
                        </View>
                    </View>
                </View>

                {/* Titles */}
                <Text style={styles.heading}>आपले बुकिंग यशस्वी झाले.</Text>
                <Text style={styles.subtitle}>
                    तुमचे पेमेंट सुरक्षितपणे पूर्ण झाले आहे आणि{"\n"}
                    अपॉइंटमेंट निश्चित करण्यात आली आहे.
                </Text>

                {/* Appointment Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.headerLabel}>Appointment Details</Text>
                            <Text style={styles.headerTitle}>Confirmed Booking</Text>
                        </View>
                        <View style={styles.paidBadge}>
                            <Text style={styles.paidText}>PAID</Text>
                        </View>
                    </View>

                    {/* Date Row */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="calendar-outline" size={20} color="#111827" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Appointment Date</Text>
                            <Text style={styles.infoValue}>{bookingDate}</Text>
                        </View>
                    </View>

                    {/* Time Row */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="time-outline" size={22} color="#111827" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Time</Text>
                            <Text style={styles.infoValue}>{bookingTime}</Text>
                        </View>
                    </View>

                    {/* Token Row */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.hashIcon}>#</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Token Number</Text>
                            <Text style={styles.infoValue}>{tokenNumber}</Text>
                        </View>
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    style={styles.actionBtn}
                    activeOpacity={0.88}
                    onPress={handleNavigateToBookings}
                >
                    <Text style={styles.actionBtnText}>माझ्या बुकिंग्स पहा</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    content: {
        paddingHorizontal: 20,
        alignItems: "center",
        paddingTop: 36,
    },

    /* Header Checkmark Icon */
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    outerGlow: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#EBFBEE",
        alignItems: "center",
        justifyContent: "center",
    },

    innerCheck: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#00C853",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#00C853",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },

    /* Main Headings */
    heading: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        textAlign: "center",
        letterSpacing: -0.3,
    },

    subtitle: {
        marginTop: 8,
        color: "#6B7280",
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "400",
    },

    /* Main Card Container */
    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 20,
        marginTop: 28,
        borderWidth: 1,
        borderColor: "#EEF0F2",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    headerLabel: {
        fontSize: 13,
        fontWeight: "500",
        color: "#6B7280",
        marginBottom: 2,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        letterSpacing: -0.2,
    },

    paidBadge: {
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
    },

    paidText: {
        color: "#D97706",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.5,
    },

    /* Inner Details Item Rows */
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 10,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    hashIcon: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
    },

    infoTextContainer: {
        flex: 1,
    },

    infoLabel: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "500",
    },

    infoValue: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "700",
        marginTop: 1,
    },

    /* CTA Button */
    actionBtn: {
        width: "100%",
        backgroundColor: "#FF9500",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
        shadowColor: "#FF9500",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
    },

    actionBtnText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});