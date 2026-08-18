import React, { useState } from "react";
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
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

const TIME_GROUPS = [
    {
        title: "सकाळ",
        icon: "sunny-outline",
        slots: [
            { time: "09:00 AM", available: true },
            { time: "09:30 AM", available: true },
            { time: "10:00 AM", available: false },
            { time: "10:30 AM", available: true },
            { time: "11:00 AM", available: true },
            { time: "11:30 AM", available: false },
        ],
    },
    {
        title: "दुपार",
        icon: "partly-sunny-outline",
        slots: [
            { time: "12:00 PM", available: true },
            { time: "12:30 PM", available: true },
            { time: "01:00 PM", available: false },
            { time: "01:30 PM", available: true },
            { time: "02:00 PM", available: true },
            { time: "02:30 PM", available: true },
        ],
    },
    {
        title: "संध्याकाळ",
        icon: "moon-outline",
        slots: [
            { time: "04:00 PM", available: true },
            { time: "04:30 PM", available: false },
            { time: "05:00 PM", available: true },
            { time: "05:30 PM", available: true },
            { time: "06:00 PM", available: true },
            { time: "06:30 PM", available: false },
            { time: "07:00 PM", available: true },
        ],
    },
];

export default function SelectTimeScreen({ navigation }) {
    const { booking, updateBooking } = useBooking();
    const [selectedTime, setSelectedTime] = useState(null);

    const handleContinue = () => {
        if (!selectedTime) return;

        updateBooking({
            time: selectedTime,
        });

        navigation.navigate("BookingSummary");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>वेळ निवडा</Text>
                    <Text style={styles.subtitle}>
                        तुमच्या सोयीनुसार मोकळा स्लॉट निवडा
                    </Text>
                </View>

                {/* Selected Date Summary Card */}
                <View style={styles.dateCard}>
                    <View style={styles.dateIconWrapper}>
                        <Ionicons
                            name="calendar"
                            size={18}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>
                    <View style={styles.dateInfo}>
                        <Text style={styles.dateLabel}>निवडलेली तारीख</Text>
                        <Text style={styles.dateValue}>
                            {booking.date || "तारीख निवडा"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.goBack()}
                        style={styles.changeDateBtn}
                    >
                        <Text style={styles.changeDateText}>बदला</Text>
                    </TouchableOpacity>
                </View>

                {/* Slot Status Legend */}
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.legendAvailable]} />
                        <Text style={styles.legendText}>उपलब्ध</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.legendSelected]} />
                        <Text style={styles.legendText}>निवडलेले</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.legendFull]} />
                        <Text style={styles.legendText}>फुल (Full)</Text>
                    </View>
                </View>

                {/* Time Groups & Slot Grid */}
                {TIME_GROUPS.map((group) => (
                    <View key={group.title} style={styles.group}>
                        <View style={styles.groupHeader}>
                            <View style={styles.groupIconChip}>
                                <Ionicons
                                    name={group.icon}
                                    size={16}
                                    color={COLORS.black || "#111827"}
                                />
                            </View>
                            <Text style={styles.groupTitle}>{group.title}</Text>
                        </View>

                        <View style={styles.slotsGrid}>
                            {group.slots.map((slot) => {
                                const selected = selectedTime === slot.time;

                                return (
                                    <TouchableOpacity
                                        key={slot.time}
                                        disabled={!slot.available}
                                        activeOpacity={0.75}
                                        onPress={() => setSelectedTime(slot.time)}
                                        style={[
                                            styles.slot,
                                            !slot.available && styles.disabledSlot,
                                            selected && styles.selectedSlot,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.slotText,
                                                !slot.available && styles.disabledText,
                                                selected && styles.selectedText,
                                            ]}
                                        >
                                            {slot.time}
                                        </Text>

                                        {!slot.available && (
                                            <View style={styles.fullBadge}>
                                                <Text style={styles.fullText}>
                                                    फुल
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Sticky Bottom Action Footer */}
            <View style={styles.bottomButtonContainer}>
                <PrimaryButton
                    title={selectedTime ? `${selectedTime} - बुकिंग तपासा` : "वेळ निवडा"}
                    disabled={!selectedTime}
                    onPress={handleContinue}
                />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    content: {
        paddingHorizontal: SPACING.lg || 16,
        paddingTop: SPACING.md || 12,
        paddingBottom: 150,
    },

    headerContainer: {
        marginBottom: 16,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.3,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 13.5,
        lineHeight: 18,
    },

    dateCard: {
        backgroundColor: COLORS.black || "#111827",
        borderRadius: RADIUS.xl || 18,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    dateIconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    dateInfo: {
        flex: 1,
    },

    dateLabel: {
        color: "#9CA3AF",
        fontSize: 10.5,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    dateValue: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 16,
        fontWeight: "800",
        marginTop: 1,
    },

    changeDateBtn: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },

    changeDateText: {
        color: "#FFFFFF",
        fontSize: 11.5,
        fontWeight: "700",
    },

    legendContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white || "#FFFFFF",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: RADIUS.lg || 14,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    legendAvailable: {
        backgroundColor: "#10B981",
    },

    legendSelected: {
        backgroundColor: COLORS.primary || "#F59E0B",
    },

    legendFull: {
        backgroundColor: "#D1D5DB",
    },

    legendText: {
        fontSize: 11.5,
        color: "#4B5563",
        fontWeight: "600",
    },

    group: {
        marginBottom: 22,
    },

    groupHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    groupIconChip: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },

    groupTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black || "#111827",
        marginLeft: 8,
        letterSpacing: -0.2,
    },

    slotsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    slot: {
        width: "31%",
        minHeight: 52,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 2,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    selectedSlot: {
        backgroundColor: COLORS.black || "#111827",
        borderColor: COLORS.primary || "#F59E0B",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },

    disabledSlot: {
        backgroundColor: "#F9FAFB",
        borderColor: "#F3F4F6",
        opacity: 0.7,
    },

    slotText: {
        fontSize: 12.5,
        fontWeight: "700",
        color: COLORS.black || "#111827",
    },

    selectedText: {
        color: COLORS.primary || "#F59E0B",
    },

    disabledText: {
        color: "#9CA3AF",
    },

    fullBadge: {
        marginTop: 3,
        backgroundColor: "#FEF2F2",
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#FECACA",
    },

    fullText: {
        fontSize: 8.5,
        fontWeight: "700",
        color: "#EF4444",
    },

    bottomButtonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.white || "#FFFFFF",
        paddingHorizontal: SPACING.lg || 16,
        paddingTop: 14,
        paddingBottom: Platform.OS === "ios" ? 30 : 16,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -6 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
});